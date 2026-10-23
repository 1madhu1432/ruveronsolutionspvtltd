import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Database,
  Palette,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Logo } from '../../components/common/Logo';

export const AdminSettingsPage: React.FC = () => {
  const { resetToDefaults, leads, solutions, services, companyInfo } = useData();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = () => {
    resetToDefaults();
    setResetMessage('All browser localStorage data has been restored to factory seed state.');
    setResetConfirm(false);
    setTimeout(() => setResetMessage(''), 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>System & Demo Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Storage diagnostics, data state summary, and factory reset utilities.
          </p>
        </div>
      </div>

      {resetMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{resetMessage}</span>
        </div>
      )}

      {/* Logo & Corporate Branding Section */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span>Company Logo & Branding</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {companyInfo.logoType === 'custom' ? 'Custom Image Active' : 'Vector Emblem Active'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Change website logo, upload image files, or customize tagline and dimensions.
              </p>
            </div>
          </div>

          <Link
            to="/admin/branding"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Logo Controls</span>
          </Link>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Logo Preview:
            </div>
            <div className="p-3 bg-slate-950 rounded-lg inline-block border border-slate-800">
              <Logo size="md" />
            </div>
          </div>

          <div className="text-xs text-slate-400 space-y-1 sm:text-right">
            <div><strong>Company:</strong> {companyInfo.companyName}</div>
            <div className="text-[11px] text-slate-500"><strong>Tagline:</strong> {companyInfo.tagline}</div>
          </div>
        </div>
      </div>

      {/* Storage Diagnostics */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Active Storage Summary</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">Total Leads Persisted</div>
            <div className="text-xl font-bold text-white">{leads.length} Records</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">Active Solutions</div>
            <div className="text-xl font-bold text-white">{solutions.length} Solutions</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-slate-400">Active Services</div>
            <div className="text-xl font-bold text-white">{services.length} Services</div>
          </div>
        </div>
      </div>

      {/* Reset Data */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-rose-950/60 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-slate-800 pb-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Reset Demo Data</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
          Resetting will clear custom edits and restore original corporate seed data (initial leads, solutions, services, and company address).
        </p>

        {resetConfirm ? (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 space-y-3">
            <div className="text-xs font-bold text-rose-300">
              Are you sure you want to restore factory default data?
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
              >
                Yes, Restore Factory Defaults
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset All Data to Defaults</span>
          </button>
        )}
      </div>
    </div>
  );
};
