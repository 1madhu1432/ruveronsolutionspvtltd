import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, Link as LinkIcon, AlertCircle, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { MediaPickerModal } from '../common/MediaPickerModal';

interface PhotoUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  helpText?: string;
  aspect?: 'avatar' | 'square' | 'banner' | 'video';
  maxSizeMB?: number; // default 10MB
  allowVideo?: boolean;
  allowPdf?: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Media',
  required = false,
  helpText = 'PNG, JPG, JPEG, SVG, WebP up to 10MB (stored securely)',
  aspect = 'square',
  maxSizeMB = 10,
  allowVideo = true,
  allowPdf = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
  if (allowVideo) allowedFormats.push('video/mp4', 'video/webm', 'video/quicktime');
  if (allowPdf) allowedFormats.push('application/pdf');

  const processFile = (file: File) => {
    setError(null);

    // Validate format
    const isImage = file.type.startsWith('image/');
    const isVideo = allowVideo && (file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm'));
    const isPdf = allowPdf && (file.type === 'application/pdf' || file.name.endsWith('.pdf'));

    if (!isImage && !isVideo && !isPdf) {
      setError('Invalid format! Allowed formats: PNG, JPG, JPEG, SVG, WebP' + (allowVideo ? ', MP4/WebM' : '') + (allowPdf ? ', PDF' : '') + '.');
      return;
    }

    // Validate 10MB maximum size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB! Current size is ${(file.size / 1024 / 1024).toFixed(2)}MB. Please select a smaller file.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.onerror = () => {
      setError('Failed to read media file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
    setUrlMode(false);
  };

  const handleClear = () => {
    onChange('');
    setError(null);
  };

  const isVideoUrl = value?.includes('video') || value?.endsWith('.mp4') || value?.startsWith('data:video');
  const isPdfUrl = value?.includes('pdf') || value?.endsWith('.pdf') || value?.startsWith('data:application/pdf');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMediaPickerOpen(true)}
            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3" />
            <span>Asset Gallery</span>
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={() => {
              setUrlMode(!urlMode);
              setError(null);
            }}
            className="text-[11px] font-semibold text-slate-400 hover:text-white transition flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{urlMode ? 'Upload Mode' : 'Link URL'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {urlMode ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste media URL (e.g. https://... or mp4 video link)"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
            >
              Apply
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Paste any direct link to an image or video asset.
          </p>
        </div>
      ) : value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center p-3">
          {isVideoUrl ? (
            <div className="w-full h-44 rounded-xl bg-slate-950 flex flex-col items-center justify-center gap-2 text-cyan-400">
              <Video className="w-10 h-10" />
              <span className="text-xs font-semibold text-slate-200">Video Asset Uploaded</span>
              <a href={value} target="_blank" rel="noreferrer" className="text-[10px] text-cyan-400 underline">
                Preview Video
              </a>
            </div>
          ) : isPdfUrl ? (
            <div className="w-full h-36 rounded-xl bg-slate-950 flex flex-col items-center justify-center gap-2 text-amber-400">
              <FileText className="w-10 h-10" />
              <span className="text-xs font-semibold text-slate-200">PDF Document Uploaded</span>
              <span className="text-[10px] text-slate-400">Document ready</span>
            </div>
          ) : (
            <div
              className={`w-full overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center ${aspect === 'avatar'
                  ? 'h-28 w-28 rounded-full mx-auto'
                  : aspect === 'banner'
                    ? 'h-40'
                    : 'h-44'
                }`}
            >
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          )}

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition shadow-lg"
              title="Replace Media"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMediaPickerOpen(true)}
              className="p-2.5 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition shadow-lg"
              title="Choose from Asset Gallery"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2.5 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition shadow-lg"
              title="Remove Media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${isDragging
              ? 'border-cyan-400 bg-cyan-950/20'
              : 'border-slate-800 hover:border-cyan-500 bg-slate-900/60'
            }`}
        >
          <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
          <div className="text-xs font-semibold text-slate-200">
            Click to upload or drag & drop file
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{helpText}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={allowedFormats.join(',')}
        onChange={handleFileChange}
        className="hidden"
      />

      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => onChange(url)}
        filterType={allowVideo ? 'all' : 'image'}
      />
    </div>
  );
};
