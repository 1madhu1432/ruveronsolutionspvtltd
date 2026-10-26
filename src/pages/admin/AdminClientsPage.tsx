import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Search,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Users,
  Download,
  RotateCcw,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PhotoUploader } from '../../components/ui/PhotoUploader';
import type { ClientItem, ClientContractStatus } from '../../types';

const COMMON_SERVICES = [
  'Payroll Execution',
  'Contract Staffing',
  'Statutory Compliance & PF/ESI',
  'Labor Law Advisory',
  'Executive Recruitment',
  'Flexi-Staffing',
  'Healthcare Staffing',
  'Background Verification',
];

export const AdminClientsPage: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, addClientRemark, deleteClientRemark } = useData();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [contractStatusFilter, setContractStatusFilter] = useState<string>('all');
  const [webStatusFilter, setWebStatusFilter] = useState<string>('all');

  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // View Details Modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [activeDetailsTab, setActiveDetailsTab] = useState<'overview' | 'contact' | 'remarks'>('overview');

  // Quick Remark Modal state
  const [quickRemarkClient, setQuickRemarkClient] = useState<ClientItem | null>(null);
  const [newRemarkText, setNewRemarkText] = useState('');
  const [remarkAuthor, setRemarkAuthor] = useState('Admin');

  // Form State for Add / Edit
  const [form, setForm] = useState({
    name: '',
    industry: 'IT & ITeS',
    clientCode: '',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    featuredOnHome: true,
    status: 'published' as 'published' | 'draft',
    contactPerson: '',
    contactDesignation: '',
    contactEmail: '',
    contactPhone: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    pan: '',
    contractStatus: 'Active' as ClientContractStatus,
    contractStartDate: '',
    contractEndDate: '',
    servicesProvided: [] as string[],
    activeHeadcount: '',
    accountManager: '',
    billingCycle: 'Monthly' as 'Monthly' | 'Quarterly' | 'Annual' | 'Bi-Weekly' | 'Custom',
    remarks: '',
  });

  // Extract distinct industries for filter dropdown
  const distinctIndustries = useMemo(() => {
    return Array.from(new Set(clients.map((c) => c.industry).filter(Boolean)));
  }, [clients]);

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      // Search matches
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        (c.clientCode && c.clientCode.toLowerCase().includes(query)) ||
        (c.contactPerson && c.contactPerson.toLowerCase().includes(query)) ||
        (c.contactEmail && c.contactEmail.toLowerCase().includes(query)) ||
        (c.city && c.city.toLowerCase().includes(query)) ||
        (c.industry && c.industry.toLowerCase().includes(query)) ||
        (c.remarks && c.remarks.toLowerCase().includes(query));

      // Industry match
      const matchesIndustry = industryFilter === 'all' || c.industry === industryFilter;

      // Contract status match
      const matchesContractStatus =
        contractStatusFilter === 'all' || c.contractStatus === contractStatusFilter;

      // Web status match
      const matchesWebStatus = webStatusFilter === 'all' || c.status === webStatusFilter;

      return matchesSearch && matchesIndustry && matchesContractStatus && matchesWebStatus;
    });
  }, [clients, searchTerm, industryFilter, contractStatusFilter, webStatusFilter]);

  // Overall Statistics
  const totalClientsCount = clients.length;
  const activeContractsCount = clients.filter((c) => c.contractStatus === 'Active').length;
  const publishedClientsCount = clients.filter((c) => c.status === 'published').length;
  const totalRemarksCount = clients.reduce(
    (sum, c) => sum + (c.notes ? c.notes.length : c.remarks ? 1 : 0),
    0
  );

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      industry: 'IT & ITeS',
      clientCode: `CLI-${new Date().getFullYear()}-${String(clients.length + 1).padStart(3, '0')}`,
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
      websiteUrl: '',
      description: '',
      featuredOnHome: true,
      status: 'published',
      contactPerson: '',
      contactDesignation: '',
      contactEmail: '',
      contactPhone: '',
      alternatePhone: '',
      address: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '',
      gstin: '',
      pan: '',
      contractStatus: 'Active',
      contractStartDate: new Date().toISOString().split('T')[0],
      contractEndDate: '',
      servicesProvided: ['Payroll Execution', 'Statutory Compliance & PF/ESI'],
      activeHeadcount: '',
      accountManager: 'Vikram Joshi',
      billingCycle: 'Monthly',
      remarks: '',
    });
    setEditModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (client: ClientItem) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      industry: client.industry,
      clientCode: client.clientCode || '',
      logoUrl: client.logoUrl,
      websiteUrl: client.websiteUrl || '',
      description: client.description || '',
      featuredOnHome: client.featuredOnHome ?? true,
      status: client.status,
      contactPerson: client.contactPerson || '',
      contactDesignation: client.contactDesignation || '',
      contactEmail: client.contactEmail || '',
      contactPhone: client.contactPhone || '',
      alternatePhone: client.alternatePhone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      pincode: client.pincode || '',
      gstin: client.gstin || '',
      pan: client.pan || '',
      contractStatus: client.contractStatus || 'Active',
      contractStartDate: client.contractStartDate || '',
      contractEndDate: client.contractEndDate || '',
      servicesProvided: client.servicesProvided || [],
      activeHeadcount: String(client.activeHeadcount || ''),
      accountManager: client.accountManager || '',
      billingCycle: client.billingCycle || 'Monthly',
      remarks: client.remarks || '',
    });
    setEditModalOpen(true);
  };

  // Open View Details Modal
  const handleOpenDetails = (client: ClientItem, tab: 'overview' | 'contact' | 'remarks' = 'overview') => {
    setSelectedClient(client);
    setActiveDetailsTab(tab);
    setDetailsModalOpen(true);
  };

  // Open Quick Remark Modal
  const handleOpenQuickRemark = (client: ClientItem) => {
    setQuickRemarkClient(client);
    setNewRemarkText('');
    setRemarkAuthor('Admin');
  };

  // Submit Remark from Details or Quick Modal
  const handleSubmitRemark = (clientId: string) => {
    if (!newRemarkText.trim()) return;
    addClientRemark(clientId, newRemarkText.trim(), remarkAuthor || 'Admin');
    setNewRemarkText('');

    // Update selectedClient reference if open in details
    if (selectedClient && selectedClient.id === clientId) {
      const updated = clients.find((c) => c.id === clientId);
      if (updated) {
        setSelectedClient({
          ...updated,
          remarks: newRemarkText.trim(),
          notes: [
            {
              id: `cnote-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              author: remarkAuthor || 'Admin',
              text: newRemarkText.trim(),
            },
            ...(updated.notes || []),
          ],
        });
      }
    }

    if (quickRemarkClient) {
      setQuickRemarkClient(null);
    }
  };

  // Save Client Form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.logoUrl) return;

    const payload = {
      name: form.name,
      industry: form.industry,
      clientCode: form.clientCode,
      logoUrl: form.logoUrl,
      websiteUrl: form.websiteUrl,
      description: form.description,
      featuredOnHome: form.featuredOnHome,
      status: form.status,
      contactPerson: form.contactPerson,
      contactDesignation: form.contactDesignation,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      alternatePhone: form.alternatePhone,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      gstin: form.gstin,
      pan: form.pan,
      contractStatus: form.contractStatus,
      contractStartDate: form.contractStartDate,
      contractEndDate: form.contractEndDate,
      servicesProvided: form.servicesProvided,
      activeHeadcount: form.activeHeadcount,
      accountManager: form.accountManager,
      billingCycle: form.billingCycle,
      remarks: form.remarks,
    };

    if (editingId) {
      updateClient(editingId, payload);
    } else {
      addClient(payload);
    }

    setEditModalOpen(false);
  };

  // Toggle Services in Form
  const toggleServiceInForm = (service: string) => {
    setForm((prev) => {
      const exists = prev.servicesProvided.includes(service);
      return {
        ...prev,
        servicesProvided: exists
          ? prev.servicesProvided.filter((s) => s !== service)
          : [...prev.servicesProvided, service],
      };
    });
  };

  // Toggle Publish Status
  const togglePublish = (client: ClientItem) => {
    updateClient(client.id, {
      status: client.status === 'published' ? 'draft' : 'published',
    });
  };

  // Export Clients to CSV
  const handleExportCSV = () => {
    const headers = [
      'Client ID',
      'Client Code',
      'Company Name',
      'Industry',
      'Contract Status',
      'Contact Person',
      'Designation',
      'Phone',
      'Email',
      'City',
      'State',
      'Active Headcount',
      'Account Manager',
      'Contract Start Date',
      'Contract End Date',
      'Website',
      'Latest Remarks',
      'Web Status',
    ];

    const rows = filteredClients.map((c) => [
      `"${c.id}"`,
      `"${c.clientCode || ''}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.industry || ''}"`,
      `"${c.contractStatus || 'Active'}"`,
      `"${c.contactPerson || ''}"`,
      `"${c.contactDesignation || ''}"`,
      `"${c.contactPhone || ''}"`,
      `"${c.contactEmail || ''}"`,
      `"${c.city || ''}"`,
      `"${c.state || ''}"`,
      `"${c.activeHeadcount || ''}"`,
      `"${c.accountManager || ''}"`,
      `"${c.contractStartDate || ''}"`,
      `"${c.contractEndDate || ''}"`,
      `"${c.websiteUrl || ''}"`,
      `"${(c.remarks || '').replace(/"/g, '""')}"`,
      `"${c.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ruveron_clients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper Badge for Contract Status
  const renderContractBadge = (status?: ClientContractStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active</span>
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-400 border border-amber-800">
            Under Review
          </span>
        );
      case 'On Hold':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/80 text-blue-400 border border-blue-800">
            On Hold
          </span>
        );
      case 'Terminated':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-400 border border-rose-800">
            Terminated
          </span>
        );
      case 'Prospective':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-400 border border-purple-800">
            Prospective
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
            {status || 'Active'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Our Clients & Corporate Accounts</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  {filteredClients.length} of {clients.length}
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage full corporate client details, statutory contracts, key contact persons, and operational remarks.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition shadow-sm"
            title="Download client directory as CSV spreadsheet"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-95 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Clients</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalClientsCount}</div>
          <div className="text-[10px] text-slate-500">Corporate accounts registered</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-400">
            <span>Active Contracts</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{activeContractsCount}</div>
          <div className="text-[10px] text-emerald-500/80">
            {totalClientsCount > 0 ? Math.round((activeContractsCount / totalClientsCount) * 100) : 0}% Active retention
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-400">
            <span>Industries Covered</span>
            <Briefcase className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{distinctIndustries.length}</div>
          <div className="text-[10px] text-purple-500/80">IT, Healthcare, Mfg, BFSI & more</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span>Client Remarks Logged</span>
            <MessageSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{totalRemarksCount}</div>
          <div className="text-[10px] text-amber-500/80">
            {publishedClientsCount} published on website ticker
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, code, contact person, city, remarks..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Industry Filter */}
          <div className="md:col-span-3">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="all">All Industry Sectors</option>
              {distinctIndustries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Status Filter */}
          <div className="md:col-span-2">
            <select
              value={contractStatusFilter}
              onChange={(e) => setContractStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="all">All Contract Status</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="On Hold">On Hold</option>
              <option value="Terminated">Terminated</option>
              <option value="Prospective">Prospective</option>
            </select>
          </div>

          {/* Web Status Filter */}
          <div className="md:col-span-2 flex items-center gap-2">
            <select
              value={webStatusFilter}
              onChange={(e) => setWebStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition"
            >
              <option value="all">All Web Visibility</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {(searchTerm || industryFilter !== 'all' || contractStatusFilter !== 'all' || webStatusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setIndustryFilter('all');
                  setContractStatusFilter('all');
                  setWebStatusFilter('all');
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Client Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Client & Organization</th>
                <th className="p-3.5">Industry & Location</th>
                <th className="p-3.5">Primary Contact</th>
                <th className="p-3.5">Contract & Headcount</th>
                <th className="p-3.5">Remarks / Internal Notes</th>
                <th className="p-3.5 text-center">Web Ticker</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400 space-y-2">
                    <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="font-semibold text-sm text-slate-300">No client records found</p>
                    <p className="text-xs text-slate-500">
                      Try adjusting your search criteria or add a new enterprise client.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const remarksCount = (client.notes?.length || 0) + (client.remarks && (!client.notes || client.notes.length === 0) ? 1 : 0);
                  const latestRemark = client.notes && client.notes.length > 0 ? client.notes[0].text : client.remarks;

                  return (
                    <tr key={client.id} className="hover:bg-slate-900/50 transition">
                      {/* Client Logo & Name */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={client.logoUrl}
                            alt={client.name}
                            className="w-10 h-10 object-cover rounded-xl bg-slate-900 border border-slate-800 shrink-0"
                            onError={(e) => {
                              // fallback if image fails
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm hover:text-cyan-400 transition cursor-pointer" onClick={() => handleOpenDetails(client)}>
                                {client.name}
                              </span>
                              {client.clientCode && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                                  {client.clientCode}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                              {client.websiteUrl ? (
                                <a
                                  href={client.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                                >
                                  <span>{client.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span>Direct B2B Account</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Industry & Location */}
                      <td className="p-3.5">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-300 text-[11px] font-medium">
                            {client.industry}
                          </span>
                          {(client.city || client.state) && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                              <span>{[client.city, client.state].filter(Boolean).join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Primary Contact Person */}
                      <td className="p-3.5">
                        {client.contactPerson ? (
                          <div className="space-y-0.5">
                            <div className="font-semibold text-slate-200">{client.contactPerson}</div>
                            {client.contactDesignation && (
                              <div className="text-[10px] text-slate-400">{client.contactDesignation}</div>
                            )}
                            <div className="flex items-center gap-2 pt-0.5">
                              {client.contactPhone && (
                                <a
                                  href={`tel:${client.contactPhone}`}
                                  className="text-slate-400 hover:text-cyan-400 transition"
                                  title={`Call: ${client.contactPhone}`}
                                >
                                  <Phone className="w-3 h-3" />
                                </a>
                              )}
                              {client.contactEmail && (
                                <a
                                  href={`mailto:${client.contactEmail}`}
                                  className="text-slate-400 hover:text-cyan-400 transition"
                                  title={`Email: ${client.contactEmail}`}
                                >
                                  <Mail className="w-3 h-3" />
                                </a>
                              )}
                              <span className="text-[10px] font-mono text-slate-400">
                                {client.contactPhone || client.contactEmail}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">No contact listed</span>
                        )}
                      </td>

                      {/* Contract Status & Headcount */}
                      <td className="p-3.5">
                        <div className="space-y-1">
                          <div>{renderContractBadge(client.contractStatus)}</div>
                          {client.activeHeadcount && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                              <Users className="w-3 h-3 text-slate-500" />
                              <span>{client.activeHeadcount} deployed staff</span>
                            </div>
                          )}
                          {client.accountManager && (
                            <div className="text-[10px] text-slate-500">
                              Mgr: <span className="text-slate-400">{client.accountManager.split(' ')[0]}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Remarks & Notes */}
                      <td className="p-3.5 max-w-xs">
                        <div className="space-y-1">
                          {latestRemark ? (
                            <div
                              onClick={() => handleOpenDetails(client, 'remarks')}
                              className="group cursor-pointer p-2 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition"
                            >
                              <p className="text-[11px] text-slate-300 line-clamp-2 leading-snug group-hover:text-cyan-300 transition">
                                {latestRemark}
                              </p>
                              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                                  <MessageSquare className="w-3 h-3" />
                                  <span>{remarksCount} remarks</span>
                                </span>
                                <span>Click to view/add</span>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleOpenQuickRemark(client)}
                              className="px-2.5 py-1 rounded-lg border border-dashed border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 text-[11px] flex items-center gap-1.5 transition"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Remarks</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Web Ticker Status */}
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => togglePublish(client)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                            client.status === 'published'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                          }`}
                          title="Click to toggle website public visibility"
                        >
                          {client.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{client.status}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetails(client)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-700 transition"
                            title="View Full Client Profile & Remarks"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenQuickRemark(client)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-700 transition"
                            title="Add Remark / Note"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800 hover:border-blue-700 transition"
                            title="Edit Full Client Details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${client.name}"?`)) {
                                deleteClient(client.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 hover:border-rose-800 transition"
                            title="Delete Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VIEW FULL CLIENT DETAILS & REMARKS MODAL                                */}
      {/* ========================================================================= */}
      {detailsModalOpen && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-xs overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-slate-950/50">
              <div className="flex items-center gap-4">
                <img
                  src={selectedClient.logoUrl}
                  alt={selectedClient.name}
                  className="w-14 h-14 object-cover rounded-2xl bg-slate-900 border border-slate-700 p-1"
                />
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-bold text-white">{selectedClient.name}</h2>
                    {selectedClient.clientCode && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {selectedClient.clientCode}
                      </span>
                    )}
                    {renderContractBadge(selectedClient.contractStatus)}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-xs mt-1">
                    <span className="text-cyan-300 font-medium">{selectedClient.industry}</span>
                    {selectedClient.city && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {[selectedClient.city, selectedClient.state].filter(Boolean).join(', ')}
                        </span>
                      </>
                    )}
                    {selectedClient.websiteUrl && (
                      <>
                        <span>•</span>
                        <a
                          href={selectedClient.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setDetailsModalOpen(false);
                    handleOpenEdit(selectedClient);
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px] px-2.5"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-slate-800 flex gap-4 bg-slate-950/20 text-xs font-semibold">
              <button
                onClick={() => setActiveDetailsTab('overview')}
                className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
                  activeDetailsTab === 'overview'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Company & Contract</span>
              </button>
              <button
                onClick={() => setActiveDetailsTab('contact')}
                className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
                  activeDetailsTab === 'contact'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Contact Person & Address</span>
              </button>
              <button
                onClick={() => setActiveDetailsTab('remarks')}
                className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
                  activeDetailsTab === 'remarks'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Remarks & Audit History ({(selectedClient.notes?.length || 0) + (selectedClient.remarks ? 1 : 0)})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeDetailsTab === 'overview' && (
                <div className="space-y-5">
                  {/* Overview Description */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Scope of Services & Partnership Overview
                    </span>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      {selectedClient.description || 'No detailed scope description entered yet.'}
                    </p>
                  </div>

                  {/* Contract & Financial Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">Deployed Staffing</span>
                      <div className="text-lg font-bold text-cyan-400">
                        {selectedClient.activeHeadcount || 'Not Specified'}
                      </div>
                      <div className="text-[10px] text-slate-500">Active personnel headcount</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">Contract Period</span>
                      <div className="text-xs font-bold text-white font-mono">
                        {selectedClient.contractStartDate ? selectedClient.contractStartDate : 'N/A'}
                        {selectedClient.contractEndDate ? ` → ${selectedClient.contractEndDate}` : ' (Ongoing)'}
                      </div>
                      <div className="text-[10px] text-slate-500">Statutory agreement duration</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">Billing Cycle</span>
                      <div className="text-xs font-bold text-purple-400">
                        {selectedClient.billingCycle || 'Monthly'}
                      </div>
                      <div className="text-[10px] text-slate-500">Payroll computational cycle</div>
                    </div>
                  </div>

                  {/* Services Provided Badges */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Services Contracted with Ruveron
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.servicesProvided && selectedClient.servicesProvided.length > 0 ? (
                        selectedClient.servicesProvided.map((serv, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-cyan-800/60 text-cyan-300 text-xs font-medium flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{serv}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic text-xs">No specific service tags selected.</span>
                      )}
                    </div>
                  </div>

                  {/* Corporate Tax / Statutory Numbers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 block">GSTIN</span>
                      <span className="font-mono text-slate-300 font-semibold">{selectedClient.gstin || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 block">PAN</span>
                      <span className="font-mono text-slate-300 font-semibold">{selectedClient.pan || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 block">Account Manager</span>
                      <span className="text-slate-300 font-semibold">{selectedClient.accountManager || 'Unassigned'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 block">Website Visibility</span>
                      <span className="font-semibold text-slate-300 uppercase">{selectedClient.status}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailsTab === 'contact' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Person Details */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                        <UserCheck className="w-4 h-4" />
                        <span>Key Account Point of Contact</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Full Name</span>
                          <span className="text-sm font-bold text-white">
                            {selectedClient.contactPerson || 'Not Provided'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Designation</span>
                          <span className="text-xs text-slate-300">
                            {selectedClient.contactDesignation || 'Corporate Representative'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Official Email</span>
                          {selectedClient.contactEmail ? (
                            <a
                              href={`mailto:${selectedClient.contactEmail}`}
                              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                            >
                              <Mail className="w-3 h-3" />
                              <span>{selectedClient.contactEmail}</span>
                            </a>
                          ) : (
                            <span className="text-slate-500 italic">None</span>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Direct Phone</span>
                          {selectedClient.contactPhone ? (
                            <a
                              href={`tel:${selectedClient.contactPhone}`}
                              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{selectedClient.contactPhone}</span>
                            </a>
                          ) : (
                            <span className="text-slate-500 italic">None</span>
                          )}
                        </div>
                        {selectedClient.alternatePhone && (
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">Alternate Contact</span>
                            <span className="text-xs text-slate-300 font-mono">{selectedClient.alternatePhone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Office / Corporate Address */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                        <MapPin className="w-4 h-4" />
                        <span>Corporate Office Address</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block">Street / Campus Address</span>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {selectedClient.address || 'Address not recorded.'}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">City</span>
                            <span className="text-xs font-semibold text-white">{selectedClient.city || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">State</span>
                            <span className="text-xs font-semibold text-white">{selectedClient.state || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">Pincode</span>
                            <span className="text-xs font-mono text-white">{selectedClient.pincode || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-500 block">Country</span>
                            <span className="text-xs text-white">India</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDetailsTab === 'remarks' && (
                <div className="space-y-6">
                  {/* Add Remark Form */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h3 className="font-bold text-white text-xs flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>Log New Client Remark / Interaction Note</span>
                    </h3>
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        value={newRemarkText}
                        onChange={(e) => setNewRemarkText(e.target.value)}
                        placeholder="Enter operational remarks, payroll updates, SLA observations, or escalation notes..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500 resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">Logged By:</span>
                          <input
                            type="text"
                            value={remarkAuthor}
                            onChange={(e) => setRemarkAuthor(e.target.value)}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs w-36 outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSubmitRemark(selectedClient.id)}
                          disabled={!newRemarkText.trim()}
                          className="px-4 py-1.5 rounded-lg bg-ruveron-royal hover:bg-ruveron-blue text-white text-xs font-bold transition disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Remark</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remarks Timeline */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Remarks Timeline & Audit Trail
                    </span>

                    {selectedClient.notes && selectedClient.notes.length > 0 ? (
                      <div className="space-y-2.5">
                        {selectedClient.notes.map((note) => (
                          <div
                            key={note.id}
                            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-slate-700 transition"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800 text-[10px] font-bold">
                                  {note.author}
                                </span>
                                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  <span>{note.date}</span>
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  deleteClientRemark(selectedClient.id, note.id);
                                  setSelectedClient({
                                    ...selectedClient,
                                    notes: (selectedClient.notes || []).filter((n) => n.id !== note.id),
                                  });
                                }}
                                className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                                title="Delete Remark"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : selectedClient.remarks ? (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                            General Remark
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed">{selectedClient.remarks}</p>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-slate-500 rounded-xl bg-slate-950 border border-slate-800">
                        No remarks logged yet. Use the form above to add the first remark.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50">
              <span className="text-[11px] text-slate-500 font-mono">
                Last profile update: {selectedClient.updatedAt}
              </span>
              <button
                type="button"
                onClick={() => setDetailsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ADD / EDIT CLIENT PROFILE MODAL                                         */}
      {/* ========================================================================= */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-xs overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {editingId ? 'Edit Enterprise Client Profile' : 'Add New Enterprise Corporate Client'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Fill in full company particulars, statutory registration, contact point, and remarks.
                  </p>
                </div>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="overflow-y-auto p-6 space-y-6 flex-1">
              {/* Section 1: Company Profile */}
              <div className="space-y-3">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>1. Company & Brand Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company / Organization Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Vanguard Tech Solutions"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Industry Sector *</label>
                    <input
                      type="text"
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      placeholder="e.g. IT & ITeS, Healthcare, Manufacturing"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Client Code</label>
                    <input
                      type="text"
                      value={form.clientCode}
                      onChange={(e) => setForm({ ...form, clientCode: e.target.value })}
                      placeholder="e.g. CLI-2026-001"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GSTIN</label>
                    <input
                      type="text"
                      value={form.gstin}
                      onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
                      placeholder="36AAACV1234F1Z5"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono uppercase outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={form.pan}
                      onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
                      placeholder="AAACV1234F"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono uppercase outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <PhotoUploader
                    value={form.logoUrl}
                    onChange={(newLogo) => setForm({ ...form, logoUrl: newLogo })}
                    label="Client Company Logo (Upload Photo)"
                    aspect="square"
                    required
                    helpText="Upload PNG, SVG, or JPG corporate logo (up to 5MB)"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Website URL</label>
                  <input
                    type="url"
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    placeholder="https://clientdomain.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Corporate Scope Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of workforce deployment, employee headcount, or services delivered..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              {/* Section 2: Contact Person & Office */}
              <div className="space-y-3">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>2. Key Contact Person & Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      placeholder="e.g. Raghavan Iyer"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Designation / Role</label>
                    <input
                      type="text"
                      value={form.contactDesignation}
                      onChange={(e) => setForm({ ...form, contactDesignation: e.target.value })}
                      placeholder="e.g. VP - Human Resources"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={form.contactPhone}
                      onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      placeholder="+91 98450 12345"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={form.contactEmail}
                      onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                      placeholder="client.hr@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">Office / Campus Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="e.g. Mindspace IT Park, Hitec City"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Hyderabad"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      placeholder="Telangana"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Pincode</label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="500081"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Contract & Operations */}
              <div className="space-y-3">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>3. Contract Terms & Staffing Metrics</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contract Status</label>
                    <select
                      value={form.contractStatus}
                      onChange={(e) => setForm({ ...form, contractStatus: e.target.value as ClientContractStatus })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Under Review">Under Review</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Terminated">Terminated</option>
                      <option value="Prospective">Prospective</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contract Start Date</label>
                    <input
                      type="date"
                      value={form.contractStartDate}
                      onChange={(e) => setForm({ ...form, contractStartDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Contract End Date</label>
                    <input
                      type="date"
                      value={form.contractEndDate}
                      onChange={(e) => setForm({ ...form, contractEndDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Active Headcount</label>
                    <input
                      type="text"
                      value={form.activeHeadcount}
                      onChange={(e) => setForm({ ...form, activeHeadcount: e.target.value })}
                      placeholder="e.g. 250"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Account Manager</label>
                    <input
                      type="text"
                      value={form.accountManager}
                      onChange={(e) => setForm({ ...form, accountManager: e.target.value })}
                      placeholder="e.g. Vikram Joshi"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Billing Cycle</label>
                    <select
                      value={form.billingCycle}
                      onChange={(e) => setForm({ ...form, billingCycle: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                      <option value="Bi-Weekly">Bi-Weekly</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-2">Services Provided (Select Multiple)</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SERVICES.map((serv) => {
                      const isSelected = form.servicesProvided.includes(serv);
                      return (
                        <button
                          type="button"
                          key={serv}
                          onClick={() => toggleServiceInForm(serv)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                            isSelected
                              ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {serv}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 4: Remarks & Portfolio Settings */}
              <div className="space-y-3">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>4. Internal Remarks & Website Visibility</span>
                </h4>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Remarks / Internal Notes</label>
                  <textarea
                    rows={3}
                    value={form.remarks}
                    onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                    placeholder="Enter key relationship remarks, payment behavior, contract renewal timelines, SLA notes..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Website Visibility</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    >
                      <option value="published">Published (Visible on site)</option>
                      <option value="draft">Draft (Admin only)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="featuredOnHome"
                      checked={form.featuredOnHome}
                      onChange={(e) => setForm({ ...form, featuredOnHome: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <label htmlFor="featuredOnHome" className="text-slate-300 font-semibold cursor-pointer">
                      Feature in Homepage Logo Ticker
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ruveron-royal to-ruveron-cyan text-white font-bold transition shadow-md hover:opacity-95"
                >
                  {editingId ? 'Update Client Profile' : 'Save & Register Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. QUICK REMARKS MODAL                                                     */}
      {/* ========================================================================= */}
      {quickRemarkClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">Add Remark for {quickRemarkClient.name}</h3>
              </div>
              <button
                onClick={() => setQuickRemarkClient(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">New Remark / Update</label>
                <textarea
                  rows={4}
                  value={newRemarkText}
                  onChange={(e) => setNewRemarkText(e.target.value)}
                  placeholder="Enter remarks regarding client status, payroll processing, statutory returns, or management notes..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-400 resize-none text-xs"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Logged By</label>
                <input
                  type="text"
                  value={remarkAuthor}
                  onChange={(e) => setRemarkAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setQuickRemarkClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmitRemark(quickRemarkClient.id)}
                disabled={!newRemarkText.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold transition disabled:opacity-50"
              >
                Save Remark
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
