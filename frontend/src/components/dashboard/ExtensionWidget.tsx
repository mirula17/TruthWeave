import React from 'react';
import { Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ExtensionWidget: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-indigo-950/30 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Globe size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">Chrome Extension</h4>
            <div className="text-[10px] text-slate-500">Version 1.0.0 • WebSocket Live</div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Connected</span>
        </span>
      </div>

      <div className="mt-4 space-y-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-sky-400 shrink-0" />
          <span>Context Menu: Right-click any highlighted claim on the web</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-sky-400 shrink-0" />
          <span>Instant Fact-Check Overlay & Confidence Radar</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-sky-400 shrink-0" />
          <span>Image Forensics & Deepfake Detection In-Situ</span>
        </div>
      </div>

      {/* Visual Workflow Mini Step */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          How to Verify in Browser
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
          <span className="rounded bg-slate-800/90 px-2 py-1">1. Select Claim</span>
          <ArrowRight size={12} className="text-sky-400" />
          <span className="rounded bg-slate-800/90 px-2 py-1">2. Right-Click</span>
          <ArrowRight size={12} className="text-sky-400" />
          <span className="rounded bg-sky-500/20 text-sky-300 px-2 py-1 border border-sky-500/30">3. Get Verdict</span>
        </div>
      </div>
    </div>
  );
};
