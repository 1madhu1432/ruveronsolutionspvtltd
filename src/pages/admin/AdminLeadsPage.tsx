import React, { useState, useMemo } from 'react';
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
  Briefcase,
  Layers,
  Filter,
  Calendar,
  CalendarDays,
  Clock,
  RotateCcw,
  Sparkles,
  ListFilter,
  MapPin,
  FileSpreadsheet,
  FileJson,
  Printer,
  Upload,
  FileUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LeadStatusBadge } from '../../components/ui/Badge';
import type { LeadItem, LeadStatus, LeadSource, LeadCategory } from '../../types';
import {
  exportLeadsToCSV,
  exportLeadsToJSON,
  printLeadsReport,
  defaultExportColumns,
} from '../../utils/csvExport';
import {
  parseLeadsFromCSV,
  parseLeadsFromJSON,
  downloadLeadImportTemplate,
  type ParsedLeadResult,
} from '../../utils/csvImport';
import { groupLocationsByState, getDistinctStates, corporateLocations } from '../../data/locations';
import { SearchableLocationSelect } from '../../components/ui/SearchableLocationSelect';

type DatePreset = 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth' | 'custom';

export const AdminLeadsPage: React.FC = () => {
  const {
    leads,
    services,
    solutions,
    updateLeadStatus,
    addLeadNote,
    deleteLead,
    addLeadDirect,
    bulkImportLeads,
    locations,
  } = useData();

  const activeLocationsGrouped = useMemo(() => {
    return groupLocationsByState(locations.filter((l) => l.status === 'Active'));
  }, [locations]);

  const distinctStates = useMemo(() => {
    return getDistinctStates(locations);
  }, [locations]);

  // Basic filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Service' | 'Solution'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Day-wise & Date-wise filters
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [exactDate, setExactDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dayOfWeekFilter, setDayOfWeekFilter] = useState<string>('all');
  const [groupByDate, setGroupByDate] = useState<boolean>(false);

  // Lead details view modal state
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Row selection for selective / bulk export
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Lead Export Suite Modal State
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportScope, setExportScope] = useState<'filtered' | 'all' | 'selected'>('filtered');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'print'>('csv');
  const [selectedColumnIds, setSelectedColumnIds] = useState<string[]>(() =>
    defaultExportColumns.map((c) => c.id)
  );
  const [exportFilename, setExportFilename] = useState('ruveron_leads_export');

  // Lead Import Suite Modal State
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [parsedImportResult, setParsedImportResult] = useState<ParsedLeadResult | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  // Add Lead Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [customLeadLocation, setCustomLeadLocation] = useState('');
  const [newLeadForm, setNewLeadForm] = useState<{
    fullName: string;
    phone: string;
    email: string;
    company: string;
    location: string;
    leadType: LeadCategory;
    serviceOrSolutionName: string;
    requirement: string;
    source: LeadSource;
    status: LeadStatus;
  }>({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    location: corporateLocations[0] as string,
    leadType: 'Service',
    serviceOrSolutionName: 'Recruitment & Talent Acquisition',
    requirement: '',
    source: 'Website',
    status: 'New',
  });

  // Date helper references
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split('T')[0], [today]);

  const yesterday = useMemo(() => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return y;
  }, []);
  const yesterdayStr = useMemo(() => yesterday.toISOString().split('T')[0], [yesterday]);

  const sevenDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const thirtyDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const thisMonthStart = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [today]);

  const getLeadDateStr = (isoDate: string): string => {
    try {
      return new Date(isoDate).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const getLeadDayOfWeek = (isoDate: string): string => {
    try {
      return new Date(isoDate).getDay().toString();
    } catch {
      return '';
    }
  };

  // Day-wise KPI counts
  const todayLeadsCount = useMemo(() => {
    return leads.filter((l) => getLeadDateStr(l.createdAt) === todayStr).length;
  }, [leads, todayStr]);

  const yesterdayLeadsCount = useMemo(() => {
    return leads.filter((l) => getLeadDateStr(l.createdAt) === yesterdayStr).length;
  }, [leads, yesterdayStr]);

  const last7DaysCount = useMemo(() => {
    return leads.filter((l) => new Date(l.createdAt) >= sevenDaysAgo).length;
  }, [leads, sevenDaysAgo]);

  const thisMonthCount = useMemo(() => {
    return leads.filter((l) => new Date(l.createdAt) >= thisMonthStart).length;
  }, [leads, thisMonthStart]);

  const serviceLeadsCount = useMemo(() => leads.filter((l) => l.leadType === 'Service').length, [leads]);
  const solutionLeadsCount = useMemo(() => leads.filter((l) => l.leadType === 'Solution').length, [leads]);

  // Combined Filtering & Sorting Logic
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // 1. Search Query
        const matchesSearch =
          lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lead.serviceOrSolutionName && lead.serviceOrSolutionName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          lead.id.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Lead Type
        const matchesType = typeFilter === 'all' || lead.leadType === typeFilter;

        // 3. Status
        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

        // 4. Source Filter
        const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

        // 5. Location Filter
        const matchesLocation =
          locationFilter === 'all' ||
          (lead.location && lead.location.toLowerCase().includes(locationFilter.toLowerCase()));

        // 6. Day-wise Preset
        const leadTime = new Date(lead.createdAt).getTime();
        const leadDateStr = getLeadDateStr(lead.createdAt);

        let matchesPreset = true;
        if (datePreset === 'today') {
          matchesPreset = leadDateStr === todayStr;
        } else if (datePreset === 'yesterday') {
          matchesPreset = leadDateStr === yesterdayStr;
        } else if (datePreset === 'last7') {
          matchesPreset = leadTime >= sevenDaysAgo.getTime();
        } else if (datePreset === 'last30') {
          matchesPreset = leadTime >= thirtyDaysAgo.getTime();
        } else if (datePreset === 'thisMonth') {
          matchesPreset = leadTime >= thisMonthStart.getTime();
        }

        // 7. Exact Specific Date (if user picked one)
        const matchesExactDate = !exactDate || leadDateStr === exactDate;

        // 8. Date Range (From - To)
        let matchesRange = true;
        if (startDate) {
          matchesRange = matchesRange && leadDateStr >= startDate;
        }
        if (endDate) {
          matchesRange = matchesRange && leadDateStr <= endDate;
        }

        // 9. Day of the Week Filter (0 = Sunday ... 6 = Saturday)
        const matchesDayOfWeek = dayOfWeekFilter === 'all' || getLeadDayOfWeek(lead.createdAt) === dayOfWeekFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus &&
          matchesSource &&
          matchesLocation &&
          matchesPreset &&
          matchesExactDate &&
          matchesRange &&
          matchesDayOfWeek
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [
    leads,
    searchTerm,
    typeFilter,
    statusFilter,
    sourceFilter,
    locationFilter,
    datePreset,
    exactDate,
    startDate,
    endDate,
    dayOfWeekFilter,
    sortBy,
    todayStr,
    yesterdayStr,
    sevenDaysAgo,
    thirtyDaysAgo,
    thisMonthStart,
  ]);

  // Grouped by Date Data Structure
  const groupedLeads = useMemo(() => {
    return filteredLeads.reduce((acc, lead) => {
      const dateKey = getLeadDateStr(lead.createdAt) || 'No Date';
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(lead);
      return acc;
    }, {} as Record<string, LeadItem[]>);
  }, [filteredLeads]);

  const sortedDateKeys = useMemo(() => {
    return Object.keys(groupedLeads).sort((a, b) => {
      return sortBy === 'newest' ? (a < b ? 1 : -1) : (a > b ? 1 : -1);
    });
  }, [groupedLeads, sortBy]);

  // Check if any date filter is active
  const isDateFilterActive =
    datePreset !== 'all' || exactDate !== '' || startDate !== '' || endDate !== '' || dayOfWeekFilter !== 'all';

  const clearDateFilters = () => {
    setDatePreset('all');
    setExactDate('');
    setStartDate('');
    setEndDate('');
    setDayOfWeekFilter('all');
  };

  // Selection toggles
  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllFilteredSelected =
    filteredLeads.length > 0 && filteredLeads.every((l) => selectedLeadIds.includes(l.id));

  const toggleSelectAllFiltered = () => {
    if (isAllFilteredSelected) {
      const filteredIds = new Set(filteredLeads.map((l) => l.id));
      setSelectedLeadIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const filteredIds = filteredLeads.map((l) => l.id);
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  // Quick 1-Click CSV Export (respects active filters)
  const handleExportCSV = () => {
    const target = selectedLeadIds.length > 0
      ? leads.filter((l) => selectedLeadIds.includes(l.id))
      : filteredLeads;

    const dateSuffix =
      selectedLeadIds.length > 0
        ? `_selected_${selectedLeadIds.length}_leads`
        : datePreset !== 'all'
        ? `_${datePreset}`
        : exactDate
        ? `_date_${exactDate}`
        : startDate || endDate
        ? `_range_${startDate || 'start'}_to_${endDate || 'end'}`
        : '_all_time';

    exportLeadsToCSV(target, `ruveron_leads${dateSuffix}_${Date.now()}.csv`);
  };

  // Full Export Suite execution
  const handleExecuteExport = () => {
    let leadsToExport: LeadItem[] = [];
    if (exportScope === 'selected') {
      leadsToExport = leads.filter((l) => selectedLeadIds.includes(l.id));
    } else if (exportScope === 'all') {
      leadsToExport = leads;
    } else {
      leadsToExport = filteredLeads;
    }

    if (leadsToExport.length === 0) {
      alert('No leads available in the selected export scope.');
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const baseName = exportFilename.trim() || 'ruveron_leads_export';
    const fullName = `${baseName}_${timestamp}`;

    if (exportFormat === 'csv') {
      exportLeadsToCSV(leadsToExport, fullName, selectedColumnIds);
    } else if (exportFormat === 'json') {
      exportLeadsToJSON(leadsToExport, fullName);
    } else if (exportFormat === 'print') {
      printLeadsReport(
        leadsToExport,
        `Ruveron Solutions — Lead Pipeline (${leadsToExport.length} Records)`
      );
    }

    setExportModalOpen(false);
  };

  // Lead Import Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImportFile(file);
  };

  const processImportFile = (file: File) => {
    setImportFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      if (file.name.endsWith('.json') || file.type.includes('json')) {
        const result = parseLeadsFromJSON(content);
        setParsedImportResult(result);
      } else {
        const result = parseLeadsFromCSV(content);
        setParsedImportResult(result);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (!parsedImportResult || parsedImportResult.validLeads.length === 0) return;
    const count = bulkImportLeads(parsedImportResult.validLeads);
    setImportNotice(`Successfully imported ${count} leads into the pipeline!`);
    setTimeout(() => setImportNotice(null), 5000);
    setImportModalOpen(false);
    setImportFile(null);
    setParsedImportResult(null);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    addLeadNote(selectedLead.id, newNoteText.trim(), 'Admin Lead Specialist');
    setNewNoteText('');
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

    const finalLocation =
      newLeadForm.location === 'Other Location' && customLeadLocation.trim()
        ? customLeadLocation.trim()
        : newLeadForm.location;

    addLeadDirect({
      ...newLeadForm,
      location: finalLocation,
    });
    setAddModalOpen(false);
    setNewLeadForm({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      location: corporateLocations[0] as string,
      leadType: 'Service',
      serviceOrSolutionName: 'Recruitment & Talent Acquisition',
      requirement: '',
      source: 'Website',
      status: 'New',
    });
    setCustomLeadLocation('');
  };

  // Format date headers & relative indicators
  const formatGroupHeader = (dateStr: string) => {
    if (dateStr === todayStr) {
      return `Today — ${today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    if (dateStr === yesterdayStr) {
      return `Yesterday — ${yesterday.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const renderDateBadge = (isoDate: string) => {
    const dStr = getLeadDateStr(isoDate);
    const d = new Date(isoDate);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    let relativePill = null;
    if (dStr === todayStr) {
      relativePill = (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Today
        </span>
      );
    } else if (dStr === yesterdayStr) {
      relativePill = (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
          Yesterday
        </span>
      );
    }

    return (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-white">{d.toLocaleDateString()}</span>
          {relativePill}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="text-cyan-400 font-mono">{dayName}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      {/* ==================================================
          PAGE TITLE & TOP ACTIONS
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 font-outfit">
            <UserCheck className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Lead Management Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Day-wise & Date-wise multi-channel lead tracking, pipeline progression, and precision analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/locations"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>Locations</span>
          </Link>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Add Lead</span>
          </button>

          {/* Import Leads Button */}
          <button
            onClick={() => {
              setImportFile(null);
              setParsedImportResult(null);
              setImportModalOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Import leads from CSV or JSON file"
          >
            <Upload className="w-4 h-4" />
            <span>Import Leads</span>
          </button>

          {/* Quick 1-Click CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Download CSV of current filtered leads immediately"
          >
            <Download className="w-4 h-4" />
            <span>Quick CSV</span>
          </button>

          {/* Export Center Suite Trigger */}
          <button
            onClick={() => {
              setExportScope(selectedLeadIds.length > 0 ? 'selected' : 'filtered');
              setExportModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-950" />
            <span>Export Center</span>
          </button>
        </div>
      </div>

      {/* Import Notification Banner */}
      {importNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-lg shadow-emerald-950/30 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{importNotice}</span>
          </div>
          <button
            onClick={() => setImportNotice(null)}
            className="p-1 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/60"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ==================================================
          DAY-WISE & DATE-WISE KPI METRICS STRIP
          ================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {/* All Leads */}
        <button
          onClick={() => setDatePreset('all')}
          className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${
            datePreset === 'all' && !exactDate && !startDate && !endDate
              ? 'bg-slate-900 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-500/50'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>All Leads</span>
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white font-outfit">{leads.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Lifetime records</div>
        </button>

        {/* Today's Leads */}
        <button
          onClick={() => {
            setDatePreset('today');
            setExactDate('');
            setStartDate('');
            setEndDate('');
          }}
          className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${
            datePreset === 'today'
              ? 'bg-slate-900 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/50'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Today's Leads</span>
            </span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-300 font-outfit">{todayLeadsCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{todayStr}</div>
        </button>

        {/* Yesterday's Leads */}
        <button
          onClick={() => {
            setDatePreset('yesterday');
            setExactDate('');
            setStartDate('');
            setEndDate('');
          }}
          className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${
            datePreset === 'yesterday'
              ? 'bg-slate-900 border-blue-500 text-white shadow-lg ring-1 ring-blue-500/50'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center justify-between">
            <span>Yesterday</span>
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-300 font-outfit">{yesterdayLeadsCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{yesterdayStr}</div>
        </button>

        {/* Last 7 Days */}
        <button
          onClick={() => {
            setDatePreset('last7');
            setExactDate('');
            setStartDate('');
            setEndDate('');
          }}
          className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${
            datePreset === 'last7'
              ? 'bg-slate-900 border-purple-500 text-white shadow-lg ring-1 ring-purple-500/50'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center justify-between">
            <span>Last 7 Days</span>
            <CalendarDays className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-300 font-outfit">{last7DaysCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Week-wise volume</div>
        </button>

        {/* This Month */}
        <button
          onClick={() => {
            setDatePreset('thisMonth');
            setExactDate('');
            setStartDate('');
            setEndDate('');
          }}
          className={`p-4 rounded-2xl border text-left transition relative overflow-hidden col-span-2 sm:col-span-1 ${
            datePreset === 'thisMonth'
              ? 'bg-slate-900 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
            <span>This Month</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-300 font-outfit">{thisMonthCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Month to date</div>
        </button>
      </div>

      {/* ==================================================
          MASTER DATE-WISE & DAY-WISE FILTER CONTROL PANEL
          ================================================== */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-outfit">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Day-Wise & Date-Wise Filters</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode: Group by Date Toggle */}
            <button
              onClick={() => setGroupByDate(!groupByDate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                groupByDate
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-cyan-400" />
              <span>{groupByDate ? 'Grouped by Day (Active)' : 'Group by Day'}</span>
            </button>

            {/* Clear All Date Filters */}
            {isDateFilterActive && (
              <button
                onClick={clearDateFilters}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Date Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Day Presets Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-xs font-semibold mr-1">Period:</span>
          {[
            { id: 'all', label: 'All Time' },
            { id: 'today', label: 'Today' },
            { id: 'yesterday', label: 'Yesterday' },
            { id: 'last7', label: 'Last 7 Days' },
            { id: 'last30', label: 'Last 30 Days' },
            { id: 'thisMonth', label: 'This Month' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setDatePreset(preset.id as DatePreset);
                setExactDate('');
                setStartDate('');
                setEndDate('');
              }}
              className={`px-3 py-1.5 rounded-xl font-medium transition ${
                datePreset === preset.id && !exactDate && !startDate && !endDate
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Date Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          {/* 1. Exact Date Picker */}
          <div className="sm:col-span-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Exact Date Selection</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={exactDate}
                onChange={(e) => {
                  setExactDate(e.target.value);
                  setDatePreset('custom');
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
              />
              {exactDate && (
                <button
                  onClick={() => setExactDate('')}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title="Clear exact date"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Custom Date Range: From - To */}
          <div className="sm:col-span-5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Date Range (From — To)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDatePreset('custom');
                }}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                placeholder="From"
              />
              <span className="text-slate-500 text-xs font-mono">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDatePreset('custom');
                }}
                className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                placeholder="To"
              />
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  title="Clear date range"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Day of the Week Filter */}
          <div className="sm:col-span-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Day of the Week</span>
            </label>
            <select
              value={dayOfWeekFilter}
              onChange={(e) => setDayOfWeekFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">All Days (Mon - Sun)</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="0">Sunday</option>
            </select>
          </div>
        </div>

        {/* Active Filter Notice Banner */}
        {isDateFilterActive && (
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                Active Date Scope:{' '}
                <strong className="text-white">
                  {exactDate
                    ? `Exact Date: ${exactDate}`
                    : startDate || endDate
                    ? `Range: ${startDate || 'Earliest'} to ${endDate || 'Latest'}`
                    : datePreset.toUpperCase()}
                </strong>
                {dayOfWeekFilter !== 'all' && (
                  <span>
                    {' '}
                    (Day:{' '}
                    {
                      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
                        parseInt(dayOfWeekFilter)
                      ]
                    }
                    )
                  </span>
                )}
                {' — '}Found <strong className="text-white">{filteredLeads.length}</strong> matching leads
              </span>
            </div>
            <button
              onClick={clearDateFilters}
              className="text-xs text-cyan-400 hover:text-white underline font-semibold"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* ==================================================
          SEARCH, STATUS, SOURCE & SORT TOOLBAR
          ================================================== */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        {/* Category Filter Pills: All vs Services vs Solutions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setTypeFilter('all')}
            className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
              typeFilter === 'all'
                ? 'bg-slate-900 border-cyan-500 shadow-md text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">All Categories</span>
            </div>
            <span className="text-sm font-black text-cyan-300">{leads.length}</span>
          </button>

          <button
            onClick={() => setTypeFilter('Service')}
            className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
              typeFilter === 'Service'
                ? 'bg-slate-900 border-blue-500 shadow-md text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Service Leads</span>
            </div>
            <span className="text-sm font-black text-blue-400">{serviceLeadsCount}</span>
          </button>

          <button
            onClick={() => setTypeFilter('Solution')}
            className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
              typeFilter === 'Solution'
                ? 'bg-slate-900 border-purple-500 shadow-md text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Solution Leads</span>
            </div>
            <span className="text-sm font-black text-purple-400">{solutionLeadsCount}</span>
          </button>
        </div>

        {/* Inputs Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          {/* Search Box */}
          <div className="md:col-span-3 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search client, email, company, ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Location Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Operating Locations ({locations.length})</option>
              {distinctStates.map((st) => (
                <option key={st} value={st}>
                  📍 Region: {st}
                </option>
              ))}
              {Object.entries(activeLocationsGrouped).map(([st, locs]) => (
                <optgroup key={st} label={`Districts in ${st}`}>
                  {locs.map((loc) => (
                    <option key={loc.id} value={loc.district}>
                      {loc.district} {loc.isHQ ? '(HQ)' : ''}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Statuses</option>
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
              <option value="Campaign">Source: Campaign</option>
              <option value="Facebook">Source: Facebook</option>
              <option value="Instagram">Source: Instagram</option>
              <option value="Advertisement">Source: Advertisement</option>
              <option value="Other">Source: Other</option>
            </select>
          </div>

          {/* Sort By Date */}
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

      {/* ==================================================
          MAIN LEADS TABLE (FLAT LIST OR GROUPED BY DAY)
          ================================================== */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {/* Table Results Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-white">{filteredLeads.length}</strong> of {leads.length} total leads
            </span>
            {isDateFilterActive && (
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800">
                Filtered Scope
              </span>
            )}
          </div>
          {filteredLeads.length === 0 && <span className="text-amber-400 font-semibold">No matching leads found</span>}
        </div>

        {/* If Group By Date is Active */}
        {groupByDate ? (
          <div className="divide-y divide-slate-800">
            {sortedDateKeys.map((dateKey) => {
              const dayLeads = groupedLeads[dateKey];
              return (
                <div key={dateKey} className="p-4 space-y-3">
                  {/* Group Day Header */}
                  <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-white text-xs sm:text-sm font-outfit">
                        {formatGroupHeader(dateKey)}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {dayLeads.length} {dayLeads.length === 1 ? 'Lead' : 'Leads'}
                    </span>
                  </div>

                  {/* Day Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <tbody className="divide-y divide-slate-900">
                        {dayLeads.map((lead) => {
                          const isSelected = selectedLeadIds.includes(lead.id);
                          return (
                            <tr
                              key={lead.id}
                              className={`transition ${
                                isSelected ? 'bg-cyan-950/40' : 'hover:bg-slate-900/50'
                              }`}
                            >
                              <td className="p-3 w-10">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleSelectLead(lead.id)}
                                  className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
                                />
                              </td>
                              <td className="p-3 font-mono font-bold text-cyan-400 w-24">{lead.id}</td>
                            <td className="p-3 w-44">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-1 ${
                                  lead.leadType === 'Service'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                    : 'bg-purple-950 text-purple-300 border border-purple-800'
                                }`}
                              >
                                {lead.leadType === 'Service' ? (
                                  <Briefcase className="w-3 h-3" />
                                ) : (
                                  <Layers className="w-3 h-3" />
                                )}
                                <span>{lead.leadType}</span>
                              </span>
                              <div className="font-semibold text-white truncate max-w-[170px]">
                                {lead.serviceOrSolutionName || 'General Inquiry'}
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-white">{lead.fullName}</div>
                              <div className="text-[11px] text-slate-400">{lead.email}</div>
                            </td>
                            <td className="p-3 font-medium text-slate-300">{lead.company}</td>
                            <td className="p-3">
                              <LeadStatusBadge status={lead.status} />
                            </td>
                            <td className="p-3">{renderDateBadge(lead.createdAt)}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Standard Flat Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={isAllFilteredSelected}
                      onChange={toggleSelectAllFiltered}
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
                      title={isAllFilteredSelected ? 'Deselect all' : 'Select all filtered'}
                    />
                  </th>
                  <th className="p-3.5">Lead ID</th>
                  <th className="p-3.5">Category & Solution</th>
                  <th className="p-3.5">Client Contact</th>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Requirement</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5">Pipeline Status</th>
                  <th className="p-3.5">
                    <div className="flex items-center gap-1.5 text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date & Day</span>
                    </div>
                  </th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.map((lead) => {
                  const isService = lead.leadType === 'Service';
                  const isSelected = selectedLeadIds.includes(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className={`transition group ${
                        isSelected ? 'bg-cyan-950/40' : 'hover:bg-slate-900/60'
                      }`}
                    >
                      <td className="p-3.5 w-10">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectLead(lead.id)}
                          className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5 font-mono font-bold text-cyan-400">{lead.id}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                              isService
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-purple-950 text-purple-300 border border-purple-800'
                            }`}
                          >
                            {isService ? <Briefcase className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
                            <span>{lead.leadType || 'Service'}</span>
                          </span>
                        </div>
                        <div className="font-semibold text-white truncate max-w-[160px]">
                          {lead.serviceOrSolutionName || 'General Inquiry'}
                        </div>
                      </td>
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
                      <td className="p-3.5">{renderDateBadge(lead.createdAt)}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-rose-400 border border-slate-800 transition"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================
          LEAD DETAIL MODAL
          ================================================== */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedLead.id}
                </span>
                <h3 className="text-lg font-bold">{selectedLead.fullName}</h3>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    selectedLead.leadType === 'Service'
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : 'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}
                >
                  {selectedLead.leadType === 'Service' ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : (
                    <Layers className="w-3.5 h-3.5" />
                  )}
                  <span>{selectedLead.leadType || 'Service'} Lead</span>
                </span>
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
              {/* Category & Date Header Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">
                    {selectedLead.leadType === 'Service' ? 'Service Target' : 'Solution Architecture Target'}
                  </div>
                  <div className="text-sm font-extrabold text-white mt-0.5">
                    {selectedLead.serviceOrSolutionName || 'General Inquiry'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Created Timestamp</div>
                  <div className="text-xs font-mono text-cyan-300 font-semibold">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Change Status Toolbar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Update Lead Pipeline Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'Contacted', 'Follow-up', 'Qualified', 'Converted', 'Lost'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChangeInModal(st)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                        selectedLead.status === st
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
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
                    <span>Contact Details</span>
                  </div>
                  <div>
                    Phone: <strong className="text-white">{selectedLead.phone}</strong>
                  </div>
                  <div>
                    Email: <strong className="text-white">{selectedLead.email}</strong>
                  </div>
                  <div>
                    Location: <strong className="text-white">{selectedLead.location}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Company & Source</span>
                  </div>
                  <div>
                    Company: <strong className="text-white">{selectedLead.company}</strong>
                  </div>
                  <div>
                    Acquisition Channel: <strong className="text-cyan-300">{selectedLead.source}</strong>
                  </div>
                </div>
              </div>

              {/* Requirement Details */}
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
                    placeholder="Add an internal follow-up note or call summary..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none text-xs focus:ring-1 focus:ring-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                  >
                    Add Note
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.notes &&
                    selectedLead.notes.map((note) => (
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

              {/* History Audit Log */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="font-bold text-slate-400 flex items-center gap-2 text-xs">
                  <History className="w-3.5 h-3.5" />
                  <span>Activity Audit Log</span>
                </div>
                <div className="space-y-1">
                  {selectedLead.history &&
                    selectedLead.history.map((hist) => (
                      <div key={hist.id} className="text-[10px] text-slate-400 flex justify-between">
                        <span>{hist.action}</span>
                        <span className="font-mono text-slate-500">
                          {new Date(hist.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          ADD LEAD MODAL
          ================================================== */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base font-outfit">Add New Lead Manually</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-bold">Select Inquiry Lead Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setNewLeadForm({
                        ...newLeadForm,
                        leadType: 'Service',
                        serviceOrSolutionName: services[0]?.name || 'Recruitment & Talent Acquisition',
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                      newLeadForm.leadType === 'Service'
                        ? 'bg-blue-900/60 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span>Service Lead</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setNewLeadForm({
                        ...newLeadForm,
                        leadType: 'Solution',
                        serviceOrSolutionName: solutions[0]?.title || 'Workforce Solutions',
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                      newLeadForm.leadType === 'Solution'
                        ? 'bg-purple-900/60 border-purple-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Solution Lead</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  {newLeadForm.leadType === 'Service' ? 'Target Service' : 'Target Solution'} *
                </label>
                <select
                  value={newLeadForm.serviceOrSolutionName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, serviceOrSolutionName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  required
                >
                  {newLeadForm.leadType === 'Service'
                    ? services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))
                    : solutions.map((sol) => (
                        <option key={sol.id} value={sol.title}>
                          {sol.title}
                        </option>
                      ))}
                </select>
              </div>

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
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Operating Location *</span>
                    </label>
                    <Link
                      to="/admin/locations"
                      target="_blank"
                      className="text-[11px] text-cyan-400 hover:text-white underline font-medium"
                    >
                      + Manage Locations
                    </Link>
                  </div>
                  <SearchableLocationSelect
                    value={newLeadForm.location}
                    onChange={(val) => setNewLeadForm({ ...newLeadForm, location: val })}
                    locations={locations}
                    theme="dark"
                    required
                  />

                  {newLeadForm.location === 'Other Location' && (
                    <input
                      type="text"
                      value={customLeadLocation}
                      onChange={(e) => setCustomLeadLocation(e.target.value)}
                      placeholder="Specify city / location..."
                      className="mt-2 w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none text-xs"
                      required
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Acquisition Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as LeadSource })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                  >
                    <option value="Website">Website</option>
                    <option value="Campaign">Campaign</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
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
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================
          STICKY BOTTOM BAR FOR ROW SELECTION ACTIONS
          ================================================== */}
      {selectedLeadIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-cyan-500/50 shadow-2xl shadow-cyan-950/60 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-4 text-xs animate-scaleUp">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{selectedLeadIds.length} Leads Selected</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setExportScope('selected');
                setExportModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Selected</span>
            </button>
            <button
              onClick={() => {
                const selectedLeads = leads.filter((l) => selectedLeadIds.includes(l.id));
                exportLeadsToCSV(
                  selectedLeads,
                  `ruveron_selected_${selectedLeadIds.length}_leads_${Date.now()}.csv`
                );
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition"
            >
              Quick CSV
            </button>
            <button
              onClick={() => setSelectedLeadIds([])}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Deselect All"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          LEAD EXPORT CENTER MODAL
          ================================================== */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">
                    Lead Management Export Center
                  </h3>
                  <p className="text-xs text-slate-400">
                    Export pipeline records into Excel CSV, Developer JSON, or Printable PDF format.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExportModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Step 1: Export Scope */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  1. Select Records Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExportScope('filtered')}
                    className={`p-3 rounded-xl border text-left transition ${
                      exportScope === 'filtered'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-cyan-300">{filteredLeads.length} Leads</div>
                    <div className="font-semibold text-xs mt-0.5">Current Filters</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Respects active date, day, location, and search criteria.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportScope('all')}
                    className={`p-3 rounded-xl border text-left transition ${
                      exportScope === 'all'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-blue-400">{leads.length} Leads</div>
                    <div className="font-semibold text-xs mt-0.5">All Database Leads</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Complete repository export of all historical leads.
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={selectedLeadIds.length === 0}
                    onClick={() => setExportScope('selected')}
                    className={`p-3 rounded-xl border text-left transition ${
                      selectedLeadIds.length === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-950 border-slate-800 text-slate-500'
                        : exportScope === 'selected'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-purple-400">{selectedLeadIds.length} Leads</div>
                    <div className="font-semibold text-xs mt-0.5">Selected Rows Only</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {selectedLeadIds.length === 0
                        ? 'Check row boxes in table to enable.'
                        : 'Custom batch checked in lead tables.'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Export Format */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  2. Choose Export Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExportFormat('csv')}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                      exportFormat === 'csv'
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">Excel CSV (.csv)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        UTF-8 BOM encoded for Microsoft Excel & Google Sheets.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportFormat('json')}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                      exportFormat === 'json'
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <FileJson className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">Developer JSON (.json)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Full structured data with notes, timestamps & CRM history.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportFormat('print')}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                      exportFormat === 'print'
                        ? 'bg-blue-500/15 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Printer className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-white">Printable / PDF Report</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Clean executive report ready to print or save as PDF.
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Column Selection (for CSV) */}
              {exportFormat === 'csv' && (
                <div className="space-y-2 pt-1 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      3. Select Columns to Include
                    </label>
                    <div className="flex items-center gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setSelectedColumnIds(defaultExportColumns.map((c) => c.id))}
                        className="text-cyan-400 hover:underline"
                      >
                        Select All
                      </button>
                      <span className="text-slate-600">•</span>
                      <button
                        type="button"
                        onClick={() => setSelectedColumnIds(['id', 'fullName', 'phone', 'email', 'status'])}
                        className="text-slate-400 hover:underline"
                      >
                        Essential Only
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 max-h-36 overflow-y-auto">
                    {defaultExportColumns.map((col) => {
                      const isChecked = selectedColumnIds.includes(col.id);
                      return (
                        <label
                          key={col.id}
                          className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-300 hover:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedColumnIds((prev) =>
                                isChecked ? prev.filter((id) => id !== col.id) : [...prev, col.id]
                              );
                            }}
                            className="w-3.5 h-3.5 rounded text-cyan-500 bg-slate-900 border-slate-700 cursor-pointer"
                          />
                          <span className="truncate">{col.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Filename customization */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Export Filename Prefix
                </label>
                <input
                  type="text"
                  value={exportFilename}
                  onChange={(e) => setExportFilename(e.target.value)}
                  placeholder="ruveron_leads_export"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to export{' '}
                <strong className="text-white">
                  {exportScope === 'selected'
                    ? selectedLeadIds.length
                    : exportScope === 'all'
                    ? leads.length
                    : filteredLeads.length}
                </strong>{' '}
                records
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setExportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteExport}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>
                    {exportFormat === 'print' ? 'Generate Print / PDF' : 'Download File'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          LEAD IMPORT MODAL
          ================================================== */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">
                    Bulk Import Leads
                  </h3>
                  <p className="text-xs text-slate-400">
                    Import customer enquiries and corporate client records from CSV or JSON files.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Step 1: Download Sample Template Bar */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs text-white">Need a ready-to-fill format?</div>
                    <div className="text-[11px] text-slate-400">
                      Download our pre-structured CSV template with sample data and column headers.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={downloadLeadImportTemplate}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
              </div>

              {/* Step 2: File Upload Dropzone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Select CSV or JSON File to Import
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-950/60 hover:bg-slate-950">
                  <FileUp className="w-8 h-8 text-cyan-400 animate-bounce" />
                  <span className="text-xs font-semibold text-slate-200">
                    {importFile ? importFile.name : 'Click to browse or drop file here'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Supports .csv (Comma Separated) and .json files
                  </span>
                  <input
                    type="file"
                    accept=".csv,.json,text/csv,application/json"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Step 3: Parsing Results & Preview */}
              {parsedImportResult && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  {/* Summary Bar */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">
                        {parsedImportResult.validLeads.length} Valid Leads Ready
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        (from {parsedImportResult.totalRows} total rows)
                      </span>
                    </div>
                    {parsedImportResult.errors.length > 0 && (
                      <span className="text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{parsedImportResult.errors.length} skipped</span>
                      </span>
                    )}
                  </div>

                  {/* Errors / Warnings If Any */}
                  {parsedImportResult.errors.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-[11px] space-y-1 max-h-24 overflow-y-auto font-mono">
                      {parsedImportResult.errors.map((err, i) => (
                        <div key={i}>• {err}</div>
                      ))}
                    </div>
                  )}

                  {/* Leads Preview Table */}
                  {parsedImportResult.validLeads.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Preview of Leads to be Imported (Showing first 5 rows):
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-left text-[11px] bg-slate-950">
                          <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                            <tr>
                              <th className="p-2">Name</th>
                              <th className="p-2">Contact</th>
                              <th className="p-2">Location</th>
                              <th className="p-2">Category</th>
                              <th className="p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300">
                            {parsedImportResult.validLeads.slice(0, 5).map((l, idx) => (
                              <tr key={idx}>
                                <td className="p-2 font-medium text-white">{l.fullName}</td>
                                <td className="p-2">{l.phone}</td>
                                <td className="p-2 text-slate-400 truncate max-w-[120px]">{l.location}</td>
                                <td className="p-2">
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                    l.leadType === 'Solution' ? 'bg-purple-950 text-purple-300' : 'bg-blue-950 text-blue-300'
                                  }`}>
                                    {l.leadType}
                                  </span>
                                </td>
                                <td className="p-2">{l.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!parsedImportResult || parsedImportResult.validLeads.length === 0}
                onClick={handleConfirmImport}
                className={`px-5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                  !parsedImportResult || parsedImportResult.validLeads.length === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>
                  Confirm & Import{' '}
                  {parsedImportResult ? `${parsedImportResult.validLeads.length} Leads` : ''}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadsPage;
