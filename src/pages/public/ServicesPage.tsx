import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { useData } from '../../context/DataContext';

export const ServicesPage: React.FC = () => {
  const { services } = useData();

  const publishedServices = services.filter((s) => s.status === 'published');

  return (
    <>
      <SEOHead page="services" />

      {/* ==================================================
          PAGE HERO HEADER
          ================================================== */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-700/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Enterprise Service Delivery</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-outfit">
            Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Services</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Turnkey workforce solutions, precision payroll architecture, and statutory compliance management for modern businesses.
          </p>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> 100% Statutory SLA
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-cyan-400" /> Dedicated Account Managers
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          DYNAMIC SERVICES LIST (WITH PHOTOS)
          ================================================== */}
      <div className="divide-y divide-slate-100">
        {publishedServices.map((srv, index) => {
          const isOdd = index % 2 === 1;
          const photoUrl =
            srv.imageUrl ||
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';

          return (
            <section
              key={srv.id}
              id={`service-${srv.id}`}
              className={`py-20 ${isOdd ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 ${isOdd ? 'order-1 lg:order-2' : 'order-1'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                      <img
                        src={photoUrl}
                        alt={srv.name}
                        className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-cyan-300 text-xs font-semibold border border-slate-700/60">
                          {srv.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isOdd ? 'order-2 lg:order-1' : 'order-2'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono">
                      {srv.category}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
                      {srv.name}
                    </h2>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 pt-2">
                      {srv.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 flex items-center gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-ruveron-royal to-ruveron-blue text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all font-outfit"
                      >
                        <span>Discuss Your Requirements</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ==================================================
          BOTTOM CTA SECTION
          ================================================== */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit">
            Ready to Optimize Your Corporate Operations?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Partner with RUVERON SOLUTIONS for tailored workforce management, seamless payroll, and robust statutory compliance.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all font-outfit"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
