import React, { useState } from 'react';
import {
  Search,
  Download,
  Plus,
  Eye,
  Trash2,
  Phone,
  Building,
  MessageSquare,
  History,
  X,
  UserCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LeadStatusBadge } from '../../components/ui/Badge';
import type { LeadItem, LeadStatus, LeadSource } from '../../types';
import { exportLeadsToCSV } from '../../utils/csvExport';

export const AdminLeadsPage: React.FC = () => {
  const { leads, updateLeadStatus, addLeadNote, deleteLead, addLeadDirect } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Lead details view modal state
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Add Lead Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState<{
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    requirement: string;
    source: LeadSource;
    status: LeadStatus;
  }>({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    location: '',
    requirement: '',
    source: 'Website',
    status: 'New',
  });

  // Filtering & Search logic
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const handleExportCSV = () => {
    exportLeadsToCSV(filteredLeads, `ruveron_leads_${statusFilter}_${Date.now()}.csv`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    addLeadNote(selectedLead.id, newNoteText.trim(), 'Admin Specialist');
    setNewNoteText('');
    // Refresh selected lead state
    const updated = leads.find((l) => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
  };

  const handleStatusChangeInModal = (newStatus: LeadStatus) => {
    if (!selectedLead) return;
    updateLeadStatus(selectedLead.id, newStatus);
    const updated = leads.find((l) => l.id === selectedLead.id);
    if (updated) setSelectedLead({ ...updated, status: newStatus });
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.fullName || !newLeadForm.phone || !newLeadForm.email) return;
    addLeadDirect(newLeadForm);
    setAddModalOpen(false);
    setNewLeadForm({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      location: '',
      requirement: '',
      source: 'Website',
      status: 'New',
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            <span>Lead Management Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Capture, track, filter, status update, and export all client business inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by name, email, company, requirement, ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Lead Statuses</option>
              <option value="New">Status: New</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="Follow-up">Status: Follow-up</option>
              <option value="Qualified">Status: Qualified</option>
              <option value="Converted">Status: Converted</option>
              <option value="Lost">Status: Lost</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="md:col-span-2">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Sources</option>
              <option value="Website">Source: Website</option>
              <option value="Instagram">Source: Instagram</option>
              <option value="Facebook">Source: Facebook</option>
              <option value="Campaign">Source: Campaign</option>
              <option value="Advertisement">Source: Advertisement</option>
              <option value="Other">Source: Other</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Main Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Showing <strong className="text-white">{filteredLeads.length}</strong> of {leads.length} total lead records</span>
          {filteredLeads.length === 0 && <span className="text-amber-400">No matching leads found</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Lead ID</th>
                <th className="p-3.5">Contact Person</th>
                <th className="p-3.5">Company</th>
                <th className="p-3.5">Requirement</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/60 transition group">
                  <td className="p-3.5 font-mono font-bold text-cyan-400">{lead.id}</td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{lead.fullName}</div>
                    <div className="text-[11px] text-slate-400">{lead.email}</div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-200">{lead.company}</td>
                  <td className="p-3.5 text-slate-400 max-w-xs truncate">{lead.requirement}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedLead.id}
                </span>
                <h3 className="text-lg font-bold">{selectedLead.fullName}</h3>
                <LeadStatusBadge status={selectedLead.status} />
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              {/* Change Status Toolbar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Update Lead Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'Contacted', 'Follow-up', 'Qualified', 'Converted', 'Lost'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChangeInModal(st)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        selectedLead.status === st
                          ? 'bg-ruveron-royal text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contact Info</span>
                  </div>
                  <div>Phone: <strong className="text-white">{selectedLead.phone}</strong></div>
                  <div>Email: <strong className="text-white">{selectedLead.email}</strong></div>
                  <div>Location: <strong className="text-white">{selectedLead.location}</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Company & Source</span>
                  </div>
                  <div>Company: <strong className="text-white">{selectedLead.company}</strong></div>
                  <div>Acquisition Source: <strong className="text-cyan-300">{selectedLead.source}</strong></div>
                  <div>Created: <strong className="text-slate-300">{new Date(selectedLead.createdAt).toLocaleString()}</strong></div>
                </div>
              </div>

              {/* Requirement Text */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white">Client Requirement Details</div>
                <p className="text-slate-300 leading-relaxed font-normal">{selectedLead.requirement}</p>
              </div>

              {/* Follow-up Notes Timeline */}
              <div className="space-y-3 pt-2">
                <div className="font-bold text-white flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Follow-Up Notes ({selectedLead.notes ? selectedLead.notes.length : 0})</span>
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add a follow-up note or call summary..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none text-xs focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-ruveron-royal text-white font-bold text-xs hover:bg-ruveron-blue"
                  >
                    Add Note
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.notes && selectedLead.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-cyan-400">{note.author}</span>
                        <span>{new Date(note.date).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead History Audit Log */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-bold text-slate-400 flex items-center gap-2 text-xs">
                  <History className="w-3.5 h-3.5" />
                  <span>Activity History</span>
                </div>
                <div className="space-y-1">
                  {selectedLead.history && selectedLead.history.map((hist) => (
                    <div key={hist.id} className="text-[10px] text-slate-400 flex justify-between">
                      <span>{hist.action}</span>
                      <span className="font-mono text-slate-500">{new Date(hist.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base">Add New Lead Manually</h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Phone *</label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newLeadForm.location}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as LeadSource })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Campaign">Campaign</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Status</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Requirement Details</label>
                <textarea
                  rows={3}
                  value={newLeadForm.requirement}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, requirement: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-ruveron-royal text-white font-semibold hover:bg-ruveron-blue"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
