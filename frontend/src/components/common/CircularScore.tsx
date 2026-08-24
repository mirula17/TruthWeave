import React from 'react';
import type { VerdictType } from '../../types';

interface CircularScoreProps {
  score: number; // 0 - 100
  verdict: VerdictType;
  size?: number; // pixel width & height
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  verdict,
  size = 140,
  strokeWidth = 10,
  label = 'Confidence',
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    switch (verdict) {
      case 'TRUE':
        return {
          stroke: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.3)',
          text: 'text-emerald-400',
        };
      case 'FALSE':
        return {
          stroke: '#ef4444',
          glow: 'rgba(239, 68, 68, 0.3)',
          text: 'text-rose-400',
        };
      case 'MISLEADING':
        return {
          stroke: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.3)',
          text: 'text-amber-400',
        };
      case 'UNVERIFIED':
      default:
        return {
          stroke: '#94a3b8',
          glow: 'rgba(148, 163, 184, 0.2)',
          text: 'text-slate-400',
        };
    }
  };

  const colors = getColor();

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg] transition-all duration-1000 ease-out">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(30, 41, 59, 0.8)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
      {/* Centered label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showPercentage && (
          <span className={`font-mono text-2xl font-bold tracking-tight ${colors.text}`}>
            {score}%
          </span>
        )}
        {label && <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</span>}
      </div>
    </div>
  );
};
