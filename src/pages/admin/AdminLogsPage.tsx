import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  X,
  Copy,
  Clock,
  User,
  Activity,
  Layers,
  MapPin,
  Sparkles,
  GraduationCap,
  Briefcase,
  KeyRound,
  Shield,
  Server,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { SystemLogItem, LogCategory, LogSeverity } from '../../types';

export const AdminLogsPage: React.FC = () => {
  const { logs, clearLogs } = useData();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Detail Modal State
  const [selectedLog, setSelectedLog] = useState<SystemLogItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Distinct Categories Present in Data
  const categories: LogCategory[] = [
    'Leads',
    'Locations',
    'Branding',
    'Training',
    'Careers',
    'Partners',
    'Clients',
    'Solutions',
    'Services',
    'Contact',
    'Auth',
    'System',
  ];

  // Helper: Format Date & Relative Time
  const formatLogDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return {
        formatted: d.toLocaleString('en-IN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        timeOnly: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
    } catch {
      return { formatted: isoString, timeOnly: '' };
    }
  };

  // Helper: Relative Time
  const getRelativeTime = (isoString: string) => {
    try {
      const now = Date.now();
      const past = new Date(isoString).getTime();
      const diffSec = Math.floor((now - past) / 1000);

      if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return '';
    }
  };

  // Helper: Category Icon
  const getCategoryIcon = (category: LogCategory) => {
    switch (category) {
      case 'Leads':
        return <User className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Locations':
        return <MapPin className="w-3.5 h-3.5 text-rose-400" />;
      case 'Branding':
        return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
      case 'Training':
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Careers':
        return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      case 'Auth':
        return <KeyRound className="w-3.5 h-3.5 text-amber-400" />;
      case 'System':
        return <Server className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Helper: Severity Badge
  const getSeverityBadge = (severity: LogSeverity) => {
    switch (severity) {
      case 'success':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Success</span>
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Warning</span>
          </span>
        );
      case 'error':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Error</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>Info</span>
          </span>
        );
    }
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Search
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.category.toLowerCase().includes(q) ||
        (log.entityId && log.entityId.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.toLowerCase().includes(q));

      // Category
      const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;

      // Severity
      const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;

      // Time Range
      let matchesTime = true;
      if (timeRange !== 'all') {
        const logTime = new Date(log.timestamp).getTime();
        const now = Date.now();
        if (timeRange === 'today') {
          matchesTime = now - logTime <= 24 * 60 * 60 * 1000;
        } else if (timeRange === 'week') {
          matchesTime = now - logTime <= 7 * 24 * 60 * 60 * 1000;
        } else if (timeRange === 'month') {
          matchesTime = now - logTime <= 30 * 24 * 60 * 60 * 1000;
        }
      }

      return matchesSearch && matchesCategory && matchesSeverity && matchesTime;
    });
  }, [logs, searchTerm, selectedCategory, selectedSeverity, timeRange]);

  // Statistics
  const successCount = logs.filter((l) => l.severity === 'success').length;
  const warningCount = logs.filter((l) => l.severity === 'warning' || l.severity === 'error').length;
  const distinctUsers = Array.from(new Set(logs.map((l) => l.user))).length;

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredLogs.length === 0) {
      setFeedback('No logs to export matching current filter criteria.');
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    const headers = ['Log ID', 'Timestamp', 'Category', 'Severity', 'User/Actor', 'Action', 'Details', 'Entity ID', 'IP Address'];
    const rows = filteredLogs.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.category}"`,
      `"${l.severity}"`,
      `"${l.user.replace(/"/g, '""')}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.entityId || ''}"`,
      `"${l.ipAddress || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ruveron-system-logs-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedback(`Exported ${filteredLogs.length} logs to CSV file.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ruveron-system-logs-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setFeedback(`Exported ${filteredLogs.length} logs as structured JSON.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Clear Logs
  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all system audit logs? This action cannot be undone.')) {
      clearLogs();
      setFeedback('All activity logs have been cleared.');
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  // Copy JSON Details
  const handleCopyDetails = (item: SystemLogItem) => {
    navigator.clipboard.writeText(JSON.stringify(item, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER & ACTIONS
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <FileText className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>System & Activity Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time chronological audit trail of corporate operations, lead transitions, branch settings, and admin events.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
            title="Download logs as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
            title="Download audit logs in JSON format"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleClearLogs}
            className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-semibold flex items-center gap-1.5 border border-rose-800/60 transition cursor-pointer"
            title="Purge all audit logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="p-4 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2.5 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==================================================
          KPI METRICS STRIP
          ================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Total Log Events</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{logs.length}</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Active monitoring</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Successful Operations</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{successCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Verified transactions</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Warnings / Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{warningCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Review items</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Recorded Actors</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{distinctUsers}</div>
          <div className="text-[11px] text-slate-400 mt-1">Admins & visitors</div>
        </div>
      </div>

      {/* ==================================================
          SEARCH & FILTER TOOLBAR
          ================================================== */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by action, user, category, or detail keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 transition"
            >
              <option value="all">All Categories ({logs.length})</option>
              {categories.map((cat) => {
                const count = logs.filter((l) => l.category === cat).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 transition"
            >
              <option value="all">All Severities</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="sm:col-span-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400 transition"
            >
              <option value="all">All Time</option>
              <option value="today">Today (24h)</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
          </div>
        </div>

        {/* Toolbar Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <span>
            Showing <strong className="text-white">{filteredLogs.length}</strong> of {logs.length} audit logs
          </span>

          {(searchTerm || selectedCategory !== 'all' || selectedSeverity !== 'all' || timeRange !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSeverity('all');
                setTimeRange('all');
              }}
              className="text-xs text-cyan-400 hover:text-white underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          AUDIT LOGS TABLE
          ================================================== */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Event / Action</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">User / Actor</th>
                <th className="py-3.5 px-4">Details Summary</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No matching system logs found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try clearing search filters or trigger administrative actions to record events.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const dateInfo = formatLogDate(log.timestamp);
                  const relTime = getRelativeTime(log.timestamp);

                  return (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className="hover:bg-slate-900/50 transition cursor-pointer group"
                    >
                      {/* Timestamp */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200">{dateInfo.formatted}</span>
                          <span className="text-[10px] text-cyan-400/80 font-mono flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{relTime}</span>
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white text-sm group-hover:text-cyan-400 transition">
                          {log.action}
                        </span>
                        {log.entityId && (
                          <span className="block text-[10px] font-mono text-slate-500 mt-0.5">
                            ID: {log.entityId}
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium inline-flex items-center gap-1.5">
                          {getCategoryIcon(log.category)}
                          <span>{log.category}</span>
                        </span>
                      </td>

                      {/* Severity */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getSeverityBadge(log.severity)}
                      </td>

                      {/* User / Actor */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-slate-300 font-semibold">{log.user}</span>
                        {log.ipAddress && (
                          <span className="block text-[10px] font-mono text-slate-500">
                            IP: {log.ipAddress}
                          </span>
                        )}
                      </td>

                      {/* Details */}
                      <td className="py-3.5 px-4 text-slate-300 max-w-md truncate">
                        {log.details}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(log);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-300 text-[11px] font-semibold transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================
          LOG DETAIL MODAL
          ================================================== */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">{selectedLog.action}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Log ID: {selectedLog.id}
                    </span>
                    {getSeverityBadge(selectedLog.severity)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="block text-slate-500 font-semibold text-[10px] uppercase">
                    Timestamp
                  </span>
                  <span className="text-slate-200 font-mono">
                    {formatLogDate(selectedLog.timestamp).formatted}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold text-[10px] uppercase">
                    Category
                  </span>
                  <span className="text-slate-200 flex items-center gap-1.5 mt-0.5">
                    {getCategoryIcon(selectedLog.category)}
                    <strong>{selectedLog.category}</strong>
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold text-[10px] uppercase">
                    Actor / User
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedLog.user}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-semibold text-[10px] uppercase">
                    Client IP Address
                  </span>
                  <span className="text-slate-200 font-mono">
                    {selectedLog.ipAddress || '127.0.0.1 (Local)'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Operation Narrative / Details:
                </label>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed font-sans">
                  {selectedLog.details}
                </div>
              </div>

              {selectedLog.entityId && (
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Target Entity ID:</label>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-[11px]">
                    {selectedLog.entityId}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleCopyDetails(selectedLog)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy JSON'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
