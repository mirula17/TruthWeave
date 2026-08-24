import React, { useState } from 'react';
import { Globe, Sparkles, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { verificationApi } from '../../api/verification.api';

interface UrlInputProps {
  onVerificationStart: (preview: string, resultId: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onVerificationStart }) => {
  const [url, setUrl] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleUrls = [
    'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_ai_act',
    'https://www.who.int/news/item/14-07-2023-aspartame-hazard-and-risk-assessment-results-released',
    'https://www.nature.com/articles/s41550-023-01982-7',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a valid website URL to inspect.');
      return;
    }

    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com/article).');
      return;
    }

    setLoading(true);
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const result = await verificationApi.verifyUrl({
        url: fullUrl,
        context: context.trim() || undefined,
      });

      onVerificationStart(fullUrl, result.id);
    } catch (err: any) {
      setError(err?.message || 'Failed to scrape and verify URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Webpage or Article URL
        </label>
        <div className="relative">
          <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
          <input
            type="text"
            required
            placeholder="https://news-outlet.com/article/headline-breaking-news"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50 transition-all font-mono"
          />
        </div>
      </div>

      {/* Optional Context Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Specific Claim or Question on Page (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g., Does this article accurately represent the European AI Act provisions?"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
        />
      </div>

      {/* Sample URL Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Try a Sample URL
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleUrls.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setUrl(sample)}
              className="rounded-xl border border-slate-800/80 bg-slate-950/40 px-3 py-1.5 text-[11px] text-slate-300 hover:border-sky-500/40 hover:text-sky-300 transition-colors font-mono truncate max-w-xs sm:max-w-md"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Live Scraping Engine Features */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2 text-xs text-slate-400">
        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Shield size={14} className="text-sky-400" />
          <span>Real-time Ingest Capabilities</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Domain credibility & WHOIS reputation check</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Automated article content & schema extraction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Author verification & publication track record</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Cross-verification against official press registries</span>
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          loading={loading}
          disabled={!url.trim()}
          icon={<Sparkles size={18} />}
        >
          Scrape & Verify Webpage
        </Button>
      </div>
    </form>
  );
};
