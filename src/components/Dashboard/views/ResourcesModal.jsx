import React from 'react';
import { X, ExternalLink, Download, Book, Terminal, MessageSquare } from 'lucide-react';

export function ResourcesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Weather Resources & Tools</h3>
            <p className="modal-subtitle">Open-source SDKs, NWP research whitepapers, and developer documentation.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body resources-grid-modal">
          <div className="resource-item-card">
            <div className="res-icon"><Terminal size={20} /></div>
            <div className="res-content">
              <h4>Python Weather Prediction SDK</h4>
              <p>Official client library with pandas, polars, xarray, and NetCDF4 support.</p>
              <code>pip install weathermaps</code>
            </div>
          </div>

          <div className="resource-item-card">
            <div className="res-icon"><Book size={20} /></div>
            <div className="res-content">
              <h4>NWP & Doppler Radar Methodology</h4>
              <p>Peer-reviewed paper on 4D-Var data assimilation and graph neural network weather forecasting (PDF, 38pp).</p>
              <span className="res-link">Download PDF <Download size={13} /></span>
            </div>
          </div>

          <div className="resource-item-card">
            <div className="res-icon"><Download size={20} /></div>
            <div className="res-content">
              <h4>Global Meteorological Data Catalog</h4>
              <p>Hourly ERA5 reanalysis and Doppler composite grids from 1979 to present.</p>
              <span className="res-link">Access Catalog <ExternalLink size={13} /></span>
            </div>
          </div>

          <div className="resource-item-card">
            <div className="res-icon"><MessageSquare size={20} /></div>
            <div className="res-content">
              <h4>Meteorology & Developer Community</h4>
              <p>Join 5,600+ meteorologists, atmospheric physicists, and weather data engineers.</p>
              <span className="res-link">Join Discord <ExternalLink size={13} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesModal;
