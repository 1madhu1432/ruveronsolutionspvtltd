import React, { useState } from 'react';
import { MessageSquare, Plus, Edit2, Trash2, X, Eye, EyeOff, Quote, Video, ArrowUpDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { TestimonialItem } from '../../types';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    company: '',
    testimonial: '',
    photo: '',
    videoUrl: '',
    displayOrder: 0,
    status: 'published' as 'published' | 'draft',
  });

  const sortedTestimonials = [...testimonials].sort((a, b) => {
    const orderA = a.displayOrder ?? 999;
    const orderB = b.displayOrder ?? 999;
    return orderA - orderB;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      designation: '',
      company: '',
      testimonial: '',
      photo: '',
      videoUrl: '',
      displayOrder: testimonials.length + 1,
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      designation: t.designation,
      company: t.company,
      testimonial: t.testimonial,
      photo: t.photo || '',
      videoUrl: t.videoUrl || '',
      displayOrder: t.displayOrder ?? 1,
      status: t.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.testimonial) return;

    const payload = {
      name: form.name,
      designation: form.designation,
      company: form.company,
      testimonial: form.testimonial,
      photo: form.photo,
      videoUrl: form.videoUrl,
      displayOrder: Number(form.displayOrder) || 0,
      status: form.status,
    };

    if (editingId) {
      updateTestimonial(editingId, payload);
    } else {
      addTestimonial(payload);
    }

    setModalOpen(false);
  };

  const toggleStatus = (t: TestimonialItem) => {
    updateTestimonial(t.id, {
      status: t.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <span>Testimonials & Video Endorsements</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {testimonials.length} Testimonials
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage customer names, companies, client quotes, profile images, video testimonials, and display order.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      {sortedTestimonials.length === 0 ? (
        <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-300">No client testimonials added yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add verified corporate endorsements with customer names, companies, photos, and video links.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-ruveron-royal text-white text-xs font-semibold hover:bg-ruveron-blue transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Testimonial</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 rounded-2xl border border-slate-800/90 p-5 space-y-4 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with Photo Avatar, Info, Display Order, and Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover bg-slate-900 border-2 border-cyan-500/60 shadow-md shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-ruveron-royal to-ruveron-cyan text-white text-base font-black flex items-center justify-center shadow-md shrink-0">
                        {t.name[0]}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono flex items-center gap-1">
                          <ArrowUpDown className="w-2.5 h-2.5 text-cyan-400" />
                          <span>#{t.displayOrder ?? 1}</span>
                        </span>
                      </div>
                      <p className="text-xs text-cyan-400 font-medium">
                        {t.designation} {t.company && `• ${t.company}`}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">Added: {t.createdAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStatus(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      t.status === 'published'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {t.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{t.status === 'published' ? 'Active' : 'Inactive'}</span>
                  </button>
                </div>

                {/* Quote */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 relative">
                  <Quote className="w-4 h-4 text-cyan-500/40 absolute top-2 right-2" />
                  <p className="text-xs text-slate-200 italic leading-relaxed whitespace-pre-wrap">
                    &quot;{t.testimonial}&quot;
                  </p>
                </div>

                {/* Video Preview if present */}
                {t.videoUrl && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs flex items-center gap-2 text-cyan-300">
                    <Video className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span className="font-semibold">Video Testimonial:</span>
                    <a
                      href={t.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-cyan-400 underline hover:text-white"
                    >
                      {t.videoUrl}
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Priority Order: <strong className="text-cyan-400">{t.displayOrder ?? 1}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                    title="Edit Testimonial"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete testimonial from ${t.name}?`)) {
                        deleteTestimonial(t.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 hover:border-rose-800 transition"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base">
                  {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Photo Uploader */}
              <PhotoUploader
                value={form.photo}
                onChange={(newPhoto) => setForm({ ...form, photo: newPhoto })}
                label="Client Representative Photo / Avatar"
                aspect="avatar"
                helpText="Upload a client photo (PNG, JPG, WebP up to 10MB)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Customer / Client Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. Sunita Rao"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Apex Health Systems"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Designation / Role</label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  placeholder="e.g. Chief Medical Administrator"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Testimonial Description / Quote *</label>
                <textarea
                  rows={4}
                  value={form.testimonial}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  placeholder="Ruveron Solutions streamlined our monthly healthcare staffing payroll with zero error..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Video Testimonial URL / Upload Link</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or direct MP4 link"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Provide a YouTube link, Vimeo URL, or MP4 video asset URL.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-500">Lower numbers appear first</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="published">Active (Published on site)</option>
                    <option value="draft">Inactive (Draft - Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold transition shadow-md hover:opacity-95"
                >
                  {editingId ? 'Update Testimonial' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
