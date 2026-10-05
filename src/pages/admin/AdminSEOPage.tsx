import React, { useState } from 'react';
import { Search, Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { SEOSettings, SEOPageData } from '../../types';

export const AdminSEOPage: React.FC = () => {
  const { seoSettings, updateSEOPage } = useData();
  const [activeTab, setActiveTab] = useState<keyof SEOSettings>('home');
  const [formData, setFormData] = useState<SEOPageData>({ ...seoSettings[activeTab] });
  const [saved, setSaved] = useState(false);

  const handleTabChange = (pageKey: keyof SEOSettings) => {
    setActiveTab(pageKey);
    setFormData({ ...seoSettings[pageKey] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOPage(activeTab, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-cyan-400" />
            <span>Basic SEO & Meta Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure meta titles, descriptions, and keywords for search engine indexing.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>SEO settings updated for {activeTab.toUpperCase()} page!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {(['home', 'about', 'solutions', 'services', 'contact'] as (keyof SEOSettings)[]).map((p) => (
          <button
            key={p}
            onClick={() => handleTabChange(p)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              activeTab === p
                ? 'bg-ruveron-royal text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {p} Page
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Page Title Tag *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Meta Description *</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Meta Keywords (Comma separated)</label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono text-[11px]"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
