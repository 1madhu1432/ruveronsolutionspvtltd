import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  CheckCircle2,
  Video,
  FileText,
  Eye,
  X,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { MediaItem } from '../../types';

export const AdminMediaPage: React.FC = () => {
  const { media, addMedia, deleteMedia } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'pdf'>('all');

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Homepage');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Preview Modal
  const [previewAsset, setPreviewAsset] = useState<MediaItem | null>(null);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadUrl) return;

    const isVideo = uploadUrl.endsWith('.mp4') || uploadUrl.includes('youtube') || uploadUrl.includes('vimeo');
    const isPdf = uploadUrl.endsWith('.pdf');

    addMedia({
      title: uploadTitle,
      url: uploadUrl,
      size: '1.8 MB',
      type: isVideo ? 'video/mp4' : isPdf ? 'application/pdf' : 'image/jpeg',
      usedIn: [uploadCategory],
    });

    setUploadTitle('');
    setUploadUrl('');
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`File "${file.name}" exceeds the 10 MB maximum upload limit (${(file.size / 1024 / 1024).toFixed(2)} MB). Please select a file under 10MB.`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      addMedia({
        title: file.name,
        url: reader.result as string,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type || (file.name.endsWith('.mp4') ? 'video/mp4' : 'image/png'),
        usedIn: [uploadCategory],
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleCopyLink = (m: MediaItem) => {
    navigator.clipboard.writeText(m.url);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Delete all unused assets
  const handleDeleteUnused = () => {
    const unused = media.filter((m) => !m.usedIn || m.usedIn.length === 0);
    if (unused.length === 0) {
      alert('All media assets are currently mapped to website sections. None are unused.');
      return;
    }
    if (confirm(`Found ${unused.length} unused asset(s). Are you sure you want to permanently delete them?`)) {
      unused.forEach((item) => deleteMedia(item.id));
    }
  };

  const filteredMedia = media.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.usedIn && m.usedIn.some((u) => u.toLowerCase().includes(searchTerm.toLowerCase())));

    let matchesType = true;
    if (typeFilter === 'image') matchesType = m.type.startsWith('image/');
    else if (typeFilter === 'video') matchesType = m.type.startsWith('video/') || m.url.includes('youtube') || m.url.includes('vimeo');
    else if (typeFilter === 'pdf') matchesType = m.type.includes('pdf') || m.url.endsWith('.pdf');

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <ImageIcon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Media Library & Asset Gallery</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {media.length} Assets
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload images, corporate videos, brochures, preview assets, view module usage tags, and clean up unused media.
          </p>
        </div>

        <button
          onClick={handleDeleteUnused}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-rose-300 border border-slate-700 hover:border-rose-800 text-xs font-bold transition flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Unused Assets</span>
        </button>
      </div>

      {added && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>Media asset successfully uploaded and registered in storage!</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2 font-outfit flex items-center justify-between">
          <span>Upload & Register New Asset</span>
          <span className="text-[11px] font-mono text-cyan-400">Max file size: 10 MB</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-2xl p-6 text-center space-y-3 bg-slate-900/40 transition">
            <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
            <div>
              <label className="cursor-pointer text-xs font-bold text-cyan-400 hover:text-white uppercase tracking-wider block">
                Click to Browse from Device
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp,video/mp4,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports PNG, JPG, SVG, WebP, MP4, PDF up to 10 MB
              </p>
            </div>
            <div className="text-[10px] text-slate-500">
              Files are encoded and stored in local application storage.
            </div>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Asset Title / Name *</label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. Healthcare Staffing Banner"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Media Web URL / Video Link *</label>
              <input
                type="url"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or MP4 link"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Section / Module</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
              >
                <option value="Homepage">Homepage</option>
                <option value="Solutions">Solutions</option>
                <option value="Services">Services</option>
                <option value="Testimonials">Testimonials</option>
                <option value="Team">Team</option>
                <option value="Clients">Clients</option>
                <option value="Partners">Partners</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold hover:opacity-95 transition"
            >
              Add via Web URL
            </button>
          </form>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-base font-outfit">Asset Gallery</h3>
            <span className="text-xs text-slate-400 font-mono">({filteredMedia.length} matching)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {(['all', 'image', 'video', 'pdf'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1 rounded-lg capitalize font-semibold transition ${
                    typeFilter === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'All Assets' : t === 'pdf' ? 'PDFs' : `${t}s`}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or section..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <ImageIcon className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm">No media assets found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMedia.map((m) => {
              const isVid = m.type.startsWith('video/') || m.url.includes('youtube');
              const isPdf = m.type.includes('pdf') || m.url.endsWith('.pdf');

              return (
                <div
                  key={m.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800/90 overflow-hidden group hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-950 overflow-hidden flex items-center justify-center">
                    {isVid ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-cyan-950/20 text-cyan-400 p-4 text-center">
                        <Video className="w-10 h-10 mb-2" />
                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold">Video Asset</span>
                      </div>
                    ) : isPdf ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-amber-950/20 text-amber-400 p-4 text-center">
                        <FileText className="w-10 h-10 mb-2" />
                        <span className="text-[11px] font-mono uppercase tracking-wider font-bold">PDF Document</span>
                      </div>
                    ) : (
                      <img
                        src={m.url}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=500&q=80';
                        }}
                      />
                    )}

                    <button
                      onClick={() => setPreviewAsset(m)}
                      className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-bold"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview Media</span>
                    </button>
                  </div>

                  <div className="p-3.5 space-y-2.5">
                    <div>
                      <div className="text-xs font-bold text-white truncate" title={m.title}>
                        {m.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {m.size} • {m.createdAt}
                      </div>
                    </div>

                    {/* Section Badges */}
                    <div className="flex flex-wrap gap-1">
                      {m.usedIn && m.usedIn.length > 0 ? (
                        m.usedIn.map((sec, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium"
                          >
                            {sec}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 italic">
                          Unassigned
                        </span>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleCopyLink(m)}
                        className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
                        title="Copy Asset URL"
                      >
                        {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === m.id ? 'Copied' : 'Copy Link'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete asset "${m.title}"?`)) {
                            deleteMedia(m.id);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white">{previewAsset.title}</h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {previewAsset.type} • {previewAsset.size}
                </span>
              </div>
              <button
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
              {previewAsset.type.startsWith('video/') ? (
                <video src={previewAsset.url} controls className="max-h-[55vh] w-full rounded-lg" />
              ) : previewAsset.type.includes('pdf') ? (
                <div className="p-12 text-center space-y-3">
                  <FileText className="w-16 h-16 text-amber-400 mx-auto" />
                  <p className="text-sm font-semibold">{previewAsset.title}</p>
                  <a
                    href={previewAsset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold inline-block"
                  >
                    Open PDF Document
                  </a>
                </div>
              ) : (
                <img
                  src={previewAsset.url}
                  alt={previewAsset.title}
                  className="max-h-[55vh] object-contain rounded-lg"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                Used in:{' '}
                <strong className="text-cyan-400">
                  {previewAsset.usedIn?.join(', ') || 'None'}
                </strong>
              </div>
              <button
                onClick={() => handleCopyLink(previewAsset)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
