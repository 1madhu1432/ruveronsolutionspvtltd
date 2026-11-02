import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Save,
  CheckCircle2,
  RotateCcw,
  Eye,
  Palette,
  Check,
  FileText,
  Video,
  AlertTriangle,
  Trash2,
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

  const [brandPdf, setBrandPdf] = useState<{ name: string; url: string; size: string } | null>({
    name: 'Ruveron_Corporate_Brochure_2026.pdf',
    url: '#',
    size: '3.4 MB',
  });

  const [brandVideo, setBrandVideo] = useState<{ name: string; url: string; size: string } | null>({
    name: 'Ruveron_Corporate_Anthem_HD.mp4',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    size: '8.2 MB',
  });

  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'navbar' | 'sidebar' | 'light' | 'footer'>('navbar');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Handle Logo File Upload (PNG, JPG, JPEG, SVG, WebP up to 10MB)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(`Invalid file format "${file.type || 'unknown'}". Supported formats: PNG, JPG, JPEG, SVG, WebP.`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`Image size exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(2)} MB). Please select a file under 10MB.`);
      setTimeout(() => setUploadError(null), 5000);
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

  // Handle Corporate PDF Upload (Brochure / Guidelines up to 10MB)
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setUploadError(`Invalid document format. Only PDF files are supported for corporate profile uploads.`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`PDF file size exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed size is 10 MB.`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBrandPdf({
        name: file.name,
        url: reader.result as string,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      });
      setUploadError(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle Corporate Video Upload (MP4 up to 10MB)
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/') && !file.name.toLowerCase().endsWith('.mp4')) {
      setUploadError(`Invalid video format. Supported formats: MP4, WebM (under 10MB).`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`Video file size exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed size is 10 MB.`);
      setTimeout(() => setUploadError(null), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBrandVideo({
        name: file.name,
        url: reader.result as string,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      });
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
            <span>Logo, Branding & Media Upload Suite</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure company logos (up to 10 MB), upload corporate brand PDFs & video anthems with format validation.
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
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
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
                    Upload your corporate logo image (PNG, SVG, JPG, WebP up to 10 MB).
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
            IMAGE UPLOAD & URL CONTROLS (Max 10 MB)
            ================================================== */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span>Logo Upload & Customization</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  Max 10 MB
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your brand logo file (PNG, JPG, JPEG, SVG, WebP) or provide a web link.
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
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
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
                    Supports PNG, SVG, JPG, JPEG, WebP up to 10 MB
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                />
              </div>

              {/* Preset Quick Select Logos */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-400">
                  Quick Demo Logos:
                </label>
                <div className="flex flex-wrap gap-2">
                  {sampleLogos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          logoUrl: s.url,
                          logoType: 'custom',
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition border border-slate-700"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            BRAND PDF & VIDEO UPLOAD SECTION (MODULE 4.4)
            ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Brochure Upload Option */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-sm font-outfit">Corporate PDF Profile / Brochure</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Max 10 MB</span>
            </div>

            <p className="text-xs text-slate-400">
              Upload your company profile PDF or statutory compliance booklet for visitors to download.
            </p>

            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />

            {brandPdf ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{brandPdf.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{brandPdf.size}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrandPdf(null)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                className="w-full py-4 rounded-xl border border-dashed border-slate-700 hover:border-amber-400 text-slate-400 hover:text-white transition flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Corporate PDF Document (Max 10 MB)</span>
              </button>
            )}
          </div>

          {/* Corporate Video Upload Option */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-sm font-outfit">Corporate Brand Video / Anthem</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Max 10 MB</span>
            </div>

            <p className="text-xs text-slate-400">
              Upload an MP4 corporate video clip or facility tour video for homepage and proposal embeds.
            </p>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,.mp4,video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />

            {brandVideo ? (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{brandVideo.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{brandVideo.size}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setBrandVideo(null)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="w-full py-4 rounded-xl border border-dashed border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Upload Corporate Video File (MP4 under 10 MB)</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Logo Preview Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Website Logo Preview</span>
            </h3>

            <div className="flex items-center gap-2">
              {(['navbar', 'sidebar', 'light', 'footer'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPreviewTab(tab)}
                  className={`px-3 py-1 rounded-lg capitalize text-xs font-semibold transition ${
                    previewTab === tab
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center min-h-[120px]">
            <Logo
              size="lg"
              variant={previewTab === 'light' ? 'dark' : 'light'}
              customLogoUrl={formData.logoType === 'custom' ? formData.logoUrl : undefined}
              showTagline={formData.showLogoTagline}
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
            <span>Save & Apply Brand Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
``