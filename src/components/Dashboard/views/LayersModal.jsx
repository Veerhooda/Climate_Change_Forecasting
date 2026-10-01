import React from 'react';
import { X, Check } from 'lucide-react';

export function LayersModal({ isOpen, onClose, activeLayer = 'precip', onSelectLayer }) {
  if (!isOpen) return null;

  const layers = [
    {
      id: 'precip',
      name: 'Precipitation probability %',
      description: 'Default primary metric. Percentage likelihood of measurable precipitation (> 0.1 mm) over the next 15-minute window.',
      unit: '% (0-100)',
    },
    {
      id: 'severe',
      name: 'Severe Convective Storm Risk',
      description: 'Composite atmospheric instability metric combining CAPE, helicity, and radar reflectivity for lightning and squalls.',
      unit: 'Probability %',
    },
    {
      id: 'humidity',
      name: 'Relative Humidity',
      description: 'Atmospheric moisture saturation ratio at surface pressure level.',
      unit: '% RH',
    },
    {
      id: 'wind',
      name: 'Sustained Wind Velocity',
      description: '10-meter surface wind speeds and gust vectors.',
      unit: 'km/h',
    },
    {
      id: 'temp',
      name: 'Temperature Anomaly',
      description: 'Departure from 30-year climatological baseline mean.',
      unit: '°C Anomaly',
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container layers-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Weather Layers & Radar Overlays</h3>
            <p className="modal-subtitle">Switch meteorology and weather data prediction overlays.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close layers">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body layers-list">
          {layers.map((layer) => {
            const isSelected = activeLayer === layer.id;
            return (
              <div
                key={layer.id}
                className={`layer-option-card ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  onSelectLayer(layer.id);
                  onClose();
                }}
              >
                <div className="layer-top-row">
                  <span className="layer-name">{layer.name}</span>
                  {isSelected && <Check size={16} className="green-val" />}
                </div>
                <p className="layer-desc">{layer.description}</p>
                <span className="layer-unit-tag">{layer.unit}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LayersModal;
