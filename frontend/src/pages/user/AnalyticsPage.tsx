import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { VolumeChart } from '../../components/charts/VolumeChart';
import { VerdictDonut } from '../../components/charts/VerdictDonut';
import { ConfidenceBar } from '../../components/charts/ConfidenceBar';
import { ContentTypeBar } from '../../components/charts/ContentTypeBar';
import { USER_ANALYTICS_DATA } from '../../mocks/analytics';

export const AnalyticsPage: React.FC = () => {
  const stats = USER_ANALYTICS_DATA.summary;
  const volumeData = USER_ANALYTICS_DATA.volumeOverTime;
  const verdictData = USER_ANALYTICS_DATA.verdictDistribution;
  const confidenceData = USER_ANALYTICS_DATA.confidenceDistribution;
  const contentTypeData = USER_ANALYTICS_DATA.contentTypeDistribution;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
          <BarChart3 size={14} />
          <span>INTELLIGENCE & FORENSICS METRICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Verification Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-dimensional overview of verification accuracy, verdict breakdowns, and multimodal throughput.
        </p>
      </div>

      {/* Top Stat Overview Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Evaluated"
          value={stats.totalVerifications}
          change="+24% vs last week"
          changeType="positive"
          icon={<TrendingUp size={20} />}
          description="Claims, media & URLs"
          glow="cyan"
        />
        <StatCard
          title="Avg Confidence Score"
          value={`${stats.averageConfidence}%`}
          change="+2.1% accuracy"
          changeType="positive"
          icon={<Award size={20} className="text-sky-400" />}
          description="Synthesized model certainty"
          glow="indigo"
        />
        <StatCard
          title="True / Authentic Ratio"
          value={`${Math.round((stats.trueClaims / stats.totalVerifications) * 100)}%`}
          change={`${stats.trueClaims} of ${stats.totalVerifications} items`}
          changeType="positive"
          icon={<ShieldCheck size={20} className="text-emerald-400" />}
          description="Verified claims"
          glow="emerald"
        />
        <StatCard
          title="Analysis Hours Saved"
          value={`${stats.timeSavedHours}h`}
          change="~20 min per claim"
          changeType="positive"
          icon={<Clock size={20} className="text-purple-400" />}
          description="Automated cross-search"
          glow="cyan"
        />
      </div>

      {/* Charts Grid 1: Volume & Verdict Breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification Volume Chart (2 Cols) */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Verification Volume Over Time
              </h3>
              <p className="text-xs text-slate-400">Weekly throughput across claims and media forensics</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Total
              </span>
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="h-2 w-2 rounded-full bg-indigo-400" /> Media
              </span>
            </div>
          </div>

          <VolumeChart data={volumeData} />
        </div>

        {/* Verdict Distribution Donut (1 Col) */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white tracking-tight">Verdict Distribution</h3>
            <p className="text-xs text-slate-400">Breakdown of factual findings</p>
          </div>

          <VerdictDonut data={verdictData} />
        </div>
      </div>

      {/* Charts Grid 2: Confidence Buckets & Content Modalities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Confidence Distribution */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white tracking-tight">Confidence Range Distribution</h3>
            <p className="text-xs text-slate-400">Statistical certainty distribution across completed jobs</p>
          </div>

          <ConfidenceBar data={confidenceData} />
        </div>

        {/* Content Modalities Bar */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white tracking-tight">Content Ingest Modalities</h3>
            <p className="text-xs text-slate-400">Text claims, URLs, image forensics, deepfake video, and PDFs</p>
          </div>

          <ContentTypeBar data={contentTypeData} />
        </div>
      </div>
    </div>
  );
};
