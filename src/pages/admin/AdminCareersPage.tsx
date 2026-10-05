import React, { useState } from 'react';
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
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { CareerJob, JobApplication, ApplicationStatus } from '../../types';

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

  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  // Job Modal
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Payroll Operations',
    location: 'Vijayawada, AP',
    type: 'Full-Time' as 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote',
    experience: '2-5 Years',
    description: '',
    requirementsText: '',
    responsibilitiesText: '',
    status: 'published' as 'published' | 'draft',
  });

  // Application Details Modal
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const handleOpenAddJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: 'Payroll Operations',
      location: 'Vijayawada, AP',
      type: 'Full-Time',
      experience: '2-5 Years',
      description: '',
      requirementsText: '',
      responsibilitiesText: '',
      status: 'published',
    });
    setJobModalOpen(true);
  };

  const handleOpenEditJob = (job: CareerJob) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      description: job.description,
      requirementsText: job.requirements.join('\n'),
      responsibilitiesText: job.responsibilities.join('\n'),
      status: job.status,
    });
    setJobModalOpen(true);
  };

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

    if (editingJobId) {
      updateCareerJob(editingJobId, {
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location,
        type: jobForm.type,
        experience: jobForm.experience,
        description: jobForm.description,
        requirements,
        responsibilities,
        status: jobForm.status,
      });
    } else {
      addCareerJob({
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location,
        type: jobForm.type,
        experience: jobForm.experience,
        description: jobForm.description,
        requirements,
        responsibilities,
        status: jobForm.status,
      });
    }
    setJobModalOpen(false);
  };

  const toggleJobStatus = (job: CareerJob) => {
    updateCareerJob(job.id, {
      status: job.status === 'published' ? 'draft' : 'published',
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span>Careers & Recruitment CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage public job postings, job requirements, and candidate applications.
          </p>
        </div>

        {activeTab === 'jobs' && (
          <button
            onClick={handleOpenAddJob}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Opening</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'jobs'
              ? 'bg-ruveron-royal text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job Openings ({careers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-ruveron-royal text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Job Applications Inbox ({jobApplications.length})</span>
        </button>
      </div>

      {/* TAB 1: JOB OPENINGS */}
      {activeTab === 'jobs' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Job Title</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Type & Exp</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Posted</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {careers.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5 font-bold text-white">{job.title}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-[11px]">
                        {job.department}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{job.location}</td>
                    <td className="p-3.5 text-slate-400">
                      {job.type} ({job.experience})
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => toggleJobStatus(job)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          job.status === 'published'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {job.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{job.status}</span>
                      </button>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400 text-[11px]">{job.postedDate}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditJob(job)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                          title="Edit Job"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCareerJob(job.id)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                          title="Delete Job"
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

      {/* TAB 2: JOB APPLICATIONS INBOX */}
      {activeTab === 'applications' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">Position Applied</th>
                  <th className="p-3.5">Resume File</th>
                  <th className="p-3.5">Experience & Company</th>
                  <th className="p-3.5">Applied Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {jobApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-white">{app.fullName}</div>
                      <div className="text-[11px] text-slate-400">{app.email} • {app.phone}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-cyan-300">{app.jobTitle}</td>
                    <td className="p-3.5">
                      {app.resumeFileName ? (
                        <a
                          href={app.resumeFileData || '#'}
                          download={app.resumeFileName}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:text-white transition font-mono text-[11px]"
                          title="Download Candidate Resume"
                        >
                          <Paperclip className="w-3 h-3 text-emerald-400" />
                          <span className="truncate max-w-[120px]">{app.resumeFileName}</span>
                          <Download className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No File</span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {app.experience} ({app.currentCompany || 'N/A'})
                    </td>
                    <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-[11px] font-semibold outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                          title="View Cover Note & Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteJobApplication(app.id)}
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
      )}

      {/* Post/Edit Job Modal */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">
                {editingJobId ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h3>
              <button onClick={() => setJobModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Key Requirements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={jobForm.requirementsText}
                  onChange={(e) => setJobForm({ ...jobForm, requirementsText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-ruveron-royal text-white font-semibold hover:bg-ruveron-blue"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 uppercase font-mono">{selectedApp.jobTitle}</span>
                <h3 className="font-bold text-base">{selectedApp.fullName}</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>Email: <strong className="text-white">{selectedApp.email}</strong></div>
              <div>Phone: <strong className="text-white">{selectedApp.phone}</strong></div>
              <div>Experience: <strong className="text-white">{selectedApp.experience}</strong></div>
              <div>Current Company: <strong className="text-white">{selectedApp.currentCompany || 'N/A'}</strong></div>

              {/* Uploaded Resume File Card */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Candidate Resume Attachment</div>
                    <div className="font-bold text-white truncate">{selectedApp.resumeFileName || 'Resume_Document.pdf'}</div>
                  </div>
                </div>

                {selectedApp.resumeFileData && (
                  <a
                    href={selectedApp.resumeFileData}
                    download={selectedApp.resumeFileName || 'Candidate_Resume.pdf'}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-400">Cover Note:</div>
                <p className="text-slate-200 leading-relaxed">{selectedApp.coverNote || 'No cover note provided.'}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareersPage;
