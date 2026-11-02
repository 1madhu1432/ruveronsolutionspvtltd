import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Award, CheckCircle2, ArrowRight, HeartHandshake, History } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const AboutPage: React.FC = () => {
  const { aboutContent, homeContent } = useData();

  const ourStoryImg =
    aboutContent.ourStoryImageUrl ||
    homeContent.ourStoryImageUrl ||
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80';

  const coreValuesImg =
    aboutContent.coreValuesImageUrl ||
    homeContent.coreValuesImageUrl ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80';

  return (
    <>
      <SEOHead page="about" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Corporate Profile
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {aboutContent.heroTitle}
          </h1>
          <p className="text-xl text-cyan-400 font-semibold tracking-wide font-sans">
            {aboutContent.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 1. Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
            Company Overview
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Integrated HR & Payroll Execution Engine
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {aboutContent.companyOverview}
          </p>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed">
            RUVERON SOLUTIONS operates at the intersection of strategic talent management, process rigor, and statutory compliance. We eliminate administrative friction so organizations can focus on core expansion.
          </div>
        </div>
      </section>

      {/* OUR STORY (WITH MEDIA UPLOAD DISPLAY) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-100 text-cyan-900 text-xs font-bold uppercase tracking-wider">
                <History className="w-3.5 h-3.5" />
                <span>Our Story & Founding Legacy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
                Built to Deliver Precision, Reliability, and Scale
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {homeContent.ourStoryDesc ||
                  'Founded with a clear vision to bridge operational execution and organizational growth, Ruveron Solutions has evolved into a premier workforce, payroll management, and turnkey engineering solutions provider.'}
              </p>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-900">Milestone Highlights</div>
                <div>• Pan-India client base spanning IT, Manufacturing, Healthcare, and BFSI</div>
                <div>• Zero-defect compliance track record across statutory regulatory bodies</div>
                <div>• Turnkey engineering division supporting major industrial climate projects</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group">
                <img
                  src={ourStoryImg}
                  alt="Our Story"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md text-white border border-slate-700/60">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                    Ruveron Solutions Journey
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    Strategic Execution & Continuous Expansion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES (WITH MEDIA UPLOAD DISPLAY) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group">
                <img
                  src={coreValuesImg}
                  alt="Core Values"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md text-white border border-slate-700/60">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                    Guiding Principles
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    Integrity, Excellence & Compliance Rigor
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-ruveron-royal text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Our Core Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
                Values That Define Every Engagement
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {homeContent.coreValuesDesc ||
                  'Integrity, precision execution, transparency, continuous innovation, and unwavering client commitment form the bedrock of everything we build.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-royal" />
                    <span>Integrity & Trust</span>
                  </div>
                  <p className="text-xs text-slate-600">Uncompromising honesty in statutory reporting and transparency.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ruveron-cyan" />
                    <span>Client First</span>
                  </div>
                  <p className="text-xs text-slate-600">Tailored service delivery matching organizational culture.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section id="mission" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ruveron-royal text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                &quot;{aboutContent.mission}&quot;
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ruveron-cyan text-white flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                &quot;{aboutContent.vision}&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Approach */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
              Operational Methodology
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Approach</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.approachPoints.map((pt, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-ruveron-royal font-bold flex items-center justify-center text-sm">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{pt.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Strengths */}
      <section id="strengths" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
              Core Pillars
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Strengths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.strengths.map((str, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-900 text-white space-y-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
                <h4 className="text-lg font-bold">{str.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{str.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Ruveron */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-ruveron-royal">
              Client Value Proposition
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Why Ruveron Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutContent.whyRuveron.map((why, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{why.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{why.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ruveron-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold">Partner with RUVERON SOLUTIONS Today</h2>
          <p className="text-slate-300 text-base">
            Let us optimize your HR infrastructure and payroll management with future-ready precision.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-xl"
            >
              <span>Talk to Our Experts</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
