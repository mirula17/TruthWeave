import React from 'react';
import type { SystemServiceHealth } from '../../types';
import { Server, Zap, Database, Globe, HardDrive } from 'lucide-react';

interface SystemHealthCardProps {
  services: SystemServiceHealth[];
}

export const SystemHealthCard: React.FC<SystemHealthCardProps> = ({ services }) => {
  const getIcon = (type: string) => {
    if (type.includes('API')) return <Server size={18} className="text-sky-400" />;
    if (type.includes('DB') || type.includes('Database')) return <Database size={18} className="text-emerald-400" />;
    if (type.includes('LLM') || type.includes('Neural')) return <Zap size={18} className="text-indigo-400" />;
    if (type.includes('Search') || type.includes('Web')) return <Globe size={18} className="text-amber-400" />;
    return <HardDrive size={18} className="text-purple-400" />;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((svc) => (
        <div
          key={svc.name}
          className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-indigo-500/30 hover:bg-slate-900/70 transition-all"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60">
                  {getIcon(svc.type)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{svc.name}</h4>
                  <div className="text-[10px] text-slate-400">{svc.type}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online</span>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-950/40 p-2.5 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Latency</div>
                <div className="font-mono text-sm font-bold text-sky-400 mt-0.5">{svc.latency}</div>
              </div>
              <div className="rounded-xl bg-slate-950/40 p-2.5 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Uptime (30d)</div>
                <div className="font-mono text-sm font-bold text-emerald-400 mt-0.5">{svc.uptime}</div>
              </div>
              <div className="rounded-xl bg-slate-950/40 p-2.5 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">24h Requests</div>
                <div className="font-mono text-sm font-bold text-slate-200 mt-0.5">{svc.requests24h}</div>
              </div>
              <div className="rounded-xl bg-slate-950/40 p-2.5 border border-slate-800/60">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Error Rate</div>
                <div className="font-mono text-sm font-bold text-indigo-400 mt-0.5">{svc.errorRate}</div>
              </div>
            </div>
          </div>

          {svc.endpoint && (
            <div className="mt-4 truncate rounded-lg bg-slate-950/60 px-2.5 py-1.5 font-mono text-[10px] text-slate-500 border border-slate-800/40">
              {svc.endpoint}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
