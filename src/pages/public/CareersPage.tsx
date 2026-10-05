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
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';
import type { CareerJob } from '../../types';

export const CareersPage: React.FC = () => {
  const { careers, addJobApplication } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);

  const [applicantForm, setApplicantForm] = useState<{
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    currentCompany: string;
    coverNote: string;
    resumeFileName?: string;
    resumeFileData?: string;
  }>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    coverNote: '',
    resumeFileName: '',
    resumeFileData: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const publishedJobs = careers.filter((job) => job.status === 'published');

  const departments = Array.from(new Set(publishedJobs.map((j) => j.department)));

  const filteredJobs = publishedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'all' || job.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setApplicantForm((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeFileData: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !applicantForm.fullName || !applicantForm.email || !applicantForm.phone) return;

    addJobApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      fullName: applicantForm.fullName,
      email: applicantForm.email,
      phone: applicantForm.phone,
      experience: applicantForm.experience || 'Not Specified',
      currentCompany: applicantForm.currentCompany || 'N/A',
      coverNote: applicantForm.coverNote,
      resumeFileName: applicantForm.resumeFileName || 'Candidate_Resume.pdf',
      resumeFileData: applicantForm.resumeFileData,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedJob(null);
      setApplicantForm({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        currentCompany: '',
        coverNote: '',
        resumeFileName: '',
        resumeFileData: '',
      });
    }, 2500);
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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Careers at Ruveron Solutions
          </h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
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
            <h2 className="text-3xl font-extrabold text-slate-900">Explore Open Roles</h2>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job titles, keywords, location..."
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
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-md bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">{job.title}</h3>

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
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Posted: {job.postedDate}</span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                  Job Application
                </span>
                <h3 className="text-lg font-bold">{selectedJob.title}</h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {isSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-900">Application Submitted!</h4>
                  <p className="text-xs text-emerald-800">
                    Thank you for applying for the <strong>{selectedJob.title}</strong> position. Our HR team will review your application and contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={applicantForm.fullName}
                      onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                      placeholder="e.g. Kalyan Chakravarthy"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="kalyan@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        placeholder="+91 9848012345"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Years of Experience</label>
                      <input
                        type="text"
                        value={applicantForm.experience}
                        onChange={(e) => setApplicantForm({ ...applicantForm, experience: e.target.value })}
                        placeholder="e.g. 5 Years"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Current Company</label>
                      <input
                        type="text"
                        value={applicantForm.currentCompany}
                        onChange={(e) => setApplicantForm({ ...applicantForm, currentCompany: e.target.value })}
                        placeholder="e.g. Apex Corporate Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Cover Note / Overview</label>
                    <textarea
                      rows={3}
                      value={applicantForm.coverNote}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                      placeholder="Briefly describe your relevant payroll, HR, or compliance experience..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 outline-none focus:ring-2 focus:ring-ruveron-royal resize-none"
                    />
                  </div>

                  {/* Resume Upload File Box */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-700 font-bold">
                      Upload Resume / CV (PDF, DOC, DOCX) *
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
                          <span>Click or Drag & Drop to attach candidate resume</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
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
