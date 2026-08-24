import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  CheckCircle,
  FileText,
  Activity,
  BarChart3,
  Sliders,
  ArrowLeft,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../common/Badge';

export const AdminSidebar: React.FC = () => {
  const { user, role, logout, quickLoginAs } = useAuth();
  const navigate = useNavigate();

  const adminNavItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users Management', icon: Users },
    { to: '/admin/verifications', label: 'Verifications', icon: CheckCircle },
    { to: '/admin/audit-logs', label: 'Audit Logs', icon: FileText },
    { to: '/admin/system', label: 'System Health', icon: Activity },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/settings', label: 'System Settings', icon: Sliders },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-indigo-900/40 bg-[#070a14] lg:flex">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-indigo-900/40 px-6 bg-indigo-950/20">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 shadow-lg shadow-indigo-500/10">
          <ShieldAlert size={24} className="text-indigo-400" />
        </div>
        <div>
          <div className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
            Admin Console
          </div>
          <div className="text-[10px] font-medium text-indigo-400/70 tracking-wider uppercase">
            TruthWeave Operations
          </div>
        </div>
      </div>

      {/* Back to User Dashboard button */}
      <div className="p-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex w-full items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Exit to User Dashboard</span>
        </button>
      </div>

      {/* Main Admin Nav Items */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Administration
        </div>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-sky-500/10 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Role Toggle Switcher */}
      <div className="px-3 pb-2">
        <button
          onClick={() => {
            quickLoginAs('USER');
            navigate('/dashboard');
          }}
          className="flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/40 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
          title="Switch to USER role"
        >
          <span className="flex items-center gap-1.5">
            <ArrowRightLeft size={13} className="text-sky-400" />
            <span>Role:</span>
          </span>
          <RoleBadge role={role || 'ADMIN'} />
        </button>
      </div>

      {/* Admin User Footer Card */}
      <div className="border-t border-indigo-900/40 p-3">
        <div className="flex items-center justify-between rounded-xl bg-slate-900/60 p-2 border border-indigo-500/20">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt="Admin"
              className="h-8 w-8 rounded-lg object-cover border border-indigo-400/40 shrink-0"
            />
            <div className="overflow-hidden">
              <div className="truncate text-xs font-semibold text-indigo-200">{user?.name || 'Administrator'}</div>
              <div className="truncate text-[10px] text-slate-500">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
