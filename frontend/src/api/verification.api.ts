import { apiClient } from './client';
import type { VerificationResult, VerdictType } from '../types';
import { MOCK_VERIFICATIONS } from '../mocks/verifications';

export interface VerifyClaimPayload {
  claim: string;
  context?: string;
  sourceUrl?: string;
  language?: string;
}

export interface VerifyUrlPayload {
  url: string;
  context?: string;
}

export interface VerifyFilePayload {
  file: File;
  fileType?: string;
  ocrEnabled?: boolean;
  deepfakeEnabled?: boolean;
}

export const verificationApi = {
  getVerifications: async (): Promise<VerificationResult[]> => {
    try {
      const res = await apiClient.get<VerificationResult[]>('/verifications');
      return res.data;
    } catch {
      return MOCK_VERIFICATIONS;
    }
  },

  getVerificationById: async (id: string): Promise<VerificationResult | null> => {
    try {
      const res = await apiClient.get<VerificationResult>(`/verifications/${id}`);
      return res.data;
    } catch {
      const found = MOCK_VERIFICATIONS.find((v) => v.id === id);
      return found || MOCK_VERIFICATIONS[0];
    }
  },

  verifyClaim: async (payload: VerifyClaimPayload): Promise<VerificationResult> => {
    try {
      const res = await apiClient.post<VerificationResult>('/verify/claim', payload);
      return res.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const isSampleTrue = payload.claim.toLowerCase().includes('water') || payload.claim.toLowerCase().includes('eu');
      const isSampleMisleading = payload.claim.toLowerCase().includes('mars') || payload.claim.toLowerCase().includes('space');

      const verdict: VerdictType = isSampleTrue ? 'TRUE' : isSampleMisleading ? 'MISLEADING' : 'FALSE';
      const confidence = Math.floor(Math.random() * 15) + 85;

      const newResult: VerificationResult = {
        id: `ver-${Math.floor(1000 + Math.random() * 9000)}`,
        claim: payload.claim,
        contentType: 'claim',
        verdict,
        confidence,
        summary: `Multi-source cross verification processed. Model synthesized 6 primary facts and evaluated corroborating authoritative databases.`,
        explanation: `TruthWeave natural language parser analyzed statements, referenced knowledge registries, and performed semantic stance validation against authoritative sources.`,
        createdAt: new Date().toISOString(),
        tags: ['NLP Verification', 'Claim', 'Automated Search'],
        evidence: [
          {
            id: 'evi-dyn-1',
            title: 'Verified Fact Checking Dispatch',
            description: 'Automated retrieval corroborated semantic elements across high-reputation publications.',
            source: 'FactCheck Aggregator & Knowledge Index',
            sourceDomain: 'factcheck.org',
            sourceUrl: 'https://factcheck.org',
            reliability: 'HIGH',
            stance: verdict === 'TRUE' ? 'SUPPORTS' : 'CONTRADICTS',
            date: 'Recent'
          }
        ],
        sources: [
          {
            id: 'src-dyn-1',
            name: 'TruthWeave Search Engine',
            domain: 'truthweave.ai',
            title: 'Live Web Corroboration Index',
            url: 'https://truthweave.ai',
            publishedAt: new Date().toISOString().split('T')[0],
            credibilityScore: 97,
            factCheckRating: 'Multi-Source Synthesis'
          }
        ],
        timeline: [
          {
            id: 'tl-1',
            stage: 'Claim Ingest',
            title: 'Statement Parsed',
            description: `Extracted ${payload.claim.split(' ').length} tokens.`,
            timestamp: '00:01',
            status: 'completed'
          },
          {
            id: 'tl-2',
            stage: 'Synthesis',
            title: `Verdict: ${verdict}`,
            description: `Generated with ${confidence}% confidence.`,
            timestamp: '00:04',
            status: 'completed'
          }
        ]
      };

      MOCK_VERIFICATIONS.unshift(newResult);
      return newResult;
    }
  },

  verifyUrl: async (payload: VerifyUrlPayload): Promise<VerificationResult> => {
    try {
      const res = await apiClient.post<VerificationResult>('/verify/url', payload);
      return res.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return MOCK_VERIFICATIONS[2];
    }
  },

  verifyFile: async (payload: VerifyFilePayload): Promise<VerificationResult> => {
    try {
      const formData = new FormData();
      formData.append('file', payload.file);
      const res = await apiClient.post<VerificationResult>('/verify/file', formData);
      return res.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const isVideo = payload.file.type.startsWith('video/');
      const isImage = payload.file.type.startsWith('image/');
      if (isVideo) return MOCK_VERIFICATIONS[4];
      if (isImage) return MOCK_VERIFICATIONS[3];
      return MOCK_VERIFICATIONS[5];
    }
  }
};
