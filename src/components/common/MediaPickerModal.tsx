import React, { useState } from 'react';
import { X, Search, Image as ImageIcon, Video, FileText, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  filterType?: 'all' | 'image' | 'video' | 'pdf';
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  filterType = 'all',
  title = 'Select Media Asset',
}) => {
  const { media, addMedia } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video' | 'pdf'>(filterType);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = media.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedType === 'image') return matchesSearch && (!item.type || item.type.includes('image'));
    if (selectedType === 'video') return matchesSearch && (item.type?.includes('video') || item.url.endsWith('.mp4'));
    if (selectedType === 'pdf') return matchesSearch && (item.type?.includes('pdf') || item.url.endsWith('.pdf'));
    return matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds the 10MB limit. Please upload a smaller file.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const typeStr = file.type || (file.name.endsWith('.mp4') ? 'video/mp4' : file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');
      addMedia({
        title: file.name,
        url: result,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: typeStr,
        usedIn: ['Custom Upload'],
      });
      onSelect(result);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
              <span>{title}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose from existing uploaded assets or upload a new file up to 10MB.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Upload Toolbar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets by name..."
              className="bg-transparent border-0 text-slate-200 placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
              {(['all', 'image', 'video', 'pdf'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition ${
                    selectedType === t
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold hover:scale-105 active:scale-95 transition shadow-md shadow-blue-500/20">
              <Upload className="w-4 h-4" />
              <span>Upload New</span>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="px-6 py-2.5 bg-rose-950/80 border-b border-rose-800 text-rose-300 text-xs">
            {uploadError}
          </div>
        )}

        {/* Asset Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isVideo = item.type?.includes('video') || item.url.endsWith('.mp4');
            const isPdf = item.type?.includes('pdf') || item.url.endsWith('.pdf');

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item.url);
                  onClose();
                }}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 bg-slate-950 cursor-pointer p-2 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-full h-32 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center relative">
                  {isVideo ? (
                    <div className="flex flex-col items-center gap-1 text-cyan-400">
                      <Video className="w-8 h-8" />
                      <span className="text-[10px] uppercase font-mono">Video Asset</span>
                    </div>
                  ) : isPdf ? (
                    <div className="flex flex-col items-center gap-1 text-amber-400">
                      <FileText className="w-8 h-8" />
                      <span className="text-[10px] uppercase font-mono">PDF Document</span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold shadow-md">
                      Choose
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="text-xs font-bold text-slate-200 truncate group-hover:text-cyan-300">
                    {item.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{item.size}</span>
                    {item.usedIn && item.usedIn.length > 0 && (
                      <span className="text-cyan-400 truncate max-w-[100px]">
                        Used: {item.usedIn[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            No assets match the current filter or search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

