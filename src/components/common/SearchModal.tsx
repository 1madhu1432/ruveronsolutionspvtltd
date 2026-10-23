import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Briefcase, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchData = [
    { title: 'HR & Payroll Management', type: 'Service', path: '/services', desc: 'End-to-end statutory compliant payroll and tax compute' },
    { title: 'Talent Acquisition & Staffing', type: 'Service', path: '/services', desc: 'Executive search, contractual and permanent recruitment' },
    { title: 'Statutory Compliance & Audit', type: 'Service', path: '/services', desc: 'PF, ESI, Labor Laws, Factory Act, Minimum Wages adherence' },
    { title: 'Enterprise Workforce Solutions', type: 'Solution', path: '/solutions', desc: 'Scalable blue-collar and white-collar workforce solutions' },
    { title: 'Attendance & Leave Automation', type: 'Solution', path: '/solutions', desc: 'Biometric and geo-fenced cloud time tracking systems' },
    { title: 'About Ruveron Solutions', type: 'Company', path: '/about', desc: 'Corporate mission, vision, values, and quality assurance' },
    { title: 'Leadership & Team', type: 'Company', path: '/team', desc: 'Management and industry domain leaders' },
    { title: 'Client Portfolio', type: 'Clients', path: '/clients', desc: 'Enterprise and mid-market organizations powered by Ruveron' },
    { title: 'Strategic Partners', type: 'Partners', path: '/partners', desc: 'Technology and business associate networks' },
    { title: 'Careers at Ruveron', type: 'Careers', path: '/careers', desc: 'Open positions and career growth opportunities' },
    { title: 'Contact & Consultation', type: 'Contact', path: '/contact', desc: 'Corporate office locations and consultation requests' },
  ];

  const filtered = query.trim() === ''
    ? searchData.slice(0, 5)
    : searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search solutions, services, compliance, careers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
            {query.trim() === '' ? 'Quick Navigation' : `Results (${filtered.length})`}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No matching pages found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 text-cyan-400 border border-slate-800 shrink-0 mt-0.5">
                    {item.type === 'Service' && <Briefcase className="w-4 h-4" />}
                    {item.type === 'Solution' && <FileText className="w-4 h-4" />}
                    {item.type === 'Company' && <Info className="w-4 h-4" />}
                    {item.type === 'Contact' && <Phone className="w-4 h-4" />}
                    {['Clients', 'Partners', 'Careers'].includes(item.type) && <Briefcase className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {item.type}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Press ESC to close</span>
          <span className="text-cyan-400/80 font-mono">Ruveron Search</span>
        </div>
      </div>
    </div>
  );
};
