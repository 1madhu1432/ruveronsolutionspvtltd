import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, MapPin, Check, X, Building2 } from 'lucide-react';
import type { LocationItem } from '../../types';
import { formatLocationLabel, groupLocationsByState } from '../../data/locations';

export interface SearchableLocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  locations: LocationItem[];
  theme?: 'light' | 'dark';
  placeholder?: string;
  required?: boolean;
  id?: string;
}

export const SearchableLocationSelect: React.FC<SearchableLocationSelectProps> = ({
  value,
  onChange,
  locations,
  theme = 'light',
  placeholder = 'Search & select operating location...',
  required = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Active locations
  const activeLocations = useMemo(() => {
    return locations.filter((loc) => loc.status === 'Active');
  }, [locations]);

  // Filtered locations matching searchQuery
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return activeLocations;
    const q = searchQuery.toLowerCase().trim();
    return activeLocations.filter(
      (loc) =>
        loc.district.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        (loc.isHQ && 'corporate headquarter hq'.includes(q))
    );
  }, [activeLocations, searchQuery]);

  // Group filtered locations by state
  const groupedLocations = useMemo(() => {
    return groupLocationsByState(filteredLocations);
  }, [filteredLocations]);

  // Handle Selection
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <div ref={dropdownRef} className="relative w-full text-left font-sans select-none" id={id}>
      {/* Hidden input to ensure HTML form validation if required */}
      <input
        type="text"
        value={value}
        onChange={() => {}}
        required={required}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-3 transition shadow-sm outline-none ${
          isDark
            ? isOpen
              ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 text-white'
              : 'bg-slate-950 border-slate-700 hover:border-slate-600 text-slate-200'
            : isOpen
            ? 'bg-white border-ruveron-royal ring-2 ring-ruveron-royal/20 text-slate-900'
            : 'bg-white border-slate-300 hover:border-slate-400 text-slate-900'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <MapPin
            className={`w-4 h-4 shrink-0 ${
              isDark ? 'text-cyan-400' : 'text-ruveron-royal'
            }`}
          />
          <span className="truncate text-sm font-medium">
            {value ? value : <span className="text-slate-400">{placeholder}</span>}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-md animate-fadeIn ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-slate-200 shadow-cyan-950/40'
              : 'bg-white border-slate-200 text-slate-800 shadow-slate-900/15'
          }`}
        >
          {/* Search Box Header */}
          <div
            className={`p-3 border-b sticky top-0 z-10 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="relative">
              <Search
                className={`w-4 h-4 absolute left-3 top-3 ${
                  isDark ? 'text-cyan-400' : 'text-ruveron-royal'
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to filter State, District, City (e.g. Vijayawada, Guntur, Hyderabad)..."
                className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs outline-none transition ${
                  isDark
                    ? 'bg-slate-950 border border-slate-700 text-white focus:border-cyan-400 placeholder:text-slate-500'
                    : 'bg-white border border-slate-300 text-slate-900 focus:border-ruveron-royal placeholder:text-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Match Counter */}
            <div className="flex items-center justify-between text-[11px] mt-2 px-1 text-slate-400">
              <span>
                {filteredLocations.length > 0 ? (
                  <>
                    Found <strong className={isDark ? 'text-cyan-300' : 'text-slate-900'}>{filteredLocations.length}</strong> operating location{filteredLocations.length === 1 ? '' : 's'}
                  </>
                ) : (
                  <span className="text-amber-500">No matching districts found</span>
                )}
              </span>
              {searchQuery && (
                <span className="text-[10px] uppercase tracking-wider text-slate-400">
                  Filter Active
                </span>
              )}
            </div>
          </div>

          {/* Scrollable Locations List */}
          <div className="max-h-64 overflow-y-auto p-2 space-y-3 divide-y divide-slate-800/40">
            {Object.keys(groupedLocations).length > 0 ? (
              Object.entries(groupedLocations).map(([stateName, locs]) => (
                <div key={stateName} className="pt-2 first:pt-0">
                  {/* State Group Header */}
                  <div
                    className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between ${
                      isDark ? 'text-cyan-400' : 'text-ruveron-royal'
                    }`}
                  >
                    <span>State: {stateName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {locs.length} {locs.length === 1 ? 'district' : 'districts'}
                    </span>
                  </div>

                  {/* District Items */}
                  <div className="mt-1 space-y-0.5">
                    {locs.map((loc) => {
                      const fullLabel = formatLocationLabel(loc);
                      const isSelected = value === fullLabel;

                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => handleSelect(fullLabel)}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition group ${
                            isSelected
                              ? isDark
                                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                                : 'bg-ruveron-royal/10 text-ruveron-royal font-semibold border border-ruveron-royal/20'
                              : isDark
                              ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                loc.isHQ
                                  ? 'bg-amber-400'
                                  : isDark
                                  ? 'bg-cyan-400'
                                  : 'bg-ruveron-blue'
                              }`}
                            />
                            <div className="truncate">
                              <span className="font-medium">{loc.district}</span>
                              <span className="text-slate-400 ml-1.5 font-normal">
                                ({loc.state})
                              </span>
                            </div>
                            {loc.isHQ && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 flex items-center gap-1">
                                <Building2 className="w-2.5 h-2.5" />
                                <span>Corporate HQ</span>
                              </span>
                            )}
                          </div>

                          {isSelected && (
                            <Check
                              className={`w-4 h-4 shrink-0 ${
                                isDark ? 'text-cyan-400' : 'text-ruveron-royal'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 px-4 text-center">
                <MapPin className="w-6 h-6 mx-auto text-slate-500 mb-2 opacity-60" />
                <p className="text-xs font-semibold text-slate-300">
                  No registered territory found for "{searchQuery}"
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  You can choose "Other Location" below to enter any city or town.
                </p>
              </div>
            )}

            {/* "Other Location" Option Always Accessible */}
            <div className="pt-2 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => handleSelect('Other Location')}
                className={`w-full px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition ${
                  value === 'Other Location'
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'bg-ruveron-royal/10 text-ruveron-royal font-semibold border border-ruveron-royal/20'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span className="font-semibold">Other Location (Specify city or district)</span>
                </div>
                {value === 'Other Location' && (
                  <Check
                    className={`w-4 h-4 shrink-0 ${
                      isDark ? 'text-cyan-400' : 'text-ruveron-royal'
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
