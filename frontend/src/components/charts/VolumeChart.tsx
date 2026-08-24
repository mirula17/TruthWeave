import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VolumeChartProps {
  data: { date: string; verifications: number; claims?: number; media?: number }[];
}

export const VolumeChart: React.FC<VolumeChartProps> = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVerifications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00b8ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#00b8ff" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#1e293b' }}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#1e293b' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0b1120',
              borderColor: '#1e293b',
              borderRadius: '1rem',
              color: '#f8fafc',
              fontSize: '12px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
            }}
          />
          <Area
            type="monotone"
            dataKey="verifications"
            name="Total Verifications"
            stroke="#00b8ff"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorVerifications)"
          />
          {data[0]?.media !== undefined && (
            <Area
              type="monotone"
              dataKey="media"
              name="Media Forensics"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMedia)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
