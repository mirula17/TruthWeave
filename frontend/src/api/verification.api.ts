import { apiClient } from './client';
import type { VerificationResult } from '../types';

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
    const res = await apiClient.get<VerificationResult[]>('/verifications');
    return res.data;
  },

  getVerificationById: async (id: string): Promise<VerificationResult> => {
    const res = await apiClient.get<VerificationResult>(`/verifications/${id}`);
    return res.data;
  },

  verifyClaim: async (payload: VerifyClaimPayload): Promise<VerificationResult> => {
    const res = await apiClient.post<VerificationResult>('/verifications/claim', payload);
    return res.data;
  },

  verifyUrl: async (payload: VerifyUrlPayload): Promise<VerificationResult> => {
    const res = await apiClient.post<VerificationResult>('/verifications/url', payload);
    return res.data;
  },

  verifyFile: async (payload: VerifyFilePayload): Promise<VerificationResult> => {
    const formData = new FormData();
    formData.append('file', payload.file);
    if (payload.fileType) formData.append('fileType', payload.fileType);
    if (payload.ocrEnabled !== undefined) formData.append('ocrEnabled', String(payload.ocrEnabled));
    if (payload.deepfakeEnabled !== undefined) formData.append('deepfakeEnabled', String(payload.deepfakeEnabled));

    const res = await apiClient.post<VerificationResult>('/verifications/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteVerification: async (id: string): Promise<void> => {
    await apiClient.delete(`/verifications/${id}`);
  }
};
