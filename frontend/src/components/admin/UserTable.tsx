import React, { useState } from 'react';
import type { AdminUserItem, Role } from '../../types';
import { RoleBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Search, UserX, UserCheck, Edit3 } from 'lucide-react';
import { adminApi } from '../../api/admin.api';

interface UserTableProps {
  users: AdminUserItem[];
  onUserUpdated: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onUserUpdated }) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [modalAction, setModalAction] = useState<'role' | 'status' | null>(null);
  const [newRole, setNewRole] = useState<Role>('USER');
  const [actionLoading, setActionLoading] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminApi.updateUserRole(selectedUser.id, newRole);
      onUserUpdated();
      setModalAction(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await adminApi.toggleUserStatus(selectedUser.id);
      onUserUpdated();
      setModalAction(null);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'ADMIN', 'USER'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                roleFilter === r
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Verifications</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div>
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[11px] text-slate-400">{u.email}</div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <RoleBadge role={u.role} />
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      u.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        u.isActive ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <span>{u.isActive ? 'Active' : 'Suspended'}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                  {u.verificationsCount}
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setNewRole(u.role);
                        setModalAction('role');
                      }}
                      className="rounded-lg border border-slate-800 bg-slate-800/60 p-1.5 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors"
                      title="Change Role"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setModalAction('status');
                      }}
                      className={`rounded-lg border p-1.5 transition-colors ${
                        u.isActive
                          ? 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-rose-500/40 hover:text-rose-400'
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                      title={u.isActive ? 'Deactivate User' : 'Activate User'}
                    >
                      {u.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Change Modal */}
      <Modal
        isOpen={modalAction === 'role'}
        onClose={() => setModalAction(null)}
        title="Modify User Role"
        subtitle={`Select role for ${selectedUser?.email}`}
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {(['USER', 'ADMIN'] as const).map((r) => (
              <div
                key={r}
                onClick={() => setNewRole(r)}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 cursor-pointer transition-all ${
                  newRole === r
                    ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <RoleBadge role={r} size="md" />
                <span className="text-[11px] text-slate-400 mt-2">
                  {r === 'ADMIN' ? 'Full platform administration' : 'Standard verification access'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setModalAction(null)}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              size="sm"
              loading={actionLoading}
              onClick={handleRoleChange}
            >
              Confirm Role Change
            </Button>
          </div>
        </div>
      </Modal>

      {/* Status Toggle Modal */}
      <Modal
        isOpen={modalAction === 'status'}
        onClose={() => setModalAction(null)}
        title={selectedUser?.isActive ? 'Suspend User Account' : 'Reactivate User Account'}
        subtitle={`Confirm action for ${selectedUser?.email}`}
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedUser?.isActive
              ? `Are you sure you want to suspend access for ${selectedUser.email}? They will no longer be able to log in or initiate verification workflows.`
              : `Reactivate account access for ${selectedUser?.email}? Full standard platform permissions will be restored.`}
          </p>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setModalAction(null)}>
              Cancel
            </Button>
            <Button
              variant={selectedUser?.isActive ? 'danger' : 'primary'}
              size="sm"
              loading={actionLoading}
              onClick={handleStatusToggle}
            >
              {selectedUser?.isActive ? 'Suspend Account' : 'Reactivate Account'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
