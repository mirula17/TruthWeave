import React, { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface VerificationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  badge?: string;
  accent?: 'cyan' | 'indigo' | 'emerald' | 'amber';
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  title,
  description,
  icon,
  to,
  badge,
  accent = 'cyan',
}) => {
  const navigate = useNavigate();

  const accentStyles = {
    cyan: {
      glow: 'hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10',
      iconBox: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      arrow: 'group-hover:text-sky-400',
    },
    indigo: {
      glow: 'hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10',
      iconBox: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      arrow: 'group-hover:text-indigo-400',
    },
    emerald: {
      glow: 'hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10',
      iconBox: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      arrow: 'group-hover:text-emerald-400',
    },
    amber: {
      glow: 'hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10',
      iconBox: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      arrow: 'group-hover:text-amber-400',
    },
  };

  const style = accentStyles[accent];

  return (
    <div
      onClick={() => navigate(to)}
      className={`group relative flex flex-col justify-between rounded-3xl border border-slate-800/90 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-200 cursor-pointer ${style.glow}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${style.iconBox} transition-transform group-hover:scale-105`}
          >
            {icon}
          </div>
          {badge && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${style.badge}`}
            >
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-base font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-semibold text-slate-400">
        <span>Launch Check</span>
        <ArrowUpRight
          size={16}
          className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${style.arrow}`}
        />
      </div>
    </div>
  );
};
