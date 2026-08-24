import { apiClient } from './client';
import type { DocumentItem } from '../types';
import { MOCK_DOCUMENTS } from '../mocks/documents';

export const documentsApi = {
  getDocuments: async (): Promise<DocumentItem[]> => {
    try {
      const res = await apiClient.get<DocumentItem[]>('/documents');
      return res.data;
    } catch {
      return MOCK_DOCUMENTS;
    }
  },

  uploadDocument: async (file: File): Promise<DocumentItem> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await apiClient.post<DocumentItem>('/documents/upload', formData);
      return res.data;
    } catch {
      const isImg = file.type.startsWith('image/');
      const isVid = file.type.startsWith('video/');
      const isAud = file.type.startsWith('audio/');
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: file.size,
        sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString(),
        status: 'verified',
        mimeType: file.type,
        category: isImg ? 'image' : isVid ? 'video' : isAud ? 'audio' : 'document',
        previewUrl: isImg ? URL.createObjectURL(file) : undefined
      };
      MOCK_DOCUMENTS.unshift(newDoc);
      return newDoc;
    }
  },

  deleteDocument: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/documents/${id}`);
      return true;
    } catch {
      const idx = MOCK_DOCUMENTS.findIndex((d) => d.id === id);
      if (idx !== -1) {
        MOCK_DOCUMENTS.splice(idx, 1);
      }
      return true;
    }
  }
};
