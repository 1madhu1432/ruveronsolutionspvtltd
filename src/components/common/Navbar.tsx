import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
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
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Skill Training', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-md shadow-2xl border-b border-cyan-500/20 py-3.5'
            : 'bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Link to="/" className="group focus:outline-none shrink-0">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Center - Matches reference mockup with cyan underline */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 font-outfit">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-fadeIn" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA & Search Right */}
            <div className="hidden md:flex items-center gap-4">
              {/* Get Started Pill Button */}
              <Link
                to="/contact"
                className="px-5 py-2 rounded-full border border-cyan-400/80 text-cyan-300 hover:text-slate-950 hover:bg-cyan-400 text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>

              {/* Search Icon Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-slate-300 hover:text-cyan-300 transition-colors duration-200 focus:outline-none"
                aria-label="Search Ruveron"
              >
                <Search className="w-5 h-5 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
              </button>
            </div>

            {/* Mobile Controls Right */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-slate-300 hover:text-cyan-300 focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
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
          <div className="md:hidden bg-slate-950/98 border-b border-slate-800 shadow-2xl px-5 pt-4 pb-6 space-y-3 animate-fadeIn">
            <nav className="flex flex-col space-y-2 font-outfit">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <Link
                to="/contact"
                className="w-full text-center py-2.5 rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 text-xs font-bold tracking-wider uppercase transition shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};
