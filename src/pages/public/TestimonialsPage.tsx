import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, Star, ArrowRight, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SEOHead } from '../../components/common/SEOHead';

export const TestimonialsPage: React.FC = () => {
  const { testimonials } = useData();
  const publishedTestimonials = testimonials.filter((t) => t.status === 'published');

  return (
    <>
      <SEOHead page="home" />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Client Endorsements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Client Testimonials & Feedback
          </h1>
          <p className="text-xl text-slate-300 font-normal max-w-2xl mx-auto">
            Hear from corporate HR directors, operational leaders, and business partners across India who trust Ruveron Solutions.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publishedTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-10 h-10 text-ruveron-royal/20" />
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{t.testimonial}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-ruveron-cyan"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-ruveron-royal text-white font-bold flex items-center justify-center">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {t.designation} — <span className="text-ruveron-royal font-semibold">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-extrabold">Ready for Error-Free HR & Payroll Operations?</h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Partner with Ruveron Solutions today and experience seamless corporate workforce management.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold text-base shadow-xl hover:scale-105 transition"
            >
              <span>Get in Touch With Us</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
