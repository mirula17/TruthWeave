import React, { useState, useEffect } from 'react';
import { FileText, Search } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import type { AuditLog } from '../../types';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'WARNING' | 'ERROR'>('ALL');

  useEffect(() => {
    const load = async () => {
      const data = await adminApi.getAuditLogs();
      setLogs(data);
    };
    load();
  }, []);

  const filtered = logs.filter((l) => {
    const matchesSearch =
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(search.toLowerCase())) ||
      (l.userEmail && l.userEmail.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || (l.status || 'SUCCESS') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
          <FileText size={14} />
          <span>SECURITY & COMPLIANCE TRAIL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          System Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Cryptographically timestamped audit log of all administrative actions, logins, role modifications, and forensic evaluations.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by action, details, user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'SUCCESS', 'WARNING', 'ERROR'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Event Action</th>
                <th className="py-3 px-4">User Initiator</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-indigo-300">{log.action}</td>
                  <td className="py-3.5 px-4 text-white">{log.userEmail || log.userId}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">{log.resource || 'N/A'}</td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs">{log.details}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{log.ipAddress || '127.0.0.1'}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
