import React from 'react';

interface BrandEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showDivider?: boolean;
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  size = 'md',
  className = '',
  showDivider = true,
}) => {
  if (size === 'hero') {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 select-none ${className}`}>
        {/* Stylized Modern Dual-Tone R Monogram */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]">
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cyanGradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="whiteSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="85%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stylized R: Upper Stem and Loop (Crisp White/Silver with beveled cut) */}
            <path
              d="M 28 20 
                 L 104 20 
                 C 130 20, 142 34, 142 54 
                 C 142 74, 128 86, 102 86 
                 L 76 86 
                 L 66 70 
                 L 98 70 
                 C 114 70, 122 63, 122 53 
                 C 122 43, 114 36, 98 36 
                 L 52 36 
                 L 52 82 
                 L 28 82 
                 Z"
              fill="url(#whiteSilverGrad)"
            />

            {/* Diagonal Sharp Cut Upper Left Stem */}
            <path
              d="M 28 20 L 52 20 L 52 74 L 28 74 Z"
              fill="url(#whiteSilverGrad)"
            />

            {/* Stylized R: Dynamic Forward Thrust Leg (Electric Glowing Cyan) */}
            <path
              d="M 72 82 
                 L 100 82 
                 L 134 138 
                 L 104 138 
                 L 78 96 
                 L 56 130 
                 L 32 130 
                 L 62 82 
                 Z"
              fill="url(#cyanGradientHero)"
              filter="url(#heroGlow)"
            />

            {/* Electric Cyan Accent Winglet on the Lower Left */}
            <path
              d="M 38 98 
                 L 58 66 
                 L 70 66 
                 L 46 104 
                 Z"
              fill="#38bdf8"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Vertical Divider Line */}
        {showDivider && (
          <div className="hidden sm:block w-[2px] h-28 md:h-36 bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
        )}

        {/* Right Typography Block */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left font-outfit">
          {/* RUVERON with 3 Upward-Angled Cyan Chevrons */}
          <div className="relative flex items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
              RUVERON
            </span>

            {/* 3 Upward-Angled Chevrons >>> */}
            <div className="ml-2 sm:ml-3 -mt-6 sm:-mt-8 flex items-center space-x-1">
              <svg
                className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400 drop-shadow-[0_0_10px_#22d3ee] animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 6 18 L 14 10 L 6 2 M 11 18 L 19 10 L 11 2"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 8 18 L 16 10 L 8 2"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* SOLUTIONS in Electric Cyan */}
          <div className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] -mt-1 sm:-mt-2">
            SOLUTIONS
          </div>

          {/* ── PRIVATE LIMITED ── flanked with lines */}
          <div className="w-full flex items-center justify-center sm:justify-start gap-2.5 sm:gap-4 mt-1 sm:mt-2">
            <div className="h-[1.5px] flex-1 max-w-[40px] sm:max-w-[70px] bg-gradient-to-r from-transparent to-cyan-400/80" />
            <span className="text-[11px] sm:text-xs md:text-sm uppercase font-bold tracking-[0.35em] text-slate-200">
              PRIVATE LIMITED
            </span>
            <div className="h-[1.5px] flex-1 max-w-[40px] sm:max-w-[70px] bg-gradient-to-l from-transparent to-cyan-400/80" />
          </div>
        </div>
      </div>
    );
  }

  // Compact / Nav sizes
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]', leg: 'text-[7px]' },
    md: { icon: 'w-9 h-9', text: 'text-lg', sub: 'text-[11px]', leg: 'text-[8px]' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', sub: 'text-xs', leg: 'text-[9px]' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none font-outfit ${className}`}>
      {/* Stylized R Icon */}
      <div className={`relative ${sizes.icon} shrink-0 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]`}>
        <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="cyanGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path
            d="M 28 20 L 104 20 C 130 20, 142 34, 142 54 C 142 74, 128 86, 102 86 L 76 86 L 66 70 L 98 70 C 114 70, 122 63, 122 53 C 122 43, 114 36, 98 36 L 52 36 L 52 82 L 28 82 Z"
            fill="#ffffff"
          />
          <path d="M 28 20 L 52 20 L 52 74 L 28 74 Z" fill="#ffffff" />
          <path
            d="M 72 82 L 100 82 L 134 138 L 104 138 L 78 96 L 56 130 L 32 130 L 62 82 Z"
            fill="url(#cyanGradNav)"
          />
          <path d="M 38 98 L 58 66 L 70 66 L 46 104 Z" fill="#38bdf8" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-white ${sizes.text}`}>
            RUVERON
          </span>
          <span className={`font-black tracking-wider text-cyan-400 ${sizes.sub}`}>
            SOLUTIONS
          </span>
        </div>
        <div className={`uppercase tracking-[0.22em] font-semibold text-slate-400 mt-0.5 ${sizes.leg}`}>
          PRIVATE LIMITED
        </div>
      </div>
    </div>
  );
};
