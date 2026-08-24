import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConfidenceBarProps {
  data: { range: string; count: number }[];
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="range" stroke="#64748b" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0b1120',
              borderColor: '#1e293b',
              borderRadius: '1rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" name="Evaluations" fill="#00b8ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
