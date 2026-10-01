import React, { useState } from 'react';
import { X, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

/**
 * MinimalHUD:
 * Restrained Claude-style masthead with award-winning interactive controls:
 * - Planetary Observation Lens Selector (Natural · Thermal Flux · Biosphere)
 * - Procedural Web Audio Ambient Soundscape Engine
 * - Planetary Climate Dossier Modal (2026–2050 Scenario Intelligence)
 * - Dynamic scroll altitude readout
 */
export const MinimalHUD = ({
  scrollProgress = 0,
  scrollPromptVisible = true,
  activeLens = 'natural',
  onLensChange,
  isDossierOpen = false,
  onDossierClose,
  onDossierOpen,
  dossierTab = 'mechanisms',
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  // Determine altitude stage label
  const getLayerLabel = () => {
    if (scrollProgress < 0.28) return 'Orbital Space · 400 KM';
    if (scrollProgress < 0.58) return 'Stratosphere · 12,000 M';
    if (scrollProgress < 0.82) return 'Forest Canopy · 480 M';
    return 'Surface Station · 0 M';
  };

  return (
    <>
      {/* Top Header */}
      <header className="claude-masthead">
        {/* Brandmark */}
        <a href="#hero" className="claude-brand" aria-label="Terra Climate Intelligence">
          <div className="claude-brand-symbol">
            <span className="brand-dot" />
          </div>
          <div className="claude-brand-text">
            <span className="brand-title">TERRA</span>
            <span className="brand-divider">/</span>
            <span className="brand-subtitle">CLIMATE INTELLIGENCE</span>
          </div>
        </a>

        {/* Center: Observation Lens Switcher (Sensory/Scientific Immersion) */}
        <nav className="claude-lens-selector" aria-label="Observation Lens">
          <span className="lens-label">
            <Eye size={12} strokeWidth={2.2} /> Lens:
          </span>
          <button
            type="button"
            className={`lens-option ${activeLens === 'natural' ? 'active' : ''}`}
            onClick={() => {
              ambientSound.playClick();
              onLensChange && onLensChange('natural');
            }}
            title="Natural Spectrum Hand-Illustrated View"
          >
            Natural
          </button>
          <span className="lens-sep">·</span>
          <button
            type="button"
            className={`lens-option ${activeLens === 'thermal' ? 'active' : ''}`}
            onClick={() => {
              ambientSound.playClick();
              onLensChange && onLensChange('thermal');
            }}
            title="Thermal Energy Flux & Jet Stream Isotherms"
          >
            Thermal Flux
          </button>
          <span className="lens-sep">·</span>
          <button
            type="button"
            className={`lens-option ${activeLens === 'cryosphere' ? 'active' : ''}`}
            onClick={() => {
              ambientSound.playClick();
              onLensChange && onLensChange('cryosphere');
            }}
            title="Cryosphere Polar Ice Albedo & Rossby Planetary Wave Lens"
          >
            Cryosphere
          </button>
          <span className="lens-sep">·</span>
          <button
            type="button"
            className={`lens-option ${activeLens === 'biosphere' ? 'active' : ''}`}
            onClick={() => {
              ambientSound.playClick();
              onLensChange && onLensChange('biosphere');
            }}
            title="Biosphere Transpiration & Moisture Vectors"
          >
            Biosphere
          </button>
        </nav>

        {/* Right Controls: Altitude Readout & Soundscape Toggle */}
        <div className="claude-header-actions">
          {/* Layer Depth Indicator */}
          <div className="claude-depth-pill" aria-live="polite">
            <span className="depth-coords">{getLayerLabel()}</span>
          </div>

          {/* Dossier Quick Trigger */}
          <button
            type="button"
            className="claude-dossier-btn"
            onClick={() => {
              ambientSound.playClick();
              onDossierOpen && onDossierOpen();
            }}
            id="btn-open-dossier"
            title="Open 2026-2050 Planetary Climate Dossier"
          >
            <span>Dossier 2050</span>
          </button>

          {/* Procedural Ambient Sound Toggle */}
          <button
            type="button"
            className={`claude-sound-btn ${isPlayingAudio ? 'active' : ''}`}
            onClick={toggleSound}
            aria-label={isPlayingAudio ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            title={isPlayingAudio ? 'Mute environmental soundscape' : 'Enable atmospheric soundscape'}
          >
            <div className="sound-bars" aria-hidden="true">
              <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
              <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
              <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
              <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
            </div>
            <span className="sound-label">
              {isPlayingAudio ? 'Atmosphere On' : 'Atmosphere Off'}
            </span>
          </button>
        </div>
      </header>

      {/* Bottom Quiet Scroll Track */}
      <div
        className="claude-bottom-cue"
        style={{
          opacity: scrollPromptVisible ? 1 : 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div className="scroll-pill-quiet">
          <span className="scroll-pip-line" />
          <span className="scroll-caption">Scroll to descend</span>
        </div>
      </div>

      {/* ====================================================================
          PLANETARY CLIMATE INTELLIGENCE DOSSIER MODAL (DUAL-TAB LIGHTBOX)
         ==================================================================== */}
      {isDossierOpen && (
        <DossierModal
          onClose={onDossierClose}
          initialTab={dossierTab}
        />
      )}
    </>
  );
};

// Internal Dossier Lightbox Component with Dual Tabs
const DossierModal = ({ onClose, initialTab = 'mechanisms' }) => {
  const [tab, setTab] = useState(initialTab);

  return (
    <div
      className="dossier-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Planetary Climate Risk Assessment Dossier"
    >
      <div
        className="dossier-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dossier-modal-top">
          <div className="dossier-headline-block">
            <span className="dossier-tag">
              <Sparkles size={13} /> Terra Research Initiative · Project 2050
            </span>
            <div className="dossier-tab-switcher" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'mechanisms'}
                className={`dossier-tab ${tab === 'mechanisms' ? 'active' : ''}`}
                onClick={() => {
                  ambientSound.playClick();
                  setTab('mechanisms');
                }}
              >
                Tipping Point Mechanisms (AR6 Plate)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'scenarios'}
                className={`dossier-tab ${tab === 'scenarios' ? 'active' : ''}`}
                onClick={() => {
                  ambientSound.playClick();
                  setTab('scenarios');
                }}
              >
                Scenario Models (2026–2050)
              </button>
            </div>
          </div>
          <button
            type="button"
            className="dossier-close-btn"
            onClick={onClose}
            id="btn-close-dossier"
            aria-label="Close dossier view"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="dossier-modal-body">
          {tab === 'mechanisms' ? (
            <img
              src="/assets/wide/planetary_telemetry_plate.webp"
              alt="Planetary Climate Tipping Point Mechanisms: Greenland, AMOC, and Amazon"
              className="dossier-graphic-display"
            />
          ) : (
            <img
              src="/assets/wide/climate_scenario_dossier.webp"
              alt="Planetary Tipping Point Thresholds and Carbon Flux Projections (2026-2050)"
              className="dossier-graphic-display"
            />
          )}
        </div>

        <div className="dossier-modal-footer">
          <div className="dossier-footer-meta">
            <span className="meta-key">DATA RESOLUTION:</span> 1.2 KM GEO-SPATIAL GRID
            <span className="meta-sep">·</span>
            <span className="meta-key">SYNTHESIS:</span> IPCC AR6 / ORBITAL TELEMETRY MODEL
          </div>
          <button
            type="button"
            className="dossier-action-btn"
            onClick={onClose}
          >
            Return to Observatory
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalHUD;
