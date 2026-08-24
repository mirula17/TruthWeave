import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { documentsApi } from '../../api/documents.api';
import type { DocumentItem } from '../../types';

export const FilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = async () => {
    try {
      const data = await documentsApi.getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    await documentsApi.deleteDocument(id);
    loadDocuments();
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      await documentsApi.uploadDocument(selectedFile);
      setUploadModalOpen(false);
      setSelectedFile(null);
      loadDocuments();
    } finally {
      setUploading(false);
    }
  };

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryIcon = (cat: DocumentItem['category']) => {
    switch (cat) {
      case 'image':
        return <ImageIcon size={18} className="text-sky-400" />;
      case 'video':
        return <Video size={18} className="text-indigo-400" />;
      case 'audio':
        return <Music size={18} className="text-emerald-400" />;
      case 'document':
      default:
        return <FileText size={18} className="text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Media & Documents Ingest
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your uploaded evidentiary files, transcripts, images, and video captures.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          onClick={() => setUploadModalOpen(true)}
          icon={<Plus size={16} />}
        >
          Upload New File
        </Button>
      </div>

      {/* Search and stats */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 backdrop-blur-xl">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search files by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
          <span>Total Files: <strong className="text-white font-mono">{documents.length}</strong></span>
          <span>Verified: <strong className="text-emerald-400 font-mono">{documents.filter((d) => d.status === 'verified').length}</strong></span>
        </div>
      </div>

      {/* Files Grid / Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading files repository...</div>
      ) : filteredDocs.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
            <FolderOpen size={24} />
          </div>
          <h3 className="text-base font-bold text-white">No files found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload your first document or screenshot to start analyzing.
          </p>
          <Button variant="primary" size="sm" onClick={() => setUploadModalOpen(true)}>
            Upload File
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 hover:border-sky-500/40 hover:bg-slate-900/80 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-sky-300 transition-colors">
                        {doc.name}
                      </h4>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {doc.sizeFormatted} • {doc.type}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      doc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {doc.status === 'verified' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    <span className="uppercase">{doc.status}</span>
                  </span>
                </div>

                {doc.previewUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-1">
                    <img
                      src={doc.previewUrl}
                      alt={doc.name}
                      className="h-28 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                <span className="text-[10px] text-slate-500">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {doc.verificationId && (
                    <button
                      onClick={() => navigate(`/results/${doc.verificationId}`)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 hover:underline"
                    >
                      <Sparkles size={12} />
                      <span>Report</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete File"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Document or Media File"
        subtitle="Ingest files for text extraction and forensic analysis"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/40 p-6 text-center">
            <input
              type="file"
              id="modal-file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="modal-file" className="cursor-pointer">
              <UploadCloud size={32} className="mx-auto text-sky-400 mb-2" />
              <div className="text-xs font-bold text-white">
                {selectedFile ? selectedFile.name : 'Click to select file'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                PDF, DOCX, TXT, PNG, JPG, WEBP, MP4 (Max 50MB)
              </div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              size="sm"
              disabled={!selectedFile}
              loading={uploading}
              onClick={handleUploadSubmit}
            >
              Upload & Ingest
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
