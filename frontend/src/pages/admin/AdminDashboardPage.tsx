import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  CheckCircle,
  FileText,
  Activity,
  AlertTriangle,
  Server,
  ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { SystemHealthCard } from '../../components/admin/SystemHealthCard';
import { adminApi } from '../../api/admin.api';
import type { AuditLog, SystemServiceHealth } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [services, setServices] = useState<SystemServiceHealth[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const load = async () => {
      const [statsData, servicesData, logsData] = await Promise.all([
        adminApi.getAdminStats(),
        adminApi.getSystemHealth(),
        adminApi.getAuditLogs(),
      ]);
      setStats(statsData);
      setServices(servicesData);
      setAuditLogs(logsData);
    };
    load();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-sky-950/20 p-6 sm:p-8 backdrop-blur-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <ShieldAlert size={20} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
            TRUTHWEAVE OPERATIONS & ADMIN CONSOLE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Overview & Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
          Real-time telemetry on active verification pipelines, system health, platform user growth, and audit integrity.
        </p>
      </div>

      {/* Top 6 Stat Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Registered Users"
          value={stats?.totalUsers || 1482}
          change="+12% this month"
          changeType="positive"
          icon={<Users size={20} className="text-indigo-400" />}
          glow="indigo"
        />
        <StatCard
          title="Active Monthly Users"
          value={stats?.activeUsers || 934}
          change="63% engagement"
          changeType="positive"
          icon={<Users size={20} className="text-sky-400" />}
          glow="cyan"
        />
        <StatCard
          title="Total Verifications Run"
          value={(stats?.totalVerifications || 28450).toLocaleString()}
          change="+684 today"
          changeType="positive"
          icon={<CheckCircle size={20} className="text-emerald-400" />}
          glow="emerald"
        />
        <StatCard
          title="Today's Jobs"
          value={stats?.todayVerifications || 684}
          change="Peak: 120/hr"
          changeType="neutral"
          icon={<Activity size={20} className="text-sky-400" />}
          glow="cyan"
        />
        <StatCard
          title="Flagged Disinformation"
          value={stats?.flaggedContent || 42}
          change="High viral risk"
          changeType="negative"
          icon={<AlertTriangle size={20} className="text-amber-400" />}
          glow="amber"
        />
        <StatCard
          title="System Exceptions (24h)"
          value={stats?.systemErrors || 3}
          change="0.01% error rate"
          changeType="positive"
          icon={<Server size={20} className="text-rose-400" />}
          glow="rose"
        />
      </div>

      {/* System Health Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Microservices & Infrastructure Health
            </h2>
          </div>
          <button
            onClick={() => navigate('/admin/system')}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:underline"
          >
            <span>Full System Diagnostics</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        <SystemHealthCard services={services} />
      </div>

      {/* Recent Audit Trail Preview */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Recent Audit Events</h3>
          </div>
          <button
            onClick={() => navigate('/admin/audit-logs')}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:underline"
          >
            <span>View All Logs</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-indigo-400">{log.action}</td>
                  <td className="py-3 px-3 text-slate-200">{log.userEmail || log.userId}</td>
                  <td className="py-3 px-3 text-slate-400 max-w-xs truncate">{log.details}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{log.ipAddress || '127.0.0.1'}</td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">
                    {new Date(log.timestamp).toLocaleTimeString()}
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
