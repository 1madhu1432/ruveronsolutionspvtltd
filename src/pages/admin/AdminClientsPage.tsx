import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ClientItem } from '../../types';

export const AdminClientsPage: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    industry: 'IT & ITeS',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    featuredOnHome: true,
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      industry: 'IT & ITeS',
      logoUrl: '',
      websiteUrl: '',
      description: '',
      featuredOnHome: true,
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (client: ClientItem) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      industry: client.industry,
      logoUrl: client.logoUrl,
      websiteUrl: client.websiteUrl || '',
      description: client.description || '',
      featuredOnHome: client.featuredOnHome ?? true,
      status: client.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.logoUrl) return;

    if (editingId) {
      updateClient(editingId, {
        name: form.name,
        industry: form.industry,
        logoUrl: form.logoUrl,
        websiteUrl: form.websiteUrl,
        description: form.description,
        featuredOnHome: form.featuredOnHome,
        status: form.status,
      });
    } else {
      addClient({
        name: form.name,
        industry: form.industry,
        logoUrl: form.logoUrl,
        websiteUrl: form.websiteUrl,
        description: form.description,
        featuredOnHome: form.featuredOnHome,
        status: form.status,
      });
    }
    setModalOpen(false);
  };

  const togglePublish = (client: ClientItem) => {
    updateClient(client.id, {
      status: client.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span>Clients Portfolio Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate client logos, industry categories, and website ticker display.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Logo</th>
                <th className="p-3.5">Client Name</th>
                <th className="p-3.5">Industry Sector</th>
                <th className="p-3.5">Website</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-900/60 transition">
                  <td className="p-3.5">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-900 border border-slate-800"
                    />
                  </td>
                  <td className="p-3.5 font-bold text-white">{client.name}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[11px]">
                      {client.industry}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 truncate max-w-[150px]">
                    {client.websiteUrl || 'N/A'}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => togglePublish(client)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        client.status === 'published'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {client.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{client.status}</span>
                    </button>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400 text-[11px]">{client.updatedAt}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(client)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                        title="Edit Client"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                        title="Delete Client"
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
                {editingId ? 'Edit Client Profile' : 'Add New Enterprise Client'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Client Company Name *</label>
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
                  <label className="block text-slate-300 font-semibold mb-1">Industry Sector</label>
                  <input
                    type="text"
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
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
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Logo Image URL *</label>
                <input
                  type="url"
                  value={form.logoUrl}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                />
              </div>

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
                <label className="block text-slate-300 font-semibold mb-1">Service Provided Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
