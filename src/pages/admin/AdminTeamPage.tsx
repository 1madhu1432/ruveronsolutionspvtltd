import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, Eye, EyeOff, ExternalLink, UserCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { TeamItem } from '../../types';

export const AdminTeamPage: React.FC = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: 'Executive Leadership',
    photo: '',
    linkedin: '',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      designation: '',
      department: 'Executive Leadership',
      photo: '',
      linkedin: '',
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
      photo: member.photo || '',
      linkedin: member.linkedin || '',
      status: member.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.designation) return;

    if (editingId) {
      updateTeamMember(editingId, {
        name: form.name,
        designation: form.designation,
        department: form.department,
        photo: form.photo,
        linkedin: form.linkedin,
        status: form.status,
      });
    } else {
      addTeamMember({
        name: form.name,
        designation: form.designation,
        department: form.department,
        photo: form.photo,
        linkedin: form.linkedin,
        status: form.status,
      });
    }
    setModalOpen(false);
  };

  const toggleStatus = (member: TeamItem) => {
    updateTeamMember(member.id, {
      status: member.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Corporate Team & Leadership Directory</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {team.length} Members
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate leadership profiles, executive designations, uploaded member photos, and LinkedIn links.
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

      {/* Team Member Cards Grid */}
      {team.length === 0 ? (
        <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-300">No corporate team members listed</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Add key executive leadership and operational management personnel with their uploaded photos.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-slate-950 rounded-2xl border border-slate-800/90 p-5 space-y-4 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header with Photo Avatar and Status */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover bg-slate-900 border-2 border-slate-700/80 shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ruveron-royal to-ruveron-cyan text-white text-xl font-black flex items-center justify-center shadow-md">
                        {member.name[0]}
                      </div>
                    )}
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${
                        member.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      title={`Status: ${member.status}`}
                    />
                  </div>

                  <button
                    onClick={() => toggleStatus(member)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      member.status === 'published'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {member.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{member.status}</span>
                  </button>
                </div>

                {/* Member Info */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono tracking-wider">
                    {member.department}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{member.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{member.designation}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 mt-2 transition"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                  title="Edit Member & Photo"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove ${member.name} from team directory?`)) {
                      deleteTeamMember(member.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 hover:border-rose-800 transition"
                  title="Delete Member"
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
                <UserCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base">
                  {editingId ? 'Edit Team Member Profile' : 'Add Corporate Leadership Member'}
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
                label="Member Photo (Upload Image)"
                aspect="avatar"
                helpText="Upload a professional headshot photo (JPG, PNG up to 5MB)"
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. K. Madhusudhan Rao"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation *</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="Managing Director"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Executive Leadership"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Website Visibility</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                >
                  <option value="published">Published (Visible on Team Page)</option>
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
                  {editingId ? 'Update Member Profile' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
