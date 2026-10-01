import React, { useState, useRef, useEffect } from 'react';
import { Search, Settings, Layers, Plus, Minus } from 'lucide-react';
import { COUNTRY_CLIMATE_DATA } from './data/climateData';

export function TopControls({
  onZoomIn,
  onZoomOut,
  onSelectCountry,
  onToggleSettings,
  onToggleLayers,
  currentTimeString = '11:15 GMT+5:30',
  currentDateString = '1 Oct 2026',
  isLive = true,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Filter countries for autocomplete
  const matchedCountries = Object.keys(COUNTRY_CLIMATE_DATA).filter((name) =>
    name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ).slice(0, 7);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (countryName) => {
    setSearchQuery('');
    setIsDropdownOpen(false);
    onSelectCountry(countryName);
  };

  return (
    <div className="dashboard-top-controls">
      {/* Left Group: Search Bar & Date/Live Pill */}
      <div className="top-left-group">
        {/* Search Areas Input */}
        <div className="search-pill-container" ref={searchContainerRef}>
          <div className="search-pill-inner">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search areas"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setIsDropdownOpen(true);
              }}
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && searchQuery.trim().length > 0 && (
            <div className="search-dropdown-menu">
              {matchedCountries.length > 0 ? (
                matchedCountries.map((cName) => {
                  const data = COUNTRY_CLIMATE_DATA[cName];
                  return (
                    <button
                      key={cName}
                      type="button"
                      className="search-dropdown-item"
                      onClick={() => handleSelect(cName)}
                    >
                      <span className="dropdown-country-name">{cName}</span>
                      {data && data.precipProb !== null && (
                        <span className="dropdown-country-metric">
                          {data.temp}°C • {data.precipProb}% Rain
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="search-dropdown-empty">No areas found</div>
              )}
            </div>
          )}
        </div>

        {/* Live Date/Time Pill Badge */}
        <div className="live-time-pill">
          <div className="pill-date-text">{currentDateString}</div>
          <div className="pill-time-row">
            <span className="pill-time-text">{currentTimeString}</span>
            {isLive && (
              <span className="live-broadcast-indicator" title="Live stream telemetry">
                <svg width="18" height="12" viewBox="0 0 20 14" fill="none">
                  <path d="M4 2C2.5 3.5 1.5 5.5 1.5 7.5s1 4 2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M6.5 4.5C5.6 5.3 5 6.4 5 7.5s.6 2.2 1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="7.5" r="2.2" fill="#e04b4b" />
                  <path d="M13.5 4.5c.9.8 1.5 1.9 1.5 3s-.6 2.2-1.5 3" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M16 2c1.5 1.5 2.5 3.5 2.5 5.5s-1 4-2.5 5.5" stroke="#e04b4b" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Group: Settings, Layers & Zoom Controls */}
      <div className="top-right-group">
        {/* Settings Button */}
        <button
          type="button"
          className="map-control-btn square-control"
          onClick={onToggleSettings}
          title="Map & data settings"
          id="btn-settings"
        >
          <Settings size={18} strokeWidth={2} />
        </button>

        {/* Layers Button */}
        <button
          type="button"
          className="map-control-btn square-control"
          onClick={onToggleLayers}
          title="Map layers & metrics"
          id="btn-layers"
        >
          <Layers size={18} strokeWidth={2} />
        </button>

        {/* Zoom Controls Pill */}
        <div className="zoom-pill-group">
          <button
            type="button"
            className="zoom-btn zoom-in"
            onClick={onZoomIn}
            title="Zoom in"
            id="btn-zoom-in"
          >
            <Plus size={16} strokeWidth={2.4} />
          </button>
          <div className="zoom-divider" />
          <button
            type="button"
            className="zoom-btn zoom-out"
            onClick={onZoomOut}
            title="Zoom out"
            id="btn-zoom-out"
          >
            <Minus size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopControls;
