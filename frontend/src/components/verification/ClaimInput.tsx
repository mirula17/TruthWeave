import React, { useState } from 'react';
import { Sparkles, Globe, AlignLeft, Link2, Info } from 'lucide-react';
import { Button } from '../common/Button';
import { verificationApi } from '../../api/verification.api';

interface ClaimInputProps {
  onVerificationStart: (claimPreview: string, resultId: string) => void;
}

export const ClaimInput: React.FC<ClaimInputProps> = ({ onVerificationStart }) => {
  const [claim, setClaim] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [context, setContext] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const charLimit = 5000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) {
      setError('Please provide a claim statement or text to verify.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await verificationApi.verifyClaim({
        claim: claim.trim(),
        sourceUrl: sourceUrl.trim() || undefined,
        context: context.trim() || undefined,
        language,
      });

      onVerificationStart(claim.trim(), result.id);
    } catch {
      setError('Failed to initiate verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sampleClaims = [
    'WHO announces full global ban on artificial sweeteners starting next month.',
    'European Union passes mandatory AI watermarking law for all synthetic media.',
    'NASA confirms discovery of biological signatures on Saturn moon Enceladus.',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sample claims quick chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
          <Sparkles size={14} className="text-sky-400" />
          <span>Quick Example Claims:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleClaims.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setClaim(sample)}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-sky-500/40 hover:bg-slate-900 hover:text-sky-300 transition-all text-left"
            >
              "{sample.slice(0, 48)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Claim Statement / Content Body *
          </label>
          <span
            className={`font-mono text-xs ${
              claim.length > charLimit ? 'text-rose-400' : 'text-slate-500'
            }`}
          >
            {claim.length} / {charLimit} characters
          </span>
        </div>

        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 focus-within:border-sky-500/60 focus-within:ring-1 focus-within:ring-sky-500/60 transition-all">
          <textarea
            rows={5}
            placeholder="Paste a claim, news statement, WhatsApp message, or social-media post here to verify..."
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            className="w-full resize-none bg-transparent p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Optional Metadata Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Source URL */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Link2 size={13} className="text-sky-400" />
            <span>Source URL (Optional)</span>
          </label>
          <input
            type="url"
            placeholder="https://news.com/article"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
          />
        </div>

        {/* Additional Context */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <AlignLeft size={13} className="text-sky-400" />
            <span>Context / Origin (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Viral tweet, Telegram group"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-sky-500 focus:outline-none"
          />
        </div>

        {/* Language */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Globe size={13} className="text-sky-400" />
            <span>Language</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="English (US)">English (US)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info size={14} className="text-sky-400 shrink-0" />
          <span>Cross-checked across 25+ databases using Gemini 1.5 Pro</span>
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          loading={loading}
          icon={<Sparkles size={18} />}
        >
          Verify Claim
        </Button>
      </div>
    </form>
  );
};
