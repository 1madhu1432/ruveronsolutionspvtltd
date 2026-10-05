import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LeadStatusBadge } from '../../components/ui/Badge';
import type { LeadSource } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { leads } = useData();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const followUpLeads = leads.filter((l) => l.status === 'Follow-up').length;
  const qualifiedLeads = leads.filter((l) => l.status === 'Qualified').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;
  const lostLeads = leads.filter((l) => l.status === 'Lost').length;

  // Source breakdown
  const sourceCounts: Record<LeadSource, number> = {
    Website: 0,
    Instagram: 0,
    Facebook: 0,
    Campaign: 0,
    Advertisement: 0,
    Other: 0,
  };
  leads.forEach((l) => {
    if (sourceCounts[l.source] !== undefined) {
      sourceCounts[l.source]++;
    } else {
      sourceCounts.Other++;
    }
  });

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Corporate Executive Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of business leads, workforce inquiry analytics, and CMS operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Manage All Leads</span>
          </Link>
        </div>
      </div>

      {/* 6 Key Lead Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total</span>
            <UserCheck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalLeads}</div>
          <div className="text-[10px] text-slate-400">All captured inquiries</div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">New</span>
            <UserPlus className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400">{newLeads}</div>
          <div className="text-[10px] text-cyan-300">Requires response</div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Follow-ups</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{followUpLeads}</div>
          <div className="text-[10px] text-amber-300">Active discussions</div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Qualified</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-400">{qualifiedLeads}</div>
          <div className="text-[10px] text-purple-300">Proposal pending</div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Converted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{convertedLeads}</div>
          <div className="text-[10px] text-emerald-300">{conversionRate}% Conversion</div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Lost</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">{lostLeads}</div>
          <div className="text-[10px] text-rose-300">Disqualified</div>
        </div>
      </div>

      {/* Analytics Charts & Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lead Status Distribution (SVG Chart) */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-base">Lead Status Breakdown</h3>
              <p className="text-xs text-slate-400">Current inquiry pipeline distribution</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
              Live Data
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'New Inquiries', count: newLeads, color: 'bg-cyan-500', total: totalLeads },
              { label: 'Contacted', count: contactedLeads, color: 'bg-blue-500', total: totalLeads },
              { label: 'In Follow-up', count: followUpLeads, color: 'bg-amber-500', total: totalLeads },
              { label: 'Qualified Opportunities', count: qualifiedLeads, color: 'bg-purple-500', total: totalLeads },
              { label: 'Converted Clients', count: convertedLeads, color: 'bg-emerald-500', total: totalLeads },
              { label: 'Lost / Closed', count: lostLeads, color: 'bg-rose-500', total: totalLeads },
            ].map((st, i) => {
              const pct = totalLeads > 0 ? Math.round((st.count / totalLeads) * 100) : 0;
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{st.label}</span>
                    <span className="text-slate-400 font-mono">
                      {st.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${st.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-white text-base">Inquiry Channel Sources</h3>
            <p className="text-xs text-slate-400">Distribution of leads by acquisition channel</p>
          </div>

          <div className="space-y-3">
            {Object.entries(sourceCounts).map(([source, count]) => {
              const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div
                  key={source}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-semibold text-slate-200">{source}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    {count} ({pct}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Leads Table Preview */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Recent Business Inquiries</h3>
            <p className="text-xs text-slate-400">Latest leads recorded from website forms and campaigns</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-bold text-cyan-400 hover:text-white flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Contact Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Requirement</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/60 transition">
                  <td className="p-3 font-mono font-bold text-cyan-400">{lead.id}</td>
                  <td className="p-3 font-semibold text-white">{lead.fullName}</td>
                  <td className="p-3 text-slate-300">{lead.company}</td>
                  <td className="p-3 text-slate-400 truncate max-w-xs">{lead.requirement}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
