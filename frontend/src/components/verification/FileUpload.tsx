import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  X,
  Sparkles,
  Shield,
  Eye
} from 'lucide-react';
import { Button } from '../common/Button';
import { verificationApi } from '../../api/verification.api';

interface FileUploadProps {
  onVerificationStart: (preview: string, resultId: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onVerificationStart }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'document' | 'image' | 'video' | 'audio'>('document');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [deepfakeEnabled, setDeepfakeEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      setFileType('image');
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else if (selectedFile.type.startsWith('video/')) {
      setFileType('video');
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else if (selectedFile.type.startsWith('audio/')) {
      setFileType('audio');
      setPreviewUrl(null);
    } else {
      setFileType('document');
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const result = await verificationApi.verifyFile({
        file,
        fileType,
        ocrEnabled,
        deepfakeEnabled,
      });

      onVerificationStart(file.name, result.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Drag & Drop Container */}
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
            dragOver
              ? 'border-sky-400 bg-sky-500/10'
              : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp,.mp4,.mov,.mp3,.wav"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="file-upload" className="cursor-pointer block space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <UploadCloud size={32} />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Click to upload</span>
              <span className="text-xs text-slate-400"> or drag and drop files here</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Supports PDF, DOCX, TXT, PNG, JPG, MP4, MOV, and WAV files up to 50MB
            </p>
          </label>
        </div>
      ) : (
        /* Selected File Preview Box */
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30 shrink-0">
                {fileType === 'image' && <ImageIcon size={22} />}
                {fileType === 'video' && <Video size={22} />}
                {fileType === 'audio' && <Music size={22} />}
                {fileType === 'document' && <FileText size={22} />}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Document'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Visual Preview */}
          {previewUrl && fileType === 'image' && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="max-h-64 w-full rounded-xl object-contain"
              />
            </div>
          )}
        </div>
      )}

      {/* Analysis Modality Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-sky-400" />
            <div>
              <div className="text-xs font-bold text-white">Optical Character Recognition (OCR)</div>
              <div className="text-[11px] text-slate-400">Extract & corroborate embedded text</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={ocrEnabled}
            onChange={(e) => setOcrEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-3">
            <Eye size={18} className="text-indigo-400" />
            <div>
              <div className="text-xs font-bold text-white">Deepfake Neural Forensics</div>
              <div className="text-[11px] text-slate-400">Detect synthetic diffusion & voice cloning</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={deepfakeEnabled}
            onChange={(e) => setDeepfakeEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={!file}
          loading={loading}
          icon={<Sparkles size={18} />}
        >
          Analyze & Verify Content
        </Button>
      </div>
    </form>
  );
};
