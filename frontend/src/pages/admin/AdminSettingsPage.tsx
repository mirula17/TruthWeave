import React, { useState } from 'react';
import { Sliders, AlertTriangle, Save, Check } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AdminSettingsPage: React.FC = () => {
  const [minConfidence, setMinConfidence] = useState(85);
  const [rateLimitPerMinute, setRateLimitPerMinute] = useState(60);
  const [deepfakeAnalysisEnabled, setDeepfakeAnalysisEnabled] = useState(true);
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
          <Sliders size={14} />
          <span>GLOBAL CONFIGURATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          System & Model Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure AI decision thresholds, API rate limits, and verification heuristics.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Verification Engine Thresholds */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">AI Verdict Thresholds</h3>
            <p className="text-xs text-slate-400 mt-0.5">Control sensitivity of truth and false classifications</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Minimum Statistical Confidence for Categorical Verdicts
              </label>
              <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {minConfidence}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <p className="text-[11px] text-slate-500">
              Verifications scoring below {minConfidence}% will automatically receive an "UNVERIFIED" or "MISLEADING" tag.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div>
                <div className="text-xs font-bold text-white">Deepfake Neural Forensics</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Frame-by-frame ELA and audio sync</div>
              </div>
              <input
                type="checkbox"
                checked={deepfakeAnalysisEnabled}
                onChange={(e) => setDeepfakeAnalysisEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div>
                <div className="text-xs font-bold text-white">OCR Ingestion Pipeline</div>
                <div className="text-[10px] text-slate-500 mt-0.5">PyTesseract document parsing</div>
              </div>
              <input
                type="checkbox"
                checked={ocrEnabled}
                onChange={(e) => setOcrEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Rate Limiting & Safety */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">API Rate Limiting & Safety</h3>
            <p className="text-xs text-slate-400 mt-0.5">Prevent Denial of Service attacks and abusive querying</p>
          </div>

          <div className="space-y-1.5 max-w-sm">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Maximum Invocations Per Minute (Per IP)
            </label>
            <input
              type="number"
              value={rateLimitPerMinute}
              onChange={(e) => setRateLimitPerMinute(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-950/10 p-4">
            <div>
              <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle size={14} />
                <span>Maintenance Mode</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Temporarily pause user verifications during infrastructure upgrades
              </div>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-rose-500 focus:ring-rose-500"
            />
          </div>
        </div>

        {savedSuccess && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 flex items-center gap-2">
            <Check size={15} />
            <span>Global platform settings saved successfully.</span>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" size="lg" icon={<Save size={16} />}>
            Save System Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
