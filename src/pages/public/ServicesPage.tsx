import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Clock,
  DollarSign,
  FileCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';

export const ServicesPage: React.FC = () => {

  return (
    <>
      <SEOHead page="services" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Service Delivery
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">HR Services</h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Solutions for Effective Human Resources Management
          </p>
        </div>
      </section>

      {/* 1. RECRUITMENT & TALENT ACQUISITION */}
      <section id="recruitment" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <UserPlus className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Recruitment & Talent Acquisition</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Strategic candidate sourcing, talent screening, executive search, and workforce requirements fulfillment tailored to your exact technical and cultural criteria.
              </p>
              <div className="space-y-3">
                {[
                  'Talent acquisition & executive sourcing',
                  'Structured recruitment support workflows',
                  'Workforce requirements fulfillment',
                  'Rigorous candidate screening & evaluation',
                  'End-to-end hiring management support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-royal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ruveron-royal text-white font-semibold text-sm shadow-md hover:bg-ruveron-navy transition"
                >
                  <span>Discuss Your Hiring Needs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Recruitment & Talent Acquisition"
                className="rounded-2xl shadow-xl border border-slate-200 object-cover w-full h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTRACT & TEMPORARY STAFFING */}
      <section id="staffing" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
                alt="Contract & Temporary Staffing"
                className="rounded-2xl shadow-xl border border-slate-200 object-cover w-full h-[360px]"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Contract & Temporary Staffing</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Flexible staffing models engineered to provide immediate workforce scalability, rapid deployment, and seamless business continuity without expanding direct headcount liability.
              </p>
              <div className="space-y-3">
                {[
                  'Contract staffing for project demands',
                  'Temporary staffing for seasonal surges',
                  'Workforce flexibility & agility',
                  'Rapid workforce deployment protocols',
                  'Complete business continuity protection',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ruveron-navy text-white font-semibold text-sm shadow-md hover:bg-ruveron-royal transition"
                >
                  <span>Talk to Our Staffing Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAYROLL MANAGEMENT SERVICES */}
      <section id="payroll" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center mx-auto">
              <DollarSign className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Payroll Management Services</h2>
            <p className="text-cyan-400 font-semibold text-lg">End-to-End Payroll Management</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Precision payroll processing engine guaranteeing 100% computational accuracy, statutory deduction management, and direct payout compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-base">Payroll Processing</h4>
              <p className="text-xs text-slate-400">Gross-to-net calculations, loss of pay adjustments, and digital payslips.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-base">Payroll Accuracy</h4>
              <p className="text-xs text-slate-400">Multi-tier audit validation ensuring zero computation error before release.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-base">Compliance Support</h4>
              <p className="text-xs text-slate-400">Timely computation and filing of PF, ESI, Professional Tax, and TDS returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HR SOLUTIONS & COMPLIANCE */}
      <section id="compliance" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-ruveron-royal text-white flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">HR Solutions & Compliance</h2>
            <p className="text-slate-600 text-sm">
              Proactive statutory compliance governance, labor law audit, employee benefits administration, and policy design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Statutory Compliance', desc: 'PF, ESI, LWF, PT, and Shop & Establishment Act management.' },
              { title: 'Employee Benefits', desc: 'Insurance enrollment, gratuity administration, and leave management.' },
              { title: 'HR Operations', desc: 'Standardized employee onboarding, documentation, and exit clearance.' },
              { title: 'Payroll Compliance', desc: 'Strict verification of statutory salary deductions against central labor laws.' },
              { title: 'Process Support', desc: 'SOP implementation and continuous HR audit readiness.' },
              { title: 'Labor Inspection Advisory', desc: 'Expert assistance during official labor inspectorate audits.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <ShieldCheck className="w-6 h-6 text-ruveron-royal" />
                <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRY FOCUS */}
      <section id="industry" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Industry-Focused HR Solutions</h2>
            <p className="text-slate-600 text-sm">
              Deep vertical expertise across key commercial sectors in India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Manufacturing & Factories',
              'IT & ITeS Technology Sector',
              'Healthcare & Life Sciences',
              'Retail & Chain Outlets',
              'Logistics & Supply Chain',
              'BFSI & Financial Institutions',
            ].map((sector, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="font-bold text-slate-900 text-sm">{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
