import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, Link as LinkIcon, Check, AlertCircle } from 'lucide-react';

interface PhotoUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  helpText?: string;
  aspect?: 'avatar' | 'square' | 'banner';
  maxSizeMB?: number;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Photo',
  required = false,
  helpText = 'PNG, JPG, WEBP or SVG up to 5MB (stored securely)',
  aspect = 'square',
  maxSizeMB = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB. Please choose a smaller image.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // reset input so same file can be re-selected if removed
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

  return (
    <div className="space-y-2">
      {/* Label and toggle */}
      <div className="flex items-center justify-between text-xs">
        <label className="text-slate-300 font-semibold flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-cyan-400" />
          <span>{label}</span>
          {required && <span className="text-rose-400">*</span>}
        </label>

        <button
          type="button"
          onClick={() => {
            setUrlMode(!urlMode);
            setError(null);
          }}
          className="text-[11px] text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{urlMode ? 'Upload from Computer' : 'Or paste URL'}</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Present: Live Preview & Action Bar */}
      {value ? (
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`shrink-0 bg-slate-900 border border-slate-700/80 overflow-hidden flex items-center justify-center ${
                aspect === 'avatar'
                  ? 'w-14 h-14 rounded-full'
                  : aspect === 'banner'
                  ? 'w-24 h-14 rounded-xl'
                  : 'w-14 h-14 rounded-xl'
              }`}
            >
              <img
                src={value}
                alt="Selected asset"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                }}
              />
            </div>

            <div className="min-w-0">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Photo Ready</span>
              </span>
              <p className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5 font-mono">
                {value.startsWith('data:') ? 'Local file uploaded (Base64)' : value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition border border-slate-700"
              title="Upload a different photo"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition border border-slate-800 hover:border-rose-800"
              title="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : urlMode ? (
        /* Paste URL Mode */
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              disabled={!urlInput.trim()}
              className="px-3.5 py-2 rounded-xl bg-ruveron-royal hover:bg-ruveron-blue text-white text-xs font-bold transition disabled:opacity-50 shrink-0"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            Enter a valid direct image URL or click &quot;Upload from Computer&quot; above.
          </p>
        </div>
      ) : (
        /* Dropzone / Upload Box */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 group ${
            isDragging
              ? 'border-cyan-400 bg-cyan-950/20'
              : 'border-slate-800 hover:border-cyan-500/80 bg-slate-950/60 hover:bg-slate-950'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                <span className="text-cyan-400 group-hover:underline">Click to browse photo</span> or drag & drop here
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{helpText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-[11px] text-rose-400 bg-rose-950/60 border border-rose-900 p-2 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
