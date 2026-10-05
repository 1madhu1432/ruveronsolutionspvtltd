import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useData } from '../../context/DataContext';
import { PrivacyModal, TermsModal } from './PrivacyModal';

export const Footer: React.FC = () => {
  const { companyInfo } = useData();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
        {/* Background Subtle Accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Brand Column (Spans 2 on large screens) */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="light" size="lg" showTagline={true} />
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
                RUVERON SOLUTIONS PRIVATE LIMITED is a fully integrated HR solutions and payroll management partner operating at the intersection of people strategy, process excellence, and technology.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 text-xs font-semibold hover:border-cyan-400 hover:text-white transition group"
                >
                  <span>Request Corporate Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Column 1: COMPANY */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-4 font-sans border-l-2 border-ruveron-cyan pl-2">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="hover:text-white transition-colors">
                    Our Partners
                  </Link>
                </li>
                <li>
                  <Link to="/clients" className="hover:text-white transition-colors">
                    Our Clients
                  </Link>
                </li>
                <li>
                  <Link to="/testimonials" className="hover:text-white transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="hover:text-white transition-colors">
                    Leadership Team
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 text-xs text-slate-500 pt-1">
                    <Lock className="w-3 h-3" />
                    <span>Admin Portal</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: SERVICES */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-4 font-sans border-l-2 border-ruveron-royal pl-2">
                Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services#recruitment" className="hover:text-white transition-colors">
                    Recruitment & Talent
                  </Link>
                </li>
                <li>
                  <Link to="/services#staffing" className="hover:text-white transition-colors">
                    Contract Staffing
                  </Link>
                </li>
                <li>
                  <Link to="/services#payroll" className="hover:text-white transition-colors">
                    Payroll Management
                  </Link>
                </li>
                <li>
                  <Link to="/services#compliance" className="hover:text-white transition-colors">
                    HR & Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/services#industry" className="hover:text-white transition-colors">
                    Industry Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: CONTACT */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-4 font-sans border-l-2 border-cyan-400 pl-2">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                  <span className="text-xs text-slate-300 leading-normal">
                    {companyInfo.fullAddress}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors text-xs text-slate-300">
                    {companyInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors text-xs text-slate-300 break-all">
                    {companyInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} <strong className="text-slate-300">{companyInfo.companyName}</strong>. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-slate-300 transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setTermsOpen(true)}
                className="hover:text-slate-300 transition-colors"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              <Link to="/admin/login" className="hover:text-cyan-400 transition-colors">
                Admin CMS
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};
