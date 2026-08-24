import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Calendar,
  FileCheck2,
  Settings,
  Mail,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RoleBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const ProfilePage: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Profile Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-indigo-950/30 p-8 backdrop-blur-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            className="h-24 w-24 rounded-3xl object-cover border-2 border-sky-500/40 shadow-xl shadow-sky-500/10"
          />

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {user?.name || 'TruthWeave Analyst'}
              </h1>
              <RoleBadge role={role || 'USER'} />
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-sky-400" />
                <span>{user?.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-400" />
                <span>Joined {new Date(user?.created_at || '2026-01-15').toLocaleDateString()}</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-lg leading-relaxed pt-1">
              Active verification analyst investigating multimodal claims, deepfakes, and open-source fact-checking data.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/settings')}
            icon={<Settings size={14} />}
            className="shrink-0"
          >
            Edit Settings
          </Button>
        </div>
      </div>

      {/* Activity and Accreditations Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30 mb-3">
            <FileCheck2 size={24} />
          </div>
          <div className="font-mono text-3xl font-extrabold text-white">
            {user?.verifications_count || 38}
          </div>
          <div className="text-xs font-semibold text-slate-300 mt-1">Total Verifications</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Claims & Media evaluated</div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
            <Award size={24} />
          </div>
          <div className="font-mono text-3xl font-extrabold text-emerald-400">98.4%</div>
          <div className="text-xs font-semibold text-slate-300 mt-1">Reliability Index</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cross-source consensus score</div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mb-3">
            <Shield size={24} />
          </div>
          <div className="font-mono text-3xl font-extrabold text-indigo-300">Level 3</div>
          <div className="text-xs font-semibold text-slate-300 mt-1">Analyst Tier</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Forensic clearance active</div>
        </div>
      </div>
    </div>
  );
};
