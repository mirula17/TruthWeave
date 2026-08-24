import React from 'react';
import type { VerificationResult } from '../../types';
import { VerdictBadge } from '../common/Badge';
import { CircularScore } from '../common/CircularScore';
import { Sparkles, Calendar, Tag, FileText, Image as ImageIcon, Video, Link2 } from 'lucide-react';

interface VerdictCardProps {
  result: VerificationResult;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ result }) => {
  const getVerdictGlow = () => {
    switch (result.verdict) {
      case 'TRUE':
        return 'glow-emerald border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/60';
      case 'FALSE':
        return 'glow-rose border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-slate-900/60';
      case 'MISLEADING':
        return 'glow-amber border-amber-500/40 bg-gradient-to-b from-amber-950/30 to-slate-900/60';
      case 'UNVERIFIED':
      default:
        return 'border-slate-800 bg-slate-900/60';
    }
  };

  const getContentTypeIcon = () => {
    switch (result.contentType) {
      case 'image':
        return <ImageIcon size={14} className="text-sky-400" />;
      case 'video':
        return <Video size={14} className="text-sky-400" />;
      case 'url':
        return <Link2 size={14} className="text-sky-400" />;
      case 'document':
        return <FileText size={14} className="text-sky-400" />;
      case 'claim':
      default:
        return <Sparkles size={14} className="text-sky-400" />;
    }
  };

  return (
    <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl transition-all ${getVerdictGlow()}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Verdict details */}
        <div className="space-y-4 flex-1">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
            <VerdictBadge verdict={result.verdict} size="lg" />
            <span className="flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 border border-slate-700">
              {getContentTypeIcon()}
              <span className="uppercase font-medium">{result.contentType}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar size={13} />
              <span>{new Date(result.createdAt).toLocaleDateString()}</span>
            </span>
            {result.isDemo && (
              <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-400 border border-sky-500/20">
                Demo Verification
              </span>
            )}
          </div>

          {/* Original Claim Text */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Verified Content / Claim
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              "{result.claim}"
            </h2>
          </div>

          {/* Executive Summary */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4 text-sm text-slate-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-1.5">
              <Sparkles size={14} />
              <span>AI Executive Summary</span>
            </div>
            <p>{result.summary}</p>
          </div>

          {/* Tags */}
          {result.tags && result.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-800/60 px-2.5 py-1 text-[11px] font-medium text-slate-400 border border-slate-700/60"
                >
                  <Tag size={11} className="text-slate-500" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Circular Confidence Score Gauge */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950/50 p-6 shrink-0 lg:w-60">
          <CircularScore score={result.confidence} verdict={result.verdict} size={130} />
          <div className="mt-3 text-center">
            <div className="text-xs font-semibold text-slate-300">Statistical Confidence</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Based on {result.evidence.length} evidence vectors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
