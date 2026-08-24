import React, { useState, useEffect } from 'react';
import { useAuth, API_URL } from '../hooks/useAuth';
import axios from 'axios';
import { ShieldCheck, LogOut, BookOpen, User as UserIcon } from 'lucide-react';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  ip_address: string | null;
  details: string | null;
  timestamp: string;
}

export const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logError, setLogError] = useState('');

  useEffect(() => {
    if (user?.role === 'ADMIN' && token) {
      const fetchLogs = async () => {
        setLoadingLogs(true);
        try {
          const res = await axios.get(`${API_URL}/admin/audit-logs`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setLogs(res.data);
        } catch (err: any) {
          setLogError('Failed to load audit logs.');
        } finally {
          setLoadingLogs(false);
        }
      };
      fetchLogs();
    }
  }, [user, token]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/40 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              TruthWeave Control
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <UserIcon size={16} className="text-sky-400" />
              <span>{user?.email}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                user?.role === 'ADMIN' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
              }`}>
                {user?.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Grid content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Main welcome / overview */}
          <div className="col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white mb-2">Workspace Overview</h2>
              <p className="text-slate-400 leading-relaxed">
                TruthWeave gathers real-time content verification data from your active Chrome Extension sessions. Right-click suspicious claims, texts, or images on the web to trigger deep analysis using Natural Language Processing, DuckDuckGo Search, and Google Gemini AI.
              </p>
            </div>

            {/* Admin Audit Logs section */}
            {user?.role === 'ADMIN' && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen size={20} className="text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">System Audit Logs</h3>
                  </div>
                  <span className="text-xs text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 rounded-full px-2.5 py-0.5">
                    Admin Exclusive
                  </span>
                </div>

                {loadingLogs ? (
                  <div className="py-6 text-center text-slate-500">Loading audit trail...</div>
                ) : logError ? (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">{logError}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="border-b border-slate-800 text-xs uppercase text-slate-400">
                        <tr>
                          <th className="py-3 px-4">Action</th>
                          <th className="py-3 px-4">Details</th>
                          <th className="py-3 px-4">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {logs.slice(0, 10).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-900/30">
                            <td className="py-3 px-4 font-semibold text-sky-400">{log.action}</td>
                            <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{log.details || 'N/A'}</td>
                            <td className="py-3 px-4 text-slate-500 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar controls */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-md">
              <h3 className="font-bold text-white mb-4">Verification Sources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/40 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold">Chrome Extension</span>
                  </div>
                  <span className="text-xs text-slate-500">Active Listener</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/40 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold">FastAPI API Core</span>
                  </div>
                  <span className="text-xs text-slate-500">Online</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};
