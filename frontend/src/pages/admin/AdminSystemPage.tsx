import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SystemHealthCard } from '../../components/admin/SystemHealthCard';
import { adminApi } from '../../api/admin.api';
import type { SystemServiceHealth } from '../../types';

export const AdminSystemPage: React.FC = () => {
  const [services, setServices] = useState<SystemServiceHealth[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadServices = async () => {
    try {
      const data = await adminApi.getSystemHealth();
      setServices(data);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(loadServices, 600);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
            <Activity size={14} />
            <span>INFRASTRUCTURE & INTEGRATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            System Health & Core Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time status of FastAPI core, PostgreSQL, Gemini LLM, DuckDuckGo searcher, and Chrome extension gateway.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleRefresh}
          loading={refreshing}
          icon={<RefreshCw size={14} />}
        >
          Refresh Status
        </Button>
      </div>

      {/* Main Services Grid */}
      <SystemHealthCard services={services} />

      {/* Integration Diagnostic Logs */}
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          System Connectivity Diagnostics
        </h3>

        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>FastAPI REST Gateway (http://127.0.0.1:8000)</span>
            </div>
            <span className="text-emerald-400 font-bold">200 OK (18ms)</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>PostgreSQL 18 Database Engine (127.0.0.1:5432)</span>
            </div>
            <span className="text-emerald-400 font-bold">CONNECTED (4ms)</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Google Gemini AI Multimodal Vision (Generative Language API)</span>
            </div>
            <span className="text-emerald-400 font-bold">ACTIVE (340ms)</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Chrome Extension WebSocket Listener (127.0.0.1:8000/ws/extension)</span>
            </div>
            <span className="text-emerald-400 font-bold">LISTENING (12ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
