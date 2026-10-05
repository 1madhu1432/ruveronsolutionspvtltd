import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Handshake } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const PartnersPage: React.FC = () => {
  const { partners } = useData();
  const [categoryFilter, setCategoryFilter] = useState('all');

  const publishedPartners = partners.filter((p) => p.status === 'published');

  const categories = Array.from(new Set(publishedPartners.map((p) => p.category)));

  const filteredPartners = publishedPartners.filter((p) => {
    return categoryFilter === 'all' || p.category === categoryFilter;
  });

  return (
    <>
      <SEOHead page="partners" />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Handshake className="w-4 h-4 text-cyan-400" />
            <span>Strategic Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Partners & Industry Associates
          </h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Collaborating with leading enterprise organizations to deliver seamless workforce execution and statutory governance.
          </p>
        </div>
      </section>

      {/* Partners Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                categoryFilter === 'all'
                  ? 'bg-ruveron-royal text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Partners ({publishedPartners.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  categoryFilter === cat
                    ? 'bg-ruveron-royal text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="h-28 rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <span className="inline-block px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 font-bold text-[10px] uppercase tracking-wider">
                    {partner.category}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900">{partner.name}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {partner.description || 'Enterprise collaboration partner for workforce solutions.'}
                  </p>
                </div>

                {partner.websiteUrl && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-ruveron-royal hover:text-ruveron-navy inline-flex items-center gap-1"
                    >
                      <span>Visit Partner Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Call to Action */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold">Become a Strategic Partner</h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Are you looking to expand your workforce execution capabilities or collaborate on HR statutory compliance delivery? Let’s connect.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-xl"
            >
              <span>Discuss Strategic Partnership</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
