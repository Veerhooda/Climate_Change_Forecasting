import React from 'react';
import { X } from 'lucide-react';

export function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Map & Data Settings</h3>
            <p className="modal-subtitle">Customize telemetry units, projection format, and refresh cadence.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body settings-body">
          <div className="setting-row">
            <div>
              <span className="setting-name">Emission Units</span>
              <p className="setting-desc">Standard international metric vs imperial emission factors.</p>
            </div>
            <select className="setting-select" defaultValue="metric">
              <option value="metric">Metric (gCO₂eq/kWh)</option>
              <option value="imperial">Imperial (lbs CO₂/MWh)</option>
            </select>
          </div>

          <div className="setting-row">
            <div>
              <span className="setting-name">Map Projection</span>
              <p className="setting-desc">Cartographic coordinate transform.</p>
            </div>
            <select className="setting-select" defaultValue="mercator">
              <option value="mercator">Web Mercator (Default)</option>
              <option value="globe">3D Spherical Orthographic</option>
            </select>
          </div>

          <div className="setting-row">
            <div>
              <span className="setting-name">Telemetry Auto-Refresh</span>
              <p className="setting-desc">Polling interval for live TSO grid updates.</p>
            </div>
            <select className="setting-select" defaultValue="15s">
              <option value="15s">Every 15 seconds (Real-time)</option>
              <option value="1m">Every 1 minute</option>
              <option value="5m">Every 5 minutes</option>
            </select>
          </div>

          <div className="setting-row">
            <div>
              <span className="setting-name">High-Contrast Borders</span>
              <p className="setting-desc">Boost polygon line stroke for outdoor field displays.</p>
            </div>
            <input type="checkbox" className="setting-checkbox" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
