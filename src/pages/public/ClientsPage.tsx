import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const ClientsPage: React.FC = () => {
  const { clients } = useData();
  const [industryFilter, setIndustryFilter] = useState('all');

  const publishedClients = clients.filter((c) => c.status === 'published');
  const industries = Array.from(new Set(publishedClients.map((c) => c.industry)));

  const filteredClients = publishedClients.filter((c) => {
    return industryFilter === 'all' || c.industry === industryFilter;
  });

  return (
    <>
      <SEOHead page="clients" />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Enterprise Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Valued Clients
          </h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Empowering organizations across India with turnkey workforce recruitment, flexi-staffing, and multi-state payroll execution.
          </p>
        </div>
      </section>

      {/* Infinite Auto-Scrolling Marquee Banner */}
      <section className="py-8 bg-slate-900 border-y border-slate-800 overflow-hidden relative">
        <div className="text-center text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-4">
          — Infinite Client Logo Ticker —
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-10">
            {/* Repeat client list twice to create seamless loop */}
            {[...publishedClients, ...publishedClients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 hover:border-cyan-500 transition"
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="w-8 h-8 object-cover rounded-lg"
                />
                <span className="text-xs font-bold text-white whitespace-nowrap">{client.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono">
                  {client.industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Client Portfolio Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setIndustryFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                industryFilter === 'all'
                  ? 'bg-ruveron-royal text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Sectors ({publishedClients.length})
            </button>

            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  industryFilter === ind
                    ? 'bg-ruveron-royal text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="h-28 rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-ruveron-royal font-bold text-[10px] uppercase tracking-wider">
                    {client.industry}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900">{client.name}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {client.description || 'Corporate HR & Payroll execution partner.'}
                  </p>
                </div>

                {client.websiteUrl && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={client.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-ruveron-royal hover:text-ruveron-navy inline-flex items-center gap-1"
                    >
                      <span>Visit Company Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold">Join Our Corporate Client Portfolio</h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Experience zero-defect payroll computation, statutory compliance management, and strategic workforce deployment.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-xl"
            >
              <span>Talk to Our HR Specialists</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
