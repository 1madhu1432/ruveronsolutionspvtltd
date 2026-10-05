import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Search, Trash2, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminMediaPage: React.FC = () => {
  const { media, addMedia, deleteMedia } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [added, setAdded] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadUrl) return;

    addMedia({
      title: uploadTitle,
      url: uploadUrl,
      size: '1.5 MB',
      type: 'image/jpeg',
    });

    setUploadTitle('');
    setUploadUrl('');
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addMedia({
          title: file.name,
          url: reader.result as string,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type || 'image/png',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMedia = media.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-cyan-400" />
            <span>Media & Assets Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload, preview, and manage corporate brand banners and images.
          </p>
        </div>
      </div>

      {added && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>New media asset successfully registered in browser storage!</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
          Add New Media Asset
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center space-y-3 hover:border-cyan-500 transition">
            <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
            <div>
              <label className="cursor-pointer text-xs font-bold text-cyan-400 hover:text-white uppercase tracking-wider">
                Click to Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-500 mt-1">
                Supports PNG, JPG, SVG up to 5MB (Saved locally in base64)
              </p>
            </div>
          </div>

          {/* URL Input */}
          <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Asset Name</label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. Ruveron Office Banner"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Image URL</label>
              <input
                type="url"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-ruveron-royal text-white font-semibold hover:bg-ruveron-blue"
            >
              Add via Image URL
            </button>
          </form>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Asset Gallery</h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search images..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((m) => (
            <div key={m.id} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden group">
              <div className="h-40 bg-slate-950 relative overflow-hidden">
                <img
                  src={m.url}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white truncate max-w-[180px]">{m.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{m.size} • {m.createdAt}</div>
                </div>
                <button
                  onClick={() => deleteMedia(m.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
