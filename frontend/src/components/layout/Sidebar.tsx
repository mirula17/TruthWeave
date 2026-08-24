import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
  History,
  FolderOpen,
  BarChart3,
  Settings,
  User,
  LogOut,
  ShieldAlert,
  ArrowRightLeft,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../common/Badge';

export const Sidebar: React.FC = () => {
  const { user, role, logout, quickLoginAs } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/verify', label: 'Verify', icon: Sparkles },
    { to: '/history', label: 'History', icon: History },
    { to: '/files', label: 'My Files', icon: FolderOpen },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const bottomItems = [
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-800/80 bg-[#080d1a] lg:flex">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10">
          <ShieldCheck size={24} className="text-sky-400" />
        </div>
        <div>
          <div className="text-lg font-bold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
            TruthWeave
          </div>
          <div className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
            Weave Truth. Build Trust.
          </div>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Platform
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/15 to-indigo-500/10 text-sky-400 border border-sky-500/30 shadow-sm shadow-sky-500/10'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        {/* Admin Link if role is ADMIN */}
        {role === 'ADMIN' && (
          <div className="pt-3">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-indigo-400/80 flex items-center justify-between">
              <span>Admin Access</span>
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-indigo-400/90 hover:bg-indigo-950/40 hover:text-indigo-200 border border-indigo-500/20 bg-indigo-500/5'
                }`
              }
            >
              <ShieldAlert size={18} />
              <span>Admin Console</span>
            </NavLink>
          </div>
        )}

        <div className="pt-4 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Account
        </div>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/15 to-indigo-500/10 text-sky-400 border border-sky-500/30 shadow-sm shadow-sky-500/10'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Chrome Extension Status Widget */}
      <div className="p-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-200 mb-1.5">
            <div className="flex items-center gap-1.5 text-sky-400">
              <Globe size={15} />
              <span>Extension</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-tight">
            Highlight text or right-click media on any web page to verify.
          </p>
        </div>
      </div>

      {/* Role Toggle Switcher (for immediate testing of both roles) */}
      <div className="px-3 pb-2">
        <button
          onClick={() => {
            const nextRole = role === 'ADMIN' ? 'USER' : 'ADMIN';
            quickLoginAs(nextRole);
            if (nextRole === 'ADMIN') navigate('/admin');
            else navigate('/dashboard');
          }}
          className="flex w-full items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/40 px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-colors"
          title="Switch between USER and ADMIN modes for testing"
        >
          <span className="flex items-center gap-1.5">
            <ArrowRightLeft size={13} className="text-indigo-400" />
            <span>Test Role:</span>
          </span>
          <RoleBadge role={role || 'USER'} />
        </button>
      </div>

      {/* User Footer Card */}
      <div className="border-t border-slate-800/80 p-3">
        <div className="flex items-center justify-between rounded-xl bg-slate-900/40 p-2 border border-slate-800/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={user?.email || 'User'}
              className="h-8 w-8 rounded-lg object-cover border border-slate-700 shrink-0"
            />
            <div className="overflow-hidden">
              <div className="truncate text-xs font-semibold text-slate-200">
                {user?.name || user?.email.split('@')[0]}
              </div>
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
