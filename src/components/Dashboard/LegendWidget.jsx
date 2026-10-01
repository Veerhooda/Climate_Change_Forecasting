import React from 'react';

export function LegendWidget({ title = 'Precipitation probability', unit = '%' }) {
  return (
    <div className="dashboard-legend-widget">
      {/* Title & Unit */}
      <div className="legend-header-row">
        <span className="legend-title">{title}</span>
        <span className="legend-unit">{unit}</span>
      </div>

      {/* Gradient Color Bar */}
      <div className="legend-color-bar" />

      {/* Scale Numbers */}
      <div className="legend-scale-row">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>
    </div>
  );
}

export default LegendWidget;
