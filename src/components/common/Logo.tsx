import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  showTagline = false,
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  const textColorClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const subTextColorClass =
    variant === 'light'
      ? 'text-cyan-300'
      : variant === 'dark'
      ? 'text-blue-700'
      : 'text-blue-600 dark:text-cyan-400';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* RUVERON Stylized R Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="logoCyan" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Rounded Hexagon / Shield Container */}
          <rect width="90" height="90" x="5" y="5" rx="20" fill="url(#logoBg)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" />
          
          {/* Stylized R Stem & Loop */}
          <path
            d="M 26 24 L 54 24 C 66 24 73 31 73 40 C 73 49 66 55 54 55 L 42 55 L 42 76 L 26 76 Z"
            fill="#ffffff"
          />
          {/* R Inner Counter */}
          <path
            d="M 42 37 L 52 37 C 56 37 59 39 59 42 C 59 45 56 47 52 47 L 42 47 Z"
            fill="#0f172a"
          />
          {/* Dynamic Forward Swoosh / Leg */}
          <path
            d="M 50 51 L 70 76 L 54 76 L 39 55 Z"
            fill="url(#logoCyan)"
            filter="url(#glow)"
          />
          {/* Tech Dot Accent */}
          <circle cx="72" cy="24" r="5" fill="#38bdf8" />
        </svg>
      </div>

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-extrabold tracking-tight font-sans ${titleSizes[size]} ${textColorClass}`}>
          RUVERON <span className={subTextColorClass}>SOLUTIONS</span>
        </div>
        <div className={`text-[10px] uppercase tracking-widest font-semibold text-slate-400 font-sans`}>
          PRIVATE LIMITED
        </div>
        {showTagline && (
          <div className={`font-medium tracking-normal mt-0.5 ${taglineSizes[size]} ${subTextColorClass}`}>
            Integrated HR & Payroll Management Partner
          </div>
        )}
      </div>
    </div>
  );
};
