import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { UserTable } from '../../components/admin/UserTable';
import { adminApi } from '../../api/admin.api';
import type { AdminUserItem } from '../../types';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await adminApi.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
            <Users size={14} />
            <span>ACCESS CONTROL & ROLES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inspect registered accounts, reassign permissions between USER and ADMIN, and manage access status.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading user directory...</div>
      ) : (
        <UserTable users={users} onUserUpdated={loadUsers} />
      )}
    </div>
  );
};
