import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, PhoneCall, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HvacIcon } from './HvacIcons';

export interface UnifiedDetailItem {
  id: string;
  title: string;
  category?: string;
  sector?: string;
  clientName?: string;
  image?: string;
  imageUrl?: string;
  iconType?: string;
  iconName?: string;
  description: string;
  features?: string[];
  benefits?: string[];
  bullets?: string[];
}

interface SolutionDetailModalProps {
  item: UnifiedDetailItem | null;
  onClose: () => void;
}

export const SolutionDetailModal: React.FC<SolutionDetailModalProps> = ({ item, onClose }) => {
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
    (item.clientName ? `Client: ${item.clientName}` : 'Engineering Solution');

  const highlightList = item.features || item.benefits || item.bullets || [];
  const iconTypeKey = item.iconType || (item.sector ? 'building' : 'vrv');

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
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                {badgeText}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 font-outfit">
                {item.title}
              </h3>
              {item.clientName && (
                <div className="text-xs text-slate-300 font-medium mt-0.5">
                  Client: <strong className="text-white">{item.clientName}</strong>
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

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#032b5f] to-[#0a4b9c] hover:from-[#021d42] hover:to-[#083b7c] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition"
            >
              <span>Request Solution Proposal & Site Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-full border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-cyan-600" />
              <span>Contact Engineers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailModal;
