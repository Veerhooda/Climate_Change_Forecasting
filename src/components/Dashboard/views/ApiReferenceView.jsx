import React from 'react';
import { BookOpen, ShieldCheck, Zap } from 'lucide-react';

export function ApiReferenceView() {
  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Weather API Reference</h2>
          <p className="subscreen-subtitle">
            Complete technical specification for integrating Weather Maps radar and numerical weather prediction telemetry.
          </p>
        </div>
      </div>

      <div className="reference-grid">
        <div className="doc-section-card">
          <h3 className="doc-title">Authentication & Security</h3>
          <p className="doc-p">
            All API requests must include your secret API key passed in the HTTP Authorization header as a Bearer token:
          </p>
          <pre className="doc-code">
            <code>Authorization: Bearer wx_live_xxxxxxxxxxxxxxxx</code>
          </pre>
          <p className="doc-p">
            Unauthenticated requests return <code>401 Unauthorized</code> with JSON error details.
          </p>
        </div>

        <div className="doc-section-card">
          <h3 className="doc-title">Rate Limiting</h3>
          <p className="doc-p">
            Every request returns standard rate limit headers indicating your remaining window:
          </p>
          <ul className="doc-list">
            <li><code>X-RateLimit-Limit</code>: Maximum allowed calls per minute (default: 600)</li>
            <li><code>X-RateLimit-Remaining</code>: Remaining calls in current 60s window</li>
            <li><code>X-RateLimit-Reset</code>: UTC epoch seconds when the rate bucket refreshes</li>
          </ul>
        </div>

        <div className="doc-section-card">
          <h3 className="doc-title">Core Meteorological Endpoints</h3>
          <div className="endpoint-doc-item">
            <div className="ep-badge-row">
              <span className="http-badge get">GET</span>
              <code className="ep-uri">/v1/weather/forecast</code>
            </div>
            <p className="doc-p">Returns hourly and daily predicted temperature, precipitation rate, wind vectors, and dew point.</p>
          </div>

          <div className="endpoint-doc-item">
            <div className="ep-badge-row">
              <span className="http-badge get">GET</span>
              <code className="ep-uri">/v1/weather/radar-precipitation</code>
            </div>
            <p className="doc-p">Retrieves Doppler radar composite reflectivity (dBZ) and precipitation probability grids.</p>
          </div>

          <div className="endpoint-doc-item">
            <div className="ep-badge-row">
              <span className="http-badge get">GET</span>
              <code className="ep-uri">/v1/weather/extreme-alerts</code>
            </div>
            <p className="doc-p">Lists active World Meteorological Organization (WMO) storm warnings, convective squall alerts, and gale advisories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiReferenceView;
