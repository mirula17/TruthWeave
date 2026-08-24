import React, { type ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  description?: string;
  glow?: 'cyan' | 'indigo' | 'emerald' | 'rose' | 'amber';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  description,
  glow = 'cyan',
  onClick,
}) => {
  const glowClasses = {
    cyan: 'glow-cyan border-sky-500/30 text-sky-400 bg-sky-500/10',
    indigo: 'glow-indigo border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    emerald: 'glow-emerald border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    rose: 'glow-rose border-rose-500/30 text-rose-400 bg-rose-500/10',
    amber: 'glow-amber border-amber-500/30 text-amber-400 bg-amber-500/10',
  };

  const changeColors = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-400 bg-slate-800/80 border-slate-700/60',
  };

  const changeIcons = {
    positive: <ArrowUpRight size={12} />,
    negative: <ArrowDownRight size={12} />,
    neutral: <Minus size={12} />,
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/80 ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-white">
            {value}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${glowClasses[glow]}`}
        >
          {icon}
        </div>
      </div>

      {(change || description) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold ${changeColors[changeType]}`}
            >
              {changeIcons[changeType]}
              <span>{change}</span>
            </span>
          )}
          {description && <span className="text-slate-400 truncate">{description}</span>}
        </div>
      )}
    </div>
  );
};
