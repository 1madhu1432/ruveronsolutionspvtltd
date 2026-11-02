import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, Eye, EyeOff, ArrowUpDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { TeamItem } from '../../types';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0-.01-3.24 1.62 1.62 0 0 0 .01 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

export const AdminTeamPage: React.FC = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Executive Leadership',
    description: '',
    photo: '',
    linkedin: '',
    displayOrder: 0,
    status: 'published' as 'published' | 'draft',
  });

  const sortedTeam = [...team].sort((a, b) => {
    const orderA = a.displayOrder ?? 999;
    const orderB = b.displayOrder ?? 999;
    return orderA - orderB;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      designation: '',
      department: 'Executive Leadership',
      description: '',
      photo: '',
      linkedin: '',
      displayOrder: team.length + 1,
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (member: TeamItem) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      designation: member.designation,
      department: member.department,
      description: member.description || '',
      photo: member.photo || '',
      linkedin: member.linkedin || '',
      displayOrder: member.displayOrder ?? 1,
      status: member.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.designation) return;

    const payload = {
      name: form.name,
      designation: form.designation,
      department: form.department,
      description: form.description,
      photo: form.photo,
      linkedin: form.linkedin,
      displayOrder: Number(form.displayOrder) || 0,
      status: form.status,
    };

    if (editingId) {
      updateTeamMember(editingId, payload);
    } else {
      addTeamMember(payload);
    }
    setModalOpen(false);
  };

  const toggleStatus = (member: TeamItem) => {
    updateTeamMember(member.id, {
      status: member.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Corporate Team & Leadership Directory</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {team.length} Members
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate leadership profiles, executive designations, member bios, headshots, display order, and status.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      {sortedTeam.length === 0 ? (
        <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-300">No team members registered yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add corporate executives, managing directors, and operations leaders.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-ruveron-royal text-white text-xs font-semibold hover:bg-ruveron-blue transition inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Member</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedTeam.map((m) => (
            <div
              key={m.id}
              className="bg-slate-950 rounded-2xl border border-slate-800/90 p-5 space-y-4 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-slate-900 border border-slate-700 shadow-md shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-ruveron-royal to-ruveron-cyan text-white text-lg font-black flex items-center justify-center shadow-md shrink-0">
                        {m.name[0]}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{m.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono flex items-center gap-0.5">
                          <ArrowUpDown className="w-2.5 h-2.5 text-cyan-400" />
                          <span>#{m.displayOrder ?? 1}</span>
                        </span>
                      </div>
                      <p className="text-xs text-cyan-400 font-medium">{m.designation}</p>
                      <span className="text-[10px] text-slate-400">{m.department}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStatus(m)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      m.status === 'published'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {m.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{m.status === 'published' ? 'Active' : 'Inactive'}</span>
                  </button>
                </div>

                {/* Description */}
                {m.description && (
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {m.description}
                  </p>
                )}

                {/* LinkedIn Link */}
                {m.linkedin && (
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-400">
                    <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:underline text-slate-400 hover:text-cyan-300"
                    >
                      {m.linkedin}
                    </a>
                  </div>
                )}
              </div>

              {/* Actions & Display Order */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Order: <strong className="text-cyan-400">#{m.displayOrder ?? 1}</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                    title="Edit Member"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete team profile for ${m.name}?`)) {
                        deleteTeamMember(m.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 hover:border-rose-800 transition"
                    title="Delete Member"
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
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base">
                  {editingId ? 'Edit Team Member Profile' : 'Add Team Member'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Image Uploader */}
              <PhotoUploader
                value={form.photo}
                onChange={(newPhoto) => setForm({ ...form, photo: newPhoto })}
                label="Profile Image Upload"
                aspect="avatar"
                helpText="Upload professional executive headshot (PNG, JPG, WebP up to 10MB)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. S. Venkatesh"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation *</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. Managing Director & CEO"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Payroll Operations">Payroll Operations</option>
                    <option value="Statutory Compliance">Statutory Compliance</option>
                    <option value="Talent Acquisition">Talent Acquisition</option>
                    <option value="Technical Training & HVAC">Technical Training & HVAC</option>
                    <option value="Legal & Advisory">Legal & Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Executive Bio & Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Over 18 years of pioneering expertise across payroll processing, labor law compliances, and workforce deployment..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
                  required
                />
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
                  {editingId ? 'Update Member Profile' : 'Save Member Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
