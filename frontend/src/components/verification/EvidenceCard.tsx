import React from 'react';
import type { EvidenceItem } from '../../types';
import { CheckCircle2, XCircle, MinusCircle, ExternalLink, Shield } from 'lucide-react';

interface EvidenceCardProps {
  evidence: EvidenceItem[];
}

export const EvidenceCardList: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const getStanceBadge = (stance: EvidenceItem['stance']) => {
    switch (stance) {
      case 'SUPPORTS':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} />
            <span>SUPPORTS</span>
          </span>
        );
      case 'CONTRADICTS':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">
            <XCircle size={12} />
            <span>CONTRADICTS</span>
          </span>
        );
      case 'NEUTRAL':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2.5 py-0.5 text-xs font-semibold text-slate-400 border border-slate-500/20">
            <MinusCircle size={12} />
            <span>NEUTRAL</span>
          </span>
        );
    }
  };

  const getReliabilityBadge = (reliability: EvidenceItem['reliability']) => {
    const colors = {
      HIGH: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
      MEDIUM: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
      LOW: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
    };
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${colors[reliability]}`}>
        <Shield size={10} />
        <span>{reliability} RELIABILITY</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {evidence.map((item, idx) => (
        <div
          key={item.id || idx}
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 transition-all"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-sky-400 font-bold">Evidence #{idx + 1}</span>
              {getStanceBadge(item.stance)}
              {getReliabilityBadge(item.reliability)}
            </div>

            <div className="text-xs text-slate-400 font-medium">{item.date}</div>
          </div>

          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
            <div className="text-slate-400">
              Source: <span className="font-semibold text-slate-200">{item.source}</span> ({item.sourceDomain})
            </div>

            {item.sourceUrl && item.sourceUrl !== '#' && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline"
              >
                <span>View Source</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
