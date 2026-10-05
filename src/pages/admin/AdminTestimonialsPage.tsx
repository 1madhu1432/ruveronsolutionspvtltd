import React, { useState } from 'react';
import { MessageSquare, Plus, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, deleteTestimonial } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    company: '',
    testimonial: '',
    photo: '',
    status: 'published' as 'published' | 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.testimonial) return;
    addTestimonial({
      name: form.name,
      designation: form.designation,
      company: form.company,
      testimonial: form.testimonial,
      photo: form.photo,
      status: form.status,
    });
    setModalOpen(false);
    setForm({
      name: '',
      designation: '',
      company: '',
      testimonial: '',
      photo: '',
      status: 'published',
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            <span>Testimonials Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage verified client testimonials and feedback statements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Container */}
      {testimonials.length === 0 ? (
        <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-300">No testimonials added yet.</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Per corporate audit policy, no fake testimonials are loaded by default. Use the button above to add authentic client feedback.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <div className="text-xs text-cyan-400 font-medium">
                    {t.designation} {t.company && `• ${t.company}`}
                  </div>
                </div>
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="p-1 rounded text-rose-400 hover:bg-rose-950/60"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">&quot;{t.testimonial}&quot;</p>
              <div className="text-[10px] text-slate-400 font-mono">Added: {t.createdAt}</div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">Add Verified Client Testimonial</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Testimonial Quote *</label>
                <textarea
                  rows={4}
                  value={form.testimonial}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-ruveron-royal text-white font-semibold hover:bg-ruveron-blue"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
