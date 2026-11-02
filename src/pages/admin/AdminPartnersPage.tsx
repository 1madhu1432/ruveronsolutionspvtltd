import React, { useState } from 'react';
import { Handshake, Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { PartnerItem } from '../../types';

export const AdminPartnersPage: React.FC = () => {
  const { partners, addPartner, updatePartner, deletePartner } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Technology Partner',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    displayOrder: 0,
    status: 'published' as 'published' | 'draft',
  });

  const sortedPartners = [...partners].sort((a, b) => {
    const orderA = a.displayOrder ?? 999;
    const orderB = b.displayOrder ?? 999;
    return orderA - orderB;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      category: 'Technology Partner',
      logoUrl: '',
      websiteUrl: '',
      description: '',
      displayOrder: partners.length + 1,
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (partner: PartnerItem) => {
    setEditingId(partner.id);
    setForm({
      name: partner.name,
      category: partner.category,
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl || '',
      description: partner.description || '',
      displayOrder: partner.displayOrder ?? 1,
      status: partner.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.logoUrl) return;

    const payload = {
      name: form.name,
      category: form.category,
      logoUrl: form.logoUrl,
      websiteUrl: form.websiteUrl,
      description: form.description,
      displayOrder: Number(form.displayOrder) || 0,
      status: form.status,
    };

    if (editingId) {
      updatePartner(editingId, payload);
    } else {
      addPartner(payload);
    }
    setModalOpen(false);
  };

  const togglePublish = (partner: PartnerItem) => {
    updatePartner(partner.id, {
      status: partner.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 font-outfit">
            <Handshake className="w-6 h-6 text-cyan-400" />
            <span>Our Partners Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              {partners.length} Partners
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate partners, technology associates, client alliance logos, and display priority order.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Order</th>
                <th className="p-3.5">Logo</th>
                <th className="p-3.5">Partner Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Website</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-900/60 transition">
                  <td className="p-3.5 font-mono text-cyan-400 font-bold">
                    #{partner.displayOrder ?? 1}
                  </td>
                  <td className="p-3.5">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-900 border border-slate-800"
                    />
                  </td>
                  <td className="p-3.5 font-bold text-white">
                    <div>{partner.name}</div>
                    {partner.description && (
                      <div className="text-[10px] text-slate-400 font-normal truncate max-w-xs">
                        {partner.description}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[11px]">
                      {partner.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 truncate max-w-[150px]">
                    {partner.websiteUrl ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {partner.websiteUrl}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => togglePublish(partner)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${partner.status === 'published'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                    >
                      {partner.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{partner.status === 'published' ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400 text-[11px]">{partner.updatedAt}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(partner)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                        title="Edit Partner"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deletePartner(partner.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">
                {editingId ? 'Edit Partner Details' : 'Add New Corporate Partner'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Partner Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. AWS Cloud Alliances"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Technology Partner"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="published">Active (Published)</option>
                    <option value="draft">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <PhotoUploader
                  value={form.logoUrl}
                  onChange={(newLogo) => setForm({ ...form, logoUrl: newLogo })}
                  label="Partner Company Logo (Upload Photo)"
                  aspect="square"
                  required
                  helpText="Upload PNG, SVG, or JPG partner logo (up to 10MB)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Website URL</label>
                  <input
                    type="url"
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Strategic workforce and technology collaboration..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
