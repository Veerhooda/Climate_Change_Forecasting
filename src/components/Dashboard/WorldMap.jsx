import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';
import worldData from 'world-atlas/countries-50m.json';
import { getCountryData, getCountryFill } from './data/climateData';
import { X, Sun, Wind, Droplets, Zap, ShieldAlert } from 'lucide-react';

export function WorldMap({
  zoomLevel = 1,
  onZoomChange,
  activeLayer = 'cleanShare',
  searchedCountry = null,
  onClearSearchedCountry,
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 900 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 1400,
          height: containerRef.current.clientHeight || 900,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Sync zoom level from parent top controls (+ / - buttons)
  useEffect(() => {
    if (zoomLevel) {
      setTransform((prev) => ({
        ...prev,
        k: zoomLevel,
      }));
    }
  }, [zoomLevel]);

  // Extract TopoJSON countries into GeoJSON features
  const countryFeatures = useMemo(() => {
    try {
      const geo = topojson.feature(worldData, worldData.objects.countries);
      return geo.features;
    } catch (e) {
      console.error('Failed to parse world atlas TopoJSON:', e);
      return [];
    }
  }, []);

  // Mercator projection matching reference image:
  // Center is focused on Europe, Africa, Middle East, Asia
  const projection = useMemo(() => {
    return geoMercator()
      .center([50, 36]) // Centered around Arabian sea / Middle East / Mediterranean
      .scale(dimensions.width * 0.22) // Exact framing from image
      .translate([dimensions.width / 2, dimensions.height / 2]);
  }, [dimensions.width, dimensions.height]);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Precompute country paths and metadata
  const renderedPaths = useMemo(() => {
    return countryFeatures.map((feat) => {
      const name = feat.properties?.name || 'Unknown';
      const pathD = pathGenerator(feat);
      const data = getCountryData(name);
      return {
        id: feat.id,
        name,
        pathD,
        data,
      };
    });
  }, [countryFeatures, pathGenerator]);

  // Handle Pan (dragging)
  const handlePointerDown = (e) => {
    if (e.target.closest('.country-details-drawer')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handlePointerMove = useCallback((e) => {
    if (isDragging) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    }
  }, [isDragging, dragStart]);

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newK = Math.max(0.6, Math.min(8, transform.k * zoomFactor));

    if (onZoomChange) onZoomChange(newK);
    setTransform((prev) => ({
      ...prev,
      k: newK,
    }));
  };

  // Focus on country if selected from search
  useEffect(() => {
    if (searchedCountry) {
      const match = renderedPaths.find(
        (p) => p.name.toLowerCase() === searchedCountry.toLowerCase()
      );
      if (match) {
        setSelectedCountry(match.data);
      }
      if (onClearSearchedCountry) onClearSearchedCountry();
    }
  }, [searchedCountry, renderedPaths, onClearSearchedCountry]);

  return (
    <div
      className="dashboard-world-map-container"
      ref={containerRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <svg
        className="world-map-svg"
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        {/* Ocean Background (deep charcoal black) */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill="#18191a"
        />

        {/* Scaled & Translated Map Layer */}
        <g
          transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}
          style={{ transition: isDragging ? 'none' : 'transform 0.15s ease-out' }}
        >
          {renderedPaths.map((item, idx) => {
            if (!item.pathD) return null;
            const isHovered = hoveredCountry?.name === item.name;
            const isSelected = selectedCountry?.name === item.name;
            const val = item.data?.precipProb ?? item.data?.cleanShare;
            const fill = getCountryFill(val, isHovered, isSelected);

            return (
              <path
                key={`${item.id || item.name}-${idx}`}
                d={item.pathD}
                fill={fill}
                stroke={isSelected ? '#ffffff' : '#18191a'}
                strokeWidth={isSelected ? 1.4 / transform.k : 0.65 / transform.k}
                className="country-polygon"
                onMouseEnter={(e) => {
                  setHoveredCountry(item.data || { name: item.name });
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) => {
                  setTooltipPos({ x: e.clientX, y: e.clientY });
                }}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCountry(item.data || { name: item.name });
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredCountry && !isDragging && (
        <div
          className="map-hover-tooltip"
          style={{
            left: `${tooltipPos.x + 16}px`,
            top: `${tooltipPos.y + 16}px`,
          }}
        >
          <div className="tooltip-header">
            <span className="tooltip-country-name">{hoveredCountry.name}</span>
            {hoveredCountry.code && (
              <span className="tooltip-country-code">{hoveredCountry.code}</span>
            )}
          </div>
          {hoveredCountry.precipProb !== null && hoveredCountry.precipProb !== undefined ? (
            <div className="tooltip-body">
              <div className="tooltip-metric-row">
                <span className="metric-label">Condition</span>
                <span className="metric-val">{hoveredCountry.condition || 'Scattered Clouds'}</span>
              </div>
              <div className="tooltip-metric-row">
                <span className="metric-label">Temperature</span>
                <span className="metric-val">{hoveredCountry.temp}°C</span>
              </div>
              <div className="tooltip-metric-row">
                <span className="metric-label">Precipitation prob.</span>
                <span className="metric-val green-val">{hoveredCountry.precipProb}%</span>
              </div>
              <div className="tooltip-metric-row">
                <span className="metric-label">Wind speed</span>
                <span className="metric-val">{hoveredCountry.windSpeed} km/h</span>
              </div>
            </div>
          ) : (
            <div className="tooltip-offline">Ground Radar Station Offline</div>
          )}
        </div>
      )}

      {/* Selected Country Details Drawer */}
      {selectedCountry && (
        <div className="country-details-drawer">
          <div className="drawer-header">
            <div>
              <h3 className="drawer-country-title">{selectedCountry.name}</h3>
              <span className="drawer-zone-badge">Zone {selectedCountry.code || 'WMO'} • Doppler Radar</span>
            </div>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setSelectedCountry(null)}
              aria-label="Close country details"
            >
              <X size={16} />
            </button>
          </div>

          <div className="drawer-content">
            {selectedCountry.precipProb !== null && selectedCountry.precipProb !== undefined ? (
              <>
                {/* Main Metric Banner */}
                <div className="drawer-stat-banner">
                  <div className="banner-item">
                    <span className="stat-label">Current Temp</span>
                    <span className="stat-large-val">{selectedCountry.temp}°<small>C</small></span>
                  </div>
                  <div className="banner-divider" />
                  <div className="banner-item">
                    <span className="stat-label">Precipitation Prob.</span>
                    <span className="stat-large-val green-val">{selectedCountry.precipProb}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${selectedCountry.precipProb}%` }}
                  />
                </div>

                {/* Atmospheric telemetry breakdown */}
                <div className="drawer-section">
                  <h4 className="drawer-section-title">Atmospheric Observations</h4>
                  <div className="sources-grid">
                    <div className="source-item">
                      <Sun size={15} className="source-icon yellow-icon" />
                      <span className="source-name">Condition</span>
                      <span className="source-share" style={{ fontSize: 10 }}>{selectedCountry.condition?.slice(0, 10)}</span>
                    </div>
                    <div className="source-item">
                      <Wind size={15} className="source-icon cyan-icon" />
                      <span className="source-name">Wind</span>
                      <span className="source-share">{selectedCountry.windSpeed} km/h</span>
                    </div>
                    <div className="source-item">
                      <Droplets size={15} className="source-icon blue-icon" />
                      <span className="source-name">Humidity</span>
                      <span className="source-share">{selectedCountry.humidity}%</span>
                    </div>
                    <div className="source-item">
                      <Zap size={15} className="source-icon purple-icon" />
                      <span className="source-name">Pressure</span>
                      <span className="source-share">{selectedCountry.pressure || 1013} hPa</span>
                    </div>
                  </div>
                </div>

                {/* Weather Prediction Alert / Forecast */}
                <div className="drawer-section">
                  <h4 className="drawer-section-title">Weather Prediction Alert</h4>
                  <div className="risk-card">
                    <div className="risk-row">
                      <span className="risk-badge-label">Active Advisory:</span>
                      <span className={`risk-tag tag-${selectedCountry.alert === 'None' ? 'low' : 'high'}`}>
                        {selectedCountry.alert || 'None'}
                      </span>
                    </div>
                    <p className="risk-description">
                      {selectedCountry.precipProb > 70
                        ? 'High probability of convective cloud cells and squall activity over the next 12 to 24 hours. Doppler radar reflectivity exceeds 38 dBZ.'
                        : 'Stable atmospheric pressure ridge dominating the regional troposphere. Low precipitation risk with high forecast confidence.'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="drawer-offline-state">
                <ShieldAlert size={36} className="offline-icon" />
                <h4>Radar Telemetry Offline</h4>
                <p>
                  Ground Doppler meteorological stations are temporarily unreachable.
                  ECMWF satellite radiometer pass scheduled for next orbital window.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldMap;
