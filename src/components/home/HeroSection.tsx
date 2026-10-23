import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BrandEmblem } from '../common/BrandEmblem';

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      tagline: 'Technology  •  Innovation  •  Your Success',
      subtitle: 'Empowering enterprises with intelligent workforce operations, precision staffing, and next-generation corporate management.',
      ctaText: 'Explore Our Solutions',
      ctaLink: '/solutions',
      secondaryText: 'Learn More',
      secondaryLink: '/about',
    },
    {
      tagline: 'HR Excellence  •  Statutory Compliance  •  Zero-Defect Payroll',
      subtitle: 'Complete end-to-end payroll processing, labor law governance, and automated statutory tax execution across India.',
      ctaText: 'Discover Services',
      ctaLink: '/services',
      secondaryText: 'Client Stories',
      secondaryLink: '/testimonials',
    },
    {
      tagline: 'Talent Acquisition  •  Executive Search  •  Pan-India Execution',
      subtitle: 'High-precision talent matching, contractual workforce staffing, and nationwide enterprise workforce deployment.',
      ctaText: 'Partner With Us',
      ctaLink: '/contact',
      secondaryText: 'View Careers',
      secondaryLink: '/careers',
    },
  ];

  // Auto advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 bg-[#020b18] overflow-hidden select-none">
      {/* ==================================================
          BACKGROUND: Deep Navy + Glowing Cyan Light Beams + Cyber Grid
          ================================================== */}
      
      {/* 1. Cyber Perspective Grid / Constellation on Left */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="gridGlow" cx="20%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#020b18" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#gridGlow)" />
          
          {/* Cyber Perspective Grid Lines */}
          <g stroke="rgba(34, 211, 238, 0.18)" strokeWidth="1">
            <line x1="0" y1="100" x2="600" y2="900" />
            <line x1="0" y1="250" x2="700" y2="900" />
            <line x1="0" y1="400" x2="800" y2="900" />
            <line x1="0" y1="550" x2="900" y2="900" />
            <line x1="0" y1="700" x2="1000" y2="900" />

            <line x1="50" y1="0" x2="350" y2="900" />
            <line x1="180" y1="0" x2="480" y2="900" />
            <line x1="320" y1="0" x2="620" y2="900" />
            
            {/* Horizontal Intersecting Lines */}
            <line x1="0" y1="300" x2="650" y2="300" />
            <line x1="0" y1="450" x2="750" y2="450" />
            <line x1="0" y1="600" x2="880" y2="600" />
            <line x1="0" y1="750" x2="1050" y2="750" />
          </g>

          {/* Glowing Constellation Node Dots */}
          <g fill="#22d3ee">
            <circle cx="180" cy="300" r="3.5" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="180" cy="300" r="2.5" />
            <circle cx="320" cy="450" r="3" className="animate-pulse" />
            <circle cx="480" cy="600" r="3" />
            <circle cx="250" cy="550" r="2" />
            <circle cx="400" cy="350" r="2.5" />
            <circle cx="620" cy="750" r="3.5" />
          </g>
        </svg>
      </div>

      {/* 2. Angled Cyan Luminous Planes & Beams (Matches the mockup's sharp bottom-right diagonal light ribbon) */}
      <div className="absolute right-0 bottom-0 w-full sm:w-2/3 h-full pointer-events-none overflow-hidden">
        {/* Broad Glowing Cyan Diagonal Plane */}
        <div
          className="absolute -right-32 -bottom-20 w-[650px] md:w-[850px] h-[600px] bg-gradient-to-tl from-cyan-400/25 via-cyan-600/15 to-transparent blur-2xl transform rotate-[-28deg]"
        />

        {/* Crisp Angled Geometric Light Facet */}
        <svg
          className="absolute right-0 bottom-0 w-[550px] md:w-[700px] h-[550px] opacity-75"
          viewBox="0 0 700 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="facetGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#020b18" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="edgeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Angled Facet Polygon */}
          <polygon
            points="700,100 700,550 200,550 450,250"
            fill="url(#facetGrad1)"
          />

          {/* Sharp Glowing Edge Line */}
          <line
            x1="200"
            y1="550"
            x2="550"
            y2="180"
            stroke="url(#edgeGrad)"
            strokeWidth="3"
            filter="drop-shadow(0 0 10px #38bdf8)"
          />

          <line
            x1="320"
            y1="550"
            x2="650"
            y2="200"
            stroke="rgba(34, 211, 238, 0.4)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Ambient Top-Left Cyan Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* ==================================================
          HERO CONTENT: Centerpiece Logo + Tagline + Buttons
          ================================================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* Large Prominent RUVERON Emblem & Wordmark */}
        <div className="transform hover:scale-[1.01] transition-transform duration-500">
          <BrandEmblem size="hero" showDivider={true} />
        </div>

        {/* Tagline / Subtitle with Glowing Cyan Bullets */}
        <div className="mt-8 sm:mt-10 max-w-3xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-slate-100 font-outfit drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {current.tagline.split('•').map((segment, idx, arr) => (
              <React.Fragment key={idx}>
                <span className="hover:text-cyan-300 transition-colors duration-200">
                  {segment.trim()}
                </span>
                {idx < arr.length - 1 && (
                  <span className="mx-2 sm:mx-3 text-cyan-400 font-bold drop-shadow-[0_0_8px_#22d3ee]">
                    •
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            {current.subtitle}
          </p>
        </div>

        {/* Hero CTA Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-outfit">
          {/* Primary CTA Button: Glowing Cyan Pill */}
          <Link
            to={current.ctaLink}
            className="group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.65)] hover:shadow-[0_0_45px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3"
          >
            <span>{current.ctaText}</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA: Clean Text / Subtle Underline */}
          <Link
            to={current.secondaryLink}
            className="px-5 py-3 text-sm sm:text-base font-semibold text-slate-200 hover:text-white border-b-2 border-slate-700 hover:border-cyan-400 hover:shadow-[0_4px_12px_rgba(6,182,212,0.3)] transition-all duration-200"
          >
            {current.secondaryText}
          </Link>
        </div>
      </div>

      {/* ==================================================
          BOTTOM BAR: Carousel Slide Dots (Matches Mockup bottom-right)
          ================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-6">
        {/* Subtle quick stats indicator on left */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% Statutory Compliant</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Pan-India Workforce Network</span>
          </div>
        </div>

        {/* 3 Carousel Dots at Bottom-Right */}
        <div className="ml-auto flex items-center gap-2.5 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800/80 backdrop-blur-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`transition-all duration-300 focus:outline-none ${
                activeSlide === idx
                  ? 'w-6 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
                  : 'w-2 h-2 rounded-full bg-slate-600/80 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
