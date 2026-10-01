import React from 'react';
import {
  Map as MapIcon,
  Code2,
  Radio,
  Home,
  BookOpen,
  Globe,
  ExternalLink,
  HelpCircle,
  ChevronRight,
  X,
  PanelLeftClose,
  Activity,
  Layers,
} from 'lucide-react';

/**
 * Sidebar component matching the exact layout and typography
 * of the reference image.
 */
export function Sidebar({
  activeScreen,
  setActiveScreen,
  trialDismissed,
  setTrialDismissed,
  onOpenTrial,
  onOpenCreateAccount,
  onOpenSignIn,
}) {
  return (
    <aside className="dashboard-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand" onClick={() => setActiveScreen('map')} role="button" tabIndex={0}>
        <div className="brand-logo-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
              stroke="#cbeec5"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 10v4m0 0 2-2m-2 2-2-2"
              stroke="#92c98d"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="brand-title">Weather Maps</span>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'map' ? 'active' : ''}`}
          onClick={() => setActiveScreen('map')}
          id="nav-map"
        >
          <MapIcon size={18} strokeWidth={2.2} />
          <span>Map</span>
        </button>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'api' ? 'active' : ''}`}
          onClick={() => setActiveScreen('api')}
          id="nav-api"
        >
          <Code2 size={18} strokeWidth={2.2} />
          <span>API</span>
        </button>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveScreen('forecast')}
          id="nav-forecast"
        >
          <Radio size={18} strokeWidth={2.2} />
          <span>Forecast</span>
        </button>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'monitor' ? 'active' : ''}`}
          onClick={() => setActiveScreen('monitor')}
          id="nav-monitor"
        >
          <Home size={18} strokeWidth={2.2} />
          <span>Weather Station</span>
        </button>

        {/* Section Label: Reference */}
        <div className="sidebar-section-label">Reference</div>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'api-ref' ? 'active' : ''}`}
          onClick={() => setActiveScreen('api-ref')}
          id="nav-api-ref"
        >
          <BookOpen size={18} strokeWidth={2} />
          <span>API reference</span>
        </button>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'coverage' ? 'active' : ''}`}
          onClick={() => setActiveScreen('coverage')}
          id="nav-coverage"
        >
          <Globe size={18} strokeWidth={2} />
          <span>Data coverage</span>
        </button>

        <button
          type="button"
          className={`sidebar-nav-item ${activeScreen === 'methodology' ? 'active' : ''}`}
          onClick={() => setActiveScreen('methodology')}
          id="nav-methodology"
        >
          <ExternalLink size={18} strokeWidth={2} />
          <span className="with-external-text">Methodology</span>
        </button>
      </nav>

      {/* Spacer to push bottom section down */}
      <div className="sidebar-spacer" />

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {/* Trial Promo Card */}
        {!trialDismissed && (
          <div className="sidebar-promo-card">
            <div className="promo-card-header">
              <span className="promo-card-title">14-day API trial</span>
              <button
                type="button"
                className="promo-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setTrialDismissed(true);
                }}
                aria-label="Dismiss trial promo"
              >
                <X size={14} />
              </button>
            </div>
            <p className="promo-card-desc">
              All signals, real-time and forecasted.
            </p>
            <button
              type="button"
              className="promo-card-link"
              onClick={onOpenTrial}
            >
              Start free trial
            </button>
          </div>
        )}

        {/* Resources Item */}
        <button
          type="button"
          className={`sidebar-nav-item resources-nav-item ${activeScreen === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveScreen('resources')}
          id="nav-resources"
        >
          <div className="item-left">
            <HelpCircle size={18} strokeWidth={2} />
            <span>Resources</span>
          </div>
          <ChevronRight size={16} className="chevron-right" />
        </button>

        {/* Create Account CTA */}
        <button
          type="button"
          className="sidebar-cta-btn"
          onClick={onOpenCreateAccount}
          id="btn-create-account"
        >
          Create account
        </button>

        {/* Sign In & Collapse Footer */}
        <div className="sidebar-auth-row">
          <span className="auth-subtext">
            Got an account?{' '}
            <button
              type="button"
              className="sign-in-link"
              onClick={onOpenSignIn}
            >
              Sign in
            </button>
          </span>
          <button
            type="button"
            className="sidebar-collapse-btn"
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
          >
            <PanelLeftClose size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
