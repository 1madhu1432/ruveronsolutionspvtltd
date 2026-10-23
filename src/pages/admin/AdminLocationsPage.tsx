import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Plus,
  Search,
  CheckCircle,
  Trash2,
  Edit2,
  Building2,
  Globe2,
  Layers,
  RotateCcw,
  Sparkles,
  X,
  Eye,
  EyeOff,
  CheckSquare,
  XSquare,
  Power,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import type { LocationItem } from '../../types';
import { getDistinctStates, formatLocationLabel } from '../../data/locations';

export const AdminLocationsPage: React.FC = () => {
  const {
    locations,
    addLocation,
    updateLocation,
    deleteLocation,
    toggleLocationStatus,
    enableAllLocations,
    disableAllLocations,
    setLocationsStatusByState,
    companyInfo,
    toggleMapLocationDisplay,
    resetLocationsToDefault,
  } = useData();

  // Action feedback message
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const handleEnableAll = () => {
    enableAllLocations();
    setActionNotification(`All ${locations.length} operating locations are now ENABLED across the website!`);
    setTimeout(() => setActionNotification(null), 3500);
  };

  const handleDisableAll = () => {
    disableAllLocations();
    setActionNotification(`All ${locations.length} operating locations are now DISABLED (hidden from lead dropdowns).`);
    setTimeout(() => setActionNotification(null), 3500);
  };

  const handleToggleStateLocations = (state: string, enable: boolean) => {
    setLocationsStatusByState(state, enable ? 'Active' : 'Inactive');
    setActionNotification(`All locations in "${state}" are now ${enable ? 'ENABLED' : 'DISABLED'}.`);
    setTimeout(() => setActionNotification(null), 3500);
  };

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [hqFilter, setHqFilter] = useState<'all' | 'hq' | 'regular'>('all');

  // Quick Add State
  const [quickState, setQuickState] = useState('Andhra Pradesh');
  const [isCustomQuickState, setIsCustomQuickState] = useState(false);
  const [customQuickStateName, setCustomQuickStateName] = useState('');
  const [quickDistrict, setQuickDistrict] = useState('');
  const [quickIsHQ, setQuickIsHQ] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState('Andhra Pradesh');
  const [isCustomFormState, setIsCustomFormState] = useState(false);
  const [customFormStateName, setCustomFormStateName] = useState('');
  const [formDistrict, setFormDistrict] = useState('');
  const [formIsHQ, setFormIsHQ] = useState(false);
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');
  const [formError, setFormError] = useState('');

  // Distinct States
  const distinctStates = useMemo(() => getDistinctStates(locations), [locations]);

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch =
        loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = stateFilter === 'all' || loc.state === stateFilter;
      const matchesStatus = statusFilter === 'all' || loc.status === statusFilter;
      const matchesHQ =
        hqFilter === 'all' ||
        (hqFilter === 'hq' && loc.isHQ) ||
        (hqFilter === 'regular' && !loc.isHQ);

      return matchesSearch && matchesState && matchesStatus && matchesHQ;
    });
  }, [locations, searchTerm, stateFilter, statusFilter, hqFilter]);

  // Statistics
  const activeLocationsCount = locations.filter((l) => l.status === 'Active').length;
  const hqLocationsCount = locations.filter((l) => l.isHQ).length;
  const statesCount = distinctStates.length;

  // Handle Quick Add Submit
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const finalState = (isCustomQuickState ? customQuickStateName : quickState).trim();
    const finalDistrict = quickDistrict.trim();

    if (!finalState || !finalDistrict) {
      setQuickFeedback('Please specify both State and District.');
      setTimeout(() => setQuickFeedback(null), 3000);
      return;
    }

    // Check Duplicate
    const isDup = locations.some(
      (l) =>
        l.state.toLowerCase() === finalState.toLowerCase() &&
        l.district.toLowerCase() === finalDistrict.toLowerCase()
    );

    if (isDup) {
      setQuickFeedback(`Location "${finalDistrict}, ${finalState}" already exists.`);
      setTimeout(() => setQuickFeedback(null), 3500);
      return;
    }

    addLocation({
      state: finalState,
      district: finalDistrict,
      isHQ: quickIsHQ,
      status: 'Active',
    });

    setQuickDistrict('');
    setQuickIsHQ(false);
    if (isCustomQuickState) {
      setIsCustomQuickState(false);
      setCustomQuickStateName('');
    }
    setQuickFeedback(`Added: ${finalDistrict}, ${finalState}`);
    setTimeout(() => setQuickFeedback(null), 3000);
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormState(distinctStates[0] || 'Andhra Pradesh');
    setIsCustomFormState(false);
    setCustomFormStateName('');
    setFormDistrict('');
    setFormIsHQ(false);
    setFormStatus('Active');
    setFormError('');
    setModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (loc: LocationItem) => {
    setEditingId(loc.id);
    if (distinctStates.includes(loc.state)) {
      setFormState(loc.state);
      setIsCustomFormState(false);
      setCustomFormStateName('');
    } else {
      setFormState('__new__');
      setIsCustomFormState(true);
      setCustomFormStateName(loc.state);
    }
    setFormDistrict(loc.district);
    setFormIsHQ(!!loc.isHQ);
    setFormStatus(loc.status);
    setFormError('');
    setModalOpen(true);
  };

  // Save Modal
  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalState = (isCustomFormState ? customFormStateName : formState).trim();
    const finalDistrict = formDistrict.trim();

    if (!finalState) {
      setFormError('Please select or specify a State.');
      return;
    }
    if (!finalDistrict) {
      setFormError('Please enter a District / City name.');
      return;
    }

    // Check duplicate
    const duplicate = locations.find(
      (l) =>
        l.id !== editingId &&
        l.state.toLowerCase() === finalState.toLowerCase() &&
        l.district.toLowerCase() === finalDistrict.toLowerCase()
    );

    if (duplicate) {
      setFormError(`Location "${finalDistrict}, ${finalState}" already exists.`);
      return;
    }

    if (editingId) {
      updateLocation(editingId, {
        state: finalState,
        district: finalDistrict,
        isHQ: formIsHQ,
        status: formStatus,
      });
    } else {
      addLocation({
        state: finalState,
        district: finalDistrict,
        isHQ: formIsHQ,
        status: formStatus,
      });
    }

    setModalOpen(false);
  };

  // Confirm Reset Defaults
  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the default corporate operating locations? Any custom districts added will be reset.'
      )
    ) {
      resetLocationsToDefault();
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-200">
      {/* ==================================================
          PAGE HEADER & ACTIONS
          ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-outfit">
            <MapPin className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            <span>Operating Locations Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Admin configuration for States, Districts, and Corporate Branch hubs. Instantly synced to Public Lead forms and Admin filters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            title="Restore default Andhra Pradesh, Telangana and corporate operating locations"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Add New Location</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          ACTION NOTIFICATION TOAST
          ================================================== */}
      {actionNotification && (
        <div className="p-4 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-2.5 font-semibold">
            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>{actionNotification}</span>
          </div>
          <button
            onClick={() => setActionNotification(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==================================================
          MASTER WEBSITE LOCATION & MAP CONTROLS
          ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Office Map Section Control */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm font-outfit">Website Office Map Display</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      companyInfo.enableMapLocation !== false
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {companyInfo.enableMapLocation !== false ? 'Active on Website' : 'Disabled / Hidden'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  "Locate Our Vijayawada Office" interactive map on public contact & home pages.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <Link
              to="/admin/contact"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Edit Heading & Map URL</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={toggleMapLocationDisplay}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer ${
                companyInfo.enableMapLocation !== false
                  ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50'
              }`}
            >
              {companyInfo.enableMapLocation !== false ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Disable Office Map</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enable Office Map</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Operating Locations Bulk Enable/Disable */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm font-outfit">Operating Districts Visibility</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeLocationsCount} Active / {locations.length - activeLocationsCount} Disabled
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bulk enable or disable all operating districts in public lead form dropdowns.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800/80">
            <button
              onClick={handleEnableAll}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-900/30 cursor-pointer"
              title="Activate all locations so they appear in dropdowns"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Enable All Locations</span>
            </button>

            <button
              onClick={handleDisableAll}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-rose-900/30 cursor-pointer"
              title="Deactivate all locations from public dropdowns"
            >
              <XSquare className="w-3.5 h-3.5" />
              <span>Disable All Locations</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Total Locations</span>
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{locations.length}</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Across all operating regions</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Active in Dropdowns</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{activeLocationsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Available for lead submissions</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>States & UTs Covered</span>
            <Globe2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{statesCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Primary AP & TS focus</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>HQ & Primary Hubs</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{hqLocationsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Vijayawada Corporate HQ</div>
        </div>
      </div>

      {/* ==================================================
          QUICK-ADD FORM BAR
          ================================================== */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-cyan-500/30 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Add Location (State & District)
            </h3>
          </div>
          {quickFeedback && (
            <span className="text-xs text-cyan-300 font-semibold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 animate-fadeIn">
              {quickFeedback}
            </span>
          )}
        </div>

        <form onSubmit={handleQuickAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* State Selector */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">
              State / Union Territory *
            </label>
            {!isCustomQuickState ? (
              <div className="flex gap-1.5">
                <select
                  value={quickState}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsCustomQuickState(true);
                      setCustomQuickStateName('');
                    } else {
                      setQuickState(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
                >
                  {distinctStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                  <option value="__new__">+ Type New State...</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customQuickStateName}
                  onChange={(e) => setCustomQuickStateName(e.target.value)}
                  placeholder="Enter new state name..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-400 text-white text-xs outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsCustomQuickState(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                  title="Choose existing state"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* District Input */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">
              District / City Name *
            </label>
            <input
              type="text"
              value={quickDistrict}
              onChange={(e) => setQuickDistrict(e.target.value)}
              placeholder="e.g. Guntur, Warangal, Tirupati, Secunderabad..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* HQ Checkbox & Submit */}
          <div className="sm:col-span-3 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={quickIsHQ}
                onChange={(e) => setQuickIsHQ(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">Is HQ?</span>
            </label>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Location</span>
            </button>
          </div>
        </form>
      </div>

      {/* ==================================================
          SEARCH & FILTER TOOLBAR
          ================================================== */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search district, city, or state..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none focus:border-cyan-400"
            />
          </div>

          {/* State Filter */}
          <div className="sm:col-span-3">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">All States ({locations.length})</option>
              {distinctStates.map((st) => {
                const count = locations.filter((l) => l.state === st).length;
                return (
                  <option key={st} value={st}>
                    {st} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'Active' | 'Inactive')}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active in Dropdowns ({activeLocationsCount})</option>
              <option value="Inactive">
                Inactive / Hidden ({locations.length - activeLocationsCount})
              </option>
            </select>
          </div>

          {/* HQ Filter */}
          <div className="sm:col-span-2">
            <select
              value={hqFilter}
              onChange={(e) => setHqFilter(e.target.value as 'all' | 'hq' | 'regular')}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">All Hub Types</option>
              <option value="hq">HQ Hubs ({hqLocationsCount})</option>
              <option value="regular">Districts ({locations.length - hqLocationsCount})</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & State Bulk Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-white">{filteredLocations.length}</strong> of {locations.length} locations
            </span>
            {(searchTerm || stateFilter !== 'all' || statusFilter !== 'all' || hqFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStateFilter('all');
                  setStatusFilter('all');
                  setHqFilter('all');
                }}
                className="text-xs text-cyan-400 hover:text-white underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>

          {stateFilter !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-300 font-medium">Bulk for {stateFilter}:</span>
              <button
                onClick={() => handleToggleStateLocations(stateFilter, true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <CheckSquare className="w-3 h-3" />
                <span>Enable All</span>
              </button>
              <button
                onClick={() => handleToggleStateLocations(stateFilter, false)}
                className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <XSquare className="w-3 h-3" />
                <span>Disable All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          LOCATIONS TABLE / LIST
          ================================================== */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">District / City</th>
                <th className="py-3.5 px-4">State / Territory</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Display in Forms</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLocations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <MapPin className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No matching locations found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting your search terms or add a new location above.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLocations.map((loc) => {
                  return (
                    <tr key={loc.id} className="hover:bg-slate-900/40 transition group">
                      {/* District */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`p-1.5 rounded-lg ${
                              loc.isHQ
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-sm">{loc.district}</span>
                            {loc.isHQ && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                                Corporate HQ
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium">
                          {loc.state}
                        </span>
                      </td>

                      {/* Classification */}
                      <td className="py-3.5 px-4">
                        {loc.isHQ ? (
                          <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Headquarters Hub</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>Operating District</span>
                          </span>
                        )}
                      </td>

                      {/* Status / Enable & Disable Option */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleLocationStatus(loc.id)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer ${
                            loc.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                          }`}
                          title={loc.status === 'Active' ? 'Click to Disable (Hide from website forms)' : 'Click to Enable (Show in website forms)'}
                        >
                          <Power className={`w-3 h-3 ${loc.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`} />
                          <span>{loc.status === 'Active' ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      </td>

                      {/* Display in Forms Label preview */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] max-w-xs truncate">
                        {formatLocationLabel(loc)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(loc)}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                            title="Edit location"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to remove "${loc.district}, ${loc.state}"?`
                                )
                              ) {
                                deleteLocation(loc.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition"
                            title="Delete location"
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

      {/* ==================================================
          ADD / EDIT LOCATION MODAL
          ================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">
                    {editingId ? 'Edit Location' : 'Add New Location'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define State and District for customer lead forms and filters.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleModalSave} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {formError}
                </div>
              )}

              {/* State Field */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  State / Union Territory *
                </label>
                {!isCustomFormState ? (
                  <select
                    value={formState}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCustomFormState(true);
                        setCustomFormStateName('');
                      } else {
                        setFormState(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  >
                    {distinctStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                    <option value="__new__">+ Type New State / Region...</option>
                  </select>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customFormStateName}
                      onChange={(e) => setCustomFormStateName(e.target.value)}
                      placeholder="Enter new state name (e.g. Andhra Pradesh, Telangana...)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-400 text-white outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomFormState(false)}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      ← Back to existing state dropdown
                    </button>
                  </div>
                )}
              </div>

              {/* District Field */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  District / City / Territory *
                </label>
                <input
                  type="text"
                  value={formDistrict}
                  onChange={(e) => setFormDistrict(e.target.value)}
                  placeholder="e.g. Guntur, Vijayawada, Warangal, Tirupati..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {/* HQ Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition">
                  <input
                    type="checkbox"
                    checked={formIsHQ}
                    onChange={(e) => setFormIsHQ(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <div>
                    <div className="text-white font-semibold">Corporate Headquarters / Primary Hub</div>
                    <div className="text-[11px] text-slate-400">
                      Highlights this location with HQ priority badge in dropdowns and records.
                    </div>
                  </div>
                </label>
              </div>

              {/* Status Selector */}
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as 'Active' | 'Inactive')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-400"
                >
                  <option value="Active">Active (Visible in client dropdowns & filters)</option>
                  <option value="Inactive">Inactive (Hidden from public dropdowns)</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/20"
                >
                  {editingId ? 'Save Changes' : 'Create Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
