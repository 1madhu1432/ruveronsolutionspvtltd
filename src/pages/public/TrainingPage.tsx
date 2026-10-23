import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Phone,
  Search,
  BookOpen,
  X,
  FileCheck,
  Send,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { useData } from '../../context/DataContext';
import type { TrainingProgramItem } from '../../types';

export const TrainingPage: React.FC = () => {
  const { trainingPrograms, addTrainingEnrollment } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Detail Modal State
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgramItem | null>(null);

  // Enrollment Modal State
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollingProgram, setEnrollingProgram] = useState<TrainingProgramItem | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const [enrollForm, setEnrollForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: 'Diploma in Mechanical',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    message: '',
  });

  const publishedPrograms = trainingPrograms.filter((p) => p.status === 'published');
  const categories = ['All', ...Array.from(new Set(publishedPrograms.map((p) => p.category)))];

  const filteredPrograms = publishedPrograms.filter((prog) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      prog.title.toLowerCase().includes(q) ||
      prog.category.toLowerCase().includes(q) ||
      prog.description.toLowerCase().includes(q) ||
      prog.eligibility.toLowerCase().includes(q);
    const matchCat = selectedCategory === 'All' || prog.category === selectedCategory;
    return matchQuery && matchCat;
  });

  const handleOpenEnroll = (prog: TrainingProgramItem) => {
    setEnrollingProgram(prog);
    setEnrollSuccess(false);
    setEnrollModalOpen(true);
  };

  const handleSubmitEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollingProgram) return;

    addTrainingEnrollment({
      programId: enrollingProgram.id,
      programTitle: enrollingProgram.title,
      fullName: enrollForm.fullName,
      email: enrollForm.email,
      phone: enrollForm.phone,
      qualification: enrollForm.qualification,
      city: enrollForm.city,
      state: enrollForm.state,
      message: enrollForm.message,
    });

    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollModalOpen(false);
      setEnrollSuccess(false);
      setEnrollForm({
        fullName: '',
        email: '',
        phone: '',
        qualification: 'Diploma in Mechanical',
        city: 'Vijayawada',
        state: 'Andhra Pradesh',
        message: '',
      });
    }, 2000);
  };

  return (
    <>
      <SEOHead page="services" />

      {/* ==================================================
          PAGE HERO HEADER
          ================================================== */}
      <section className="pt-32 pb-20 bg-[#020b18] text-white relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-600/20 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vocational & Corporate Skill Development Academy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-outfit">
            Skill Development &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Training
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            Bridging academia and enterprise: Industry-certified practical training in HVAC engineering, refrigeration diagnostics, corporate HR management, statutory labor laws, and digital payroll architecture.
          </p>

          {/* Quick Stats Metrics Row */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">12,500+</div>
                <div className="text-[11px] text-slate-400">Trainees Certified</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">94.8%</div>
                <div className="text-[11px] text-slate-400">Placement Record</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">NSDC Aligned</div>
                <div className="text-[11px] text-slate-400">Govt & OEM Standards</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">Weekend & Regular</div>
                <div className="text-[11px] text-slate-400">Flexible Batches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN COURSE CATALOG SECTION
          ================================================== */}
      <section className="py-16 bg-[#f4f9fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Controls: Search & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-blue-100 shadow-sm">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition font-outfit ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#032b5f] to-[#088395] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search training programs..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => {
              const photoUrl =
                prog.imageUrl ||
                'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={prog.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-blue-100/80 hover:border-emerald-400 shadow-[0_4px_20px_rgba(3,43,95,0.06)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Course Banner Photography */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={photoUrl}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700/60 font-mono">
                          {prog.mode}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-sm text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-700/60 font-mono">
                          {prog.level}
                        </span>
                      </div>

                      {/* Category Label at bottom of image */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider font-outfit drop-shadow">
                          {prog.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-[#032b5f] group-hover:text-emerald-700 transition-colors font-outfit leading-snug">
                        {prog.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {prog.description}
                      </p>

                      {/* Course Meta Specs */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span className="truncate">{prog.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{prog.upcomingBatchDate || 'Ongoing'}</span>
                        </div>
                      </div>

                      {/* Key Syllabus Modules Preview */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Curriculum Highlights
                        </div>
                        <ul className="space-y-1">
                          {prog.modules.slice(0, 3).map((mod, mIdx) => (
                            <li
                              key={mIdx}
                              className="text-xs text-slate-700 font-medium flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="line-clamp-1">{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Placement Support Badge */}
                      {prog.placementAssistance && (
                        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>100% Placement Support with Partner Enterprises</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400">Eligibility</div>
                        <div className="font-semibold text-slate-800 truncate max-w-[150px]">
                          {prog.eligibility}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Course Fee</div>
                        <div className="font-bold text-[#032b5f] font-mono">
                          {prog.fee || 'Free / Govt Merit'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedProgram(prog)}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 font-outfit"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Syllabus</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEnroll(prog)}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 font-outfit"
                      >
                        <span>Apply / Enroll</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No training programs match your filter</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching for another keyword like "HVAC", "VRV", "Payroll", or select "All" categories.
              </p>
            </div>
          )}

          {/* ==================================================
              CORPORATE TRAINING & COLLEGE CAMPUS BANNER
              ================================================== */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#032b5f] via-[#043673] to-[#088395] text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-mono uppercase tracking-wider">
                Enterprise & Campus Partnerships
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-outfit leading-tight">
                Looking to Upskill Your Corporate Workforce or Engineering College Batches?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Ruveron Solutions delivers customized on-premise HVAC technician training, factory safety compliance workshops, and corporate payroll certifications with practical equipment labs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group font-outfit"
              >
                <span>Partner With Academy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/40 hover:bg-white/10 text-white font-semibold text-sm tracking-wide transition flex items-center justify-center gap-2 font-outfit"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Training Dept</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          INTERACTIVE SYLLABUS & PROGRAM DETAIL MODAL
          ================================================== */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-scaleUp max-h-[90vh] flex flex-col">
            {/* Top Photo Header */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900 shrink-0">
              <img
                src={selectedProgram.imageUrl}
                alt={selectedProgram.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {selectedProgram.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 font-outfit">
                  {selectedProgram.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Course Overview & Career Scope
                </h4>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              {/* Complete Modules Curriculum */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Comprehensive Curriculum Modules</span>
                </h4>
                <div className="space-y-2">
                  {selectedProgram.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certification & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Certification</span>
                  </div>
                  <div className="text-[11px] text-blue-900">{selectedProgram.certification}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Eligibility</span>
                  </div>
                  <div className="text-[11px] text-emerald-900">{selectedProgram.eligibility}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProgram(null);
                    handleOpenEnroll(selectedProgram);
                  }}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition font-outfit"
                >
                  <span>Apply for this Training Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-full border border-slate-300 text-slate-700 font-semibold text-xs tracking-wide hover:bg-slate-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          INTERACTIVE CANDIDATE ENROLLMENT FORM MODAL
          ================================================== */}
      {enrollModalOpen && enrollingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-slate-800 shadow-2xl animate-scaleUp relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-outfit">
                    Training Batch Enrollment
                  </h3>
                  <p className="text-xs text-slate-500 truncate max-w-xs">
                    {enrollingProgram.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {enrollSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-outfit">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our training counselor will contact you via phone/WhatsApp within 24 hours with syllabus materials and batch confirmation details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnroll} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={enrollForm.fullName}
                    onChange={(e) => setEnrollForm({ ...enrollForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={enrollForm.phone}
                      onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white font-mono"
                      placeholder="+91 98480 XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white font-mono"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      value={enrollForm.qualification}
                      onChange={(e) =>
                        setEnrollForm({ ...enrollForm, qualification: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white"
                      placeholder="e.g. ITI / Diploma / B.Tech / MBA"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">City / District</label>
                    <input
                      type="text"
                      value={enrollForm.city}
                      onChange={(e) => setEnrollForm({ ...enrollForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white"
                      placeholder="e.g. Vijayawada / Guntur"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Questions or Specific Batch Request
                  </label>
                  <textarea
                    rows={2}
                    value={enrollForm.message}
                    onChange={(e) => setEnrollForm({ ...enrollForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white resize-none"
                    placeholder="Prefer weekend batches, interested in hostel accommodation, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition font-outfit"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Training Enrollment Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingPage;
