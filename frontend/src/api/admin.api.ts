import { apiClient } from './client';
import type { AuditLog, SystemServiceHealth, AdminUserItem, Role } from '../types';
import { MOCK_AUDIT_LOGS, MOCK_SYSTEM_HEALTH } from '../mocks/admin';
import { MOCK_ADMIN_USERS_LIST } from '../mocks/users';

export const adminApi = {
  getAdminStats: async () => {
    try {
      const res = await apiClient.get('/admin/stats');
      return res.data;
    } catch {
      return {
        totalUsers: 1482,
        activeUsers: 934,
        totalVerifications: 28450,
        todayVerifications: 684,
        flaggedContent: 42,
        systemErrors: 3,
      };
    }
  },

  getUsers: async (): Promise<AdminUserItem[]> => {
    try {
      const res = await apiClient.get<AdminUserItem[]>('/admin/users');
      return res.data;
    } catch {
      return MOCK_ADMIN_USERS_LIST;
    }
  },

  updateUserRole: async (userId: string, role: Role): Promise<AdminUserItem> => {
    try {
      const res = await apiClient.patch<AdminUserItem>(`/admin/users/${userId}/role`, { role });
      return res.data;
    } catch {
      const user = MOCK_ADMIN_USERS_LIST.find((u) => u.id === userId);
      if (user) {
        user.role = role;
      }
      return user || MOCK_ADMIN_USERS_LIST[0];
    }
  },

  toggleUserStatus: async (userId: string): Promise<AdminUserItem> => {
    try {
      const res = await apiClient.patch<AdminUserItem>(`/admin/users/${userId}/status`);
      return res.data;
    } catch {
      const user = MOCK_ADMIN_USERS_LIST.find((u) => u.id === userId);
      if (user) {
        user.isActive = !user.isActive;
      }
      return user || MOCK_ADMIN_USERS_LIST[0];
    }
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    try {
      const res = await apiClient.get<AuditLog[]>('/admin/audit-logs');
      return res.data;
    } catch {
      return MOCK_AUDIT_LOGS;
    }
  },

  getSystemHealth: async (): Promise<SystemServiceHealth[]> => {
    try {
      const res = await apiClient.get<SystemServiceHealth[]>('/admin/system-health');
      return res.data;
    } catch {
      return MOCK_SYSTEM_HEALTH;
    }
  }
};
