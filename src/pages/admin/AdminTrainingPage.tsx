import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Users,
  Award,
  Calendar,
  Clock,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Check,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type {
  TrainingProgramItem,
  TrainingBatch,
  EnrollmentProgressStatus,
  BatchStatus,
} from '../../types';

export const AdminTrainingPage: React.FC = () => {
  const {
    trainingPrograms,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
    trainingEnrollments,
    updateEnrollmentStatus,
    deleteTrainingEnrollment,
    trainingBatches,
    trainingBatchSlots,
    addTrainingBatch,
    updateTrainingBatch,
    deleteTrainingBatch,
    addTrainingBatchSlot,
    bulkImportStudents,
  } = useData();

  // Active Tab: 'dashboard' | 'batches' | 'bulk-import' | 'programs' | 'inquiries'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'batches' | 'bulk-import' | 'programs' | 'inquiries'>('dashboard');

  // Global Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState('all');
  const [completionFilter, setCompletionFilter] = useState('all');

  // ==========================================
  // BATCH MANAGEMENT STATE (Module 8.3)
  // ==========================================
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [newSlotInput, setNewSlotInput] = useState('');
  const [showAddSlotInput, setShowAddSlotInput] = useState(false);

  const [batchForm, setBatchForm] = useState({
    batchName: '',
    slot: '1st Batch',
    courseId: trainingPrograms[0]?.id || 'prog-hvac-01',
    courseTitle: trainingPrograms[0]?.title || 'HVAC & Refrigeration Specialist',
    startDate: '2026-12-01',
    endDate: '2027-01-25',
    capacity: 30,
    enrolledCount: 0,
    location: 'Vijayawada Technical Engineering Lab',
    status: 'Open' as BatchStatus,
    trainerName: 'P. Sudhakar (Ex-Voltas Specialist)',
  });

  // ==========================================
  // BULK IMPORT STATE (Module 8.2)
  // ==========================================
  const [importFileName, setImportFileName] = useState('');
  const [previewRecords, setPreviewRecords] = useState<Array<{
    fullName: string;
    email: string;
    phone: string;
    courseTitle: string;
    batchName: string;
    qualification: string;
    city: string;
    isValid: boolean;
    isDuplicate: boolean;
    errors: string[];
  }>>([]);
  const [importSuccessAlert, setImportSuccessAlert] = useState(false);

  // ==========================================
  // COURSE PROGRAM MODAL STATE
  // ==========================================
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
    fee: '₹15,000',
    status: 'published' as 'published' | 'draft',
  });

  // ==========================================
  // DASHBOARD COMPUTED METRICS (Module 8.1)
  // ==========================================
  const totalStudents = trainingEnrollments.length;
  const inTrainingStudents = trainingEnrollments.filter(
    (e) => e.status === 'In Training' || e.status === 'Enrolled'
  ).length;
  const completedStudents = trainingEnrollments.filter((e) => e.status === 'Completed').length;
  const placedStudents = trainingEnrollments.filter((e) => e.status === 'Placed').length;
  const placementRate = totalStudents > 0 ? ((placedStudents / Math.max(completedStudents + placedStudents, 1)) * 100).toFixed(1) : '94.8';

  // Batch utilization breakdown
  const batchStats = useMemo(() => {
    return trainingBatches.map((b) => {
      const studentsInBatch = trainingEnrollments.filter(
        (e) => e.batchName === b.batchName || e.programTitle === b.courseTitle
      ).length;
      const utilization = Math.min(Math.round((studentsInBatch / b.capacity) * 100), 100);
      return {
        ...b,
        currentEnrolled: studentsInBatch,
        utilization,
      };
    });
  }, [trainingBatches, trainingEnrollments]);

  // Filtered Enrollments List for Dashboard & Inquiries
  const filteredEnrollments = useMemo(() => {
    return trainingEnrollments.filter((enr) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        enr.fullName.toLowerCase().includes(q) ||
        enr.email.toLowerCase().includes(q) ||
        enr.phone.toLowerCase().includes(q) ||
        enr.programTitle.toLowerCase().includes(q) ||
        (enr.city && enr.city.toLowerCase().includes(q));

      const matchesBatch = batchFilter === 'all' || enr.batchName === batchFilter;
      const matchesCourse = courseFilter === 'all' || enr.programTitle === courseFilter;
      const matchesStatus = enrollmentStatusFilter === 'all' || enr.status === enrollmentStatusFilter;

      let matchesCompletion = true;
      if (completionFilter === 'completed') matchesCompletion = enr.status === 'Completed' || enr.status === 'Placed';
      else if (completionFilter === 'active') matchesCompletion = enr.status === 'In Training' || enr.status === 'Enrolled';

      return matchesSearch && matchesBatch && matchesCourse && matchesStatus && matchesCompletion;
    });
  }, [trainingEnrollments, searchTerm, batchFilter, courseFilter, enrollmentStatusFilter, completionFilter]);

  // ==========================================
  // BULK IMPORT LOGIC (Module 8.2)
  // ==========================================
  const handleDownloadSampleTemplate = () => {
    const csvContent = [
      'Full Name,Email,Phone,Course Title,Batch Slot,Qualification,City',
      'Anand Varma,anand.varma@gmail.com,9848011223,HVAC & Commercial Air Conditioning Specialist,1st Batch,Diploma Mechanical,Vijayawada',
      'K. Sai Krishna,krishna.sai@yahoo.com,9849022334,VRV & VRF Diagnostic & Installation Engineering,15th Batch,B.Tech EEE,Guntur',
      'M. Sneha Latha,sneha.latha@outlook.com,9848533445,Corporate HR Management & Statutory Labor Compliance,1st Batch,MBA HR,Hyderabad',
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ruveron_student_bulk_import_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length <= 1) return;

      const records = [];
      const existingEmails = new Set(trainingEnrollments.map((e) => e.email.toLowerCase()));
      const existingPhones = new Set(trainingEnrollments.map((e) => e.phone.replace(/\D/g, '')));

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
        const fullName = parts[0] || '';
        const email = parts[1] || '';
        const phone = parts[2] || '';
        const courseTitle = parts[3] || 'HVAC & Commercial Air Conditioning Specialist';
        const batchName = parts[4] || '1st Batch';
        const qualification = parts[5] || 'Diploma';
        const city = parts[6] || 'Vijayawada';

        const errors: string[] = [];
        if (!fullName) errors.push('Full Name missing');
        if (!email || !email.includes('@')) errors.push('Valid Email missing');
        if (!phone || phone.length < 10) errors.push('10-digit Phone missing');
        if (!courseTitle) errors.push('Course Title missing');

        const isDuplicate = existingEmails.has(email.toLowerCase()) || existingPhones.has(phone.replace(/\D/g, ''));
        if (isDuplicate) errors.push('Duplicate student (matches existing email or phone)');

        records.push({
          fullName,
          email,
          phone,
          courseTitle,
          batchName,
          qualification,
          city,
          isValid: errors.length === 0,
          isDuplicate,
          errors,
        });
      }

      setPreviewRecords(records);
    };
    reader.readAsText(file);
  };

  const handleConfirmBulkImport = () => {
    const validRecords = previewRecords.filter((r) => r.isValid && !r.isDuplicate);
    if (validRecords.length === 0) {
      alert('No valid non-duplicate records to import.');
      return;
    }

    const payload = validRecords.map((r, i) => ({
      programId: `prog-${Date.now()}-${i}`,
      programTitle: r.courseTitle,
      batchName: r.batchName,
      fullName: r.fullName,
      email: r.email,
      phone: r.phone,
      qualification: r.qualification,
      city: r.city,
      state: 'Andhra Pradesh',
      status: 'Enrolled' as EnrollmentProgressStatus,
    }));

    bulkImportStudents(payload);
    setImportSuccessAlert(true);
    setPreviewRecords([]);
    setImportFileName('');
    setTimeout(() => {
      setImportSuccessAlert(false);
      setActiveTab('dashboard');
    }, 2500);
  };

  // ==========================================
  // BATCH MODAL ACTIONS (Module 8.3)
  // ==========================================
  const handleOpenAddBatch = () => {
    setEditingBatchId(null);
    setBatchForm({
      batchName: `${trainingPrograms[0]?.title || 'HVAC Specialist'} - Batch ${trainingBatches.length + 1}`,
      slot: trainingBatchSlots[0] || '1st Batch',
      courseId: trainingPrograms[0]?.id || 'prog-01',
      courseTitle: trainingPrograms[0]?.title || 'HVAC & Climate Engineering',
      startDate: '2026-12-01',
      endDate: '2027-01-25',
      capacity: 30,
      enrolledCount: 0,
      location: 'Vijayawada Technical Engineering Lab',
      status: 'Open',
      trainerName: 'P. Sudhakar (Ex-Voltas Senior Specialist)',
    });
    setBatchModalOpen(true);
  };

  const handleOpenEditBatch = (b: TrainingBatch) => {
    setEditingBatchId(b.id);
    setBatchForm({
      batchName: b.batchName,
      slot: b.batchSlot || b.slot || '1st Batch',
      courseId: b.courseId || '',
      courseTitle: b.courseTitle,
      startDate: b.startDate,
      endDate: b.endDate,
      capacity: b.capacity,
      enrolledCount: b.enrolledCount,
      location: b.location,
      status: b.status,
      trainerName: b.trainerName || '',
    });
    setBatchModalOpen(true);
  };

  const handleSubmitBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...batchForm,
      batchSlot: batchForm.slot,
    };
    if (editingBatchId) {
      updateTrainingBatch(editingBatchId, payload);
    } else {
      addTrainingBatch(payload);
    }
    setBatchModalOpen(false);
  };

  const handleAddNewSlot = () => {
    if (!newSlotInput.trim()) return;
    addTrainingBatchSlot(newSlotInput.trim());
    setBatchForm((prev) => ({ ...prev, slot: newSlotInput.trim() }));
    setNewSlotInput('');
    setShowAddSlotInput(false);
  };

  // ==========================================
  // PROGRAM MODAL ACTIONS
  // ==========================================
  const handleOpenAddProg = () => {
    setEditingProgId(null);
    setProgForm({
      title: '',
      category: 'HVAC & Climate Engineering',
      duration: '8 Weeks (Hybrid)',
      mode: 'Hybrid',
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
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

  const handleOpenEditProg = (prog: TrainingProgramItem) => {
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

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <GraduationCap className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span>Skill & Training Management Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Training performance dashboard, student bulk import, batch schedule management, and curriculum catalog.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('bulk-import')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Bulk Student Import</span>
          </button>

          <button
            onClick={handleOpenAddBatch}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Schedule New Batch</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'dashboard'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Training Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('batches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'batches'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Training Batches ({trainingBatches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bulk-import')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'bulk-import'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Student Bulk Import</span>
        </button>

        <button
          onClick={() => setActiveTab('programs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'programs'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Programs & Courses ({trainingPrograms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Candidate Inquiries ({trainingEnrollments.length})</span>
        </button>
      </div>

      {/* ==================================================
          TAB 1: TRAINING DASHBOARD (Module 8.1)
          ================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Statistics Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Enrolled</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">{totalStudents}</div>
              <div className="text-[10px] text-slate-500">All registered candidates</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>Currently Active</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">{inTrainingStudents}</div>
              <div className="text-[10px] text-emerald-500/80">Under active instruction</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-blue-400">
                <span>Completed Students</span>
                <Award className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-400">{completedStudents}</div>
              <div className="text-[10px] text-blue-500/80">Certified technicians</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-teal-400">
                <span>Placement Rate</span>
                <TrendingUp className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl font-black text-teal-400">{placementRate}%</div>
              <div className="text-[10px] text-teal-500/80">12,500+ placed across OEM</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-400">
                <span>Active Batches</span>
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400">{trainingBatches.length}</div>
              <div className="text-[10px] text-purple-500/80">1st & 15th cadence</div>
            </div>
          </div>

          {/* Batch-wise Statistics Breakdown Table */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  <span>Batch-Wise Enrollment & Capacity Statistics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track batch fill status, capacity limits, and current trainee distribution.
                </p>
              </div>

              <div className="text-xs text-slate-400">
                Total Batch Capacity: <strong className="text-white">{trainingBatches.reduce((a, b) => a + b.capacity, 0)} Seats</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batchStats.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase">
                        {b.batchSlot || b.slot}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{b.batchName}</h4>
                      <p className="text-[11px] text-slate-400">{b.courseTitle}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Open'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : b.status === 'Filling Fast'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>Enrollment</span>
                      <span>{b.currentEnrolled} / {b.capacity} seats ({b.utilization}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        style={{ width: `${b.utilization}%` }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-800/80">
                    <span>{b.startDate} to {b.endDate}</span>
                    <span className="truncate max-w-[130px]">{b.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filterable Student Enrollment Table (Module 8.1 Filters) */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>Enrolled Trainees Directory ({filteredEnrollments.length})</span>
              </h3>

              {/* Search & Filters for Batch, Course, Status, Completion */}
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search students..."
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none focus:border-cyan-400 placeholder:text-slate-500 w-36 sm:w-44"
                />
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none"
                >
                  <option value="all">All Batches</option>
                  {trainingBatchSlots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none"
                >
                  <option value="all">All Courses</option>
                  {trainingPrograms.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>

                <select
                  value={enrollmentStatusFilter}
                  onChange={(e) => setEnrollmentStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none"
                >
                  <option value="all">Enrollment Status</option>
                  <option value="New">New</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="In Training">In Training</option>
                  <option value="Completed">Completed</option>
                  <option value="Placed">Placed</option>
                </select>

                <select
                  value={completionFilter}
                  onChange={(e) => setCompletionFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 outline-none"
                >
                  <option value="all">Completion</option>
                  <option value="active">Active Learners</option>
                  <option value="completed">Completed / Placed</option>
                </select>
              </div>
            </div>

            {/* Trainees List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Course Enrolled</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Qualification</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredEnrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3">
                        <div className="font-bold text-white">{enr.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{enr.email} • {enr.phone}</div>
                      </td>
                      <td className="p-3 font-semibold text-cyan-300">{enr.programTitle}</td>
                      <td className="p-3 font-mono text-emerald-400">{enr.batchName || '1st Batch'}</td>
                      <td className="p-3 text-slate-300">{enr.qualification || 'Diploma'}</td>
                      <td className="p-3">
                        <select
                          value={enr.status}
                          onChange={(e) => updateEnrollmentStatus(enr.id, e.target.value as any)}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-bold text-emerald-300 outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="In Training">In Training</option>
                          <option value="Completed">Completed</option>
                          <option value="Placed">Placed</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove enrollment for ${enr.fullName}?`)) {
                              deleteTrainingEnrollment(enr.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/60"
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
        </div>
      )}

      {/* ==================================================
          TAB 2: TRAINING BATCH ENROLLMENT (Module 8.3)
          ================================================== */}
      {activeTab === 'batches' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-sm font-outfit">Batch Scheduling & Slot Management</h3>
              <p className="text-xs text-slate-400">Configure recurring 1st & 15th batch dates, seat capacities, and instructors.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddBatch}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create Batch</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Batch Slot</th>
                    <th className="p-3.5">Batch Name</th>
                    <th className="p-3.5">Course</th>
                    <th className="p-3.5">Duration Schedule</th>
                    <th className="p-3.5">Capacity</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {trainingBatches.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5 font-bold font-mono text-emerald-400">{b.batchSlot || b.slot}</td>
                      <td className="p-3.5 font-bold text-white">{b.batchName}</td>
                      <td className="p-3.5 font-semibold text-cyan-300">{b.courseTitle}</td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">{b.startDate} to {b.endDate}</td>
                      <td className="p-3.5 font-mono text-slate-300">{b.enrolledCount} / {b.capacity} Seats</td>
                      <td className="p-3.5 text-slate-300">{b.location}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditBatch(b)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="Edit Batch"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete batch "${b.batchName}"?`)) {
                                deleteTrainingBatch(b.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                            title="Delete Batch"
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
        </div>
      )}

      {/* ==================================================
          TAB 3: STUDENT BULK IMPORT (Module 8.2)
          ================================================== */}
      {activeTab === 'bulk-import' && (
        <div className="space-y-6">
          {importSuccessAlert && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span className="font-semibold">
                Student records successfully imported and assigned to training batches!
              </span>
            </div>
          )}

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  <span>Student Bulk Import (Excel & CSV)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload trainee cohorts, validate mandatory fields (Name, Email, Phone, Course), and detect duplicate entries.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadSampleTemplate}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Sample Template (.CSV)</span>
              </button>
            </div>

            {/* Upload Drag & Drop Area */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-400 bg-slate-900/40 text-center space-y-3 relative group transition">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 text-emerald-400 mx-auto group-hover:scale-110 transition" />
              <div>
                <p className="text-sm font-bold text-white">
                  {importFileName ? `Selected: ${importFileName}` : 'Click or Drag & Drop Excel / CSV Student File'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supported formats: .CSV, .XLSX (Max file size 10 MB)
                </p>
              </div>
            </div>

            {/* Preview of Imported Records with Validation */}
            {previewRecords.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-white">Preview Summary:</span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                      {previewRecords.length} Total Records
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold">
                      {previewRecords.filter((r) => r.isValid && !r.isDuplicate).length} Valid
                    </span>
                    <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-mono font-bold">
                      {previewRecords.filter((r) => !r.isValid || r.isDuplicate).length} Duplicate / Errors
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmBulkImport}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:opacity-95"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm & Import Valid Students</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-72">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="p-3">Full Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Course</th>
                        <th className="p-3">Batch</th>
                        <th className="p-3">Validation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950">
                      {previewRecords.map((rec, idx) => (
                        <tr key={idx} className={rec.isValid && !rec.isDuplicate ? '' : 'bg-rose-950/20'}>
                          <td className="p-3 font-bold text-white">{rec.fullName || '<Missing>'}</td>
                          <td className="p-3 font-mono text-slate-300">{rec.email || '<Missing>'}</td>
                          <td className="p-3 font-mono text-slate-300">{rec.phone || '<Missing>'}</td>
                          <td className="p-3 text-cyan-300">{rec.courseTitle}</td>
                          <td className="p-3 font-mono text-emerald-400">{rec.batchName}</td>
                          <td className="p-3">
                            {rec.isValid && !rec.isDuplicate ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Ready to Import</span>
                              </span>
                            ) : (
                              <span className="text-rose-400 font-bold flex items-center gap-1 text-[11px]" title={rec.errors.join(', ')}>
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate max-w-[160px]">{rec.errors.join(', ')}</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 4: PROGRAMS & COURSES CATALOG
          ================================================== */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-sm font-outfit">Curriculum & Course Programs</h3>
              <p className="text-xs text-slate-400">Manage technical course titles, modules, photos, and public fees.</p>
            </div>

            <button
              onClick={handleOpenAddProg}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainingPrograms.map((prog) => (
              <div key={prog.id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <div className="h-36 relative overflow-hidden bg-slate-900">
                    <img src={prog.imageUrl} alt={prog.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-emerald-300 font-mono text-[10px] font-bold">
                      {prog.mode}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-white text-sm font-outfit">{prog.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{prog.description}</p>
                    <div className="text-[11px] text-cyan-400 font-mono">Fee: {prog.fee || '₹15,000'} • {prog.duration}</div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500">{prog.category}</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => handleOpenEditProg(prog)} className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 hover:bg-slate-800">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete program "${prog.title}"?`)) {
                          deleteTrainingProgram(prog.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-rose-950"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 5: CANDIDATE INQUIRIES
          ================================================== */}
      {activeTab === 'inquiries' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm font-outfit">Website Training Batch Inquiries</h3>
            <span className="text-xs text-slate-400 font-mono">{trainingEnrollments.length} inquiries received</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Candidate Name</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">State / City</th>
                  <th className="p-3">Qualification</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trainingEnrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3">
                      <div className="font-bold text-white">{enr.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{enr.email} • {enr.phone}</div>
                    </td>
                    <td className="p-3 font-semibold text-cyan-300">{enr.programTitle}</td>
                    <td className="p-3 text-slate-300">{enr.city}, {enr.state || 'AP'}</td>
                    <td className="p-3 text-slate-300">{enr.qualification || 'Diploma'}</td>
                    <td className="p-3">
                      <select
                        value={enr.status}
                        onChange={(e) => updateEnrollmentStatus(enr.id, e.target.value as any)}
                        className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-emerald-300 outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="In Training">In Training</option>
                        <option value="Completed">Completed</option>
                        <option value="Placed">Placed</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete inquiry from ${enr.fullName}?`)) {
                            deleteTrainingEnrollment(enr.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/60"
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
          MODAL: ADD / EDIT TRAINING BATCH (Module 8.3)
          ================================================== */}
      {batchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-outfit">
                {editingBatchId ? 'Edit Training Batch' : 'Schedule New Training Batch'}
              </h3>
              <button onClick={() => setBatchModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitBatch} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Batch Name *</label>
                <input
                  type="text"
                  value={batchForm.batchName}
                  onChange={(e) => setBatchForm({ ...batchForm, batchName: e.target.value })}
                  placeholder="e.g. HVAC Specialist - Dec 2026 Cohort"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* Batch Slot Selection with Option to Add New Slot */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">Batch Slot *</label>
                  <button
                    type="button"
                    onClick={() => setShowAddSlotInput(!showAddSlotInput)}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    + Add New Batch Slot
                  </button>
                </div>

                {showAddSlotInput && (
                  <div className="flex gap-2 mb-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <input
                      type="text"
                      value={newSlotInput}
                      onChange={(e) => setNewSlotInput(e.target.value)}
                      placeholder="e.g. Weekend Executive Batch"
                      className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddNewSlot}
                      className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-xs"
                    >
                      Save Slot
                    </button>
                  </div>
                )}

                <select
                  value={batchForm.slot}
                  onChange={(e) => setBatchForm({ ...batchForm, slot: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-500 font-mono font-bold"
                >
                  {trainingBatchSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Program *</label>
                <select
                  value={batchForm.courseTitle}
                  onChange={(e) => {
                    const sel = trainingPrograms.find((p) => p.title === e.target.value);
                    setBatchForm({
                      ...batchForm,
                      courseTitle: e.target.value,
                      courseId: sel?.id || 'prog-01',
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-500"
                >
                  {trainingPrograms.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={batchForm.startDate}
                    onChange={(e) => setBatchForm({ ...batchForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={batchForm.endDate}
                    onChange={(e) => setBatchForm({ ...batchForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Batch Capacity</label>
                  <input
                    type="number"
                    min="5"
                    value={batchForm.capacity}
                    onChange={(e) => setBatchForm({ ...batchForm, capacity: parseInt(e.target.value, 10) || 30 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Enrollment Status</label>
                  <select
                    value={batchForm.status}
                    onChange={(e) => setBatchForm({ ...batchForm, status: e.target.value as BatchStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-bold"
                  >
                    <option value="Open">Open</option>
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Training Location *</label>
                <input
                  type="text"
                  value={batchForm.location}
                  onChange={(e) => setBatchForm({ ...batchForm, location: e.target.value })}
                  placeholder="e.g. Vijayawada Technical Engineering Lab, Krishnalanka"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setBatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold transition shadow-md hover:opacity-95"
                >
                  {editingBatchId ? 'Update Batch' : 'Schedule Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          MODAL: ADD / EDIT COURSE PROGRAM
          ================================================== */}
      {progModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-outfit">
                {editingProgId ? 'Edit Course Program' : 'Add Course Program'}
              </h3>
              <button onClick={() => setProgModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProgram} className="space-y-4">
              <PhotoUploader
                value={progForm.imageUrl}
                onChange={(newImg) => setProgForm({ ...progForm, imageUrl: newImg })}
                label="Course Photography Banner (Upload Photo)"
                aspect="video"
                helpText="Upload practical workshop photo (PNG, JPG, WebP up to 10MB)"
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title *</label>
                <input
                  type="text"
                  value={progForm.title}
                  onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                  placeholder="e.g. VRV & VRF Diagnostic & Installation Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={progForm.category}
                    onChange={(e) => setProgForm({ ...progForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="HVAC & Climate Engineering">HVAC & Climate Engineering</option>
                    <option value="HR & Payroll Management">HR & Payroll Management</option>
                    <option value="Industrial Safety & Automation">Industrial Safety & Automation</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                    placeholder="e.g. 8 Weeks (Hybrid)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Course Fee</label>
                  <input
                    type="text"
                    value={progForm.fee}
                    onChange={(e) => setProgForm({ ...progForm, fee: e.target.value })}
                    placeholder="e.g. ₹15,000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Certification</label>
                  <input
                    type="text"
                    value={progForm.certification}
                    onChange={(e) => setProgForm({ ...progForm, certification: e.target.value })}
                    placeholder="e.g. NSDC Aligned Skill Certificate"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Description</label>
                <textarea
                  rows={3}
                  value={progForm.description}
                  onChange={(e) => setProgForm({ ...progForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Modules (One per line)</label>
                <textarea
                  rows={3}
                  value={progForm.modulesText}
                  onChange={(e) => setProgForm({ ...progForm, modulesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setProgModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
