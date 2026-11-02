import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldAlert, Cpu, Video } from 'lucide-react';
import { HvacIcon } from './HvacIcons';

// SVG Icons for YouTube and Instagram
const YoutubeIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export interface UnifiedDetailItem {
  id: string;
  title: string;
  category?: string;
  sector?: string;
  companyName?: string;
  customer?: string;
  clientName?: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  iconType?: string;
  iconName?: string;
  description: string;
  features?: string[];
  benefits?: string[];
  bullets?: string[];
  pincode?: string;
  implementedProjects?: string;
}

interface SolutionDetailModalProps {
  item: UnifiedDetailItem | null;
  onClose: () => void;
  onOpenEnquiry?: (title: string) => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({
  item,
  onClose,
  onOpenEnquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  const imageSrc =
    item.imageUrl ||
    item.image ||
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';

  const badgeText =
    item.category ||
    item.sector ||
    (item.customer ? `Client: ${item.customer}` : item.clientName ? `Client: ${item.clientName}` : 'Engineering Solution');

  const highlightList = item.features || item.benefits || item.bullets || [];
  const iconTypeKey = item.iconType || (item.sector ? 'building' : 'vrv');

  const handleEnquiryClick = () => {
    onClose();
    if (onOpenEnquiry) {
      onOpenEnquiry(item.title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-scaleUp">
        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={imageSrc}
            alt={item.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Badge in image overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {badgeText}
                </span>
                {item.pincode && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 border border-amber-400/30">
                    PIN: {item.pincode}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 font-outfit">
                {item.title}
              </h3>
              {(item.customer || item.clientName) && (
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Client/Customer: <strong className="text-white">{item.customer || item.clientName}</strong>
                </div>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-[#0a1e3f] text-cyan-300 flex items-center justify-center border-2 border-cyan-400 shadow-lg shrink-0">
              <HvacIcon type={iconTypeKey} className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overview & Scope
            </h4>
            <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Multiple Media Gallery Preview if provided */}
          {item.images && item.images.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Project Gallery
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {item.images.map((img, idx) => (
                  <div key={idx} className="h-20 rounded-xl overflow-hidden bg-slate-100">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video or Social Links if provided */}
          {(item.videoUrl || item.youtubeUrl || item.instagramUrl) && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Video className="w-4 h-4 text-cyan-600" />
                <span>Media & Demonstration Links</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {item.videoUrl && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-100 text-cyan-800 font-semibold"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video Demo</span>
                  </a>
                )}
                {item.youtubeUrl && (
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-800 font-semibold"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                    <span>YouTube Channel</span>
                  </a>
                )}
                {item.instagramUrl && (
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-100 text-pink-800 font-semibold"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram Showcase</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Key Deliverables / Features */}
          {highlightList.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600" />
                <span>Technical Specifications & Highlights</span>
              </h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlightList.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance & SLA Guarantee */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs">
            <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              Engineered in full compliance with ASHRAE, ISHRAE, and National Building Code standards with certified energy ratings.
            </span>
          </div>

          {/* Footer CTAs: Changed to Service Enquiry */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleEnquiryClick}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#032b5f] to-[#088395] hover:from-[#021d42] hover:to-[#066b7a] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition"
            >
              <span>Service Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-full border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs tracking-wide transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailModal;
