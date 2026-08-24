import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ContentTypeBarProps {
  data: { type: string; count: number; percentage: number }[];
}

export const ContentTypeBar: React.FC<ContentTypeBarProps> = ({ data }) => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} />
          <YAxis dataKey="type" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={110} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0b1120',
              borderColor: '#1e293b',
              borderRadius: '1rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" name="Verified Items" fill="#6366f1" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
