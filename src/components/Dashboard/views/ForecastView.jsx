import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CloudRain, Droplets, Thermometer, Wind } from 'lucide-react';

export function ForecastView() {
  const [model, setModel] = useState('ecmwf');

  const modelData = {
    ecmwf: {
      name: 'ECMWF IFS (European Center 0.1°)',
      tempAnomaly: '+1.8°C',
      rainAccum: '42.8 mm',
      windPeak: '58 km/h',
      confidence: '94.6% High',
      color: '#70a76b',
      description: 'Global 51-member ensemble simulation with 4D-Var data assimilation.',
    },
    gfs: {
      name: 'NOAA GFS (Global Forecast System)',
      tempAnomaly: '+2.4°C',
      rainAccum: '54.2 mm',
      windPeak: '64 km/h',
      confidence: '88.2% Moderate',
      color: '#e2a84d',
      description: 'Finite-Volume Cubed-Sphere dynamical core with hourly assimilation.',
    },
    ai: {
      name: 'DeepMind GraphCast AI Weather Model',
      tempAnomaly: '+1.9°C',
      rainAccum: '46.0 mm',
      windPeak: '61 km/h',
      confidence: '96.1% Optimal',
      color: '#06b6d4',
      description: 'Machine learning graph neural network trained on 40 years of ERA5 reanalysis.',
    },
  };

  const current = modelData[model];

  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Weather Prediction Models</h2>
          <p className="subscreen-subtitle">
            14-day numerical weather prediction ensembles and severe storm trajectory forecasting.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="scenario-switcher">
          <button
            type="button"
            className={`scenario-btn ${model === 'ecmwf' ? 'active green' : ''}`}
            onClick={() => setModel('ecmwf')}
          >
            ECMWF IFS
          </button>
          <button
            type="button"
            className={`scenario-btn ${model === 'gfs' ? 'active yellow' : ''}`}
            onClick={() => setModel('gfs')}
          >
            NOAA GFS
          </button>
          <button
            type="button"
            className={`scenario-btn ${model === 'ai' ? 'active blue' : ''}`}
            style={{
              borderColor: model === 'ai' ? '#06b6d4' : undefined,
              color: model === 'ai' ? '#06b6d4' : undefined,
            }}
            onClick={() => setModel('ai')}
          >
            GraphCast AI
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="forecast-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-row">
            <Thermometer size={18} className="kpi-icon" />
            <span className="kpi-label">Temperature Anomaly</span>
          </div>
          <div className="kpi-val" style={{ color: current.color }}>
            {current.tempAnomaly}
          </div>
          <span className="kpi-sub">Relative to 30-year climatological baseline</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-row">
            <CloudRain size={18} className="kpi-icon" />
            <span className="kpi-label">Expected Precipitation</span>
          </div>
          <div className="kpi-val">{current.rainAccum}</div>
          <span className="kpi-sub">Total 7-day cumulative rainfall projection</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-row">
            <Wind size={18} className="kpi-icon" />
            <span className="kpi-label">Peak Frontal Gusts</span>
          </div>
          <div className="kpi-val">{current.windPeak}</div>
          <span className="kpi-sub">Maximum predicted jet-stream downdraft</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-row">
            <TrendingUp size={18} className="kpi-icon" />
            <span className="kpi-label">Forecast Confidence</span>
          </div>
          <div className="kpi-val" style={{ color: current.color }}>
            {current.confidence}
          </div>
          <span className="kpi-sub">{current.description}</span>
        </div>
      </div>

      {/* 14-Day Forecast Chart Section */}
      <div className="forecast-chart-card">
        <div className="chart-header">
          <h3 className="section-small-title">14-Day Global Atmospheric Temperature & Weather Ensemble</h3>
          <div className="chart-legend-row">
            <span className="legend-item"><span className="legend-dot green-dot" /> ECMWF IFS</span>
            <span className="legend-item"><span className="legend-dot yellow-dot" /> NOAA GFS</span>
            <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: '#06b6d4' }} /> GraphCast AI</span>
            <span className="legend-item"><span className="legend-line dash-line" /> Climatological Mean</span>
          </div>
        </div>

        <div className="forecast-svg-wrapper">
          <svg viewBox="0 0 900 260" className="forecast-svg" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="60" y1="40" x2="880" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="60" y1="100" x2="880" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="60" y1="160" x2="880" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <line x1="60" y1="220" x2="880" y2="220" stroke="rgba(255,255,255,0.12)" />

            {/* Y axis labels */}
            <text x="35" y="44" fill="#888" fontSize="11">32°C</text>
            <text x="35" y="104" fill="#888" fontSize="11">26°C</text>
            <text x="35" y="164" fill="#888" fontSize="11">20°C</text>
            <text x="35" y="224" fill="#888" fontSize="11">14°C</text>

            {/* Climatological Baseline Line */}
            <line x1="60" y1="150" x2="880" y2="150" stroke="#70a76b" strokeDasharray="5 4" strokeWidth="1.5" />
            <text x="790" y="144" fill="#70a76b" fontSize="11" fontWeight="600">30-Yr Norm (21°C)</text>

            {/* Past 7 days Observations */}
            <path
              d="M 60 170 Q 180 140, 320 160 T 480 135"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Current marker */}
            <circle cx="480" cy="135" r="4.5" fill="#ffffff" />
            <text x="460" y="120" fill="#ffffff" fontSize="11" fontWeight="bold">Now (1 Oct)</text>

            {/* ECMWF Projection */}
            <path
              d="M 480 135 Q 580 115, 680 140 T 880 165"
              fill="none"
              stroke="#70a76b"
              strokeWidth={model === 'ecmwf' ? '3.5' : '1.5'}
              strokeOpacity={model === 'ecmwf' ? '1' : '0.4'}
            />

            {/* GFS Projection */}
            <path
              d="M 480 135 Q 580 95, 680 120 T 880 150"
              fill="none"
              stroke="#e2a84d"
              strokeWidth={model === 'gfs' ? '3.5' : '1.5'}
              strokeOpacity={model === 'gfs' ? '1' : '0.4'}
            />

            {/* GraphCast AI Projection */}
            <path
              d="M 480 135 Q 580 108, 680 132 T 880 160"
              fill="none"
              stroke="#06b6d4"
              strokeWidth={model === 'ai' ? '3.5' : '1.5'}
              strokeOpacity={model === 'ai' ? '1' : '0.4'}
            />

            {/* X axis labels */}
            <text x="60" y="248" fill="#888" fontSize="11">24 Sept</text>
            <text x="260" y="248" fill="#888" fontSize="11">28 Sept</text>
            <text x="460" y="248" fill="#888" fontSize="11">1 Oct (Today)</text>
            <text x="660" y="248" fill="#888" fontSize="11">+7 Days (8 Oct)</text>
            <text x="820" y="248" fill="#888" fontSize="11">+14 Days (15 Oct)</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ForecastView;
