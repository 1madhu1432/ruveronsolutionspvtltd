import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useData } from '../../context/DataContext';
import { PrivacyModal, TermsModal } from './PrivacyModal';

// Social Icon SVGs
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0-.01-3.24 1.62 1.62 0 0 0 .01 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { companyInfo } = useData();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const social = companyInfo.socialLinks || {
    instagram: 'https://instagram.com/ruveronsolutions',
    youtube: 'https://youtube.com/@ruveronsolutions',
    x: 'https://x.com/ruveronsolutions',
    linkedin: 'https://linkedin.com/company/ruveron-solutions-pvt-ltd',
  };

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

              {/* Social Media Links */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Connect With Us
                </div>
                <div className="flex items-center gap-3">
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 text-slate-400 hover:text-pink-400 flex items-center justify-center transition shadow-sm hover:scale-105"
                      title="Follow Ruveron on Instagram"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}

                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-red-400 flex items-center justify-center transition shadow-sm hover:scale-105"
                      title="Subscribe to Ruveron on YouTube"
                      aria-label="YouTube"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                  )}

                  {social.x && (
                    <a
                      href={social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition shadow-sm hover:scale-105"
                      title="Follow Ruveron on X"
                      aria-label="X"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-400 hover:text-blue-400 flex items-center justify-center transition shadow-sm hover:scale-105"
                      title="Connect with Ruveron on LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

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
                  <Link to="/services" className="hover:text-white transition-colors">
                    Recruitment & Talent
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Contract Staffing
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    Payroll Management
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition-colors">
                    HR & Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="hover:text-white transition-colors">
                    HVAC & Engineering Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/training" className="text-cyan-400 font-semibold hover:text-white transition-colors">
                    Skill Training & Certification
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
