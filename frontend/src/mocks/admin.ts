import type { AuditLog, SystemServiceHealth } from '../types';

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-901',
    userId: 'usr-admin-001',
    userEmail: 'admin@truthweave.ai',
    action: 'ADMIN_ROLE_PROMOTED',
    resource: 'USER: usr-user-002',
    ipAddress: '192.168.1.45',
    details: 'Changed role for sarah.chen@truthweave.ai to USER',
    status: 'SUCCESS',
    timestamp: '2026-08-24T14:10:22Z'
  },
  {
    id: 'log-902',
    userId: 'usr-user-002',
    userEmail: 'sarah.chen@truthweave.ai',
    action: 'VERIFICATION_EXECUTED',
    resource: 'CLAIM: ver-8941',
    ipAddress: '127.0.0.1',
    details: 'Completed multi-source verification: Sweetener ban claim (Verdict: FALSE)',
    status: 'SUCCESS',
    timestamp: '2026-08-24T12:15:08Z'
  },
  {
    id: 'log-903',
    userId: 'usr-user-003',
    userEmail: 'marcus.b@globalnews.org',
    action: 'MEDIA_FORENSICS_RUN',
    resource: 'IMAGE: lake_michigan_ruins_sonar.jpg',
    ipAddress: '84.22.109.12',
    details: 'Error level analysis detected diffusion artifact (Verdict: FALSE)',
    status: 'SUCCESS',
    timestamp: '2026-08-23T09:10:06Z'
  },
  {
    id: 'log-904',
    userId: 'usr-admin-001',
    userEmail: 'admin@truthweave.ai',
    action: 'SYSTEM_SETTINGS_UPDATED',
    resource: 'CONFIG: ai_thresholds',
    ipAddress: '192.168.1.45',
    details: 'Updated minimum confidence threshold to 85% for automated alerts',
    status: 'SUCCESS',
    timestamp: '2026-08-22T19:00:00Z'
  },
  {
    id: 'log-905',
    userId: 'usr-user-005',
    userEmail: 'dkim@researchlab.io',
    action: 'USER_DEACTIVATED',
    resource: 'USER: usr-user-005',
    ipAddress: '127.0.0.1',
    details: 'Account temporarily suspended pending security review',
    status: 'WARNING',
    timestamp: '2026-08-20T16:00:00Z'
  }
];

export const MOCK_SYSTEM_HEALTH: SystemServiceHealth[] = [
  {
    name: 'FastAPI Backend Core',
    type: 'REST API & Gateway',
    status: 'online',
    latency: '18 ms',
    requests24h: '48,210',
    errorRate: '0.01%',
    uptime: '99.98%',
    version: 'v1.4.0',
    endpoint: 'http://127.0.0.1:8000'
  },
  {
    name: 'PostgreSQL Database',
    type: 'Relational DB (v18)',
    status: 'online',
    latency: '4 ms',
    requests24h: '142,500',
    errorRate: '0.00%',
    uptime: '100%',
    version: 'PostgreSQL 18.0',
    endpoint: '127.0.0.1:5432'
  },
  {
    name: 'Gemini AI Neural Engine',
    type: 'LLM & Multimodal Reasoning',
    status: 'online',
    latency: '340 ms',
    requests24h: '12,400',
    errorRate: '0.04%',
    uptime: '99.95%',
    version: 'Gemini 1.5 Pro',
    endpoint: 'api.generativelanguage.google.com'
  },
  {
    name: 'DuckDuckGo Live Searcher',
    type: 'Real-time Web Ingestion',
    status: 'online',
    latency: '210 ms',
    requests24h: '28,100',
    errorRate: '0.12%',
    uptime: '99.90%',
    version: 'DDGS v5.0',
    endpoint: 'html.duckduckgo.com'
  },
  {
    name: 'Chrome Extension Gateway',
    type: 'WebSocket & Context Menu Bridge',
    status: 'online',
    latency: '12 ms',
    requests24h: '6,840',
    errorRate: '0.00%',
    uptime: '99.99%',
    version: 'Extension v1.0.0',
    endpoint: 'ws://127.0.0.1:8000/ws/extension'
  },
  {
    name: 'Storage & Document Ingest',
    type: 'Media & File Extraction',
    status: 'online',
    latency: '45 ms',
    requests24h: '3,420',
    errorRate: '0.02%',
    uptime: '99.94%',
    version: 'PyTesseract OCR + Pillow'
  }
];
