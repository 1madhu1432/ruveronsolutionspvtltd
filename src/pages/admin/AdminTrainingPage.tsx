import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon,
  Upload,
  Search,
  Users,
  Award,
  Calendar,
  Clock,
  Download,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { TrainingProgramItem, TrainingEnrollmentItem } from '../../types';

// Curated training photography presets
const TRAINING_PHOTO_PRESETS = [
  { label: 'VRV / VRF Engineering Lab', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'HVAC Workshop Hands-on', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Corporate HR & Compliance', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Digital Payroll Masterclass', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cleanroom AHU Engineering', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Industrial Automation Lab', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
];

export const AdminTrainingPage: React.FC = () => {
  const {
    trainingPrograms,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
    trainingEnrollments,
    updateEnrollmentStatus,
    deleteTrainingEnrollment,
  } = useData();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'programs' | 'enrollments'>('programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State for Program
  const [progModalOpen, setProgModalOpen] = useState(false);
  const [editingProgId, setEditingProgId] = useState<string | null>(null);
  const [progForm, setProgForm] = useState({
    title: '',
    category: 'HVAC & Climate Engineering',
    duration: '8 Weeks',
    mode: 'Hybrid' as 'Offline' | 'Online' | 'Hybrid',
    level: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Diploma',
    imageUrl: '',
    description: '',
    modulesText: '',
    certification: 'Ruveron Certified Skill Certificate',
    eligibility: 'ITI / Diploma / Any Graduate',
    placementAssistance: true,
    upcomingBatchDate: '1st & 15th of Every Month',
    fee: '₹12,000',
    status: 'published' as 'published' | 'draft',
  });

  const handleOpenAdd = () => {
    setEditingProgId(null);
    setProgForm({
      title: '',
      category: 'HVAC & Climate Engineering',
      duration: '8 Weeks (Hybrid)',
      mode: 'Hybrid',
      level: 'Intermediate',
      imageUrl: TRAINING_PHOTO_PRESETS[0].url,
      description: '',
      modulesText: 'Thermodynamics & System Fundamentals\nPractical Diagnostics & Fault Finding\nOEM Standard Commissioning Protocols',
      certification: 'Ruveron Industry-Ready Certified Specialist',
      eligibility: 'ITI / Diploma / BE / Any Graduate',
      placementAssistance: true,
      upcomingBatchDate: '1st & 15th of Every Month',
      fee: '₹15,000',
      status: 'published',
    });
    setProgModalOpen(true);
  };

  const handleOpenEdit = (prog: TrainingProgramItem) => {
    setEditingProgId(prog.id);
    setProgForm({
      title: prog.title,
      category: prog.category,
      duration: prog.duration,
      mode: prog.mode,
      level: prog.level,
      imageUrl: prog.imageUrl,
      description: prog.description,
      modulesText: prog.modules.join('\n'),
      certification: prog.certification,
      eligibility: prog.eligibility,
      placementAssistance: prog.placementAssistance,
      upcomingBatchDate: prog.upcomingBatchDate || '',
      fee: prog.fee || '',
      status: prog.status,
    });
    setProgModalOpen(true);
  };

  const handleSubmitProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const modules = progForm.modulesText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const payload = {
      title: progForm.title,
      category: progForm.category,
      duration: progForm.duration,
      mode: progForm.mode,
      level: progForm.level,
      imageUrl: progForm.imageUrl,
      description: progForm.description,
      modules,
      certification: progForm.certification,
      eligibility: progForm.eligibility,
      placementAssistance: progForm.placementAssistance,
      upcomingBatchDate: progForm.upcomingBatchDate,
      fee: progForm.fee,
      status: progForm.status,
    };

    if (editingProgId) {
      updateTrainingProgram(editingProgId, payload);
    } else {
      addTrainingProgram(payload);
    }
    setProgModalOpen(false);
  };

  const togglePublish = (prog: TrainingProgramItem) => {
    updateTrainingProgram(prog.id, {
      status: prog.status === 'published' ? 'draft' : 'published',
    });
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProgForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Export Enrollments to CSV
  const handleExportEnrollments = () => {
    const headers = ['ID,Program Title,Full Name,Email,Phone,Qualification,City,Status,Enrolled Date'];
    const rows = trainingEnrollments.map((enr) =>
      [
        `"${enr.id}"`,
        `"${enr.programTitle.replace(/"/g, '""')}"`,
        `"${enr.fullName.replace(/"/g, '""')}"`,
        `"${enr.email}"`,
        `"${enr.phone}"`,
        `"${enr.qualification}"`,
        `"${enr.city}"`,
        `"${enr.status}"`,
        `"${enr.enrolledAt.split('T')[0]}"`,
      ].join(',')
    );

    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ruveron_skill_enrollments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtering
  const filteredPrograms = trainingPrograms.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchQuery && matchCat;
  });

  const filteredEnrollments = trainingEnrollments.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.fullName.toLowerCase().includes(q) ||
      e.programTitle.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q)
    );
  });

  const uniqueCategories = Array.from(new Set(trainingPrograms.map((p) => p.category)));
  const newEnrollmentsCount = trainingEnrollments.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 font-outfit">
            <GraduationCap className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span>Skill Development & Corporate Training Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage certified technical skill courses, curriculum modules, photo assets, batches, and candidate applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportEnrollments}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Inquiries</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add Training Program</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          STATS CARDS ROW
          ================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono">{trainingPrograms.length}</div>
            <div className="text-xs text-slate-400">Total Skill Programs</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <span>{trainingEnrollments.length}</span>
              {newEnrollmentsCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold">
                  {newEnrollmentsCount} New
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">Trainee Inquiries</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono">100%</div>
            <div className="text-xs text-slate-400">Placement Assistance</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white font-mono truncate">1st & 15th</div>
            <div className="text-xs text-slate-400">Upcoming Batches</div>
          </div>
        </div>
      </div>

      {/* ==================================================
          NAVIGATION TABS & SEARCH
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-slate-900 border border-slate-800 rounded-2xl">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'programs'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Training Programs</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {trainingPrograms.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'enrollments'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Candidate Inquiries</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
              {trainingEnrollments.length}
            </span>
          </button>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center gap-2">
          {activeTab === 'programs' && (
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 outline-none focus:border-emerald-500/50"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'programs' ? 'Search programs...' : 'Search candidates...'}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          TAB 1: TRAINING PROGRAMS TABLE
          ================================================== */}
      {activeTab === 'programs' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Photo</th>
                  <th className="p-3.5">Program Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Duration & Mode</th>
                  <th className="p-3.5">Modules</th>
                  <th className="p-3.5">Batch & Fee</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="hover:bg-slate-900/60 transition">
                    {/* Thumbnail Photo */}
                    <td className="p-3.5 w-16">
                      <div className="w-16 h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative group">
                        {prog.imageUrl ? (
                          <img
                            src={prog.imageUrl}
                            alt={prog.title}
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
                      <div className="font-bold text-white text-sm">{prog.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                        {prog.description}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                        {prog.certification}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-medium">
                        {prog.category}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{prog.duration}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Mode: <strong className="text-white">{prog.mode}</strong> | Level: {prog.level}
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        {prog.modules.length} Modules
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300 space-y-0.5">
                      <div className="font-semibold text-white">{prog.fee || 'Contact'}</div>
                      <div className="text-[10px] text-slate-400">{prog.upcomingBatchDate || 'Ongoing'}</div>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => togglePublish(prog)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
                          prog.status === 'published'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {prog.status === 'published' ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        <span>{prog.status}</span>
                      </button>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(prog)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                          title="Edit Program"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete program "${prog.title}"?`)) {
                              deleteTrainingProgram(prog.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                          title="Delete Program"
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
          TAB 2: CANDIDATE ENROLLMENTS TABLE
          ================================================== */}
      {activeTab === 'enrollments' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Candidate Name</th>
                  <th className="p-3.5">Selected Program</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Location & Qualification</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredEnrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{enr.fullName}</div>
                      {enr.message && (
                        <div className="text-[11px] text-slate-400 line-clamp-1 italic max-w-xs mt-0.5">
                          "{enr.message}"
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-cyan-300 line-clamp-1 max-w-xs">
                        {enr.programTitle}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono space-y-0.5">
                      <div className="text-white">{enr.phone}</div>
                      <div className="text-slate-400 text-[11px]">{enr.email}</div>
                    </td>

                    <td className="p-3.5 text-slate-300 space-y-0.5">
                      <div className="font-medium text-white">{enr.city}</div>
                      <div className="text-[11px] text-slate-400">{enr.qualification}</div>
                    </td>

                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                      {enr.enrolledAt.split('T')[0]}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={enr.status}
                        onChange={(e) =>
                          updateEnrollmentStatus(
                            enr.id,
                            e.target.value as TrainingEnrollmentItem['status']
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider outline-none border transition ${
                          enr.status === 'New'
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                            : enr.status === 'Contacted'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : enr.status === 'Enrolled'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-900 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete inquiry for "${enr.fullName}"?`)) {
                            deleteTrainingEnrollment(enr.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================
          ADD / EDIT TRAINING PROGRAM MODAL
          ================================================== */}
      {progModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 text-white shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base font-outfit">
                  {editingProgId ? 'Edit Skill Training Program' : 'Add New Skill Training Program'}
                </h3>
              </div>
              <button
                onClick={() => setProgModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProgram} className="space-y-4 text-xs">
              {/* Photo Option Section */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Course Banner / Lab Photo</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Live on Public Training Page</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* Photo Preview Box */}
                  <div className="md:col-span-4 h-28 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    {progForm.imageUrl ? (
                      <img
                        src={progForm.imageUrl}
                        alt="Course Preview"
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
                        value={progForm.imageUrl}
                        onChange={(e) => setProgForm({ ...progForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-[11px] outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold cursor-pointer border border-slate-700 transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Lab Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {progForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setProgForm({ ...progForm, imageUrl: '' })}
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
                    Or select from skill lab presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TRAINING_PHOTO_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setProgForm({ ...progForm, imageUrl: preset.url })}
                        className={`px-2 py-1 rounded text-[10px] border transition ${
                          progForm.imageUrl === preset.url
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

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    value={progForm.title}
                    onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. Advanced VRV / VRF System Design"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category *</label>
                  <input
                    type="text"
                    value={progForm.category}
                    onChange={(e) => setProgForm({ ...progForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. HVAC & Climate Engineering"
                    required
                  />
                </div>
              </div>

              {/* Duration, Mode, Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. 8 Weeks (Hybrid)"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Learning Mode</label>
                  <select
                    value={progForm.mode}
                    onChange={(e) =>
                      setProgForm({
                        ...progForm,
                        mode: e.target.value as 'Offline' | 'Online' | 'Hybrid',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                  >
                    <option value="Hybrid">Hybrid (Classroom + Labs)</option>
                    <option value="Offline">Offline (Hands-on Workshop)</option>
                    <option value="Online">Online (Live Virtual)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Level</label>
                  <select
                    value={progForm.level}
                    onChange={(e) =>
                      setProgForm({
                        ...progForm,
                        level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Diploma',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                  >
                    <option value="Beginner">Beginner / Foundation</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced Specialist</option>
                    <option value="Diploma">Professional Diploma</option>
                  </select>
                </div>
              </div>

              {/* Certification & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Certification Awarded
                  </label>
                  <input
                    type="text"
                    value={progForm.certification}
                    onChange={(e) => setProgForm({ ...progForm, certification: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. Ruveron Certified Specialist"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eligibility</label>
                  <input
                    type="text"
                    value={progForm.eligibility}
                    onChange={(e) => setProgForm({ ...progForm, eligibility: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. ITI / Diploma / Any Graduate"
                  />
                </div>
              </div>

              {/* Batch Date & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Upcoming Batch Starting
                  </label>
                  <input
                    type="text"
                    value={progForm.upcomingBatchDate}
                    onChange={(e) => setProgForm({ ...progForm, upcomingBatchDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. 1st & 15th of Every Month"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Course Fee</label>
                  <input
                    type="text"
                    value={progForm.fee}
                    onChange={(e) => setProgForm({ ...progForm, fee: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                    placeholder="e.g. ₹15,000 (Scholarships Available)"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Program Description & Objectives
                </label>
                <textarea
                  rows={3}
                  value={progForm.description}
                  onChange={(e) => setProgForm({ ...progForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none focus:border-emerald-400"
                  placeholder="Master advanced vocational HVAC engineering with hands-on lab training..."
                />
              </div>

              {/* Modules / Syllabus */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Curriculum Modules / Syllabus (one per line)
                </label>
                <textarea
                  rows={4}
                  value={progForm.modulesText}
                  onChange={(e) => setProgForm({ ...progForm, modulesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono focus:border-emerald-400"
                  placeholder="Module 1: Thermodynamics & Refrigeration Cycle&#10;Module 2: Inverter Scroll Compressors & Modbus&#10;Module 3: Commissioning & Deep Vacuumization"
                />
              </div>

              {/* Placement Assistance & Publish Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <input
                    type="checkbox"
                    checked={progForm.placementAssistance}
                    onChange={(e) =>
                      setProgForm({ ...progForm, placementAssistance: e.target.checked })
                    }
                    className="rounded text-emerald-500 focus:ring-0 w-4 h-4 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">100% Placement Support</div>
                    <div className="text-[10px] text-slate-400">
                      Include Ruveron Corporate Partner Network badge
                    </div>
                  </div>
                </label>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Publish Status</label>
                  <select
                    value={progForm.status}
                    onChange={(e) =>
                      setProgForm({
                        ...progForm,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-400"
                  >
                    <option value="published">Published (Visible on Website)</option>
                    <option value="draft">Draft (Admin Only)</option>
                  </select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setProgModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  {editingProgId ? 'Save Program' : 'Publish Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrainingPage;
