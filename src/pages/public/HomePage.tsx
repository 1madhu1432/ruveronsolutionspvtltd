import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  UserPlus,
  Clock,
  DollarSign,
  FileCheck,
  Building2,
  Briefcase,
  Award,
  ShieldCheck,
  ExternalLink,
  Send,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';
import { HeroSection } from '../../components/home/HeroSection';
import { ServiceEnquiryModal } from '../../components/common/ServiceEnquiryModal';
import { INDIAN_STATES_AND_UTS } from '../../data/indianStates';

// Custom Social Icon SVGs
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

// Custom X (formerly Twitter) Icon SVG
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const HomePage: React.FC = () => {
  const {
    homeContent,
    companyInfo,
    companyOffices,
    businessHighlights,
    services,
    solutions,
    clients,
    addLeadFromForm,
  } = useData();

  // Service Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedEnquiryService, setSelectedEnquiryService] = useState('');

  // Inline Contact Form State
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    state: 'Andhra Pradesh',
    location: 'Vijayawada',
    requirement: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleOpenEnquiry = (name: string) => {
    setSelectedEnquiryService(name);
    setEnquiryModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.phone || !contactForm.email) return;

    addLeadFromForm({
      fullName: contactForm.fullName,
      phone: contactForm.phone,
      email: contactForm.email,
      company: contactForm.company || 'Direct Contact',
      location: `${contactForm.location}, ${contactForm.state}`,
      requirement: contactForm.requirement || 'Homepage Contact Form Enquiry',
      leadType: 'Service',
      serviceOrSolutionName: 'General Corporate Consultation',
      source: 'Website',
      acquisitionSource: 'Website Enquiry',
    });

    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({
        fullName: '',
        phone: '',
        email: '',
        company: '',
        state: 'Andhra Pradesh',
        location: 'Vijayawada',
        requirement: '',
      });
    }, 3000);
  };

  // Icon mapper helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'UserPlus':
        return <UserPlus className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'DollarSign':
        return <DollarSign className="w-6 h-6" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      default:
        return <Briefcase className="w-6 h-6" />;
    }
  };

  const social = companyInfo.socialLinks || {
    instagram: 'https://instagram.com/ruveronsolutions',
    youtube: 'https://youtube.com/@ruveronsolutions',
    x: 'https://x.com/ruveronsolutions',
    linkedin: 'https://linkedin.com/company/ruveron-solutions-pvt-ltd',
  };

  const publishedHighlights = businessHighlights.filter((h) => h.status === 'published' || (h.status as string) === 'Active');
  const activeOffices = companyOffices.filter((o) => o.status === 'Active');

  return (
    <>
      <SEOHead page="home" />

      {/* ==================================================
          HERO SECTION: High-Impact Cyber Corporate Landing
          ================================================== */}
      <HeroSection />

      {/* ==================================================
          SECTION: INFINITE AUTO-SCROLLING CLIENT LOGOS TICKER
          ================================================== */}
      <section className="py-8 bg-slate-950 border-y border-slate-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Trusted Workforce & Climate Partner For Enterprise Leaders
          </div>
          <Link to="/clients" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
            <span>View All Clients</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-8">
            {[...clients.filter((c) => c.status === 'published'), ...clients.filter((c) => c.status === 'published')].map((client, index) => (
              <Link
                key={`${client.id}-${index}`}
                to="/clients"
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 hover:border-cyan-400 transition group"
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="w-8 h-8 object-cover rounded-lg"
                />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap">
                  {client.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono">
                  {client.industry}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: COMPANY INTRODUCTION (WHO WE ARE)
          ================================================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src={homeContent.ourStoryImageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'}
                  alt="RUVERON Corporate Team"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-dark text-white space-y-1">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    Corporate Standard
                  </div>
                  <div className="text-sm font-semibold">
                    RUVERON SOLUTIONS PRIVATE LIMITED
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-wider">
                {homeContent.whoWeAreTitle}
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                A Strategic HR & Engineering Partner Committed to Operational Excellence
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {homeContent.whoWeAreContent}
              </p>

              {/* Core Values & Our Story Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100">
                  <div className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-royal" />
                    <span>{homeContent.coreValuesTitle || 'Core Values'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {homeContent.coreValuesDesc || 'Integrity, precision execution, transparency, continuous innovation, and client commitment.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-slate-50 border border-cyan-100">
                  <div className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-cyan" />
                    <span>{homeContent.ourStoryTitle || 'Our Story'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {homeContent.ourStoryDesc || 'Proven journey delivering turnkey payroll, manpower architecture, and certified HVAC engineering.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ruveron-navy text-white text-sm font-semibold hover:bg-ruveron-blue transition-colors shadow-md"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleOpenEnquiry('General Corporate Partnership')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-sm font-semibold hover:shadow-lg transition-all"
                >
                  <span>Service Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: BUSINESS HIGHLIGHTS (AWARDS, BNI, ISO)
          ================================================== */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Corporate Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Business Highlights & Accreditations
            </h2>
            <p className="text-slate-400 text-base">
              Verified corporate memberships, prestigious industry awards, and international quality management certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedHighlights.map((hl) => (
              <div
                key={hl.id}
                className="bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-400 transition-all duration-300 p-6 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="space-y-4">
                  {hl.imageUrl && (
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-900 relative">
                      <img
                        src={hl.imageUrl}
                        alt={hl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 backdrop-blur-sm text-cyan-300 text-[10px] font-bold uppercase tracking-wider border border-cyan-700/60 font-mono">
                          {hl.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {hl.badgeText && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 text-[11px] font-semibold border border-cyan-500/30">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{hl.badgeText}</span>
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {hl.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hl.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Accreditation</span>
                  </span>
                  <button
                    onClick={() => handleOpenEnquiry(`Accreditation Inquiry: ${hl.title}`)}
                    className="text-cyan-400 hover:text-white font-medium"
                  >
                    Enquire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: WHAT WE DO (SERVICES)
          ================================================== */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-widest border border-blue-200">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Comprehensive HR & Payroll Capabilities
            </h2>
            <p className="text-slate-600 text-base">
              End-to-end management of workforce lifecycle, computational payroll, and regulatory adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-cyan-500 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ruveron-royal to-ruveron-cyan flex items-center justify-center text-white shadow-md">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-ruveron-royal transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-slate-200/80">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleOpenEnquiry(service.name)}
                    className="text-xs font-bold text-ruveron-royal hover:text-cyan-700 flex items-center gap-1 font-outfit"
                  >
                    <span>Service Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: FEATURED SOLUTIONS / EXPERTISE
          ================================================== */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal mb-2">
                Climate & Engineering Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Turnkey Climate & Air-Conditioning Solutions
              </h2>
            </div>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-ruveron-royal hover:text-ruveron-navy"
            >
              <span>Explore All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.slice(0, 3).map((sol) => (
              <div
                key={sol.id}
                className="group bg-white rounded-2xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {sol.imageUrl && (
                  <div className="h-40 -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden bg-slate-900 relative">
                    <img
                      src={sol.imageUrl}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  </div>
                )}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md inline-block">
                      {sol.category}
                    </span>
                    {sol.pincode && (
                      <span className="text-[11px] font-mono text-slate-400">
                        PIN: {sol.pincode}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {sol.description}
                  </p>
                  <div className="space-y-2 pt-3">
                    {sol.benefits.slice(0, 3).map((ben, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/solutions"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    View Specs
                  </Link>

                  <button
                    onClick={() => handleOpenEnquiry(sol.title)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold shadow hover:scale-105 transition font-outfit"
                  >
                    Service Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: COMPANY LOCATIONS (REGISTERED, BUSINESS, BRANCH)
          ================================================== */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-widest border border-blue-200">
              <Building2 className="w-3.5 h-3.5 text-ruveron-royal" />
              <span>Pan-India Presence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Corporate Locations
            </h2>
            <p className="text-slate-600 text-base">
              Strategically positioned registered, business operations, and branch offices ensuring rapid on-ground response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeOffices.map((office) => {
              const isHQ = office.type === 'Registered Office';
              return (
                <div
                  key={office.id}
                  className={`rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${isHQ
                      ? 'bg-gradient-to-b from-blue-50/80 to-white border-ruveron-royal shadow-lg shadow-blue-500/10'
                      : 'bg-slate-50 hover:bg-white border-slate-200/90 hover:border-cyan-400 hover:shadow-md'
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isHQ
                            ? 'bg-ruveron-royal text-white'
                            : office.type === 'Business Office'
                              ? 'bg-cyan-100 text-cyan-800'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                      >
                        {office.type}
                      </span>
                      {office.pincode && (
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">
                          PIN: {office.pincode}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-outfit">
                      {office.name}
                    </h3>

                    <div className="space-y-3 text-xs text-slate-600 pt-1">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                        <a href={`tel:${office.phone}`} className="hover:text-ruveron-royal font-semibold">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-ruveron-royal font-medium truncate">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                    <a
                      href={office.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-ruveron-royal hover:text-cyan-700 flex items-center gap-1.5"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: PROMINENT CONTACT US (FORM, OFFICES, SOCIAL)
          ================================================== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Social Links */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest border border-cyan-500/30">
                  Contact Us
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight">
                  Let's Discuss Your Next Strategic Initiative
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Connect with our executive advisory team for corporate workforce consultations, custom payroll architecture, or industrial climate installations.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Corporate Headquarters
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed">
                      {companyInfo.fullAddress}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Direct Support Line
                    </div>
                    <a href={`tel:${companyInfo.phone}`} className="text-sm font-bold text-white hover:text-cyan-400">
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Official Communications
                    </div>
                    <a href={`mailto:${companyInfo.email}`} className="text-xs font-bold text-white hover:text-cyan-400 truncate block">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Official Social Channels
                </div>
                <div className="flex items-center gap-3">
                  {social.instagram && (
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-pink-500 text-slate-300 hover:text-pink-400 flex items-center justify-center transition shadow hover:scale-105"
                      title="Follow us on Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}

                  {social.youtube && (
                    <a
                      href={social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-300 hover:text-red-400 flex items-center justify-center transition shadow hover:scale-105"
                      title="Subscribe on YouTube"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                  )}

                  {social.x && (
                    <a
                      href={social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition shadow hover:scale-105"
                      title="Follow us on X"
                    >
                      <XIcon className="w-4 h-4" />
                    </a>
                  )}

                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 flex items-center justify-center transition shadow hover:scale-105"
                      title="Connect on LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/80">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-2xl font-black font-outfit text-slate-900">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below and our team will get in touch promptly.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-outfit">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Your enquiry has been logged into our client management system. We will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.fullName}
                        onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+91 99859 65566"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white font-mono transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white font-mono transition"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Your enterprise or firm"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">
                        State / Union Territory <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={contactForm.state}
                        onChange={(e) => setContactForm({ ...contactForm, state: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
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
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={contactForm.location}
                        onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                        placeholder="Vijayawada / Hyderabad / etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Message / Requirement
                    </label>
                    <textarea
                      rows={3}
                      value={contactForm.requirement}
                      onChange={(e) => setContactForm({ ...contactForm, requirement: e.target.value })}
                      placeholder="Brief details about your workforce requirements, payroll headcount, or HVAC project..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 bg-slate-50 focus:bg-white resize-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan hover:from-ruveron-navy hover:to-ruveron-blue text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Enquiry Modal */}
      <ServiceEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        serviceOrSolutionName={selectedEnquiryService}
        leadType={selectedEnquiryService.includes('VRV') || selectedEnquiryService.includes('AC') ? 'Solution' : 'Service'}
      />
    </>
  );
};
