import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { INDIAN_STATES_AND_UTS } from '../../data/indianStates';

export interface ServiceEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceOrSolutionName?: string;
  defaultService?: string;
  defaultCategory?: string;
  leadType?: 'Service' | 'Solution';
}

export const ServiceEnquiryModal: React.FC<ServiceEnquiryModalProps> = ({
  isOpen,
  onClose,
  serviceOrSolutionName = '',
  defaultService,
  leadType = 'Service',
}) => {
  const effectiveServiceName = serviceOrSolutionName || defaultService || '';
  const { addLeadFromForm } = useData();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    state: 'Andhra Pradesh',
    location: 'Vijayawada',
    requirement: '',
    serviceName: effectiveServiceName,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (effectiveServiceName) {
      setForm((prev) => ({ ...prev, serviceName: effectiveServiceName }));
    }
  }, [effectiveServiceName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    addLeadFromForm({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      company: form.company.trim() || 'Direct Customer',
      location: `${form.location}, ${form.state}`,
      requirement: form.requirement.trim() || `Service Enquiry for ${form.serviceName || 'General Corporate Services'}`,
      leadType,
      serviceOrSolutionName: form.serviceName,
      source: 'Website',
      acquisitionSource: 'Website Enquiry',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        state: 'Andhra Pradesh',
        location: 'Vijayawada',
        requirement: '',
        serviceName: '',
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-ruveron-navy via-slate-900 to-ruveron-blue p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            RUVERON SOLUTIONS • DIRECT ENQUIRY
          </div>
          <h3 className="text-2xl font-black font-outfit tracking-tight">
            Service Enquiry
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {form.serviceName ? `Enquiring for: ${form.serviceName}` : 'Connect with our enterprise consulting team for rapid response.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 font-outfit">
                Enquiry Dispatched Successfully!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for your interest. A dedicated corporate representative has received your request and will follow up within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Phone / Mobile <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 99859 65566"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white font-mono transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white font-mono transition"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    State / UT (India) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                  >
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Vijayawada, Hyderabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Specific Service / Solution
                </label>
                <input
                  type="text"
                  value={form.serviceName}
                  onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
                  placeholder="e.g. VRV Systems, Payroll Outsourcing, Contract Staffing"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Requirement Details / Message
                </label>
                <textarea
                  rows={3}
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  placeholder="Provide brief project scope, expected headcount, facility tonnage, or timelines..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white resize-none transition"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan hover:from-ruveron-navy hover:to-ruveron-blue text-white font-bold tracking-wide shadow-md shadow-blue-500/20 flex items-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Service Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

