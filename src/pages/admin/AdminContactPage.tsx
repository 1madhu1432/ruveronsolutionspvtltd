import React, { useState } from 'react';
import {
  Phone,
  Save,
  CheckCircle2,
  MapPin,
  Eye,
  EyeOff,
  ExternalLink,
  Building2,
  Layers,
  Palette,
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
            <span>Contact Information & Office Location Controls</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure corporate contact details, address strings, and Enable/Disable the website office map.
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
          <span className="font-semibold">Contact & Office Location settings saved successfully! Changes are live on the website.</span>
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
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {formData.enableMapLocation ? 'Enabled (Visible on Website)' : 'Disabled (Hidden on Website)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Turn the "Locate Our Vijayawada Office" interactive map section ON or OFF on the public website.
                </p>
              </div>
            </div>

            {/* Quick Toggle Button */}
            <button
              type="button"
              onClick={handleToggleMap}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg ${
                formData.enableMapLocation
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Location Heading on Website
              </label>
              <input
                type="text"
                value={formData.mapHeading}
                onChange={(e) => setFormData({ ...formData, mapHeading: e.target.value })}
                placeholder="e.g. Locate Our Vijayawada Office"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400 text-xs transition"
              />
              <p className="text-[11px] text-slate-500 mt-1">Displayed as the primary section header above the map.</p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Location Subtitle / Street Address
              </label>
              <input
                type="text"
                value={formData.mapSubheading}
                onChange={(e) => setFormData({ ...formData, mapSubheading: e.target.value })}
                placeholder="e.g. 61-9/1-26, 2nd Lane, Kalanagar, Near Skewbridge, Krishnalanka, Vijayawada..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400 text-xs transition"
              />
              <p className="text-[11px] text-slate-500 mt-1">Displayed below the heading as the exact address subtitle.</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-slate-300 font-semibold">
                Google Maps Iframe Embed URL
              </label>
              {formData.mapsIframeUrl && (
                <a
                  href={formData.mapsIframeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              type="text"
              value={formData.mapsIframeUrl || ''}
              onChange={(e) => setFormData({ ...formData, mapsIframeUrl: e.target.value })}
              placeholder="https://maps.google.com/maps?q=...&output=embed"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono text-[11px] focus:border-cyan-400 transition"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Paste the Google Maps standard embed URL (or search query embed like: <span className="text-slate-400">https://maps.google.com/maps?q=Krishnalanka,%20Vijayawada&output=embed</span>)
            </p>
          </div>

          {/* Live Admin Preview */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Admin Website Preview</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  formData.enableMapLocation
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {formData.enableMapLocation ? 'WILL APPEAR ON WEBSITE' : 'HIDDEN FROM WEBSITE'}
              </span>
            </div>

            {formData.enableMapLocation ? (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 text-center space-y-3">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white font-outfit">{formData.mapHeading}</h4>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto">{formData.mapSubheading}</p>
                </div>
                {formData.mapsIframeUrl ? (
                  <div className="rounded-xl overflow-hidden border border-slate-800 h-56 bg-slate-950">
                    <iframe
                      title="Admin Live Preview"
                      src={formData.mapsIframeUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500">No map embed URL configured.</div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-800 text-center space-y-2 bg-slate-900/30">
                <EyeOff className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-400">
                  Office Map section is currently <strong className="text-rose-400">DISABLED</strong>.
                </p>
                <p className="text-[11px] text-slate-500">
                  Visitors on the public website won't see the map section. Click "Enable Office Map on Website" to show it anytime.
                </p>
              </div>
            )}
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

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Location & Contact Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
