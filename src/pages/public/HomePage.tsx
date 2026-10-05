import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  TrendingUp,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  UserPlus,
  Clock,
  DollarSign,
  FileCheck,
  Building2,
  Briefcase,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const HomePage: React.FC = () => {
  const { homeContent, companyInfo, services, solutions } = useData();

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

  return (
    <>
      <SEOHead page="home" />

      {/* ==================================================
          SECTION 2: HERO SECTION
          ================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 bg-slate-950 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-ruveron-royal/30 via-ruveron-cyan/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Corporate Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-ruveron-cyan animate-pulse" />
                <span className="text-xs font-semibold text-slate-200 tracking-wide">
                  Corporate HR & Payroll Excellence
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-sans">
                {homeContent.heroHeading}
              </h1>

              {/* Supporting Text */}
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                {homeContent.heroSubtitle}
              </p>

              {/* Hero CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
                >
                  <span>{homeContent.heroPrimaryBtnText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/services"
                  className="px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 shadow-md hover:border-slate-500 transition-all flex items-center gap-2"
                >
                  <span>{homeContent.heroSecondaryBtnText}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% Statutory Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Zero-Defect Payroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Pan-India Execution</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-cyan-500/30 via-blue-600/20 to-transparent shadow-2xl">
                <div className="bg-slate-900/95 rounded-[22px] p-6 sm:p-8 space-y-6 backdrop-blur-xl border border-slate-800">
                  {/* Visual Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Workforce Execution Engine
                    </span>
                  </div>

                  {/* Feature Pill Showcase */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-cyan-400">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Payroll Processing</div>
                          <div className="text-xs text-slate-400">Automated Tax, PF & ESI Compute</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
                        Verified
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center text-cyan-400">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Talent Acquisition</div>
                          <div className="text-xs text-slate-400">High-Precision Candidate Matching</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono font-medium">
                        Active
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center text-teal-400">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Statutory Governance</div>
                          <div className="text-xs text-slate-400">100% Legal & Labor Law Adherence</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono font-medium">
                        Compliant
                      </span>
                    </div>
                  </div>

                  {/* Summary Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-ruveron-navy to-ruveron-blue border border-cyan-500/30 text-center">
                    <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">
                      Strategic Corporate Growth
                    </div>
                    <div className="text-sm text-white font-medium mt-1">
                      Integrated People, Process & Technology
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="RUVERON Corporate Team"
                  className="w-full h-[400px] object-cover"
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
                A Strategic HR & Payroll Partner Committed to Operational Excellence
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {homeContent.whoWeAreContent}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-royal" />
                    <span>People Strategy</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Aligning talent structures with business expansion objectives.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-cyan" />
                    <span>Process Excellence</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Standardized workflows for payroll, compliance, and onboarding.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ruveron-navy text-white text-sm font-semibold hover:bg-ruveron-blue transition-colors shadow-md"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION: INFINITE AUTO-SCROLLING CLIENT LOGOS TICKER
          ================================================== */}
      <section className="py-8 bg-slate-950 border-y border-slate-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Trusted Workforce Partner For Enterprise Leaders
          </div>
          <Link to="/clients" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
            <span>View All Clients</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-8">
            {[...useData().clients.filter((c) => c.status === 'published'), ...useData().clients.filter((c) => c.status === 'published')].map((client, index) => (
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
          SECTION 4: WHAT WE DO (5 SERVICE CARDS)
          ================================================== */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-slate-700">
              What We Do
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Comprehensive HR & Payroll Capabilities
            </h2>
            <p className="text-slate-400 text-base">
              End-to-end management of workforce lifecycle, computational payroll, and regulatory adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-ruveron-cyan rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-glow"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ruveron-royal to-ruveron-cyan flex items-center justify-center text-white shadow-md">
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-slate-700/60">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/40">
                  <Link
                    to="/services"
                    className="text-sm font-semibold text-cyan-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: FEATURED SOLUTIONS / EXPERTISE
          ================================================== */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal mb-2">
                Strategic Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Workforce Solutions Designed for Scale
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
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md inline-block">
                    {sol.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{sol.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{sol.description}</p>
                  <div className="space-y-2 pt-3">
                    {sol.benefits.slice(0, 3).map((ben, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to="/solutions"
                    className="text-xs font-bold uppercase tracking-wider text-ruveron-navy hover:text-ruveron-royal inline-flex items-center gap-1"
                  >
                    <span>View Solution Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: WHY CHOOSE US (4 CARDS - STRICT ACCURACY)
          ================================================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-widest">
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built on Execution, Compliance & Partnership
            </h2>
            <p className="text-slate-600 text-base">
              Why leading enterprises choose RUVERON SOLUTIONS as their core workforce and payroll engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-4 hover:border-ruveron-royal transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Proven Track Record of Execution</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consistent execution of high-volume payroll computational workflows and workforce deployments with precision.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-4 hover:border-ruveron-cyan transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Long-Term Client Partnerships</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Building enduring relationships grounded in operational transparency, dedicated support, and mutual growth.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-4 hover:border-ruveron-navy transition">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-md">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Trusted Workforce Transformation Partner</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Empowering organizations to optimize HR operations, reduce administrative burden, and unlock talent potential.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 space-y-4 hover:border-teal-600 transition">
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900">Operational Excellence & Sustainable Growth</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standardized governance frameworks designed to adapt dynamically as your company scales across regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: OUR MISSION & OUR PROMISE
          ================================================== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-ruveron-dark to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
          {/* Our Mission Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest border border-cyan-500/30">
                {homeContent.missionHeading}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Empowering Organizations with Agile Payroll & HR
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                &quot;{homeContent.missionStatement}&quot;
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {homeContent.missionPoints.map((pt, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-ruveron-royal/30 text-cyan-400 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-white text-base">{pt.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Promise Quote Block */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ruveron-navy to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                {homeContent.promiseHeading}
              </div>
              <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed italic">
                &quot;{homeContent.promiseContent}&quot;
              </blockquote>
              <div className="pt-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                — RUVERON SOLUTIONS PRIVATE LIMITED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: CTA SECTION
          ================================================== */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-ruveron-navy via-slate-900 to-ruveron-blue text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {homeContent.ctaHeading}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                {homeContent.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition"
              >
                Talk to Our Experts
              </Link>
              <Link
                to="/contact"
                className="px-7 py-4 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: CONTACT PREVIEW
          ================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
                Corporate Office
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                RUVERON SOLUTIONS PRIVATE LIMITED
              </h2>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-ruveron-royal shrink-0 mt-0.5" />
                  <span>{companyInfo.fullAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-ruveron-royal shrink-0" />
                  <a href={`tel:${companyInfo.phone}`} className="font-semibold text-slate-900 hover:text-ruveron-royal">
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-ruveron-royal shrink-0" />
                  <a href={`mailto:${companyInfo.email}`} className="font-semibold text-slate-900 hover:text-ruveron-royal">
                    {companyInfo.email}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-ruveron-royal hover:text-ruveron-navy"
                >
                  <span>Open Full Contact Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Map Preview Container */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[320px] bg-slate-200">
              <iframe
                title="RUVERON Solutions Office Map"
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
        </div>
      </section>
    </>
  );
};
