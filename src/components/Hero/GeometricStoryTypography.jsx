import React, { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * GeometricStoryTypography:
 * Pure, restrained, monumental storytelling typography.
 * Completely stripped of generic "AI" capsules, dials, and tickers.
 *
 * Typography System:
 * - Headlines: Space Grotesk & Syne (High-impact geometric architectural letterforms)
 * - Metadata & Tags: JetBrains Mono / Silkscreen (Tactile pixel precision)
 * - Narrative: Clean geometric body text
 */
export const GeometricStoryTypography = forwardRef(
  (
    {
      initialHeroRef,
      narrative1Ref,
      narrative2Ref,
      finalFrameRef,
      onExploreClick,
      onInitiateObservation,
    },
    ref
  ) => {
    return (
      <div className="geometric-story-container" ref={ref}>
        {/* ================================================================
            ACT I: ORBIT / SPACE (Initial Viewport)
           ================================================================ */}
        <div className="story-act-frame act-orbit" ref={initialHeroRef}>
          <h1 className="geometric-monumental-headline">
            <span className="headline-line intro-line">Intelligent</span>
            <span className="headline-line main-line">Climate Change</span>
            <span className="headline-line climax-line">Forecasting.</span>
          </h1>

          <p className="geometric-story-sentence">
            A computational model translating orbital physics and planetary telemetry
            into foresight — before the point of irreversible consequence.
          </p>

          <div className="act-action-row">
            <button
              type="button"
              className="geometric-cta-btn"
              onClick={onExploreClick}
              id="cta-enter-model"
            >
              <span>Explore the model</span>
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </button>
            <span className="geometric-scroll-cue">↓ Scroll to descend</span>
          </div>
        </div>

        {/* ================================================================
            ACT II: STRATOSPHERE & SOARING RAPTORS
           ================================================================ */}
        <div className="story-act-frame act-narrative" ref={narrative1Ref}>
          <h2 className="geometric-narrative-title">
            The Geometry of
            <br />
            Wind & Vapor.
          </h2>

          <p className="geometric-narrative-sentence">
            Tracing planetary circulation cells and thermal shears across the high atmosphere
            before storms form.
          </p>
        </div>

        {/* ================================================================
            ACT III: EVERGREEN FOREST CANOPY
           ================================================================ */}
        <div className="story-act-frame act-narrative" ref={narrative2Ref}>
          <h2 className="geometric-narrative-title">
            The Respiration of
            <br />
            Living Forests.
          </h2>

          <p className="geometric-narrative-sentence">
            Where continental climate dynamics meet canopy moisture exchange and localized
            drought thresholds.
          </p>
        </div>

        {/* ================================================================
            ACT IV: HUMAN GROUND & CABIN HEARTH
           ================================================================ */}
        <div className="story-act-frame act-final" ref={finalFrameRef}>
          <h2 className="geometric-final-title">
            From Cosmic Orbit
            <br />
            To The Human Threshold.
          </h2>

          <p className="geometric-final-sentence">
            The future of our planet is not an abstraction.
            It is decoded at human scale.
          </p>

          <div className="act-action-row">
            <button
              type="button"
              className="geometric-cta-btn"
              onClick={onInitiateObservation || onExploreClick}
              id="cta-initiate-forecast"
            >
              <span>Initiate observation</span>
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

GeometricStoryTypography.displayName = 'GeometricStoryTypography';

export default GeometricStoryTypography;
