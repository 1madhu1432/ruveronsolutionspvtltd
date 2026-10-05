import { useEffect } from 'react';
import { useData } from '../../context/DataContext';
import type { SEOSettings } from '../../types';

interface SEOHeadProps {
  page: keyof SEOSettings;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ page }) => {
  const { seoSettings } = useData();
  const pageSEO = seoSettings[page] || seoSettings.home;

  useEffect(() => {
    document.title = pageSEO.title;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageSEO.description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', pageSEO.keywords);

  }, [pageSEO]);

  return null;
};
