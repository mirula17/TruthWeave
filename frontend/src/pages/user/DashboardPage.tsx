import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  UploadCloud,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/dashboard/StatCard';
import { VerificationCard } from '../../components/dashboard/VerificationCard';
import { RecentActivityTable } from '../../components/dashboard/RecentActivityTable';
import { ExtensionWidget } from '../../components/dashboard/ExtensionWidget';
import { verificationApi } from '../../api/verification.api';
import type { VerificationResult } from '../../types';
import { USER_ANALYTICS_DATA } from '../../mocks/analytics';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await verificationApi.getVerifications();
      setVerifications(data);
    };
    load();
  }, []);

  const stats = USER_ANALYTICS_DATA.summary;
  const firstName = user?.name ? user.name.split(' ')[0] : user?.email.split('@')[0] || 'Researcher';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-indigo-950/20 p-6 sm:p-8 backdrop-blur-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
                TRUTHWEAVE INTELLIGENCE SUITE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {firstName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              What would you like to verify today? Inspect statements, web pages, images, and video deepfakes with multi-source neural reasoning.
            </p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate('/verify')}
            icon={<Sparkles size={18} />}
            className="shrink-0"
          >
            + Start Verification
          </Button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Verifications"
          value={stats.totalVerifications}
          change="+18% this month"
          changeType="positive"
          icon={<FileText size={20} />}
          description="Analyzed across all formats"
          glow="cyan"
        />
        <StatCard
          title="True Claims"
          value={stats.trueClaims}
          change="57% of total"
          changeType="positive"
          icon={<CheckCircle size={20} className="text-emerald-400" />}
          description="Verified authentic sources"
          glow="emerald"
        />
        <StatCard
          title="False Claims"
          value={stats.falseClaims}
          change="24% of total"
          changeType="negative"
          icon={<XCircle size={20} className="text-rose-400" />}
          description="Contradicted by evidence"
          glow="rose"
        />
        <StatCard
          title="Misleading Claims"
          value={stats.misleadingClaims}
          change="19% of total"
          changeType="neutral"
          icon={<AlertTriangle size={20} className="text-amber-400" />}
          description="Partial context distortions"
          glow="amber"
        />
      </div>

      {/* 4 Main Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-tight">
            Verification Channels
          </h2>
          <span className="text-xs text-slate-400">Select an ingest modality</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <VerificationCard
            title="Check a Claim"
            description="Verify a statement, viral message, quote, or social-media post."
            icon={<Search size={22} />}
            to="/verify/claim"
            badge="Text NLP"
            accent="cyan"
          />
          <VerificationCard
            title="Upload Content"
            description="Analyze documents, image forensics (ELA), and video deepfakes."
            icon={<UploadCloud size={22} />}
            to="/verify/upload"
            badge="Multi-Modal"
            accent="indigo"
          />
          <VerificationCard
            title="Check a URL"
            description="Scrape webpage schemas, domain credibility, and factual claims."
            icon={<Globe size={22} />}
            to="/verify/url"
            badge="Live Web"
            accent="emerald"
          />
          <VerificationCard
            title="Browser Extension"
            description="Highlight text on any site to trigger instant in-situ verification radar."
            icon={<Globe size={22} />}
            to="/dashboard"
            badge="Active"
            accent="amber"
          />
        </div>
      </div>

      {/* Grid: Recent Activity Table + Sidebar Widgets */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Activity Table */}
        <div className="lg:col-span-2 space-y-6">
          <RecentActivityTable verifications={verifications} limit={6} />
        </div>

        {/* Right 1 Col: Extension Status + Verification Sources */}
        <div className="space-y-6">
          <ExtensionWidget />

          {/* Verification Sources Status Widget */}
          <div className="rounded-3xl border border-slate-800/90 bg-slate-900/40 p-6 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-white mb-3">Verification Pipeline Sources</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-slate-200">Chrome Extension Listener</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Active</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">FastAPI API Core</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Online</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">Google Gemini AI Engine</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">v1.5 Pro</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-200">DuckDuckGo Web Index</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
