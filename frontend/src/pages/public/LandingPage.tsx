import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  Search,
  Globe,
  FileCheck2,
  Play,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { VerdictBadge } from '../../components/common/Badge';
import { CircularScore } from '../../components/common/CircularScore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10">
              <ShieldCheck size={24} className="text-sky-400" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                TruthWeave
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                AI Fact Intel
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#features" className="hover:text-sky-400 transition-colors">Modality Matrix</a>
            <a href="#architecture" className="hover:text-sky-400 transition-colors">Neural Architecture</a>
            <a href="#preview" className="hover:text-sky-400 transition-colors">Live Preview</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400 mb-8 backdrop-blur-md">
            <Sparkles size={14} className="text-sky-400 animate-pulse" />
            <span>Next-Generation Multimodal AI Information Verification</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Weave Truth.{' '}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
              Build Trust.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Verify potentially misleading statements, deepfakes, news articles, URLs, images, and documents using multi-source corroboration and transparent AI evidence synthesis.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/verify')}
              icon={<Sparkles size={18} />}
            >
              Start Free Verification
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
              icon={<Play size={16} />}
            >
              Interactive Demo
            </Button>
          </div>

          {/* Badges strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" />
              <span>Multimodal NLP + OCR</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" />
              <span>Deepfake Video Forensics</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" />
              <span>Chrome Extension In-Situ</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" />
              <span>FastAPI + PostgreSQL Ready</span>
            </span>
          </div>
        </div>
      </section>

      {/* Live Preview Sample Card */}
      <section id="preview" className="py-12 border-y border-slate-800/80 bg-slate-950/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
              REAL-TIME OUTPUT SAMPLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Transparent, Evidence-Backed Intelligence
            </h2>
          </div>

          {/* Interactive Mock Card */}
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-slate-900/80 p-6 sm:p-8 backdrop-blur-xl glow-rose shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-3 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <VerdictBadge verdict="FALSE" size="lg" />
                  <span className="text-xs font-mono text-slate-400 uppercase">Text Claim</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  "WHO and FDA officially announce a complete global ban on artificial food sweeteners starting next month."
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-sky-400">Synthesis:</strong> WHO and FDA reaffirmed safe daily intake levels. No ban was announced. Viral posts misrepresented a 2023 risk review.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shrink-0">
                <CircularScore score={96} verdict="FALSE" size={110} />
                <span className="text-[11px] text-slate-400 mt-2 font-medium">96% Statistical Confidence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Modalities Feature Grid */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
              MULTIMODAL INTELLIGENCE
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Verify Information in Any Format
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              TruthWeave handles heterogeneous data streams simultaneously to detect false context, manipulated media, and deepfakes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-sky-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <h3 className="text-base font-bold text-white mt-4">Claims & Statements</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Extract claim semantics, query indexed authoritative knowledge bases, and identify conflicting evidence.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-indigo-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Eye size={24} />
              </div>
              <h3 className="text-base font-bold text-white mt-4">Deepfake & Image Forensics</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Error level analysis (ELA), diffusion artifact detection, facial landmark jitter, and voice clone spectrogram validation.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-emerald-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-base font-bold text-white mt-4">URL & Live Web Scraping</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Real-time article parsing, domain credibility auditing, author verification, and claim extraction.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl hover:border-purple-500/40 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <FileCheck2 size={24} />
              </div>
              <h3 className="text-base font-bold text-white mt-4">Document OCR & Citations</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Ingest PDF, DOCX, and screenshots. Cross-verify academic papers, citations, and digital signatures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Pipeline Architecture Section */}
      <section id="architecture" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
              EVIDENCE PIPELINE
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              How TruthWeave Evaluates Information
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { num: '01', title: 'Multimodal Ingest', desc: 'Text, URLs, images, audio & video streams parsed' },
              { num: '02', title: 'Claim Extraction', desc: 'Core assertions & entities extracted via NLP' },
              { num: '03', title: 'Live Corroboration', desc: 'Real-time search across journals & federal archives' },
              { num: '04', title: 'Stance Evaluation', desc: 'Supporting & contradicting vectors classified' },
              { num: '05', title: 'Verdict Synthesis', desc: 'Confidence score & human-readable rationale generated' },
            ].map((step) => (
              <div key={step.num} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-2">
                <div className="font-mono text-xs font-bold text-sky-400">{step.num}</div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#050816] py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-sky-400" />
            <span className="font-bold text-slate-300">TruthWeave AI</span>
            <span>— Weave Truth. Build Trust.</span>
          </div>
          <div>© {new Date().getFullYear()} TruthWeave. Built with FastAPI, React & Google AI.</div>
        </div>
      </footer>
    </div>
  );
};
