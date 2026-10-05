import React, { useState } from 'react';
import { Save, CheckCircle2, Home as HomeIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminHomeContentPage: React.FC = () => {
  const { homeContent, updateHomeContent } = useData();
  const [formData, setFormData] = useState({ ...homeContent });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HomeIcon className="w-6 h-6 text-cyan-400" />
            <span>Home Page Content CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public homepage hero text, who we are description, mission, and CTA text.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Home page content successfully saved to browser storage!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Hero Section Controls
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Main Hero Heading
            </label>
            <input
              type="text"
              value={formData.heroHeading}
              onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Supporting Subtitle
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                value={formData.heroPrimaryBtnText}
                onChange={(e) => setFormData({ ...formData, heroPrimaryBtnText: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={formData.heroSecondaryBtnText}
                onChange={(e) => setFormData({ ...formData, heroSecondaryBtnText: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Company Introduction (Who We Are)
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={formData.whoWeAreTitle}
              onChange={(e) => setFormData({ ...formData, whoWeAreTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Introduction Paragraph Content
            </label>
            <textarea
              rows={4}
              value={formData.whoWeAreContent}
              onChange={(e) => setFormData({ ...formData, whoWeAreContent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>
        </div>

        {/* Mission & Promise */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
            Mission & Promise Text
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mission Statement
            </label>
            <textarea
              rows={2}
              value={formData.missionStatement}
              onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Our Promise Quote Content
            </label>
            <textarea
              rows={3}
              value={formData.promiseContent}
              onChange={(e) => setFormData({ ...formData, promiseContent: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Home Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
