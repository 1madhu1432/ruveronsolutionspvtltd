import React, { useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { Menu, Globe, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { useData } from '../../context/DataContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { leads } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Admin Header */}
        <header className="h-16 bg-slate-950/90 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Ruveron Enterprise CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/leads"
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Leads</span>
              {newLeadsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold animate-pulse">
                  {newLeadsCount}
                </span>
              )}
            </Link>

            <Link
              to="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">View Public Website</span>
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
