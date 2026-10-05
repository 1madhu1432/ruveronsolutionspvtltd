import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Info,
  Layers,
  Briefcase,
  MessageSquare,
  Users,
  Image as ImageIcon,
  Phone,
  UserCheck,
  Search,
  Settings,
  LogOut,
  Handshake,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { useData } from '../../context/DataContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { jobApplications } = useData();

  const newAppsCount = jobApplications.filter((a) => a.status === 'New').length;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Lead Management', path: '/admin/leads', icon: <UserCheck className="w-4 h-4 text-cyan-400" />, badge: 'Leads' },
    { name: 'Careers & Jobs', path: '/admin/careers', icon: <Briefcase className="w-4 h-4 text-emerald-400" />, badge: newAppsCount > 0 ? `${newAppsCount} Apps` : undefined },
    { name: 'Our Partners', path: '/admin/partners', icon: <Handshake className="w-4 h-4 text-amber-400" /> },
    { name: 'Home Content', path: '/admin/home-content', icon: <Home className="w-4 h-4" /> },
    { name: 'About Us', path: '/admin/about-content', icon: <Info className="w-4 h-4" /> },
    { name: 'Solutions', path: '/admin/solutions', icon: <Layers className="w-4 h-4" /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Team', path: '/admin/team', icon: <Users className="w-4 h-4" /> },
    { name: 'Media Library', path: '/admin/media', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Contact Info', path: '/admin/contact', icon: <Phone className="w-4 h-4" /> },
    { name: 'Basic SEO', path: '/admin/seo', icon: <Search className="w-4 h-4" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-950 text-slate-300 border-r border-slate-800">
      {/* Brand Top Header */}
      <div className="p-5 border-b border-slate-800 space-y-2">
        <Logo variant="light" size="sm" showTagline={false} />
        <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between">
          <span>CMS Admin Control</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                active
                  ? 'bg-gradient-to-r from-ruveron-royal to-ruveron-blue text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-ruveron-royal text-white font-bold text-xs flex items-center justify-center">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@ruveron.com'}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-semibold flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
