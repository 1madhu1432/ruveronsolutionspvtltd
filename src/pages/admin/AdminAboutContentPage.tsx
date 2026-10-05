import React, { useState } from 'react';
import { Save, CheckCircle2, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminAboutContentPage: React.FC = () => {
  const { aboutContent, updateAboutContent } = useData();
  const [formData, setFormData] = useState({ ...aboutContent });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Info className="w-6 h-6 text-cyan-400" />
            <span>About Us Content Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage company overview, mission, vision, and corporate strengths.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>About Us page content successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Hero & Overview
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Title
            </label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Company Overview Text
            </label>
            <textarea
              rows={4}
              value={formData.companyOverview}
              onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Mission & Vision Statements
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Our Mission
            </label>
            <textarea
              rows={3}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Our Vision
            </label>
            <textarea
              rows={3}
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save About Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
