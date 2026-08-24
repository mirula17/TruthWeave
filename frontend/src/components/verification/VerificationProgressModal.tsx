import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Database, Search, Cpu } from 'lucide-react';

interface VerificationProgressModalProps {
  isOpen: boolean;
  onComplete: (resultId: string) => void;
  targetResultId?: string;
  claimPreview?: string;
}

export const VerificationProgressModal: React.FC<VerificationProgressModalProps> = ({
  isOpen,
  onComplete,
  targetResultId = 'ver-8941',
  claimPreview = 'Analyzing input claim...',
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Content Ingestion & Tokenization', icon: Cpu, desc: 'Parsing semantics, syntax & entities' },
    { label: 'Claim & Entity Extraction', icon: Sparkles, desc: 'Identifying factual claims and target dates' },
    { label: 'Querying Authoritative Registries', icon: Database, desc: 'Searching WHO, FDA, EUR-Lex, AP, and Reuters' },
    { label: 'Multimodal Neural Forensics', icon: Search, desc: 'Comparing spectral, ELA, and cross-source vectors' },
    { label: 'Synthesizing Verdict & Confidence Report', icon: CheckCircle2, desc: 'Finalizing evidence weights' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const timer1 = setTimeout(() => setCurrentStep(1), 600);
    const timer2 = setTimeout(() => setCurrentStep(2), 1300);
    const timer3 = setTimeout(() => setCurrentStep(3), 2000);
    const timer4 = setTimeout(() => setCurrentStep(4), 2700);
    const timer5 = setTimeout(() => {
      onComplete(targetResultId);
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isOpen, onComplete, targetResultId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in" />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-sky-500/30 bg-[#070b19] p-6 sm:p-8 shadow-2xl shadow-sky-500/20">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              TruthWeave AI Engine
            </h3>
            <p className="text-xs text-sky-400 font-mono">
              Running multi-stage verification pipeline
            </p>
          </div>
        </div>

        {/* Claim snippet */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 mb-6 text-xs text-slate-300 italic line-clamp-2">
          "{claimPreview}"
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Pipeline steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.label}
                className={`flex items-center gap-3.5 rounded-xl border p-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-sky-500/40 bg-sky-500/10 shadow-sm shadow-sky-500/10'
                    : isCompleted
                    ? 'border-slate-800/80 bg-slate-900/40 opacity-75'
                    : 'border-slate-800/40 bg-slate-950/40 opacity-40'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border shrink-0 ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : isCurrent
                      ? 'border-sky-500/40 bg-sky-500/20 text-sky-400 animate-pulse'
                      : 'border-slate-800 bg-slate-900 text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : isCurrent ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Icon size={16} />
                  )}
                </div>

                <div className="overflow-hidden">
                  <div
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-sky-300' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500">
          Cross-verifying with Google Gemini & DuckDuckGo Index
        </div>
      </div>
    </div>
  );
};
