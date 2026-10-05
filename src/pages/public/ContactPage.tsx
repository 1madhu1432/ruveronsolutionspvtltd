import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Briefcase, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';
import type { LeadCategory } from '../../types';

export const ContactPage: React.FC = () => {
  const { companyInfo, services, solutions, addLeadFromForm } = useData();

  const [leadType, setLeadType] = useState<LeadCategory>('Service');
  const [selectedName, setSelectedName] = useState<string>(services[0]?.name || 'Recruitment & Talent Acquisition');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    requirement: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleTypeToggle = (type: LeadCategory) => {
    setLeadType(type);
    if (type === 'Service') {
      setSelectedName(services[0]?.name || 'Recruitment & Talent Acquisition');
    } else {
      setSelectedName(solutions[0]?.title || 'Workforce Solutions');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.requirement) {
      setErrorMsg('Please fill in all mandatory fields (Name, Email, Phone, Requirement).');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      // Create lead with leadType and serviceOrSolutionName
      addLeadFromForm({
        ...formData,
        leadType,
        serviceOrSolutionName: selectedName,
      });
      setSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        requirement: '',
      });
    }, 600);
  };

  return (
    <>
      <SEOHead page="contact" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Connect With Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Get in touch with our HR & Payroll specialists to discuss your service or solution requirements.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
                    Registered Corporate Entity
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                    {companyInfo.companyName}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {companyInfo.tagline}
                  </p>
                </div>

                <div className="space-y-5 pt-2 border-t border-slate-100 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-ruveron-royal flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Headquarters Address</div>
                      <div className="text-slate-600 text-xs mt-1 leading-relaxed">
                        {companyInfo.fullAddress}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-ruveron-cyan flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Phone Hotline</div>
                      <a href={`tel:${companyInfo.phone}`} className="text-slate-600 hover:text-ruveron-royal text-xs mt-0.5 block font-semibold">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Official Email</div>
                      <a href={`mailto:${companyInfo.email}`} className="text-slate-600 hover:text-ruveron-royal text-xs mt-0.5 block font-semibold break-all">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Working Hours</div>
                      <div className="text-slate-600 text-xs mt-0.5">
                        Monday – Saturday: 9:00 AM – 6:30 PM (IST)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Note */}
              <div className="p-6 rounded-2xl bg-ruveron-navy text-white text-xs leading-relaxed space-y-2">
                <div className="font-bold text-cyan-300 text-sm">Strict Confidentiality Guarantee</div>
                <p className="text-slate-300">
                  All details shared through this form are handled with strict enterprise data protection and privacy standards.
                </p>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Submit Corporate Enquiry</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Select your inquiry type (Service or Solution) and provide details for our team to contact you.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900">Enquiry Submitted Successfully!</h4>
                    <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Thank you. Your enquiry for <strong>{selectedName}</strong> ({leadType} Lead) has been recorded. Our team will contact you shortly.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider hover:bg-emerald-800 transition"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Inquiry Type Switcher */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Inquiry Category Type *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handleTypeToggle('Service')}
                          className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                            leadType === 'Service'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>1. Service Enquiry</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTypeToggle('Solution')}
                          className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                            leadType === 'Solution'
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <Layers className="w-4 h-4" />
                          <span>2. Solution Enquiry</span>
                        </button>
                      </div>
                    </div>

                    {/* Specific Service/Solution Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Select Specific {leadType === 'Service' ? 'Service' : 'Solution'} *
                      </label>
                      <select
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal outline-none transition"
                      >
                        {leadType === 'Service'
                          ? services.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name}
                              </option>
                            ))
                          : solutions.map((sol) => (
                              <option key={sol.id} value={sol.title}>
                                {sol.title}
                              </option>
                            ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Verma"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. rajesh@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 9876543210"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Vanguard Tech Solutions"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Vijayawada / Hyderabad"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Requirement Details *
                      </label>
                      <textarea
                        name="requirement"
                        rows={4}
                        value={formData.requirement}
                        onChange={handleChange}
                        placeholder="Describe your specific workforce, staffing, payroll, or compliance requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-ruveron-royal focus:border-transparent outline-none transition resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-95 transition flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Processing Submission...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit {leadType} Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">Locate Our Vijayawada Office</h3>
            <p className="text-xs text-slate-500">
              61-9/1-26, 2nd Lane, Kalanagar, Near Skewbridge, Krishnalanka, Vijayawada (Urban), AP 520013
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-[420px] bg-slate-100">
            <iframe
              title="RUVERON Solutions Headquarters Map Location"
              src={companyInfo.mapsIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
