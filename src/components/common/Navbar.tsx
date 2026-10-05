import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Info, Users, Handshake, Building2, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const companySubLinks = [
    { name: 'About Us', path: '/about', icon: <Info className="w-4 h-4 text-cyan-400" />, desc: 'Company Overview & Mission' },
    { name: 'Leadership Team', path: '/team', icon: <Users className="w-4 h-4 text-blue-400" />, desc: 'Executives & Specialists' },
    { name: 'Our Partners', path: '/partners', icon: <Handshake className="w-4 h-4 text-amber-400" />, desc: 'Strategic Associates' },
    { name: 'Our Clients', path: '/clients', icon: <Building2 className="w-4 h-4 text-emerald-400" />, desc: 'Enterprise Portfolio' },
    { name: 'Testimonials', path: '/testimonials', icon: <MessageSquare className="w-4 h-4 text-purple-400" />, desc: 'Client Feedback' },
  ];

  const isCompanyActive = companySubLinks.some((link) => location.pathname.startsWith(link.path));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Left */}
          <Link to="/" className="group focus:outline-none">
            <Logo variant="light" size="md" />
          </Link>

          {/* Desktop Navigation Center */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md">
            {/* Home */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-ruveron-royal text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            {/* Company Dropdown Trigger */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  isCompanyActive || companyDropdownOpen
                    ? 'bg-ruveron-royal/80 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    companyDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-1">
                  {companySubLinks.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                          active
                            ? 'bg-ruveron-royal/30 text-white border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Solutions */}
            <Link
              to="/solutions"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                location.pathname.startsWith('/solutions')
                  ? 'bg-ruveron-royal text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Solutions
            </Link>

            {/* Services */}
            <Link
              to="/services"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                location.pathname.startsWith('/services')
                  ? 'bg-ruveron-royal text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Services
            </Link>

            {/* Careers */}
            <Link
              to="/careers"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                location.pathname.startsWith('/careers')
                  ? 'bg-ruveron-royal text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Careers
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                location.pathname.startsWith('/contact')
                  ? 'bg-ruveron-royal text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop CTA Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="group px-5 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 border-b border-slate-800 shadow-2xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1 text-xs">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname === '/' ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            {/* Company Group in Mobile */}
            <div className="pt-2 pb-1 px-4 text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Company Overview
            </div>
            {companySubLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`pl-6 pr-4 py-2 rounded-xl text-xs flex items-center gap-2 ${
                  location.pathname === item.path ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="pt-2 pb-1 px-4 text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              Solutions & Services
            </div>
            <Link
              to="/solutions"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname.startsWith('/solutions') ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Solutions
            </Link>
            <Link
              to="/services"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname.startsWith('/services') ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Services
            </Link>
            <Link
              to="/careers"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname.startsWith('/careers') ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                location.pathname.startsWith('/contact') ? 'bg-ruveron-royal text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/contact"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-center font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
