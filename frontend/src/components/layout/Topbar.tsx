import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  Menu,
  CheckCircle,
  AlertTriangle,
  User,
  LogOut,
  Shield,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../common/Badge';

interface TopbarProps {
  onMenuClick: () => void;
  isAdmin?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick, isAdmin = false }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-[#050816]/80 px-4 sm:px-6 backdrop-blur-xl">
      {/* Left: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-400 hover:text-white lg:hidden"
        >
          <Menu size={18} />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder={isAdmin ? "Search users, audit records, or verifications..." : "Quick search claims, topics, or fact checks..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50 transition-all font-sans"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {!isAdmin && (
          <button
            onClick={() => navigate('/verify')}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-90 transition-all"
          >
            <Sparkles size={14} />
            <span>New Verification</span>
          </button>
        )}

        {/* Admin Navigation Button */}
        {role === 'ADMIN' && (
          <button
            onClick={() => {
              if (isAdmin) navigate('/dashboard');
              else navigate('/admin');
            }}
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 px-2.5 py-1.5 text-xs text-indigo-300 hover:bg-indigo-900/40 transition-all"
            title={isAdmin ? "Switch to User Dashboard" : "Open Admin Console"}
          >
            <ArrowRightLeft size={13} className="text-indigo-400" />
            <span>{isAdmin ? "User View" : "Admin Console"}</span>
            <RoleBadge role="ADMIN" size="sm" />
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-2 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-[#0b1120] p-4 shadow-2xl shadow-sky-500/10 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] text-sky-400 cursor-pointer hover:underline">
                  Mark all read
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-emerald-400">
                    <CheckCircle size={14} />
                    <span>Verification Complete</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1 line-clamp-2">
                    "WHO Sweetener ban" finished evaluation with 96% confidence.
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">5m ago</span>
                </div>

                <div className="rounded-xl bg-slate-900/80 p-2.5 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-amber-400">
                    <AlertTriangle size={14} />
                    <span>High Misinformation Alert</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-1 line-clamp-2">
                    Multiple viral deepfakes flagged in election topic stream.
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 p-1.5 hover:border-slate-700 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt="Avatar"
              className="h-7 w-7 rounded-lg object-cover border border-slate-700"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-[#0b1120] p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
                <div className="mt-1.5">
                  <RoleBadge role={role || 'USER'} size="sm" />
                </div>
              </div>

              <div className="py-1 text-xs">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/profile');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                >
                  <User size={14} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                >
                  <Shield size={14} />
                  <span>Settings & Security</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
