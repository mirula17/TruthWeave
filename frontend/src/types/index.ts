export type Role = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name?: string;
  email: string;
  role: Role;
  is_active: boolean;
  created_at: string;
  avatar?: string;
  verifications_count?: number;
}

export type VerdictType = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';

export type ContentType = 'claim' | 'url' | 'image' | 'video' | 'document';

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  sourceDomain: string;
  reliability: 'HIGH' | 'MEDIUM' | 'LOW';
  stance: 'SUPPORTS' | 'CONTRADICTS' | 'NEUTRAL';
  date: string;
}

export interface SourceItem {
  id: string;
  name: string;
  domain: string;
  title: string;
  url: string;
  publishedAt: string;
  credibilityScore: number; // 0-100
  factCheckRating?: string;
}

export interface TimelineStep {
  id: string;
  stage: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'pending';
}

export interface VerificationResult {
  id: string;
  claim: string;
  contentType: ContentType;
  verdict: VerdictType;
  confidence: number; // 0-100
  explanation: string;
  summary: string;
  evidence: EvidenceItem[];
  sources: SourceItem[];
  timeline: TimelineStep[];
  createdAt: string;
  userId?: string;
  sourceUrl?: string;
  context?: string;
  language?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  mediaPreviewUrl?: string;
  dimensions?: string;
  duration?: string;
  resolution?: string;
  isDemo?: boolean;
  tags?: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: number;
  sizeFormatted: string;
  uploadedAt: string;
  status: 'verified' | 'analyzing' | 'pending' | 'failed';
  verificationId?: string;
  mimeType: string;
  previewUrl?: string;
  category: 'document' | 'image' | 'video' | 'audio';
}

export interface AuditLog {
  id: string;
  userId: string | null;
  userEmail?: string;
  action: string;
  resource?: string;
  ipAddress: string | null;
  details: string | null;
  status?: 'SUCCESS' | 'WARNING' | 'ERROR';
  timestamp: string;
}

export interface SystemServiceHealth {
  name: string;
  type: string;
  status: 'online' | 'degraded' | 'offline';
  latency: string;
  requests24h: string;
  errorRate: string;
  uptime: string;
  version?: string;
  endpoint?: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  verificationsCount: number;
  lastActive: string;
}

export interface StatItem {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  description?: string;
}
