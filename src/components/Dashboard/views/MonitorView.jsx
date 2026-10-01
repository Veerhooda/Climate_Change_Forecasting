import React, { useState } from 'react';
import { Home, Wind, CloudRain, Sun, CheckCircle2, ShieldAlert, Thermometer, Compass } from 'lucide-react';

export function MonitorView() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Smart Irrigation Auto-Skip',
      device: 'Rachio 3 Smart Sprinkler • Garden',
      trigger: 'Skip cycle if predicted rainfall > 5mm in next 24h',
      active: true,
      status: 'Active • Rain predicted tonight (8.2 mm)',
      icon: CloudRain,
    },
    {
      id: 2,
      name: 'Storm Shutter Automatic Deployment',
      device: 'Somfy RTS Motor • Patio & Windows',
      trigger: 'Auto-close when sustained wind gusts > 60 km/h',
      active: true,
      status: 'Armed • Current gusts 24 km/h (Normal)',
      icon: Wind,
    },
    {
      id: 3,
      name: 'HVAC Extreme Heat Pre-Cooling',
      device: 'Ecobee SmartThermostat • Main Floor',
      trigger: 'Pre-cool living spaces before predicted heatwave peak',
      active: false,
      status: 'Idle • Forecast peak 26°C within comfort band',
      icon: Thermometer,
    },
  ]);

  const toggleAutomation = (id) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Weather Station & Home Telemetry</h2>
          <p className="subscreen-subtitle">
            Local weather telemetry, barometric trend analysis, and automated home weather mitigation rules.
          </p>
        </div>

        <div className="monitor-status-badge">
          <span className="pulse-indicator-green" />
          <span>Home Assistant Weather Station Linked</span>
        </div>
      </div>

      {/* Weather Station Telemetry Card */}
      <div className="telemetry-banner-card">
        <div className="banner-metric">
          <span className="telemetry-label">Ambient Temperature</span>
          <span className="telemetry-huge-val green-val">21.4°<small>C</small></span>
          <span className="telemetry-tag optimal">Feels Like 22.1°C</span>
        </div>
        <div className="banner-divider" />
        <div className="banner-metric">
          <span className="telemetry-label">Barometric Pressure</span>
          <span className="telemetry-huge-val">1014.2 <small>hPa</small></span>
          <span className="telemetry-sub">Trend: Steady (+0.4 hPa/3h)</span>
        </div>
        <div className="banner-divider" />
        <div className="banner-metric">
          <span className="telemetry-label">Wind Velocity</span>
          <span className="telemetry-huge-val">18 <small>km/h NW</small></span>
          <span className="telemetry-sub">Gusts up to 26 km/h</span>
        </div>
        <div className="banner-divider" />
        <div className="banner-metric">
          <span className="telemetry-label">Relative Humidity</span>
          <span className="telemetry-huge-val">58%</span>
          <span className="telemetry-sub">Dew Point: 12.8°C</span>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="monitor-section">
        <h3 className="section-small-title">Weather-Driven Smart Automations</h3>
        <div className="automations-grid">
          {automations.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={`automation-card ${item.active ? 'active' : ''}`}>
                <div className="automation-card-top">
                  <div className="automation-icon-box">
                    <Icon size={20} />
                  </div>
                  <button
                    type="button"
                    className={`toggle-switch ${item.active ? 'on' : 'off'}`}
                    onClick={() => toggleAutomation(item.id)}
                    aria-label={`Toggle ${item.name}`}
                  >
                    <span className="toggle-handle" />
                  </button>
                </div>

                <h4 className="automation-name">{item.name}</h4>
                <p className="automation-device">{item.device}</p>
                <div className="automation-trigger-box">{item.trigger}</div>

                <div className="automation-footer">
                  <CheckCircle2 size={13} className={item.active ? 'green-val' : 'gray-val'} />
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MonitorView;
