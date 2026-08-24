import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Search, ArrowUpRight } from 'lucide-react';
import { VerdictBadge } from '../../components/common/Badge';
import { verificationApi } from '../../api/verification.api';
import type { VerificationResult, VerdictType } from '../../types';

export const AdminVerificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const [search, setSearch] = useState('');
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | VerdictType>('ALL');

  useEffect(() => {
    const load = async () => {
      const data = await verificationApi.getVerifications();
      setVerifications(data);
    };
    load();
  }, []);

  const filtered = verifications.filter((v) => {
    const matchesSearch = v.claim.toLowerCase().includes(search.toLowerCase());
    const matchesVerdict = verdictFilter === 'ALL' || v.verdict === verdictFilter;
    return matchesSearch && matchesVerdict;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
          <CheckCircle size={14} />
          <span>GLOBAL ACTIVITY STREAM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Verification Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Inspect verification pipeline execution, flagged claims, and model verdicts across all user sessions.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search claims across all users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'TRUE', 'FALSE', 'MISLEADING', 'UNVERIFIED'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVerdictFilter(v)}
              className={`rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
                verdictFilter === v
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Verifications table */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Content Claim</th>
                <th className="py-3 px-4">Modality</th>
                <th className="py-3 px-4">Verdict</th>
                <th className="py-3 px-4">Certainty</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/results/${item.id}`)}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-medium text-white max-w-sm truncate">
                    {item.claim}
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[10px] font-mono text-slate-400">
                    {item.contentType}
                  </td>
                  <td className="py-3.5 px-4">
                    <VerdictBadge verdict={item.verdict} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                    {item.confidence}%
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-indigo-400 font-semibold hover:underline">
                      <span>View</span>
                      <ArrowUpRight size={13} />
                    </span>
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
