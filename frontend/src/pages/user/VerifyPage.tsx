import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Search,
  UploadCloud,
  Globe
} from 'lucide-react';
import { ClaimInput } from '../../components/verification/ClaimInput';
import { FileUpload } from '../../components/verification/FileUpload';
import { UrlInput } from '../../components/verification/UrlInput';
import { VerificationProgressModal } from '../../components/verification/VerificationProgressModal';

type TabType = 'claim' | 'upload' | 'url';

export const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (): TabType => {
    if (location.pathname.includes('/upload')) return 'upload';
    if (location.pathname.includes('/url')) return 'url';
    return 'claim';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getTabFromPath());
  const [progressOpen, setProgressOpen] = useState(false);
  const [pendingResultId, setPendingResultId] = useState('ver-8941');
  const [claimPreviewText, setClaimPreviewText] = useState('');

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'claim') navigate('/verify/claim');
    else if (tab === 'upload') navigate('/verify/upload');
    else if (tab === 'url') navigate('/verify/url');
  };

  const handleVerificationStart = (preview: string, resultId: string) => {
    setClaimPreviewText(preview);
    setPendingResultId(resultId);
    setProgressOpen(true);
  };

  const handleVerificationComplete = (resultId: string) => {
    setProgressOpen(false);
    navigate(`/results/${resultId}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
          <Sparkles size={14} />
          <span>MULTI-MODAL VERIFICATION WORKSPACE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Verify Anything
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Check statements, documents, images, video clips, and live web pages with TruthWeave's deep reasoning and multi-source corroboration engine.
        </p>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex rounded-2xl border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => handleTabChange('claim')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'claim'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search size={16} />
          <span>Statement / Claim</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('upload')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'upload'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UploadCloud size={16} />
          <span>File & Media Upload</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('url')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'url'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe size={16} />
          <span>Webpage URL</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-sky-500/5">
        {activeTab === 'claim' && (
          <ClaimInput onVerificationStart={handleVerificationStart} />
        )}
        {activeTab === 'upload' && (
          <FileUpload onVerificationStart={handleVerificationStart} />
        )}
        {activeTab === 'url' && (
          <UrlInput onVerificationStart={handleVerificationStart} />
        )}
      </div>

      {/* Pipeline Progress Modal */}
      <VerificationProgressModal
        isOpen={progressOpen}
        claimPreview={claimPreviewText}
        targetResultId={pendingResultId}
        onComplete={handleVerificationComplete}
      />
    </div>
  );
};
