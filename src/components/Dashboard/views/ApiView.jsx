import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, Key, Sparkles } from 'lucide-react';
import { API_ENDPOINTS } from '../data/climateData';

export function ApiView() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [language, setLanguage] = useState('curl');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiKey] = useState('clm_live_9f82d1c47a08b3e529a1');

  const getCodeSnippet = () => {
    const url = `https://api.weathermaps.io${selectedEndpoint.path}`;
    if (language === 'curl') {
      return `curl -X GET "${url}?zone=IN&resolution=15m" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Accept: application/json"`;
    }
    if (language === 'python') {
      return `import requests

url = "${url}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Accept": "application/json"
}
params = {"zone": "IN", "resolution": "15m"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print("Temperature:", data["temperature_c"], "°C")
print("Precipitation Probability:", data["precipitation_probability_pct"], "%")`;
    }
    if (language === 'javascript') {
      return `const response = await fetch("${url}?zone=IN&resolution=15m", {
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Accept": "application/json"
  }
});
const data = await response.json();
console.log("Temperature:", data.temperature_c, "°C");
console.log("Precipitation Probability:", data.precipitation_probability_pct, "%");`;
    }
    return '';
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Weather & Forecast Telemetry API</h2>
          <p className="subscreen-subtitle">
            Query real-time precipitation radar, atmospheric pressure fields, and numerical weather predictions across 194 countries.
          </p>
        </div>
        <div className="api-key-pill">
          <Key size={14} className="key-icon" />
          <span className="key-code">{apiKey.slice(0, 14)}...</span>
          <button type="button" className="copy-btn" onClick={handleCopyKey} title="Copy API key">
            {copiedKey ? <Check size={14} className="green-val" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className="api-console-grid">
        {/* Left Column: Endpoints */}
        <div className="api-endpoints-column">
          <h3 className="section-small-title">Available Endpoints</h3>
          <div className="endpoints-list">
            {API_ENDPOINTS.map((ep) => (
              <div
                key={ep.path}
                className={`endpoint-card ${selectedEndpoint.path === ep.path ? 'active' : ''}`}
                onClick={() => setSelectedEndpoint(ep)}
              >
                <div className="endpoint-method-row">
                  <span className="http-method-badge">{ep.method}</span>
                  <span className="endpoint-path">{ep.path}</span>
                </div>
                <p className="endpoint-description">{ep.description}</p>
              </div>
            ))}
          </div>

          <div className="rate-limit-card">
            <div className="rate-limit-header">
              <span>Monthly Quota</span>
              <span className="rate-limit-val">94,200 / 100,000 reqs</span>
            </div>
            <div className="rate-bar-track">
              <div className="rate-bar-fill" style={{ width: '94.2%' }} />
            </div>
            <span className="rate-sub">Resets on 1 Nov 2026 • 600 req/min burst</span>
          </div>
        </div>

        {/* Right Column: Code Generator & Live Payload */}
        <div className="api-code-column">
          <div className="code-header-bar">
            <div className="lang-tabs">
              {['curl', 'python', 'javascript'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`lang-tab ${language === lang ? 'active' : ''}`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" className="copy-code-btn" onClick={handleCopyCode}>
              {copiedCode ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="code-snippet-box">
            <code>{getCodeSnippet()}</code>
          </pre>

          <div className="response-header-bar">
            <span className="response-title">Live Response Payload</span>
            <span className="response-status">200 OK • 38ms</span>
          </div>

          <pre className="response-json-box">
            <code>{JSON.stringify(selectedEndpoint.sampleResponse, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ApiView;
