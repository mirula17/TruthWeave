import type { DocumentItem } from '../types';

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-101',
    name: 'vaccine_efficacy_meta_study_2026.pdf',
    type: 'PDF',
    size: 2450000,
    sizeFormatted: '2.4 MB',
    uploadedAt: '2026-08-24T11:30:00Z',
    status: 'verified',
    verificationId: 'ver-8941',
    mimeType: 'application/pdf',
    category: 'document'
  },
  {
    id: 'doc-102',
    name: 'lake_michigan_ruins_sonar.jpg',
    type: 'JPG',
    size: 4200000,
    sizeFormatted: '4.2 MB',
    uploadedAt: '2026-08-23T09:05:00Z',
    status: 'verified',
    verificationId: 'ver-8944',
    mimeType: 'image/jpeg',
    previewUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80',
    category: 'image'
  },
  {
    id: 'doc-103',
    name: 'summit_announcement_leak.mp4',
    type: 'MP4',
    size: 28600000,
    sizeFormatted: '28.6 MB',
    uploadedAt: '2026-08-22T18:35:00Z',
    status: 'verified',
    verificationId: 'ver-8945',
    mimeType: 'video/mp4',
    previewUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80',
    category: 'video'
  },
  {
    id: 'doc-104',
    name: 'silver_horizon_whitepaper_v3.pdf',
    type: 'PDF',
    size: 1800000,
    sizeFormatted: '1.8 MB',
    uploadedAt: '2026-08-21T14:10:00Z',
    status: 'verified',
    verificationId: 'ver-8946',
    mimeType: 'application/pdf',
    category: 'document'
  },
  {
    id: 'doc-105',
    name: 'quarterly_climate_data_briefing.docx',
    type: 'DOCX',
    size: 850000,
    sizeFormatted: '850 KB',
    uploadedAt: '2026-08-20T10:15:00Z',
    status: 'verified',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'document'
  },
  {
    id: 'doc-106',
    name: 'press_briefing_transcript_audio.wav',
    type: 'WAV',
    size: 12400000,
    sizeFormatted: '12.4 MB',
    uploadedAt: '2026-08-19T15:20:00Z',
    status: 'analyzing',
    mimeType: 'audio/wav',
    category: 'audio'
  }
];
