import React, { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TemporalHorizonScrubber, SCENARIOS } from './TemporalHorizonScrubber';

/**
 * EditorialTypography:
 * High-impact, monumental climate storytelling typography:
 * - Monumental Cormorant Garamond serif with sculpted contrast and sweeping italic climaxes
 * - Profound planetary narrative bridging cosmic orbital telemetry with human survival
 * - Atmospheric de-condensation blur reveals
 * - Interactive temporal horizon scrubber (2026 Baseline -> 2035 Tipping -> 2050 Cascade)
 * - Understated scientific data ticker anchoring the urgency of the climate crisis
 */
export const EditorialTypography = forwardRef(
  (
    {
      initialHeroRef,
      narrative1Ref,
      narrative2Ref,
      finalFrameRef,
      onExploreClick,
      activeScenario = SCENARIOS[0],
      onScenarioChange,
    },
    ref
  ) => {
    return (
      <div className="hero-editorial-container" ref={ref}>
        {/* ================================================================
            INITIAL HERO VIEWPORT (ORBIT / CELESTIAL STAGE)
            Monumental, authoritative, urgent yet poetic planetary storytelling.
           ================================================================ */}
        <div className="initial-hero-column" ref={initialHeroRef}>
          {/* Scientific Epoch Kicker */}
          <div className="climate-kicker">
            <span className="kicker-line" />
            <span className="kicker-text">
              Planetary Observation · Anthropocene Epoch
            </span>
          </div>

          {/* Monumental Climate Headline */}
          <h1 className="climate-monumental-headline">
            <span className="headline-row row-intro">
              <span className="word-tag-lead">Intelligent</span>
            </span>
            <span className="headline-row row-prime">
              <span className="word-prime">Climate</span>{' '}
              <span className="word-prime">Change</span>
            </span>
            <span className="headline-row row-climax">
              <span className="word-climax">Forecasting.</span>
            </span>
          </h1>

          {/* Planetary Story Narrative */}
          <p className="climate-story-body">
            Reading the vital signs of a changing planet. We translate orbital telemetry
            and atmospheric physics into hyper-local predictive intelligence —
            before the point of irreversible consequence.
          </p>

          {/* Interactive Climate Temporal Horizon Scrubber */}
          <TemporalHorizonScrubber
            activeScenario={activeScenario}
            onScenarioChange={onScenarioChange}
          />

          {/* Quiet Planetary Vital Signs Ticker (Reacts dynamically to selected Scenario) */}
          <div className="climate-telemetry-ticker" aria-label="Current planetary indicators">
            <div className="ticker-item">
              <span className="ticker-label">CO₂ FLUX</span>
              <span className="ticker-val">{activeScenario.co2}</span>
            </div>
            <span className="ticker-sep">/</span>
            <div className="ticker-item">
              <span className="ticker-label">GLOBAL TEMP</span>
              <span
                className={`ticker-val ${activeScenario.tempAlert ? 'alert' : ''}`}
              >
                {activeScenario.temp}
              </span>
            </div>
            <span className="ticker-sep">/</span>
            <div className="ticker-item">
              <span className="ticker-label">MODEL STATE</span>
              <span className="ticker-val model-state">{activeScenario.status}</span>
            </div>
          </div>

          {/* Dynamic Insight Subtext */}
          <div className="scenario-dynamic-insight">
            <span className="insight-pulse-pip" />
            <span className="insight-text">{activeScenario.insight}</span>
          </div>

          {/* Primary Action Button (Claude Tactile Design) */}
          <div className="climate-action-group">
            <button
              type="button"
              className="climate-btn-monumental"
              onClick={onExploreClick}
              id="cta-explore-hero"
            >
              <span>Explore the forecast</span>
              <span className="btn-arrow-wrap">
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </span>
            </button>
            <span className="cta-descent-cue">Scroll to descend</span>
          </div>
        </div>

        {/* ================================================================
            CINEMATIC DESCENT NARRATIVE 1 (STRATOSPHERE & CLOUD DECK)
           ================================================================ */}
        <div className="scroll-narrative-overlay" ref={narrative1Ref}>
          <div className="descent-stage-tag">Phase I · Orbital Descent · 12,000 M</div>
          <h2 className="monumental-narrative-title">
            From planetary signals
            <br />
            <span className="italic-accent">& jet stream circulation…</span>
          </h2>
          <p className="narrative-annotation">
            Aerosol optical depth, thermal gradients, and continental wind shear.
          </p>
        </div>

        {/* ================================================================
            CINEMATIC DESCENT NARRATIVE 2 (FOREST CANOPY)
           ================================================================ */}
        <div className="scroll-narrative-overlay" ref={narrative2Ref}>
          <div className="descent-stage-tag">Phase II · Living Biosphere · 480 M</div>
          <h2 className="monumental-narrative-title">
            …to localized canopy shifts
            <br />
            <span className="italic-accent">& drought patterns.</span>
          </h2>
          <p className="narrative-annotation">
            Where continental climate models meet the respiration of living forest ecosystems.
          </p>
        </div>

        {/* ================================================================
            QUIET CINEMATIC FINAL FRAME (CABIN & HUMAN OBSERVER)
           ================================================================ */}
        <div className="final-frame-overlay" ref={finalFrameRef}>
          <div className="descent-stage-tag">Phase III · Human Scale · Surface Settlement</div>
          <h2 className="monumental-final-title">
            The climate has been speaking for millennia.
            <br />
            <span className="italic-accent">Now, we make it legible.</span>
          </h2>
          <p className="monumental-final-body">
            Bridging the vast distance between cosmic satellite telemetry and the solitary human
            sitting in the clearing. The future is not fate — it is forecast.
          </p>
          <div className="climate-action-group">
            <button
              type="button"
              className="climate-btn-monumental"
              onClick={onExploreClick}
              id="cta-explore-final"
            >
              <span>Enter the model</span>
              <span className="btn-arrow-wrap">
                <ArrowUpRight size={17} strokeWidth={2.4} />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

EditorialTypography.displayName = 'EditorialTypography';

export default EditorialTypography;
