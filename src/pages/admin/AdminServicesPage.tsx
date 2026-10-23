import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon,
  Upload,
  Search,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { ServiceItem } from '../../types';

// Curated high-resolution presets for HR services
const SERVICE_PHOTO_PRESETS = [
  { label: 'Recruitment & Talent Search', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Contract & Flexi Staffing', url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80' },
  { label: 'Payroll & Tax Management', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Statutory Compliance Audit', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Enterprise Workforce Ops', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { label: 'Industrial & Plant Manpower', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
];

export const AdminServicesPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    name: '',
    category: 'HR Services',
    shortDesc: '',
    featuresText: '',
    imageUrl: '',
    iconName: 'UserPlus',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      category: 'Sourcing & Hiring',
      shortDesc: '',
      featuresText: '',
      imageUrl: SERVICE_PHOTO_PRESETS[0].url,
      iconName: 'UserPlus',
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingId(srv.id);
    setForm({
      name: srv.name,
      category: srv.category,
      shortDesc: srv.shortDesc,
      featuresText: srv.features.join('\n'),
      imageUrl: srv.imageUrl || '',
      iconName: srv.iconName,
      status: srv.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const srvPayload = {
      name: form.name,
      category: form.category,
      shortDesc: form.shortDesc,
      features,
      imageUrl: form.imageUrl,
      iconName: form.iconName,
      status: form.status,
    };

    if (editingId) {
      updateService(editingId, srvPayload);
    } else {
      addService(srvPayload);
    }
    setModalOpen(false);
  };

  const togglePublish = (srv: ServiceItem) => {
    updateService(srv.id, {
      status: srv.status === 'published' ? 'draft' : 'published',
    });
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtering
  const filteredServices = services.filter((srv) => {
    const q = searchQuery.toLowerCase();
    return (
      srv.name.toLowerCase().includes(q) ||
      srv.category.toLowerCase().includes(q) ||
      srv.shortDesc.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 font-outfit">
            <Briefcase className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Services CRUD Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate services, configure custom photos, and update features shown on the live Services page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service (with Photo)</span>
        </button>
      </div>

      {/* ==================================================
          SEARCH & STATS BAR
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Total Services:</span>
          <strong className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded">
            {services.length}
          </strong>
          <span className="text-slate-600">|</span>
          <span>Published:</span>
          <strong className="text-emerald-400 font-mono">
            {services.filter((s) => s.status === 'published').length}
          </strong>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* ==================================================
          SERVICES TABLE
          ================================================== */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Photo</th>
                <th className="p-3.5">Service Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Features Count</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredServices.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-900/60 transition">
                  {/* Photo Thumbnail */}
                  <td className="p-3.5 w-16">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative group">
                      {srv.imageUrl ? (
                        <img
                          src={srv.imageUrl}
                          alt={srv.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-bold text-white text-sm">{srv.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                      {srv.shortDesc}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-medium">
                      {srv.category}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                      {srv.features.length} Features
                    </span>
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => togglePublish(srv)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
                        srv.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {srv.status === 'published' ? (
                        <Eye className="w-3 h-3" />
                      ) : (
                        <EyeOff className="w-3 h-3" />
                      )}
                      <span>{srv.status}</span>
                    </button>
                  </td>

                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{srv.updatedAt}</td>

                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete service "${srv.name}"?`)) {
                            deleteService(srv.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                        title="Delete Service"
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

      {/* ==================================================
          ADD / EDIT SERVICE MODAL (WITH PHOTO OPTION)
          ================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base font-outfit">
                  {editingId ? 'Edit Service Offering' : 'Add New Service (with Photo)'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Photo Option Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Service Photo / Image Option</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Live on Public Services Page</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Photo Preview Box */}
                  <div className="md:col-span-4 h-28 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    {form.imageUrl ? (
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-500 flex flex-col items-center gap-1 text-[10px]">
                        <ImageIcon className="w-6 h-6 text-slate-600" />
                        <span>No Photo Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Inputs: URL or File Upload */}
                  <div className="md:col-span-8 space-y-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">
                        Image URL (HTTPS link or CDN)
                      </label>
                      <input
                        type="url"
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-[11px] outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold cursor-pointer border border-slate-700 transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {form.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, imageUrl: '' })}
                          className="text-[11px] text-rose-400 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Presets Gallery */}
                <div className="pt-2 border-t border-slate-900">
                  <div className="text-[10px] text-slate-400 mb-1.5 font-semibold">
                    Or select from curated corporate presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICE_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setForm({ ...form, imageUrl: preset.url })}
                        className={`px-2 py-1 rounded text-[10px] border transition ${
                          form.imageUrl === preset.url
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    placeholder="e.g. Executive Search & Headhunting"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    placeholder="e.g. Sourcing & Hiring"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Short Summary / Pitch
                </label>
                <textarea
                  rows={3}
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none focus:border-cyan-400"
                  placeholder="End-to-end executive search, candidate screening, and workforce fulfillment..."
                />
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Features & Deliverables (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono focus:border-cyan-400"
                  placeholder="Executive Search & Direct Sourcing&#10;Technical & Functional Skill Assessment&#10;Offer Management & Onboarding Support"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Publish Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as 'published' | 'draft' })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                >
                  <option value="published">Published (Visible on Website)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white font-bold transition shadow-lg shadow-cyan-500/20"
                >
                  {editingId ? 'Save Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServicesPage;
