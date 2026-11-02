import React, { useState } from 'react';
import {
  Phone,
  Save,
  CheckCircle2,
  MapPin,
  Eye,
  EyeOff,
  Layers,
  Palette,
  Share2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const AdminContactPage: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useData();
  const [formData, setFormData] = useState({
    ...companyInfo,
    enableMapLocation: companyInfo.enableMapLocation !== false,
    mapHeading: companyInfo.mapHeading || 'Locate Our Vijayawada Office',
    mapSubheading:
      companyInfo.mapSubheading ||
      '61-9/1-26, 2nd Lane, Kalanagar, Near Skewbridge, Krishnalanka, Vijayawada (Urban), AP 520013',
    socialLinks: {
      youtube: companyInfo.socialLinks?.youtube || 'https://youtube.com/@ruveronsolutions',
      instagram: companyInfo.socialLinks?.instagram || 'https://instagram.com/ruveronsolutions',
      x: companyInfo.socialLinks?.x || 'https://x.com/ruveronsolutions',
      linkedin: companyInfo.socialLinks?.linkedin || 'https://linkedin.com/company/ruveron-solutions',
    },
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleToggleMap = () => {
    const updated = !formData.enableMapLocation;
    setFormData((prev) => ({ ...prev, enableMapLocation: updated }));
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <Phone className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Contact Information & Social Channels</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure corporate contact details, address strings, office map, and official social media channel links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/branding"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Change Company Logo</span>
          </Link>

          <Link
            to="/admin/locations"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Manage Operating Districts</span>
          </Link>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">Contact, Social Media & Office settings saved successfully! Changes are live on the website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* ==================================================
            SECTION 1: WEBSITE OFFICE MAP LOCATION TOGGLE
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                  <span>Website Office Map & Location Display</span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                      formData.enableMapLocation
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {formData.enableMapLocation ? 'ENABLED' : 'DISABLED'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Show or hide the interactive Google Maps embed block on the public Contact page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleMap}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer border ${
                formData.enableMapLocation
                  ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border-rose-800 shadow-md'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-800 shadow-md'
              }`}
            >
              {formData.enableMapLocation ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Disable Office Map on Website</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Enable Office Map on Website</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Office Map Heading</label>
              <input
                type="text"
                value={formData.mapHeading}
                onChange={(e) => setFormData({ ...formData, mapHeading: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Office Map Subheading</label>
              <input
                type="text"
                value={formData.mapSubheading}
                onChange={(e) => setFormData({ ...formData, mapSubheading: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            SECTION 2: CORPORATE CONTACT DATA
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2 font-outfit flex items-center justify-between">
            <span>Corporate Contact Details</span>
            <span className="text-[11px] font-normal text-slate-400">Displayed in Header, Footer & Contact Info</span>
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Company Registered Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Full Registered Address</label>
            <textarea
              rows={3}
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* ==================================================
            SECTION 3: SOCIAL MEDIA CHANNELS (MODULE 4.1)
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2 font-outfit flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-cyan-400" />
              <span>Official Social Media Channel Links</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400">Displayed in Footer & Contact Cards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">YouTube Channel URL</label>
              <input
                type="url"
                value={formData.socialLinks?.youtube || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                  })
                }
                placeholder="https://youtube.com/@ruveronsolutions"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/ruveronsolutions"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">X (formerly Twitter) URL</label>
              <input
                type="url"
                value={formData.socialLinks?.x || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, x: e.target.value },
                  })
                }
                placeholder="https://x.com/ruveronsolutions"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">LinkedIn Page URL</label>
              <input
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/company/ruveron-solutions"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Contact, Social & Location Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
