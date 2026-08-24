import React from 'react';
import type { TimelineStep } from '../../types';
import { CheckCircle2, Clock } from 'lucide-react';

interface EvidenceTimelineProps {
  timeline: TimelineStep[];
}

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({ timeline }) => {
  return (
    <div className="relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-indigo-500 before:to-emerald-500">
      <div className="space-y-6">
        {timeline.map((step, idx) => (
          <div key={step.id || idx} className="relative group">
            {/* Step node indicator */}
            <div className="absolute -left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#050816] border-2 border-sky-400 text-sky-400 group-hover:scale-110 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all shadow-md shadow-sky-500/20">
              <CheckCircle2 size={12} />
            </div>

            {/* Step details card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 hover:bg-slate-900/60 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  {step.stage}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                  <Clock size={11} />
                  <span>{step.timestamp}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{step.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
