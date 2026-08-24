import React from 'react';
import {
  BarChart3,
  Activity,
  Zap,
  Users,
  DollarSign
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { StatCard } from '../../components/dashboard/StatCard';
import { ADMIN_ANALYTICS_DATA } from '../../mocks/analytics';

export const AdminAnalyticsPage: React.FC = () => {
  const userGrowth = ADMIN_ANALYTICS_DATA.userGrowth;
  const throughput = ADMIN_ANALYTICS_DATA.apiThroughput;
  const aiUsage = ADMIN_ANALYTICS_DATA.aiTokenUsage;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
          <BarChart3 size={14} />
          <span>ENTERPRISE METRICS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Platform Growth & API Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor global API request throughput, user growth cohorts, and AI model token consumption.
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Active Users"
          value="934"
          change="+14% growth"
          changeType="positive"
          icon={<Users size={20} className="text-indigo-400" />}
          glow="indigo"
        />
        <StatCard
          title="Avg API Response"
          value="182 ms"
          change="99.9% < 500ms"
          changeType="positive"
          icon={<Activity size={20} className="text-sky-400" />}
          glow="cyan"
        />
        <StatCard
          title="Monthly AI Tokens"
          value="23.1M"
          change="Gemini 1.5 Pro"
          changeType="neutral"
          icon={<Zap size={20} className="text-purple-400" />}
          glow="indigo"
        />
        <StatCard
          title="Est. Monthly Compute"
          value="$46.20"
          change="Budget: $200"
          changeType="positive"
          icon={<DollarSign size={20} className="text-emerald-400" />}
          glow="emerald"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Line Chart */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white tracking-tight">User Registrations & Active Users</h3>
            <p className="text-xs text-slate-400">Monthly growth trajectory</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
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
                <Line type="monotone" dataKey="users" name="Total Users" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="active" name="Active Users" stroke="#00b8ff" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Throughput Area Chart */}
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="pb-3 border-b border-slate-800/80">
            <h3 className="text-base font-bold text-white tracking-tight">24h API Request Volume</h3>
            <p className="text-xs text-slate-400">Requests per hour through FastAPI gateway</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughput} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} />
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
                <Area type="monotone" dataKey="requests" name="API Requests" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Model Token Consumption Table */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          AI Model Token Consumption & Allocation
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">AI Engine / Ingestion Service</th>
                <th className="py-3 px-4">Token / Query Volume</th>
                <th className="py-3 px-4">Est. Cost</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {aiUsage.map((m) => (
                <tr key={m.model} className="hover:bg-slate-800/30">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <Zap size={14} className="text-indigo-400" />
                    <span>{m.model}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {m.tokensK ? `${(m.tokensK / 1000).toFixed(1)}M Tokens` : `${m.queries?.toLocaleString()} Searches`}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {m.cost}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-500/20">
                      Optimized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
