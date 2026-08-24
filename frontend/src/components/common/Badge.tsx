import React from 'react';
import type { VerdictType, Role } from '../../types';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Shield, User as UserIcon } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: VerdictType;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({
  verdict,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm font-bold gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  switch (verdict) {
    case 'TRUE':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <CheckCircle2 size={iconSizes[size]} className="text-emerald-400 shrink-0" />}
          <span>TRUE</span>
        </span>
      );
    case 'FALSE':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-500/5 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <XCircle size={iconSizes[size]} className="text-rose-400 shrink-0" />}
          <span>FALSE</span>
        </span>
      );
    case 'MISLEADING':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <AlertTriangle size={iconSizes[size]} className="text-amber-400 shrink-0" />}
          <span>MISLEADING</span>
        </span>
      );
    case 'UNVERIFIED':
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <HelpCircle size={iconSizes[size]} className="text-slate-400 shrink-0" />}
          <span>UNVERIFIED</span>
        </span>
      );
  }
};

export const RoleBadge: React.FC<{ role: Role; size?: 'sm' | 'md'; className?: string }> = ({ role, className = '' }) => {
  if (role === 'ADMIN') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 ${className}`}
      >
        <Shield size={12} className="text-indigo-400" />
        <span>ADMIN</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 ${className}`}
    >
      <UserIcon size={12} className="text-sky-400" />
      <span>USER</span>
    </span>
  );
};
