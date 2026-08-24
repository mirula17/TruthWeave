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
  X,
  ShieldAlert,
  Users,
  CheckCircle,
  FileText,
  Activity,
  Sliders,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../common/Badge';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, isAdmin = false }) => {
  const { user, role, logout, quickLoginAs } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const userNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/verify', label: 'Verify', icon: Sparkles },
    { to: '/history', label: 'History', icon: History },
    { to: '/files', label: 'My Files', icon: FolderOpen },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const adminNavItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users Management', icon: Users },
    { to: '/admin/verifications', label: 'Verifications', icon: CheckCircle },
    { to: '/admin/audit-logs', label: 'Audit Logs', icon: FileText },
    { to: '/admin/system', label: 'System Health', icon: Activity },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/settings', label: 'System Settings', icon: Sliders },
  ];

  const items = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />

      {/* Drawer */}
      <div className="relative z-10 flex w-72 flex-col bg-[#080d1a] border-r border-slate-800 p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-base font-bold text-white">TruthWeave</div>
              <div className="text-[10px] text-slate-500 uppercase">
                {isAdmin ? 'Admin Console' : 'Information Verification'}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 space-y-1 overflow-y-auto py-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Admin Switcher */}
          {!isAdmin && role === 'ADMIN' && (
            <div className="pt-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/admin');
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2.5 text-sm font-semibold text-indigo-300"
              >
                <ShieldAlert size={18} />
                <span>Admin Console</span>
              </button>
            </div>
          )}

          {isAdmin && (
            <div className="pt-3">
              <button
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2.5 text-sm font-semibold text-slate-200"
              >
                <LayoutDashboard size={18} />
                <span>Exit to User Dashboard</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Role switch */}
        <div className="py-2">
          <button
            onClick={() => {
              const nextRole = role === 'ADMIN' ? 'USER' : 'ADMIN';
              quickLoginAs(nextRole);
              onClose();
              if (nextRole === 'ADMIN') navigate('/admin');
              else navigate('/dashboard');
            }}
            className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300"
          >
            <span className="flex items-center gap-1.5">
              <ArrowRightLeft size={13} className="text-indigo-400" />
              <span>Switch Role:</span>
            </span>
            <RoleBadge role={role || 'USER'} />
          </button>
        </div>

        {/* User Card & Logout */}
        <div className="border-t border-slate-800 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt="User"
                className="h-8 w-8 rounded-lg object-cover border border-slate-700"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">{user?.name || user?.email}</div>
                <div className="text-[10px] text-slate-500 truncate">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
