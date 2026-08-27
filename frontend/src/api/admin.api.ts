import { apiClient } from './client';
import type { AuditLog, SystemServiceHealth, AdminUserItem, Role } from '../types';

export interface AdminStatsData {
  totalUsers: number;
  activeUsers: number;
  totalVerifications: number;
  todayVerifications: number;
  flaggedContent: number;
  systemErrors: number;
}

export const adminApi = {
  getAdminStats: async (): Promise<AdminStatsData> => {
    const res = await apiClient.get<AdminStatsData>('/admin/stats');
    return res.data;
  },

  getUsers: async (): Promise<AdminUserItem[]> => {
    const res = await apiClient.get<AdminUserItem[]>('/admin/users');
    return res.data;
  },

  updateUserRole: async (userId: string, role: Role): Promise<AdminUserItem> => {
    const res = await apiClient.patch<AdminUserItem>(`/admin/users/${userId}/role`, { role });
    return res.data;
  },

  toggleUserStatus: async (userId: string): Promise<AdminUserItem> => {
    const res = await apiClient.patch<AdminUserItem>(`/admin/users/${userId}/status`);
    return res.data;
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    const res = await apiClient.get<AuditLog[]>('/admin/audit-logs');
    return res.data;
  },

  getSystemHealth: async (): Promise<SystemServiceHealth[]> => {
    const res = await apiClient.get<SystemServiceHealth[]>('/admin/system-health');
    return res.data;
  }
};
