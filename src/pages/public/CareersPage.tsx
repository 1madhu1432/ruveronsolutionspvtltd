import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Award,
  Search,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Users,
  TrendingUp,
  Upload,
  Paperclip,
  IndianRupee,
  Briefcase,
  Ban,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';
import { INDIAN_STATES_AND_UTS } from '../../data/indianStates';
import type { CareerJob } from '../../types';

export const CareersPage: React.FC = () => {
  const { careers, addJobApplication } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);

  // Candidate Application Form with all required fields
  const [applicantForm, setApplicantForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: 'Vijayawada, Andhra Pradesh',
    designationApplied: '',
    resumeFileName: '',
    resumeFileData: '',
    currentCtcFixed: '',
    currentCtcVariable: '',
    expectedCtcFixed: '',
    expectedCtcVariable: '',
    jobType: 'Full-Time',
    isInternship: false,
    experience: '',
    skills: '',
    noticePeriod: '30 Days',
    coverNote: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Departments list for filtering
  const departments = Array.from(new Set(careers.map((j) => j.department)));

  const filteredJobs = careers.filter((job) => {
    // Only show published and closed jobs on public careers page
    if (job.status === 'draft') return false;

    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.skillsRequired && job.skillsRequired.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesDept = departmentFilter === 'all' || job.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const handleOpenApplyModal = (job: CareerJob) => {
    setSelectedJob(job);
    setFormErrors({});
    setIsSubmitted(false);
    setApplicantForm({
      fullName: '',
      email: '',
      phone: '',
      location: 'Vijayawada, Andhra Pradesh',
      designationApplied: job.title,
      resumeFileName: '',
      resumeFileData: '',
      currentCtcFixed: '',
      currentCtcVariable: '',
      expectedCtcFixed: '',
      expectedCtcVariable: '',
      jobType: job.type || 'Full-Time',
      isInternship: job.isInternship || false,
      experience: job.experience || '',
      skills: job.skillsRequired ? job.skillsRequired.join(', ') : '',
      noticePeriod: '30 Days',
      coverNote: '',
    });
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, resume: 'Resume file exceeds 10 MB limit. Please select a smaller file.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setApplicantForm((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileData: reader.result as string,
      }));
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!applicantForm.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!applicantForm.email.trim() || !applicantForm.email.includes('@')) errors.email = 'Valid Email is required';
    if (!applicantForm.phone.trim() || applicantForm.phone.replace(/\D/g, '').length < 10) errors.phone = 'Valid 10-digit Mobile number is required';
    if (!applicantForm.designationApplied.trim()) errors.designationApplied = 'Designation Applied For is required';
    if (!applicantForm.expectedCtcFixed.trim()) errors.expectedCtcFixed = 'Expected CTC (Fixed) is required';
    if (!applicantForm.skills.trim()) errors.skills = 'Skills are required';
    return errors;
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addJobApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      fullName: applicantForm.fullName,
      email: applicantForm.email,
      phone: applicantForm.phone,
      location: applicantForm.location,
      designationApplied: applicantForm.designationApplied,
      experience: applicantForm.experience || 'Not Specified',
      currentCompany: 'Candidate Direct Application',
      currentCtcFixed: applicantForm.currentCtcFixed ? `${applicantForm.currentCtcFixed} LPA` : undefined,
      currentCtcVariable: applicantForm.currentCtcVariable ? `${applicantForm.currentCtcVariable} LPA` : undefined,
      expectedCtcFixed: applicantForm.expectedCtcFixed ? `${applicantForm.expectedCtcFixed} LPA` : undefined,
      expectedCtcVariable: applicantForm.expectedCtcVariable ? `${applicantForm.expectedCtcVariable} LPA` : undefined,
      jobType: applicantForm.jobType,
      isInternship: applicantForm.isInternship,
      skills: applicantForm.skills.split(',').map((s) => s.trim()).filter(Boolean),
      noticePeriod: applicantForm.noticePeriod,
      coverNote: applicantForm.coverNote,
      resumeFileName: applicantForm.resumeFileName || `${applicantForm.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      resumeFileData: applicantForm.resumeFileData,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedJob(null);
    }, 2800);
  };

  return (
    <>
      <SEOHead page="careers" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Work With Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-outfit">
            Careers at Ruveron Solutions
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Build the Future of Integrated HR, Payroll Management, and Compliance Execution.
          </p>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-ruveron-royal flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Accelerated Career Growth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work alongside industry specialists in statutory compliance, multi-state payroll operations, and workforce strategy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-ruveron-cyan flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Collaborative Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join a culture grounded in operational transparency, teamwork, and continuous professional development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Enterprise Client Impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deliver high-precision HR & payroll capabilities supporting organizations across manufacturing, IT, retail, and healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
              Current Openings
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">Explore Open Roles</h2>
            <p className="text-sm text-slate-600">
              Find the perfect role matching your expertise across HR, statutory compliance, payroll, and technical operations.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job titles, keywords, skills, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-ruveron-royal"
              />
            </div>

            <div className="md:col-span-4">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs outline-none focus:ring-2 focus:ring-ruveron-royal"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Openings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => {
              const isClosed = job.status === 'closed';

              return (
                <div
                  key={job.id}
                  className={`bg-white p-8 rounded-3xl border transition flex flex-col justify-between space-y-6 ${
                    isClosed
                      ? 'border-slate-300 opacity-90 shadow-sm bg-slate-50/70'
                      : 'border-slate-200/90 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-md bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-wider">
                        {job.department}
                      </span>

                      {isClosed ? (
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-extrabold flex items-center gap-1.5 border border-rose-200">
                          <Ban className="w-3.5 h-3.5" />
                          <span>Not Accepting Applications</span>
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          {job.isInternship && (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                              Internship Available
                            </span>
                          )}
                          <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                            {job.type}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-outfit">{job.title}</h3>
                      {job.salaryRange && (
                        <div className="text-xs text-emerald-700 font-semibold font-mono mt-1 flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>Offered CTC: {job.salaryRange}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-ruveron-cyan" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-ruveron-royal" />
                        <span>Experience: {job.experience}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>

                    {/* Skills Required */}
                    {job.skillsRequired && job.skillsRequired.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Key Skills
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.skillsRequired.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Key Qualifications
                        </div>
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {isClosed ? 'Position Closed' : `Posted: ${job.postedDate}`}
                    </span>

                    {isClosed ? (
                      <button
                        type="button"
                        disabled
                        className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider cursor-not-allowed flex items-center gap-1.5"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Not Accepting Applications</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenApplyModal(job)}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-1.5"
                      >
                        <span>Apply Now</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Application Modal (Module 7.1) */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                  Candidate Application Form
                </span>
                <h3 className="text-lg font-bold font-outfit">{selectedJob.title}</h3>
                <span className="text-xs text-slate-400">{selectedJob.department} • {selectedJob.location}</span>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-900 font-outfit">Application Submitted Successfully!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Thank you for applying for the <strong>{applicantForm.designationApplied}</strong> role. Our recruitment and talent acquisition department will review your profile, compensation details, and resume.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-6 text-xs">
                  {/* 1. Candidate Information */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-ruveron-royal uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>1. Candidate Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={applicantForm.fullName}
                          onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                          placeholder="e.g. Ramesh Kumar Verma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                          required
                        />
                        {formErrors.fullName && <p className="text-rose-500 text-[10px] mt-1">{formErrors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={applicantForm.email}
                          onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                          placeholder="ramesh.kumar@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                          required
                        />
                        {formErrors.email && <p className="text-rose-500 text-[10px] mt-1">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          value={applicantForm.phone}
                          onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                          placeholder="+91 98480 12345"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal font-mono"
                          required
                        />
                        {formErrors.phone && <p className="text-rose-500 text-[10px] mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Current Location (State/City) *</label>
                        <select
                          value={applicantForm.location}
                          onChange={(e) => setApplicantForm({ ...applicantForm, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                        >
                          {INDIAN_STATES_AND_UTS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Designation Applied For *</label>
                        <input
                          type="text"
                          value={applicantForm.designationApplied}
                          onChange={(e) => setApplicantForm({ ...applicantForm, designationApplied: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                          required
                        />
                        {formErrors.designationApplied && <p className="text-rose-500 text-[10px] mt-1">{formErrors.designationApplied}</p>}
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Resume Upload (PDF, DOC, DOCX up to 10 MB) *
                      </label>
                      <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition text-center space-y-2 relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-6 h-6 text-ruveron-royal mx-auto" />
                        <div className="text-xs text-slate-700 font-semibold">
                          {applicantForm.resumeFileName ? (
                            <span className="text-emerald-700 font-bold flex items-center justify-center gap-1.5">
                              <Paperclip className="w-4 h-4" />
                              <span>Attached: {applicantForm.resumeFileName}</span>
                            </span>
                          ) : (
                            <span>Click or Drag & Drop candidate resume file</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">Max upload limit: 10 MB</div>
                      </div>
                      {formErrors.resume && <p className="text-rose-500 text-[10px] mt-1">{formErrors.resume}</p>}
                    </div>
                  </div>

                  {/* 2. Compensation Details */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-ruveron-royal uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>2. Compensation Details (in ₹ Lakhs / Annum)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current CTC */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="text-[11px] font-bold text-slate-700 uppercase">Current CTC</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold mb-1">Fixed Component</label>
                            <input
                              type="text"
                              value={applicantForm.currentCtcFixed}
                              onChange={(e) => setApplicantForm({ ...applicantForm, currentCtcFixed: e.target.value })}
                              placeholder="e.g. 5.5 LPA"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 outline-none text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 font-semibold mb-1">Variable Component</label>
                            <input
                              type="text"
                              value={applicantForm.currentCtcVariable}
                              onChange={(e) => setApplicantForm({ ...applicantForm, currentCtcVariable: e.target.value })}
                              placeholder="e.g. 1.0 LPA"
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 outline-none text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expected CTC */}
                      <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                        <div className="text-[11px] font-bold text-emerald-900 uppercase">Expected CTC *</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-emerald-700 font-semibold mb-1">Fixed Component *</label>
                            <input
                              type="text"
                              value={applicantForm.expectedCtcFixed}
                              onChange={(e) => setApplicantForm({ ...applicantForm, expectedCtcFixed: e.target.value })}
                              placeholder="e.g. 7.5 LPA"
                              className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-slate-900 outline-none text-xs font-mono"
                              required
                            />
                            {formErrors.expectedCtcFixed && (
                              <p className="text-rose-500 text-[10px] mt-1">{formErrors.expectedCtcFixed}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] text-emerald-700 font-semibold mb-1">Variable Component</label>
                            <input
                              type="text"
                              value={applicantForm.expectedCtcVariable}
                              onChange={(e) => setApplicantForm({ ...applicantForm, expectedCtcVariable: e.target.value })}
                              placeholder="e.g. 1.5 LPA"
                              className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-slate-900 outline-none text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Additional Information */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-ruveron-royal uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>3. Additional Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Job Type</label>
                        <select
                          value={applicantForm.jobType}
                          onChange={(e) => setApplicantForm({ ...applicantForm, jobType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none"
                        >
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Total Experience</label>
                        <input
                          type="text"
                          value={applicantForm.experience}
                          onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                          placeholder="e.g. 4.5 Years"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Notice Period</label>
                        <select
                          value={applicantForm.noticePeriod}
                          onChange={(e) => setApplicantForm({ ...applicantForm, noticePeriod: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none"
                        >
                          <option value="Immediate">Immediate</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days">90 Days</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="internshipOpt"
                        checked={applicantForm.isInternship}
                        onChange={(e) => setApplicantForm({ ...applicantForm, isInternship: e.target.checked })}
                        className="w-4 h-4 rounded text-ruveron-royal border-slate-300 focus:ring-0"
                      />
                      <label htmlFor="internshipOpt" className="text-slate-700 font-semibold cursor-pointer">
                        Open for Internship / Graduate Apprenticeship option
                      </label>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Primary Skills & Toolsets *</label>
                      <input
                        type="text"
                        value={applicantForm.skills}
                        onChange={(e) => setApplicantForm({ ...applicantForm, skills: e.target.value })}
                        placeholder="e.g. PF, ESI, Labor Compliance, Advanced Excel, Tally Prime, Payroll Calculation"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                        required
                      />
                      {formErrors.skills && <p className="text-rose-500 text-[10px] mt-1">{formErrors.skills}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Candidate Cover Note</label>
                      <textarea
                        rows={2}
                        value={applicantForm.coverNote}
                        onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                        placeholder="Highlight your key achievements and why you want to join Ruveron Solutions..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none resize-none focus:ring-2 focus:ring-ruveron-royal"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:opacity-95 transition"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Candidate Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
