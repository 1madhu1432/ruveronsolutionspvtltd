import React, { useState } from 'react';
import { BrandEmblem } from './BrandEmblem';
import { useData } from '../../context/DataContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  customLogoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'auto',
  showTagline = false,
  size = 'md',
  className = '',
  customLogoUrl,
}) => {
  const { companyInfo } = useData();
  const [imgError, setImgError] = useState(false);

  // Determine active logo URL & mode
  const activeUrl = customLogoUrl || companyInfo?.logoUrl;
  const isCustomMode =
    companyInfo?.logoType === 'custom' || (!companyInfo?.logoType && Boolean(activeUrl));
  const hasCustomLogo = Boolean(activeUrl) && isCustomMode && !imgError;

  if (hasCustomLogo && activeUrl) {
    const defaultHeightClass = {
      sm: 'h-8 sm:h-9',
      md: 'h-10 sm:h-11',
      lg: 'h-12 sm:h-14',
      hero: 'h-16 sm:h-20',
    }[size];

    return (
      <div className={`flex flex-col select-none transition-all ${className}`}>
        <div className="flex items-center gap-2">
          <img
            src={activeUrl}
            alt={companyInfo?.companyName || 'Corporate Brand Logo'}
            className={`${defaultHeightClass} w-auto object-contain max-w-[260px] drop-shadow-sm`}
            onError={() => setImgError(true)}
          />
        </div>
        {(showTagline || companyInfo?.showLogoTagline) && companyInfo?.tagline && (
          <span
            className={`text-[10px] tracking-wider uppercase font-semibold mt-0.5 line-clamp-1 ${
              variant === 'light' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {companyInfo.tagline}
          </span>
        )}
      </div>
    );
  }

  return <BrandEmblem size={size} className={className} />;
};
