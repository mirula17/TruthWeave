import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { VerificationResult } from '../../types';
import { VerdictBadge } from '../common/Badge';
import { Sparkles, ArrowUpRight, FileText, Image as ImageIcon, Video, Link2 } from 'lucide-react';

interface RecentActivityTableProps {
  verifications: VerificationResult[];
  limit?: number;
}

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({
  verifications,
  limit = 5,
}) => {
  const navigate = useNavigate();
  const items = verifications.slice(0, limit);

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
    <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Recent Verification Activity
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Latest intelligence and fact-checking evaluations
          </p>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <span>View All History</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3 px-4">Content / Claim</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Verdict</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/results/${item.id}`)}
                className="group hover:bg-slate-800/40 transition-colors cursor-pointer"
              >
                <td className="py-3.5 px-4 font-medium text-slate-100 max-w-xs sm:max-w-sm truncate">
                  <div className="truncate group-hover:text-sky-300 transition-colors">
                    {item.claim}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2 py-1 text-[11px] font-medium text-slate-300 uppercase border border-slate-700/60">
                    {getTypeIcon(item.contentType)}
                    <span>{item.contentType}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <VerdictBadge verdict={item.verdict} size="sm" />
                </td>
                <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                  {item.confidence}%
                </td>
                <td className="py-3.5 px-4 text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 text-sky-400 font-semibold group-hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight size={13} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
