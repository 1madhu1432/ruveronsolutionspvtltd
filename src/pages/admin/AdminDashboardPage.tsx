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
  Activity,
  Building2,
  MessageSquare,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LeadStatusBadge } from '../../components/ui/Badge';
import type { LeadSource } from '../../types';

export const AdminDashboardPage: React.FC = () => {
  const { leads, logs, clients } = useData();

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
            to="/admin/clients"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider shadow-sm transition flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Manage Clients</span>
          </Link>
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

      {/* Our Clients & Remarks Operational Preview */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-800/80 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Enterprise Clients & Remarks Management</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {clients.length} Corporate Accounts
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Key client portfolio contracts, primary contact points, active headcount, and internal operational remarks
              </p>
            </div>
          </div>
          <Link
            to="/admin/clients"
            className="text-xs font-bold text-cyan-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition shrink-0"
          >
            <span>Manage All Clients & Remarks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Client Table Preview */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Client Company</th>
                <th className="p-3">Industry Sector</th>
                <th className="p-3">Primary Contact</th>
                <th className="p-3">Contract Status</th>
                <th className="p-3">Staffing</th>
                <th className="p-3">Latest Remarks / Updates</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {clients.slice(0, 5).map((client) => {
                const latestRemark = client.notes && client.notes.length > 0 ? client.notes[0].text : client.remarks;
                return (
                  <tr key={client.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                          }}
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{client.name}</div>
                          {client.clientCode && (
                            <span className="text-[10px] font-mono text-cyan-400">{client.clientCode}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono text-[10px] border border-slate-800">
                        {client.industry}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-200">{client.contactPerson || 'Unassigned'}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{client.contactPhone || client.contactEmail || ''}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          client.contractStatus === 'Active'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {client.contractStatus || 'Active'}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">
                      {client.activeHeadcount ? `${client.activeHeadcount} staff` : 'N/A'}
                    </td>
                    <td className="p-3 max-w-xs">
                      {latestRemark ? (
                        <div className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{latestRemark}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic text-[10px]">No remarks logged</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to="/admin/clients"
                        className="text-[11px] font-bold text-cyan-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
                      >
                        View & Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

      {/* Recent System Activity Logs */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-base">Recent System Activity Audit Logs</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
              {logs.length} Total Logs
            </span>
          </div>
          <Link
            to="/admin/logs"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>View All Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-800/80">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/40 p-2 rounded-xl transition">
              <div className="flex items-start sm:items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-700 text-slate-300 shrink-0">
                  {log.category}
                </span>
                <div>
                  <span className="text-xs font-bold text-white">{log.action}</span>
                  <p className="text-[11px] text-slate-400 truncate max-w-lg mt-0.5">{log.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-slate-400 text-[11px] font-mono">
                <span>{log.user}</span>
                <span>•</span>
                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
