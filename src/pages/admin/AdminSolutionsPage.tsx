import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon,
  Upload,
  Search,
  Building2,
  Sparkles,
  FolderKanban,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { SolutionItem, SolutionProject } from '../../types';

// Curated high-resolution presets for 1-click photo selection
const SOLUTION_PHOTO_PRESETS = [
  { label: 'VRV / VRF Multi-Zone', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'Cassette Architectural', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { label: 'Split Inverter Chilling', url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80' },
  { label: 'Central Ductable HVAC', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Floor Standing Column', url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Rooftop Package Units', url: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=600&q=80' },
  { label: 'Preventive Maintenance', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
  { label: 'AMC Engineering SLA', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80' },
];

const PROJECT_PHOTO_PRESETS = [
  { label: 'Corporate Office Towers', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { label: 'Retail & Shopping Mall', url: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80' },
  { label: 'Industrial Manufacturing', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hospital & Healthcare', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80' },
  { label: 'University Auditorium', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
  { label: 'Commercial Data Center', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
];

export const AdminSolutionsPage: React.FC = () => {
  const {
    solutions,
    addSolution,
    updateSolution,
    deleteSolution,
    projects,
    addProject,
    updateProject,
    deleteProject,
  } = useData();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'solutions' | 'projects'>('solutions');
  const [searchQuery, setSearchQuery] = useState('');

  // ----------------------------------------------------
  // SOLUTION STATE & HANDLERS
  // ----------------------------------------------------
  const [solModalOpen, setSolModalOpen] = useState(false);
  const [editingSolId, setEditingSolId] = useState<string | null>(null);
  const [solForm, setSolForm] = useState({
    title: '',
    category: 'Commercial & Multi-Zone',
    description: '',
    benefitsText: '',
    imageUrl: '',
    iconName: 'Zap',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAddSolution = () => {
    setEditingSolId(null);
    setSolForm({
      title: '',
      category: 'Commercial & Multi-Zone',
      description: '',
      benefitsText: '',
      imageUrl: SOLUTION_PHOTO_PRESETS[0].url,
      iconName: 'Zap',
      status: 'published',
    });
    setSolModalOpen(true);
  };

  const handleOpenEditSolution = (sol: SolutionItem) => {
    setEditingSolId(sol.id);
    setSolForm({
      title: sol.title,
      category: sol.category,
      description: sol.description,
      benefitsText: sol.benefits.join('\n'),
      imageUrl: sol.imageUrl || '',
      iconName: sol.iconName,
      status: sol.status,
    });
    setSolModalOpen(true);
  };

  const handleSolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const benefits = solForm.benefitsText
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const solPayload = {
      title: solForm.title,
      category: solForm.category,
      description: solForm.description,
      benefits,
      imageUrl: solForm.imageUrl,
      iconName: solForm.iconName,
      status: solForm.status,
    };

    if (editingSolId) {
      updateSolution(editingSolId, solPayload);
    } else {
      addSolution(solPayload);
    }
    setSolModalOpen(false);
  };

  const toggleSolutionPublish = (sol: SolutionItem) => {
    updateSolution(sol.id, {
      status: sol.status === 'published' ? 'draft' : 'published',
    });
  };

  // Image Upload helper for solution
  const handleSolutionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSolForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------
  // PROJECT STATE & HANDLERS
  // ----------------------------------------------------
  const [projModalOpen, setProjModalOpen] = useState(false);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState({
    title: '',
    sector: 'Corporate Offices',
    clientName: '',
    imageUrl: '',
    description: '',
    bulletsText: '',
    solutionId: 'sol-vrv',
    iconType: 'building',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAddProject = () => {
    setEditingProjId(null);
    setProjForm({
      title: '',
      sector: 'Corporate Offices',
      clientName: '',
      imageUrl: PROJECT_PHOTO_PRESETS[0].url,
      description: '',
      bulletsText: 'VRV / VRF Multi-Zone Systems\nConcealed Acoustic Ducting\nCentral BMS Monitoring',
      solutionId: solutions[0]?.id || 'sol-vrv',
      iconType: 'building',
      status: 'published',
    });
    setProjModalOpen(true);
  };

  const handleOpenEditProject = (proj: SolutionProject) => {
    setEditingProjId(proj.id);
    setProjForm({
      title: proj.title,
      sector: proj.sector,
      clientName: proj.clientName || '',
      imageUrl: proj.imageUrl,
      description: proj.description,
      bulletsText: proj.bullets.join('\n'),
      solutionId: proj.solutionId || (solutions[0]?.id || ''),
      iconType: proj.iconType || 'building',
      status: proj.status,
    });
    setProjModalOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bullets = projForm.bulletsText
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const projPayload = {
      title: projForm.title,
      sector: projForm.sector,
      clientName: projForm.clientName,
      imageUrl: projForm.imageUrl,
      description: projForm.description,
      bullets,
      solutionId: projForm.solutionId,
      iconType: projForm.iconType,
      status: projForm.status,
    };

    if (editingProjId) {
      updateProject(editingProjId, projPayload);
    } else {
      addProject(projPayload);
    }
    setProjModalOpen(false);
  };

  const toggleProjectPublish = (proj: SolutionProject) => {
    updateProject(proj.id, {
      status: proj.status === 'published' ? 'draft' : 'published',
    });
  };

  // Image Upload helper for project
  const handleProjectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProjForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtering
  const filteredSolutions = solutions.filter((sol) => {
    const q = searchQuery.toLowerCase();
    return (
      sol.title.toLowerCase().includes(q) ||
      sol.category.toLowerCase().includes(q) ||
      sol.description.toLowerCase().includes(q)
    );
  });

  const filteredProjects = projects.filter((proj) => {
    const q = searchQuery.toLowerCase();
    return (
      proj.title.toLowerCase().includes(q) ||
      proj.sector.toLowerCase().includes(q) ||
      (proj.clientName && proj.clientName.toLowerCase().includes(q)) ||
      proj.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER & ACTIONS
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 font-outfit">
            <Layers className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Solutions & Implemented Projects Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate solutions, upload high-res photos, and showcase implemented client projects live on the website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === 'solutions' ? (
            <button
              onClick={handleOpenAddSolution}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Solution (with Photo)</span>
            </button>
          ) : (
            <button
              onClick={handleOpenAddProject}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Implemented Project</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          NAVIGATION TABS & SEARCH
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-900 border border-slate-800 rounded-2xl">
        {/* Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'solutions'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Solutions & Expertise</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {solutions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-emerald-400" />
            <span>Implemented Projects</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {projects.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'solutions' ? 'Search solutions...' : 'Search projects...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* ==================================================
          TAB 1: SOLUTIONS TABLE
          ================================================== */}
      {activeTab === 'solutions' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Photo</th>
                  <th className="p-3.5">Solution Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Benefits</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Last Updated</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredSolutions.map((sol) => (
                  <tr key={sol.id} className="hover:bg-slate-900/60 transition">
                    {/* Photo Thumbnail */}
                    <td className="p-3.5 w-16">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative group">
                        {sol.imageUrl ? (
                          <img
                            src={sol.imageUrl}
                            alt={sol.title}
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
                      <div className="font-bold text-white text-sm">{sol.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                        {sol.description}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-medium">
                        {sol.category}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        {sol.benefits.length} Benefits
                      </span>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => toggleSolutionPublish(sol)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
                          sol.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {sol.status === 'published' ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span>{sol.status}</span>
                      </button>
                    </td>

                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{sol.updatedAt}</td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditSolution(sol)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                          title="Edit Solution"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete solution "${sol.title}"?`)) {
                              deleteSolution(sol.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                          title="Delete Solution"
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
      )}

      {/* ==================================================
          TAB 2: IMPLEMENTED PROJECTS TABLE
          ================================================== */}
      {activeTab === 'projects' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Photo</th>
                  <th className="p-3.5">Project Title</th>
                  <th className="p-3.5">Sector / Industry</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Deliverables</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Last Updated</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-900/60 transition">
                    {/* Photo Thumbnail */}
                    <td className="p-3.5 w-16">
                      <div className="w-16 h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative group">
                        {proj.imageUrl ? (
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
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
                      <div className="font-bold text-white text-sm">{proj.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                        {proj.description}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-medium flex items-center gap-1 w-max">
                        <Building2 className="w-3 h-3 text-emerald-400" />
                        <span>{proj.sector}</span>
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300 font-medium">
                      {proj.clientName || 'Confidential Client'}
                    </td>

                    <td className="p-3.5 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        {proj.bullets.length} Specifications
                      </span>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => toggleProjectPublish(proj)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
                          proj.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {proj.status === 'published' ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span>{proj.status}</span>
                      </button>
                    </td>

                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{proj.updatedAt}</td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditProject(proj)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                          title="Edit Implemented Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                          title="Delete Project"
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
      )}

      {/* ==================================================
          MODAL: ADD / EDIT SOLUTION (WITH PHOTO OPTION)
          ================================================== */}
      {solModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base font-outfit">
                  {editingSolId ? 'Edit Solution' : 'Add New Solution (with Photo)'}
                </h3>
              </div>
              <button
                onClick={() => setSolModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSolutionSubmit} className="space-y-4 text-xs">
              {/* Photo Option Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Solution Photo / Image Option</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Live on Public Solutions Page</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Photo Preview Box */}
                  <div className="md:col-span-4 h-28 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    {solForm.imageUrl ? (
                      <img
                        src={solForm.imageUrl}
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
                        value={solForm.imageUrl}
                        onChange={(e) => setSolForm({ ...solForm, imageUrl: e.target.value })}
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
                          onChange={handleSolutionFileUpload}
                          className="hidden"
                        />
                      </label>
                      {solForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setSolForm({ ...solForm, imageUrl: '' })}
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
                    Or select from curated HVAC presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SOLUTION_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSolForm({ ...solForm, imageUrl: preset.url })}
                        className={`px-2 py-1 rounded text-[10px] border transition ${
                          solForm.imageUrl === preset.url
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

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Solution Title *
                  </label>
                  <input
                    type="text"
                    value={solForm.title}
                    onChange={(e) => setSolForm({ ...solForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    placeholder="e.g. Inverter VRV / VRF Systems"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={solForm.category}
                    onChange={(e) => setSolForm({ ...solForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    placeholder="e.g. Commercial & Multi-Zone"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Detailed Solution Description
                </label>
                <textarea
                  rows={3}
                  value={solForm.description}
                  onChange={(e) => setSolForm({ ...solForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none focus:border-cyan-400"
                  placeholder="Engineered variable refrigerant volume technology delivering simultaneous cooling..."
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Benefits & Specifications (one per line)
                </label>
                <textarea
                  rows={4}
                  value={solForm.benefitsText}
                  onChange={(e) => setSolForm({ ...solForm, benefitsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono focus:border-cyan-400"
                  placeholder="Inverter-driven scroll compressors&#10;Individual temperature control per zone&#10;Up to 45% lower operational energy cost"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Publish Status</label>
                <select
                  value={solForm.status}
                  onChange={(e) =>
                    setSolForm({ ...solForm, status: e.target.value as 'published' | 'draft' })
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
                  onClick={() => setSolModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/20"
                >
                  {editingSolId ? 'Save Changes' : 'Publish Solution'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          MODAL: ADD / EDIT IMPLEMENTED PROJECT (WITH PHOTO)
          ================================================== */}
      {projModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base font-outfit">
                  {editingProjId ? 'Edit Implemented Project' : 'Add New Implemented Project'}
                </h3>
              </div>
              <button
                onClick={() => setProjModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
              {/* Photo Option Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Project Photography / Site Photo</span>
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Live in 'Our Projects' on Solutions Page
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Photo Preview Box */}
                  <div className="md:col-span-4 h-28 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    {projForm.imageUrl ? (
                      <img
                        src={projForm.imageUrl}
                        alt="Project Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-500 flex flex-col items-center gap-1 text-[10px]">
                        <ImageIcon className="w-6 h-6 text-slate-600" />
                        <span>No Photo Selected</span>
                      </div>
                    )}
                  </div>

                  {/* URL or Upload */}
                  <div className="md:col-span-8 space-y-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">
                        Image URL (HTTPS link or CDN)
                      </label>
                      <input
                        type="url"
                        value={projForm.imageUrl}
                        onChange={(e) => setProjForm({ ...projForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-[11px] outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold cursor-pointer border border-slate-700 transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Project Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProjectFileUpload}
                          className="hidden"
                        />
                      </label>
                      {projForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setProjForm({ ...projForm, imageUrl: '' })}
                          className="text-[11px] text-rose-400 hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Presets Gallery */}
                <div className="pt-2 border-t border-slate-900">
                  <div className="text-[10px] text-slate-400 mb-1.5 font-semibold">
                    Or pick project sector presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PROJECT_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setProjForm({ ...projForm, imageUrl: preset.url })}
                        className={`px-2 py-1 rounded text-[10px] border transition ${
                          projForm.imageUrl === preset.url
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Project / Case Title *
                  </label>
                  <input
                    type="text"
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. IT Park 450 HP VRV Installation"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    value={projForm.sector}
                    onChange={(e) => setProjForm({ ...projForm, sector: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. Corporate Offices / Healthcare"
                    required
                  />
                </div>
              </div>

              {/* Client Name & Linked Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Client / Site Name
                  </label>
                  <input
                    type="text"
                    value={projForm.clientName}
                    onChange={(e) => setProjForm({ ...projForm, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. Tech Mahindra Campus / Apollo"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Linked Solution
                  </label>
                  <select
                    value={projForm.solutionId}
                    onChange={(e) => setProjForm({ ...projForm, solutionId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                  >
                    {solutions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Project Overview & Scope
                </label>
                <textarea
                  rows={3}
                  value={projForm.description}
                  onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none focus:border-emerald-400"
                  placeholder="Engineered and commissioned a multi-tier VRV architecture with precision zone modulation..."
                />
              </div>

              {/* Key Deliverables & Specifications */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Deliverables & Specifications (one per line)
                </label>
                <textarea
                  rows={4}
                  value={projForm.bulletsText}
                  onChange={(e) => setProjForm({ ...projForm, bulletsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono focus:border-emerald-400"
                  placeholder="VRV / VRF Systems (450 HP)&#10;Acoustic Ducting & Linear Diffusers&#10;Centralized BMS IoT Monitoring"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Publish Status</label>
                <select
                  value={projForm.status}
                  onChange={(e) =>
                    setProjForm({ ...projForm, status: e.target.value as 'published' | 'draft' })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                >
                  <option value="published">Published (Visible on Website)</option>
                  <option value="draft">Draft (Admin Only)</option>
                </select>
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setProjModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  {editingProjId ? 'Save Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSolutionsPage;
