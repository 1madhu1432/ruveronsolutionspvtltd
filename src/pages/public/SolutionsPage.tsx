import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Users, Calculator, Briefcase, UserCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const SolutionsPage: React.FC = () => {
  const { solutions } = useData();

  const publishedSolutions = solutions.filter((sol) => sol.status === 'published');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-ruveron-royal" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-ruveron-cyan" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-teal-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-blue-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <>
      <SEOHead page="solutions" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Corporate Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Solutions</h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Workforce solutions designed around your business needs.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card hover:shadow-card-hover transition duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getIcon(sol.iconName)}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-ruveron-royal">
                    {sol.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{sol.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{sol.description}</p>
                  
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Key Benefits
                    </div>
                    {sol.benefits.map((ben, i) => (
                      <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to="/contact"
                    className="w-full py-3 rounded-xl bg-ruveron-navy hover:bg-ruveron-blue text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <span>Request Solution Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Need a Customized HR & Payroll Framework?
          </h2>
          <p className="text-slate-600 text-base">
            Our solution architects work directly with your executive leadership to design tailored service blueprints.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold shadow-lg"
          >
            <span>Consult Our Solution Specialists</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};
