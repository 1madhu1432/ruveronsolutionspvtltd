import React, { useState } from 'react';
import { MessageSquare, Plus, Edit2, Trash2, X, Eye, EyeOff, Quote } from 'lucide-react';
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
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      designation: '',
      company: '',
      testimonial: '',
      photo: '',
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
      status: t.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.testimonial) return;

    if (editingId) {
      updateTestimonial(editingId, {
        name: form.name,
        designation: form.designation,
        company: form.company,
        testimonial: form.testimonial,
        photo: form.photo,
        status: form.status,
      });
    } else {
      addTestimonial({
        name: form.name,
        designation: form.designation,
        company: form.company,
        testimonial: form.testimonial,
        photo: form.photo,
        status: form.status,
      });
    }

    setModalOpen(false);
  };

  const toggleStatus = (t: TestimonialItem) => {
    updateTestimonial(t.id, {
      status: t.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <span>Client Testimonials & Feedback Manager</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {testimonials.length} Testimonials
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage authentic client testimonials, client representative headshot photos, and website showcase quotes.
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
      {testimonials.length === 0 ? (
        <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-300">No client testimonials added yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add verified corporate client endorsements along with representative headshots.
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
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950 rounded-2xl border border-slate-800/90 p-5 space-y-4 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with Photo Avatar, Info, and Status */}
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
                      <h4 className="text-sm font-bold text-white">{t.name}</h4>
                      <p className="text-xs text-cyan-400 font-medium">
                        {t.designation} {t.company && `• ${t.company}`}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">Date: {t.createdAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStatus(t)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      t.status === 'published'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {t.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{t.status}</span>
                  </button>
                </div>

                {/* Quote */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 relative">
                  <Quote className="w-4 h-4 text-cyan-500/40 absolute top-2 right-2" />
                  <p className="text-xs text-slate-200 italic leading-relaxed whitespace-pre-wrap">
                    &quot;{t.testimonial}&quot;
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                  title="Edit Testimonial & Photo"
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
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl text-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base">
                  {editingId ? 'Edit Client Testimonial' : 'Add Client Testimonial'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Photo Uploader Component */}
              <PhotoUploader
                value={form.photo}
                onChange={(newPhoto) => setForm({ ...form, photo: newPhoto })}
                label="Client Representative Photo (Upload)"
                aspect="avatar"
                helpText="Upload a client headshot photo (JPG, PNG up to 5MB)"
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Sunita Rao"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="Chief Medical Administrator"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Apex Health Systems"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Testimonial Quote *</label>
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
                <label className="block text-slate-300 font-semibold mb-1">Website Visibility</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
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
