import React from 'react';
import { Users, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const TeamPage: React.FC = () => {
  const { team } = useData();
  const publishedTeam = team.filter((m) => m.status === 'published');

  return (
    <>
      <SEOHead page="about" />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Executive Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Leadership & Experts
          </h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Meet the seasoned professionals driving HR excellence, statutory compliance, talent acquisition, and payroll innovation at Ruveron.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {publishedTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition text-center space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-ruveron-royal text-white font-bold text-2xl flex items-center justify-center">
                        {member.name[0]}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-ruveron-royal font-bold text-[10px] uppercase tracking-wider mb-1">
                      {member.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">{member.designation}</p>
                  </div>
                </div>

                {member.linkedin && (
                  <div className="pt-3 border-t border-slate-100 flex justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-slate-100 text-ruveron-royal hover:bg-ruveron-royal hover:text-white transition inline-flex items-center gap-1 text-xs font-semibold"
                      title="LinkedIn Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Values */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold">Driven by Excellence & Integrity</h2>
            <p className="text-slate-300 text-sm">
              Our leadership team brings together decades of combined experience in Indian labor laws, multi-tier payroll, and corporate talent management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Strategic Governance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured oversight ensuring compliance with all central and state labor regulations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="text-base font-bold text-white">Client Partnership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated account leads assigned to each client for seamless operations and direct accountability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <ArrowRight className="w-8 h-8 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Continuous Innovation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adopting digital workflows and automation to streamline client HR execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
