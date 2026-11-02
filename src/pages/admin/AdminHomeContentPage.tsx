import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Home as HomeIcon,
  Award,
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  Building,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { BusinessHighlight, HighlightCategory } from '../../types';

export const AdminHomeContentPage: React.FC = () => {
  const {
    homeContent,
    updateHomeContent,
    businessHighlights,
    addBusinessHighlight,
    updateBusinessHighlight,
    deleteBusinessHighlight,
    resetBusinessHighlightsToDefault,
  } = useData();

  const [formData, setFormData] = useState({ ...homeContent });
  const [saved, setSaved] = useState(false);

  // Business Highlight Modal State (Module 1 Business Highlights)
  const [highlightModalOpen, setHighlightModalOpen] = useState(false);
  const [editingHighlightId, setEditingHighlightId] = useState<string | null>(null);
  const [highlightForm, setHighlightForm] = useState({
    title: '',
    subtitle: '',
    category: 'Award' as HighlightCategory,
    imageUrl: '',
    description: '',
    linkUrl: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const handleOpenAddHighlight = () => {
    setEditingHighlightId(null);
    setHighlightForm({
      title: '',
      subtitle: '',
      category: 'Award',
      imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
      description: '',
      linkUrl: '',
      status: 'Active',
    });
    setHighlightModalOpen(true);
  };

  const handleOpenEditHighlight = (h: BusinessHighlight) => {
    setEditingHighlightId(h.id);
    setHighlightForm({
      title: h.title,
      subtitle: h.subtitle || '',
      category: h.category,
      imageUrl: h.imageUrl || '',
      description: h.description,
      linkUrl: h.linkUrl || '',
      status: (h.status === 'published' ? 'Active' : h.status === 'draft' ? 'Inactive' : h.status) as 'Active' | 'Inactive',
    });
    setHighlightModalOpen(true);
  };

  const handleSubmitHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlightForm.title || !highlightForm.imageUrl) return;

    if (editingHighlightId) {
      updateBusinessHighlight(editingHighlightId, highlightForm);
    } else {
      addBusinessHighlight({
        ...highlightForm,
        displayOrder: businessHighlights.length + 1,
      });
    }
    setHighlightModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeContent(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <HomeIcon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Homepage Content & Highlights CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage hero text, Business Highlights (Awards, BNI, ISO), and About Section (Core Values & Our Story media).
          </p>
        </div>

        <button
          onClick={handleOpenAddHighlight}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-95 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Business Highlight</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Homepage and About section content successfully saved!</span>
        </div>
      )}

      {/* ==================================================
          SECTION: BUSINESS HIGHLIGHTS MANAGER (Module 1)
          ================================================== */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Business Highlights (Awards, BNI Membership, ISO Certified)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Highlight company credentials, awards, BNI networking alliances, and ISO 9001 certifications.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
              {businessHighlights?.length || 0} active credentials
            </span>
            <button
              type="button"
              onClick={handleOpenAddHighlight}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold flex items-center gap-1.5 shadow hover:opacity-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Highlight</span>
            </button>
            <button
              type="button"
              onClick={resetBusinessHighlightsToDefault}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition"
              title="Reset to default Awards, BNI Membership, and ISO 9001:2015 highlights"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {(!businessHighlights || businessHighlights.length === 0) ? (
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">No Business Highlights Configured</h4>
              <p className="text-xs text-slate-400 max-w-md">
                Showcase your company credentials such as Corporate Awards, BNI Networking Membership, and ISO 9001:2015 Certifications on the public homepage.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenAddHighlight}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Highlight</span>
              </button>
              <button
                type="button"
                onClick={resetBusinessHighlightsToDefault}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Restore Default Credentials</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {businessHighlights.map((hl) => (
              <div
                key={hl.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3 shadow-lg hover:border-slate-700 transition"
              >
                <div className="space-y-2.5">
                  <div className="h-32 rounded-xl overflow-hidden bg-slate-950 relative">
                    <img src={hl.imageUrl} alt={hl.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/85 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                      {hl.category}
                    </span>
                    {hl.badgeText && (
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-cyan-950/85 text-cyan-300 font-sans text-[10px] font-semibold border border-cyan-500/30">
                        {hl.badgeText}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{hl.title}</h4>
                    {hl.subtitle && <div className="text-[11px] text-cyan-400 font-medium">{hl.subtitle}</div>}
                    <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">{hl.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    (hl.status === 'Active' || (hl.status as string) === 'published') ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                  }`}>
                    {hl.status === 'published' ? 'Active' : hl.status}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditHighlight(hl)}
                      className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 hover:bg-slate-800"
                      title="Edit Highlight"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete highlight "${hl.title}"?`)) {
                          deleteBusinessHighlight(hl.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-950 text-rose-400 hover:bg-rose-950"
                      title="Delete Highlight"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Home Content Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ==================================================
            ABOUT SECTION: CORE VALUES & OUR STORY (Module 1)
            ================================================== */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>About Section Media Controls (Core Values & Our Story)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload custom imagery/media and configure descriptive content for Core Values and Our Story sections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Values Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Core Values Content & Media</span>
              </div>

              <PhotoUploader
                value={formData.coreValues?.imageUrl || ''}
                onChange={(newImg) =>
                  setFormData({
                    ...formData,
                    coreValues: {
                      title: formData.coreValues?.title || 'Our Core Values & Commitment',
                      description: formData.coreValues?.description || '',
                      imageUrl: newImg,
                    },
                  })
                }
                label="Core Values Banner Photo (Upload)"
                aspect="video"
                helpText="Upload brand graphic or teamwork photo (up to 10 MB)"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.coreValues?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coreValues: {
                        description: formData.coreValues?.description || '',
                        imageUrl: formData.coreValues?.imageUrl || '',
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Core Values Description</label>
                <textarea
                  rows={3}
                  value={formData.coreValues?.description || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      coreValues: {
                        title: formData.coreValues?.title || '',
                        imageUrl: formData.coreValues?.imageUrl || '',
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>

            {/* Our Story Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>Our Story Content & Media</span>
              </div>

              <PhotoUploader
                value={formData.ourStory?.imageUrl || ''}
                onChange={(newImg) =>
                  setFormData({
                    ...formData,
                    ourStory: {
                      title: formData.ourStory?.title || 'Our Journey & Heritage',
                      description: formData.ourStory?.description || '',
                      imageUrl: newImg,
                    },
                  })
                }
                label="Our Story Banner Photo (Upload)"
                aspect="video"
                helpText="Upload corporate office or inception photo (up to 10 MB)"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Section Heading</label>
                <input
                  type="text"
                  value={formData.ourStory?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ourStory: {
                        description: formData.ourStory?.description || '',
                        imageUrl: formData.ourStory?.imageUrl || '',
                        title: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Our Story Narrative</label>
                <textarea
                  rows={3}
                  value={formData.ourStory?.description || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ourStory: {
                        title: formData.ourStory?.title || '',
                        imageUrl: formData.ourStory?.imageUrl || '',
                        description: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

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

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Homepage & About Content</span>
          </button>
        </div>
      </form>

      {/* Modal: Add / Edit Business Highlight */}
      {highlightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-outfit">
                {editingHighlightId ? 'Edit Business Highlight' : 'Add Business Highlight'}
              </h3>
              <button onClick={() => setHighlightModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitHighlight} className="space-y-4">
              <PhotoUploader
                value={highlightForm.imageUrl}
                onChange={(newImg) => setHighlightForm({ ...highlightForm, imageUrl: newImg })}
                label="Highlight Image / Certificate Photo (Upload)"
                aspect="video"
                required
                helpText="Upload award, ISO certificate, or BNI membership banner (up to 10 MB)"
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Highlight Title *</label>
                <input
                  type="text"
                  value={highlightForm.title}
                  onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                  placeholder="e.g. ISO 9001:2015 Certified Company"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <select
                    value={highlightForm.category}
                    onChange={(e) => setHighlightForm({ ...highlightForm, category: e.target.value as HighlightCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 font-semibold"
                  >
                    <option value="Award">Award</option>
                    <option value="BNI">BNI Membership</option>
                    <option value="ISO">ISO Certified Company</option>
                    <option value="Other">Other Achievement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={highlightForm.status}
                    onChange={(e) => setHighlightForm({ ...highlightForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subtitle / Issuing Body</label>
                <input
                  type="text"
                  value={highlightForm.subtitle}
                  onChange={(e) => setHighlightForm({ ...highlightForm, subtitle: e.target.value })}
                  placeholder="e.g. Quality Management System Accreditation"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={highlightForm.description}
                  onChange={(e) => setHighlightForm({ ...highlightForm, description: e.target.value })}
                  placeholder="Details of certification, auditing compliance, or recognition..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Verification URL / Certificate Link</label>
                <input
                  type="url"
                  value={highlightForm.linkUrl}
                  onChange={(e) => setHighlightForm({ ...highlightForm, linkUrl: e.target.value })}
                  placeholder="https://example.com/certificate"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setHighlightModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold"
                >
                  {editingHighlightId ? 'Update Highlight' : 'Save Highlight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
