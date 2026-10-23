import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Zap, Award, Sparkles, Building2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { areasOfExpertise, projectSectors } from '../../data/hvacSolutionsData';
import { HvacIcon } from '../../components/solutions/HvacIcons';
import { SolutionDetailModal, type UnifiedDetailItem } from '../../components/solutions/SolutionDetailModal';
import { useData } from '../../context/DataContext';

export const SolutionsPage: React.FC = () => {
  const { solutions, projects } = useData();
  const [selectedItem, setSelectedItem] = useState<UnifiedDetailItem | null>(null);

  // Active published data from context, with fallback to initial static datasets
  const activeSolutions =
    solutions.filter((s) => s.status === 'published').length > 0
      ? solutions.filter((s) => s.status === 'published')
      : areasOfExpertise.map((a) => ({
          id: a.id,
          title: a.title,
          category: a.category,
          description: a.description,
          benefits: a.features,
          imageUrl: a.image,
          iconName: a.iconType,
          status: 'published' as const,
          updatedAt: '2026-10-01',
        }));

  const activeProjects =
    projects.filter((p) => p.status === 'published').length > 0
      ? projects.filter((p) => p.status === 'published')
      : projectSectors.map((p) => ({
          id: p.id,
          title: p.title,
          sector: p.title,
          clientName: 'Commercial Enterprise',
          imageUrl: p.image,
          description: p.description,
          bullets: p.bullets,
          iconType: p.iconType,
          status: 'published' as const,
          updatedAt: '2026-10-01',
        }));

  return (
    <>
      <SEOHead page="solutions" />

      {/* ==================================================
          PAGE HERO HEADER
          ================================================== */}
      <section className="pt-32 pb-16 bg-[#020b18] text-white relative overflow-hidden">
        {/* Ambient Cyan Glows & Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-700/20 via-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Turnkey HVAC & Climate Engineering Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-outfit">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400">Solutions</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-3xl mx-auto leading-relaxed">
            Delivering high-performance heating, ventilation, and air-conditioning solutions engineered for commercial complexes, industrial plants, corporate towers, and healthcare institutions.
          </p>

          {/* Quick Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">50% Savings</div>
                <div className="text-[11px] text-slate-400">Inverter VRF Efficiency</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">100% Uptime</div>
                <div className="text-[11px] text-slate-400">Guaranteed AMC SLA</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">Certified OEM</div>
                <div className="text-[11px] text-slate-400">Tier-1 Partnerships</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-outfit">24/7 Support</div>
                <div className="text-[11px] text-slate-400">Pan-India Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN SOLUTIONS CONTAINER: Live from Admin Engine
          ================================================== */}
      <section className="py-12 sm:py-16 bg-[#f4f9fd]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Enclosed Visual Wrapper */}
          <div className="bg-white/95 rounded-3xl p-5 sm:p-8 lg:p-10 border border-blue-100/90 shadow-[0_4px_24px_rgba(3,43,95,0.06)] space-y-12">
            
            {/* --------------------------------------------------
                SECTION 1: OUR AREAS OF EXPERTISE & SOLUTIONS
                -------------------------------------------------- */}
            <div className="space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="bg-gradient-to-r from-[#032b5f] to-[#088395] text-white px-7 sm:px-9 py-2.5 sm:py-3 rounded-r-2xl sm:rounded-2xl font-black text-lg sm:text-xl font-outfit shadow-md tracking-wide">
                  Our Areas of Expertise
                </div>
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
                  Showing {activeSolutions.length} Solutions
                </span>
              </div>

              {/* Dynamic Expertise Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 pt-2">
                {activeSolutions.map((item) => {
                  const itemPhoto =
                    item.imageUrl ||
                    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setSelectedItem({
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          imageUrl: itemPhoto,
                          description: item.description,
                          features: item.benefits,
                          iconType: 'vrv',
                        })
                      }
                      className="group bg-[#f9fcff] hover:bg-white rounded-2xl p-2 sm:p-2.5 border border-blue-100 hover:border-cyan-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative"
                    >
                      {/* Top Thumbnail Image */}
                      <div className="w-full h-24 sm:h-28 md:h-32 rounded-xl overflow-hidden bg-slate-100 relative">
                        <img
                          src={itemPhoto}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                      </div>

                      {/* Circular Navy Icon Badge */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#032b5f] group-hover:bg-cyan-500 text-white flex items-center justify-center -mt-5 border-2 border-white shadow-md transition-colors duration-300 relative z-10 shrink-0">
                        <HvacIcon type="vrv" className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                      </div>

                      {/* Card Label */}
                      <h3 className="mt-2 text-xs sm:text-[13px] font-bold text-[#032b5f] group-hover:text-cyan-700 transition-colors leading-snug px-1 min-h-[38px] flex items-center justify-center font-outfit">
                        {item.title}
                      </h3>

                      {/* Subtle Click Indicator on Hover */}
                      <span className="text-[10px] text-cyan-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                        View Specs →
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent my-6" />

            {/* --------------------------------------------------
                SECTION 2: OUR PROJECTS & IMPLEMENTED CASE STUDIES
                -------------------------------------------------- */}
            <div className="space-y-6">
              {/* Header Badge & Subtitle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="bg-gradient-to-r from-[#032b5f] to-[#088395] text-white px-7 sm:px-9 py-2.5 sm:py-3 rounded-r-2xl sm:rounded-2xl font-black text-lg sm:text-xl font-outfit shadow-md tracking-wide shrink-0 inline-block">
                    Our Projects
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                    Delivering high-performance AC solutions across offices, commercial spaces, industries and institutions.
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  {activeProjects.length} Case Studies
                </span>
              </div>

              {/* Dynamic Project Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pt-2">
                {activeProjects.map((project) => {
                  const projPhoto =
                    project.imageUrl ||
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';

                  return (
                    <div
                      key={project.id}
                      onClick={() =>
                        setSelectedItem({
                          id: project.id,
                          title: project.title,
                          sector: project.sector,
                          clientName: project.clientName,
                          imageUrl: projPhoto,
                          description: project.description,
                          bullets: project.bullets,
                          iconType: project.iconType || 'building',
                        })
                      }
                      className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-cyan-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      {/* Top Sector Photography */}
                      <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-900">
                        <img
                          src={projPhoto}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        {project.clientName && (
                          <div className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-[10px] font-medium text-cyan-300 border border-slate-700/60">
                            {project.clientName}
                          </div>
                        )}
                      </div>

                      {/* Middle Navy Ribbon Bar */}
                      <div className="bg-[#032b5f] group-hover:bg-[#021f47] text-white py-2.5 px-3.5 flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors font-outfit">
                        <Building2 className="w-4 h-4 text-cyan-300 shrink-0" />
                        <span className="truncate">{project.sector || project.title}</span>
                      </div>

                      {/* Bottom Bullets List */}
                      <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {project.title}
                          </h4>
                          <ul className="space-y-1.5 pt-1">
                            {project.bullets.slice(0, 3).map((bullet, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-slate-700 font-semibold flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#032b5f] shrink-0" />
                                <span className="line-clamp-1">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-cyan-600 group-hover:text-cyan-700">
                          <span>Project Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==================================================
              BOTTOM CONSULTATION & PROPOSAL BANNER
              ================================================== */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#032b5f] via-[#043673] to-[#088395] text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 text-xs font-mono uppercase tracking-wider">
                Engineering Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-outfit leading-tight">
                Planning an Air-Conditioning Project or Need an AMC?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Connect with our HVAC project engineers for a comprehensive site survey, tonnage heat-load analysis, ductwork CAD blueprints, and competitive commercial quotes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group font-outfit"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-white/40 hover:bg-white/10 text-white font-semibold text-sm tracking-wide transition flex items-center justify-center gap-2 font-outfit"
              >
                <Phone className="w-4 h-4 text-cyan-300" />
                <span>Call Engineers</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Detail Modal */}
      <SolutionDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

export default SolutionsPage;
