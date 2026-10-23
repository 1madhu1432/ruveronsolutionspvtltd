import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  RotateCcw,
  Eye,
  Palette,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Logo } from '../../components/common/Logo';

export const AdminBrandingPage: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useData();

  const [formData, setFormData] = useState({
    logoUrl: companyInfo.logoUrl || '',
    logoDarkUrl: companyInfo.logoDarkUrl || '',
    logoType: companyInfo.logoType || 'emblem',
    logoHeight: companyInfo.logoHeight || 40,
    showLogoTagline: companyInfo.showLogoTagline ?? true,
    tagline: companyInfo.tagline || 'Integrated HR & Payroll Management Partner',
    companyName: companyInfo.companyName || 'RUVERON SOLUTIONS PRIVATE LIMITED',
  });

  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'navbar' | 'sidebar' | 'light' | 'footer'>('navbar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Upload to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, SVG, JPG, WebP).');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image size exceeds 4MB. Please upload an optimized logo under 4MB.');
      setTimeout(() => setUploadError(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        logoUrl: result,
        logoType: 'custom',
      }));
      setUploadError(null);
    };
    reader.readAsDataURL(file);
  };

  // Preset sample corporate logos for quick testing
  const sampleLogos = [
    {
      name: 'Modern Tech Monogram',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Global Workforce Emblem',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Corporate Synergy Hub',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo({
      logoUrl: formData.logoUrl,
      logoDarkUrl: formData.logoDarkUrl,
      logoType: formData.logoType as 'custom' | 'emblem',
      logoHeight: formData.logoHeight,
      showLogoTagline: formData.showLogoTagline,
      tagline: formData.tagline,
      companyName: formData.companyName,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetToEmblem = () => {
    if (
      window.confirm(
        'Restore the default corporate Ruveron vector brand emblem across the website?'
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        logoType: 'emblem',
        logoUrl: '',
      }));
      updateCompanyInfo({
        logoType: 'emblem',
        logoUrl: '',
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <Palette className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Logo & Brand Identity Controls</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Change company logo, upload custom emblem graphics, and configure website-wide brand identity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetToEmblem}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            title="Restore original corporate vector emblem"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Logo</span>
          </button>
        </div>
      </div>

      {/* Save Alert */}
      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span className="font-semibold">
            Brand logo settings saved successfully! Logo is now updated across Website Header, Footer, and Admin Panel.
          </span>
        </div>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <ShieldCheck className="w-5 h-5 shrink-0 text-rose-400" />
          <span className="font-semibold">{uploadError}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* ==================================================
            MODE SELECTOR CARDS
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Custom Image Logo */}
          <div
            onClick={() => setFormData({ ...formData, logoType: 'custom' })}
            className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden flex flex-col justify-between ${
              formData.logoType === 'custom'
                ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    formData.logoType === 'custom'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm font-outfit flex items-center gap-2">
                    <span>Custom Image Logo</span>
                    {formData.logoType === 'custom' && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                        ACTIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload your own corporate logo image (PNG, SVG, JPG, WebP) or provide an image URL.
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.logoType === 'custom'
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {formData.logoType === 'custom' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
              Ideal for uploading company branding or custom graphic marks.
            </div>
          </div>

          {/* Option 2: Default Vector Emblem */}
          <div
            onClick={() => setFormData({ ...formData, logoType: 'emblem' })}
            className={`p-5 rounded-2xl border cursor-pointer transition relative overflow-hidden flex flex-col justify-between ${
              formData.logoType === 'emblem'
                ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    formData.logoType === 'emblem'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm font-outfit flex items-center gap-2">
                    <span>Ruveron Vector Brand Emblem</span>
                    {formData.logoType === 'emblem' && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
                        ACTIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    High-performance stylized dual-tone 'R' monogram with electric cyan chevrons.
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.logoType === 'emblem'
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                {formData.logoType === 'emblem' && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
              Crisp scalable vector rendering on high-resolution screens without image compression.
            </div>
          </div>
        </div>

        {/* ==================================================
            IMAGE UPLOAD & URL CONTROLS
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span>Logo Upload & Customization</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your brand logo file or provide a web link.
              </p>
            </div>

            {formData.logoUrl && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, logoUrl: '', logoType: 'emblem' })}
                className="text-xs text-rose-400 hover:text-rose-300 transition"
              >
                Clear Custom Logo
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Drag & Drop File Upload Box */}
            <div className="space-y-3">
              <label className="block text-slate-300 font-semibold">
                Upload Logo File from Device
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-950 transition cursor-pointer text-center space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Click to Browse or Drag Image here</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports PNG (transparent recommended), SVG, JPG, WebP up to 4MB
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-200 font-bold text-xs transition"
                >
                  Choose File
                </button>
              </div>
            </div>

            {/* Right: Direct Image URL Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Or Paste Logo Image URL
                </label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logoUrl: e.target.value,
                      logoType: e.target.value ? 'custom' : formData.logoType,
                    })
                  }
                  placeholder="https://example.com/images/company-logo.png"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400 font-mono text-[11px] transition"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  You can use any hosted URL from Cloudinary, Imgur, AWS S3, or your CDN.
                </p>
              </div>

              {/* Sample Presets */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 mb-2">
                  Sample Corporate Logos for Demo:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleLogos.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          logoUrl: sample.url,
                          logoType: 'custom',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-cyan-400 transition flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3 h-3 text-cyan-400" />
                      <span>{sample.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Branding Texts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Brand Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.showLogoTagline}
                onChange={(e) => setFormData({ ...formData, showLogoTagline: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-950 border-slate-700 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">
                Show Tagline subtitle under logo on website
              </span>
            </label>
          </div>
        </div>

        {/* ==================================================
            LIVE INTERACTIVE PREVIEWS ACROSS LAYOUTS
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>Live Website Preview</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect how your logo looks across different website sections.
              </p>
            </div>

            {/* Preview Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewTab('navbar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  previewTab === 'navbar'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Website Header
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('sidebar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  previewTab === 'sidebar'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin Sidebar
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('light')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  previewTab === 'light'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Light Background
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('footer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  previewTab === 'footer'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Website Footer
              </button>
            </div>
          </div>

          {/* Active Tab Preview Display */}
          <div className="rounded-2xl overflow-hidden border border-slate-800">
            {/* Website Navbar Preview */}
            {previewTab === 'navbar' && (
              <div className="bg-slate-950/95 border-b border-slate-800/80 p-5 flex items-center justify-between">
                <Logo
                  size="md"
                  customLogoUrl={formData.logoType === 'custom' ? formData.logoUrl : undefined}
                />
                <div className="hidden sm:flex items-center gap-6 text-xs text-slate-400 font-semibold">
                  <span className="text-cyan-400">Home</span>
                  <span>About Us</span>
                  <span>Solutions</span>
                  <span>Services</span>
                  <span>Contact</span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold">
                    Talk to Experts
                  </span>
                </div>
              </div>
            )}

            {/* Admin Sidebar Preview */}
            {previewTab === 'sidebar' && (
              <div className="bg-slate-950 p-6 max-w-xs space-y-4">
                <Logo
                  size="sm"
                  customLogoUrl={formData.logoType === 'custom' ? formData.logoUrl : undefined}
                />
                <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 text-cyan-400 font-bold">
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400">
                    <span>Lead Management</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400">
                    <span>Locations & States</span>
                  </div>
                </div>
              </div>
            )}

            {/* Light Background Preview */}
            {previewTab === 'light' && (
              <div className="bg-white p-8 flex flex-col items-center justify-center space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 shadow-sm bg-white">
                  <Logo
                    variant="dark"
                    size="lg"
                    customLogoUrl={formData.logoType === 'custom' ? formData.logoUrl : undefined}
                  />
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Preview on light cards, white documents & proposals
                </span>
              </div>
            )}

            {/* Website Footer Preview */}
            {previewTab === 'footer' && (
              <div className="bg-slate-950 border-t border-slate-800 p-8 space-y-4">
                <Logo
                  size="lg"
                  showTagline={true}
                  customLogoUrl={formData.logoType === 'custom' ? formData.logoUrl : undefined}
                />
                <p className="text-xs text-slate-400 max-w-md">
                  Empowering organizations with agile workforce solutions, efficient payroll management,
                  and technology-enabled HR execution.
                </p>
                <div className="text-[11px] text-slate-500 border-t border-slate-800/60 pt-3">
                  © {new Date().getFullYear()} {formData.companyName}. All rights reserved.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Logo Website-Wide</span>
          </button>
        </div>
      </form>
    </div>
  );
};
