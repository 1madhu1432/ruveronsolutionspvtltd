import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  X,
  FileText,
  UserCheck,
  Download,
  Paperclip,
  CheckCircle2,
  Mail,
  Send,
  Search,
  Clock,
  Ban,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { CareerJob, JobApplication, ApplicationStatus, JobStatus } from '../../types';

export const AdminCareersPage: React.FC = () => {
  const {
    careers,
    addCareerJob,
    updateCareerJob,
    deleteCareerJob,
    jobApplications,
    updateApplicationStatus,
    deleteJobApplication,
  } = useData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications'>('dashboard');

  // Dashboard & Search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // Job Modal State
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Payroll Operations',
    location: 'Vijayawada, AP',
    type: 'Full-Time' as 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote',
    experience: '2-5 Years',
    salaryRange: '₹4.5 - ₹7.5 LPA',
    skillsRequiredText: 'PF, ESI, Labor Compliance, Excel, Tally',
    deadline: '2026-12-31',
    isInternship: false,
    description: '',
    requirementsText: '',
    responsibilitiesText: '',
    status: 'published' as JobStatus,
  });

  // Candidate Details Modal State
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // Email Notification Preview Modal State (Module 7.4)
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailCandidate, setEmailCandidate] = useState<JobApplication | null>(null);
  const [emailNewStatus, setEmailNewStatus] = useState<ApplicationStatus>('Shortlisted');
  const [emailPreviewSubject, setEmailPreviewSubject] = useState('');
  const [emailPreviewBody, setEmailPreviewBody] = useState('');
  const [emailSentAlert, setEmailSentAlert] = useState(false);

  // ==========================================
  // METRICS & STATS COMPUTATION (Module 7.3)
  // ==========================================
  const totalJobs = careers.length;
  const publishedJobs = careers.filter((j) => j.status === 'published').length;
  const draftJobs = careers.filter((j) => j.status === 'draft').length;
  const closedJobs = careers.filter((j) => j.status === 'closed').length;
  const totalApplications = jobApplications.length;

  // Monthly stats mock breakdown
  const monthlyStats = [
    { month: 'Jun', openings: 3, closures: 1 },
    { month: 'Jul', openings: 5, closures: 2 },
    { month: 'Aug', openings: 4, closures: 3 },
    { month: 'Sep', openings: 6, closures: 2 },
    { month: 'Oct', openings: 7, closures: 4 },
    { month: 'Nov', openings: 5, closures: 1 },
  ];

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return careers.filter((job) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesDept = departmentFilter === 'all' || job.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [careers, searchTerm, statusFilter, departmentFilter]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return jobApplications.filter((app) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        app.fullName.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobApplications, searchTerm, statusFilter]);

  // Handle Open Add Job
  const handleOpenAddJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: 'Payroll Operations',
      location: 'Vijayawada, AP',
      type: 'Full-Time',
      experience: '2-5 Years',
      salaryRange: '₹4.5 - ₹7.5 LPA',
      skillsRequiredText: 'PF, ESI, Labor Laws, Statutory Filing, Advanced Excel',
      deadline: '2026-12-31',
      isInternship: false,
      description: '',
      requirementsText: 'Bachelor’s degree or relevant diploma\nMinimum 2+ years of Indian statutory payroll experience\nExpertise in PF, ESI, PT, and TDS calculations',
      responsibilitiesText: 'Execute end-to-end client payroll cycles with 100% statutory precision\nCoordinate PF/ESI inspections and challan generation\nManage candidate queries and monthly salary disbursement registers',
      status: 'published',
    });
    setJobModalOpen(true);
  };

  // Handle Open Edit Job
  const handleOpenEditJob = (job: CareerJob) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salaryRange: job.salaryRange || '₹4.5 - ₹7.5 LPA',
      skillsRequiredText: job.skillsRequired ? job.skillsRequired.join(', ') : '',
      deadline: job.deadline || '2026-12-31',
      isInternship: job.isInternship || false,
      description: job.description,
      requirementsText: job.requirements.join('\n'),
      responsibilitiesText: job.responsibilities.join('\n'),
      status: job.status,
    });
    setJobModalOpen(true);
  };

  // Submit Job Form
  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = jobForm.requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const responsibilities = jobForm.responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const skillsRequired = jobForm.skillsRequiredText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      type: jobForm.type,
      experience: jobForm.experience,
      salaryRange: jobForm.salaryRange,
      skillsRequired,
      deadline: jobForm.deadline,
      isInternship: jobForm.isInternship,
      description: jobForm.description,
      requirements,
      responsibilities,
      status: jobForm.status,
    };

    if (editingJobId) {
      updateCareerJob(editingJobId, payload);
    } else {
      addCareerJob(payload);
    }
    setJobModalOpen(false);
  };

  // Application Status Change with Email Notification Trigger (Module 7.4)
  const handleStatusChange = (app: JobApplication, newStatus: ApplicationStatus) => {
    updateApplicationStatus(app.id, newStatus);

    if (newStatus === 'Shortlisted' || newStatus === 'Rejected') {
      setEmailCandidate(app);
      setEmailNewStatus(newStatus);

      if (newStatus === 'Shortlisted') {
        setEmailPreviewSubject(`Congratulations! Interview Shortlist for ${app.jobTitle} at Ruveron Solutions`);
        setEmailPreviewBody(`Dear ${app.fullName},\n\nWe are pleased to inform you that your application for the ${app.jobTitle} role at Ruveron Solutions Pvt. Ltd. has been SHORTLISTED.\n\nOur HR Operations team has reviewed your background and compensation details. We would like to invite you for a virtual technical evaluation round.\n\nNext Steps:\n1. Technical Discussion (Google Meet)\n2. HR Fitment Round\n\nPlease reply with your availability for this week.\n\nWarm regards,\nTalent Acquisition Team\nRuveron Solutions Pvt. Ltd.`);
      } else {
        setEmailPreviewSubject(`Application Update: ${app.jobTitle} at Ruveron Solutions`);
        setEmailPreviewBody(`Dear ${app.fullName},\n\nThank you for taking the time to apply for the ${app.jobTitle} position at Ruveron Solutions Pvt. Ltd.\n\nAfter careful consideration, our recruitment panel has decided to proceed with other candidates whose profiles align more closely with our current requirements.\n\nWe will retain your resume in our talent database for future corporate openings that match your skills.\n\nWe wish you all the very best in your career pursuits.\n\nSincerely,\nHR Operations & Recruitment\nRuveron Solutions Pvt. Ltd.`);
      }

      setEmailModalOpen(true);
    }
  };

  // Mock Send Email Action
  const handleSendEmailNotification = () => {
    setEmailSentAlert(true);
    setTimeout(() => {
      setEmailSentAlert(false);
      setEmailModalOpen(false);
    }, 1800);
  };

  // Mock Download Candidate Resume
  const handleDownloadResume = (app: JobApplication) => {
    const filename = app.resumeFileName || `${app.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    const skillsText = Array.isArray(app.skills) ? app.skills.join(', ') : (app.skills || 'N/A');
    const content = app.resumeFileData || `CANDIDATE CURRICULUM VITAE\n\nFull Name: ${app.fullName}\nEmail: ${app.email}\nPhone: ${app.phone}\nDesignation: ${app.designationApplied || app.jobTitle}\nLocation: ${app.location || 'N/A'}\nExperience: ${app.experience}\nCurrent CTC: ${app.currentCtcFixed || 'N/A'} (Fixed) / ${app.currentCtcVariable || 'N/A'} (Variable)\nExpected CTC: ${app.expectedCtcFixed || 'N/A'} (Fixed) / ${app.expectedCtcVariable || 'N/A'} (Variable)\nSkills: ${skillsText}\nNotice Period: ${app.noticePeriod || 'Immediate'}\nCover Note:\n${app.coverNote || 'N/A'}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.endsWith('.pdf') ? filename : `${filename}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16 font-sans text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <Briefcase className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Careers, Recruitment & Job Inbox Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish openings, track monthly stats, manage candidate applications, review CTCs, and preview shortlist/rejection emails.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAddJob}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Opening</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'dashboard'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Jobs Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'jobs'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>Job Openings ({careers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span>Application Inbox ({jobApplications.length})</span>
        </button>
      </div>

      {/* ==================================================
          TAB 1: JOBS DASHBOARD (Module 7.3)
          ================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Openings</span>
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">{totalJobs}</div>
              <div className="text-[10px] text-slate-500">Corporate roles created</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span>Published Roles</span>
                <Eye className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">{publishedJobs}</div>
              <div className="text-[10px] text-emerald-500/80">Active on careers page</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-400">
                <span>Draft Openings</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">{draftJobs}</div>
              <div className="text-[10px] text-amber-500/80">Pending HR review</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-rose-400">
                <span>Position Closed</span>
                <Ban className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400">{closedJobs}</div>
              <div className="text-[10px] text-rose-500/80">Not accepting applications</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-400">
                <span>Applications</span>
                <UserCheck className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400">{totalApplications}</div>
              <div className="text-[10px] text-purple-500/80">Candidates registered</div>
            </div>
          </div>

          {/* Monthly Opening & Closure Statistics Chart Card */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-outfit flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Monthly Job Openings vs Closures Statistics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual recruitment velocity tracking new requisitions published vs positions filled/closed.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span>New Openings</span>
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span>Closed Positions</span>
                </span>
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="grid grid-cols-6 gap-4 pt-4 items-end min-h-[160px]">
              {monthlyStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1.5 h-32 w-full justify-center">
                    <div
                      style={{ height: `${stat.openings * 14}px` }}
                      className="w-4 sm:w-6 bg-cyan-500 rounded-t-lg transition-all duration-300 hover:brightness-110 relative group"
                      title={`${stat.openings} Openings`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-cyan-300">
                        {stat.openings}
                      </span>
                    </div>

                    <div
                      style={{ height: `${stat.closures * 14}px` }}
                      className="w-4 sm:w-6 bg-rose-500 rounded-t-lg transition-all duration-300 hover:brightness-110 relative group"
                      title={`${stat.closures} Closures`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-rose-300">
                        {stat.closures}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 font-mono">{stat.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          TAB 2: JOB OPENINGS LIST (Module 7.2)
          ================================================== */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, department, location..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Position Closed</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
              >
                <option value="all">All Departments</option>
                <option value="Executive Leadership">Executive Leadership</option>
                <option value="Payroll Operations">Payroll Operations</option>
                <option value="Statutory Compliance">Statutory Compliance</option>
                <option value="Technical Operations">Technical Operations</option>
                <option value="Training Academy">Training Academy</option>
              </select>
            </div>
          </div>

          {/* Job Openings Table */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Job Title</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Salary Range</th>
                    <th className="p-3.5">Deadline</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{job.title}</div>
                        <div className="text-[11px] text-cyan-400 font-medium">
                          {job.type} • {job.experience} {job.isInternship && '• Internship'}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                          {job.department}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300">{job.location}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">
                        {job.salaryRange || '₹4.5 - ₹7.0 LPA'}
                      </td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {job.deadline || '2026-12-31'}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                            job.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : job.status === 'closed'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {job.status === 'published' ? (
                            <Eye className="w-3 h-3" />
                          ) : job.status === 'closed' ? (
                            <Ban className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          <span>
                            {job.status === 'closed' ? 'Closed' : job.status}
                          </span>
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditJob(job)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="Edit Job Opening"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete job opening "${job.title}"?`)) {
                                deleteCareerJob(job.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                            title="Delete Job Opening"
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
          TAB 3: APPLICATION INBOX (Module 7.4)
          ================================================== */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidate name, job title, email, phone..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
              >
                <option value="all">All Application Statuses</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Candidate Name</th>
                    <th className="p-3.5">Applied Position</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Compensation (Exp Fixed)</th>
                    <th className="p-3.5">Resume File</th>
                    <th className="p-3.5">Application Date</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5 text-right">Candidate Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{app.fullName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{app.email} • {app.phone}</div>
                      </td>
                      <td className="p-3.5 font-semibold text-cyan-300">
                        {app.designationApplied || app.jobTitle}
                      </td>
                      <td className="p-3.5 text-slate-300">{app.location || 'Vijayawada, AP'}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">
                        {app.expectedCtcFixed || '7.5 LPA'}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleDownloadResume(app)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:text-white transition font-mono text-[11px]"
                          title="Download Candidate Resume"
                        >
                          <Paperclip className="w-3 h-3 text-emerald-400" />
                          <span className="truncate max-w-[110px]">{app.resumeFileName || 'Resume.pdf'}</span>
                          <Download className="w-3 h-3 shrink-0" />
                        </button>
                      </td>
                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app, e.target.value as ApplicationStatus)}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-bold outline-none cursor-pointer ${
                            app.status === 'Shortlisted'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : app.status === 'Rejected'
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : app.status === 'Under Review'
                              ? 'bg-amber-950 text-amber-300 border-amber-800'
                              : 'bg-slate-900 text-cyan-300 border-slate-700'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="View Full Candidate Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDownloadResume(app)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950 text-emerald-400 border border-slate-800"
                            title="Download Resume"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete application from ${app.fullName}?`)) {
                                deleteJobApplication(app.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                            title="Delete Application"
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
          MODAL: POST / EDIT JOB OPENING (Module 7.2)
          ================================================== */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-outfit">
                {editingJobId ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h3>
              <button onClick={() => setJobModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior Statutory Compliance & Payroll Executive"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Payroll Operations">Payroll Operations</option>
                    <option value="Statutory Compliance">Statutory Compliance</option>
                    <option value="Talent Acquisition">Talent Acquisition</option>
                    <option value="Technical Operations">Technical Operations</option>
                    <option value="Training Academy">Training Academy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="Vijayawada / Hyderabad / Guntur"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. 3-6 Years"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={jobForm.salaryRange}
                    onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                    placeholder="e.g. ₹5.0 - ₹8.0 LPA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Status</label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as JobStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none font-bold"
                  >
                    <option value="published">Published (Accepting Applications)</option>
                    <option value="draft">Draft (Admin Only)</option>
                    <option value="closed">Position Closed (Not Accepting Applications)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="internshipToggle"
                  checked={jobForm.isInternship}
                  onChange={(e) => setJobForm({ ...jobForm, isInternship: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <label htmlFor="internshipToggle" className="text-slate-300 font-semibold cursor-pointer">
                  Enable Internship / Trainee Option for this position
                </label>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Skills Required (Comma-separated)</label>
                <input
                  type="text"
                  value={jobForm.skillsRequiredText}
                  onChange={(e) => setJobForm({ ...jobForm, skillsRequiredText: e.target.value })}
                  placeholder="PF, ESI, Labor Laws, Statutory Compliance, Advanced Excel"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="High-level overview of role scope, enterprise customer impact, and team structure..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Qualifications (One per line)</label>
                <textarea
                  rows={3}
                  value={jobForm.requirementsText}
                  onChange={(e) => setJobForm({ ...jobForm, requirementsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={jobForm.responsibilitiesText}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilitiesText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold transition shadow-md hover:opacity-95"
                >
                  {editingJobId ? 'Update Job Opening' : 'Post Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          MODAL: CANDIDATE PROFILE DETAILS
          ================================================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base font-outfit">{selectedApp.fullName}</h3>
                <span className="text-cyan-400 font-medium">Applied for {selectedApp.designationApplied || selectedApp.jobTitle}</span>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Contact Phone</span>
                  <span className="text-white font-mono font-bold">{selectedApp.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Contact Email</span>
                  <span className="text-cyan-400 font-mono">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Location</span>
                  <span className="text-slate-300">{selectedApp.location || 'Vijayawada, AP'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Notice Period</span>
                  <span className="text-emerald-400 font-bold">{selectedApp.noticePeriod || 'Immediate'}</span>
                </div>
              </div>

              {/* Compensation Breakdown */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-300 uppercase text-[10px]">Candidate Compensation Details</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Current Fixed / Variable</span>
                    <span className="text-slate-300 font-mono">
                      {selectedApp.currentCtcFixed || '5.5 LPA'} / {selectedApp.currentCtcVariable || '1.0 LPA'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Expected Fixed / Variable</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {selectedApp.expectedCtcFixed || '7.5 LPA'} / {selectedApp.expectedCtcVariable || '1.5 LPA'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedApp.skills && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Key Skills & Toolsets</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(selectedApp.skills)
                      ? selectedApp.skills
                      : selectedApp.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
                    ).map((s: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover Note */}
              {selectedApp.coverNote && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Candidate Cover Note</span>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs italic">
                    &quot;{selectedApp.coverNote}&quot;
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-between items-center border-t border-slate-800">
              <button
                onClick={() => handleDownloadResume(selectedApp)}
                className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          MODAL: EMAIL NOTIFICATION PREVIEW & MOCK SEND (Module 7.4)
          ================================================== */}
      {emailModalOpen && emailCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    emailNewStatus === 'Shortlisted'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-outfit">Email Notification Preview</h3>
                  <span className="text-[11px] text-slate-400">
                    Candidate Status updated to <strong className="text-white">{emailNewStatus}</strong>
                  </span>
                </div>
              </div>
              <button onClick={() => setEmailModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {emailSentAlert ? (
              <div className="p-8 text-center space-y-3 bg-emerald-950/60 rounded-2xl border border-emerald-800">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-emerald-300">Mock Email Dispatched Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Notification email sent to <strong>{emailCandidate.email}</strong> with status details.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">To Candidate</label>
                  <input
                    type="text"
                    disabled
                    value={`${emailCandidate.fullName} <${emailCandidate.email}>`}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email Subject Line</label>
                  <input
                    type="text"
                    value={emailPreviewSubject}
                    onChange={(e) => setEmailPreviewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email Body Content</label>
                  <textarea
                    rows={8}
                    value={emailPreviewBody}
                    onChange={(e) => setEmailPreviewBody(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-500 font-sans resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEmailModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                  >
                    Dismiss Preview
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmailNotification}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Candidate Notification</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
