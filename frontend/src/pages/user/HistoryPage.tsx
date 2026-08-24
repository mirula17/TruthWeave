import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Calendar,
  Sparkles,
  ArrowUpRight,
  FileText,
  Image as ImageIcon,
  Video,
  Link2
} from 'lucide-react';
import { VerdictBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { verificationApi } from '../../api/verification.api';
import type { VerificationResult, VerdictType } from '../../types';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | VerdictType>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [timeFilter, setTimeFilter] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await verificationApi.getVerifications();
        setVerifications(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = verifications.filter((item) => {
    const matchesSearch =
      item.claim.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    const matchesVerdict = verdictFilter === 'ALL' || item.verdict === verdictFilter;
    const matchesType = typeFilter === 'ALL' || item.contentType === typeFilter;

    return matchesSearch && matchesVerdict && matchesType;
  });

  const getTypeIcon = (type: VerificationResult['contentType']) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={13} className="text-sky-400" />;
      case 'video':
        return <Video size={13} className="text-indigo-400" />;
      case 'url':
        return <Link2 size={13} className="text-emerald-400" />;
      case 'document':
        return <FileText size={13} className="text-amber-400" />;
      case 'claim':
      default:
        return <Sparkles size={13} className="text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verification History & Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and inspect past information intelligence evaluations.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          onClick={() => navigate('/verify')}
          icon={<Sparkles size={16} />}
        >
          New Verification
        </Button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search claims, summaries, or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Time Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">All Time</option>
              <option value="TODAY">Today</option>
              <option value="WEEK">This Week</option>
              <option value="MONTH">This Month</option>
            </select>
          </div>
        </div>

        {/* Verdict Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mr-1">
            Verdict:
          </span>
          {(['ALL', 'TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVerdictFilter(v)}
              className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                verdictFilter === v
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {v}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mr-1">
            Type:
          </span>
          {(['ALL', 'claim', 'url', 'image', 'video', 'document'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-xl px-2.5 py-1 text-xs font-medium uppercase transition-all ${
                typeFilter === t
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results List / Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading history archive...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
            <Search size={24} />
          </div>
          <h3 className="text-base font-bold text-white">No verifications found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No verification records match your active search filters.
          </p>
          <Button variant="secondary" size="sm" onClick={() => { setSearch(''); setVerdictFilter('ALL'); setTypeFilter('ALL'); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/results/${item.id}`)}
              className="group rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 hover:border-sky-500/40 hover:bg-slate-900/80 transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <VerdictBadge verdict={item.verdict} size="sm" />
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 uppercase font-mono">
                    {getTypeIcon(item.contentType)}
                    <span>{item.contentType}</span>
                  </span>
                  <span className="font-mono text-xs text-slate-500">ID: {item.id}</span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar size={13} />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {item.confidence}% Confidence
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    "{item.claim}"
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:underline shrink-0 self-center">
                  <span>Report</span>
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
