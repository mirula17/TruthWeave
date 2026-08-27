import { apiClient } from './client';
import type { DocumentItem } from '../types';

export const documentsApi = {
  getDocuments: async (): Promise<DocumentItem[]> => {
    const res = await apiClient.get<DocumentItem[]>('/documents');
    return res.data;
  },

  uploadDocument: async (file: File): Promise<DocumentItem> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<DocumentItem>('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  deleteDocument: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/documents/${id}`);
    return true;
  }
};
