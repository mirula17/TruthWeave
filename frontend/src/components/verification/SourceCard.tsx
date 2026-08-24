import React from 'react';
import type { SourceItem } from '../../types';
import { Globe, ExternalLink, Award, ShieldCheck } from 'lucide-react';

interface SourceCardListProps {
  sources: SourceItem[];
}

export const SourceCardList: React.FC<SourceCardListProps> = ({ sources }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sources.map((source) => (
        <div
          key={source.id}
          className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-sky-500/30 hover:bg-slate-900/70 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Globe size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{source.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{source.domain}</div>
                </div>
              </div>

              {/* Credibility Score */}
              <div className="text-right">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={11} />
                  <span>{source.credibilityScore}%</span>
                </span>
              </div>
            </div>

            <div className="mt-3">
              <h5 className="text-xs font-semibold text-slate-200 line-clamp-2">{source.title}</h5>
              {source.factCheckRating && (
                <div className="mt-2 flex items-center gap-1 text-[11px] text-sky-400">
                  <Award size={12} />
                  <span>{source.factCheckRating}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60 text-[11px]">
            <span className="text-slate-500">Published: {source.publishedAt}</span>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium hover:underline"
            >
              <span>Inspect</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
