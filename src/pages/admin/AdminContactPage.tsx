import React, { useState } from 'react';
import { Phone, Save, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminContactPage: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useData();
  const [formData, setFormData] = useState({ ...companyInfo });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Phone className="w-6 h-6 text-cyan-400" />
            <span>Contact Information Controls</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update company contact details, address lines, phone numbers, and maps embed.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Contact info updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
            Company Contact Data
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Address String</label>
            <textarea
              rows={3}
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Google Maps Iframe Embed URL</label>
            <input
              type="text"
              value={formData.mapsIframeUrl}
              onChange={(e) => setFormData({ ...formData, mapsIframeUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono text-[11px]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info</span>
          </button>
        </div>
      </form>
    </div>
  );
};
