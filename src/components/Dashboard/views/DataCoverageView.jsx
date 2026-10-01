import React, { useState } from 'react';
import { Search, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { COUNTRY_WEATHER_DATA } from '../data/climateData';

export function DataCoverageView() {
  const [filter, setFilter] = useState('');

  const rows = Object.entries(COUNTRY_WEATHER_DATA).filter(([name]) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Global Radar & Weather Coverage</h2>
          <p className="subscreen-subtitle">
            Doppler radar networks, geostationary satellite radiometer scans, and automatic weather station (AWS) telemetries.
          </p>
        </div>

        <div className="search-filter-box">
          <Search size={15} />
          <input
            type="text"
            placeholder="Filter coverage areas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="coverage-table-container">
        <table className="coverage-table">
          <thead>
            <tr>
              <th>Country / Region</th>
              <th>WMO Code</th>
              <th>Telemetry Source</th>
              <th>Scan Frequency</th>
              <th>Precipitation Prob.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, data]) => {
              const isOffline = data.precipProb === null;
              return (
                <tr key={name}>
                  <td className="country-cell">
                    <span className="coverage-country-name">{name}</span>
                  </td>
                  <td><code>{data.code || '--'}</code></td>
                  <td>{isOffline ? 'Satellite Pass Pending' : 'NEXRAD / Doppler Radar API'}</td>
                  <td>{isOffline ? 'Delayed' : 'Every 5 min'}</td>
                  <td>
                    {isOffline ? (
                      <span className="gray-val">--</span>
                    ) : (
                      <span className="green-val font-semibold">{data.precipProb}%</span>
                    )}
                  </td>
                  <td>
                    {isOffline ? (
                      <span className="status-badge offline">
                        <AlertCircle size={12} />
                        Offline
                      </span>
                    ) : (
                      <span className="status-badge live">
                        <CheckCircle2 size={12} />
                        Live Radar
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataCoverageView;
