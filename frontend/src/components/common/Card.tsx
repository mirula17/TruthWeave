import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: 'cyan' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glow = 'none',
  onClick,
}) => {
  const glowClasses = {
    cyan: 'glow-cyan border-sky-500/30',
    indigo: 'glow-indigo border-indigo-500/30',
    emerald: 'glow-emerald border-emerald-500/30',
    rose: 'glow-rose border-rose-500/30',
    amber: 'glow-amber border-amber-500/30',
    none: 'border-slate-800/80',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-200 ${
        glowClasses[glow]
      } ${
        hoverEffect
          ? 'hover:border-sky-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-sky-500/5 cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
