import React, { useRef } from 'react';
import { ThreeGeometricWorld } from '../ThreeCanvas/ThreeGeometricWorld';
import { CosmicField } from './CosmicField';
import { GeometricStoryTypography } from './GeometricStoryTypography';
import { CleanGeometricMasthead } from './CleanGeometricMasthead';
import { useHeroScrollTimeline } from '../../hooks/useHeroScrollTimeline';
import '../../styles/geometric-hero.css';

/**
 * Hero:
 * Award-winning, pure Three.js 3D WebGL opening experience for:
 * "Intelligent Climate Change Forecasting"
 *
 * Core Principles:
 * - 100% Three.js procedural WebGL low-poly geometry & pixel aesthetics
 * - Full-screen edge-to-edge canvas: mouse tilt rotates the 3D camera with zero border cutoffs
 * - Strictly important storytelling copy (stripped of all generic AI widgets, tickers, lenses)
 * - Space Grotesk / Syne geometric architectural typography
 * - Smooth scroll-driven camera dive through 4 acts:
 *   Act 1: Planetary Orbit & Low-Poly Earth
 *   Act 2: Stratosphere, Clouds & Soaring Raptors
 *   Act 3: Living Pine Forest Canopy
 *   Act 4: Surface Clearing, Cabin Hearth & Human Observer
 */
export const Hero = ({ onInitiateObservation }) => {
  const trackContainerRef = useRef(null);
  const viewportRef = useRef(null);

  // Typography act refs
  const initialHeroRef = useRef(null);
  const narrative1Ref = useRef(null);
  const narrative2Ref = useRef(null);
  const finalFrameRef = useRef(null);

  const { scrollProgress, scrollToStage } = useHeroScrollTimeline({
    trackContainerRef,
    viewportRef,
    initialHeroRef,
    narrative1Ref,
    narrative2Ref,
    finalFrameRef,
  });

  const handleExploreClick = () => {
    scrollToStage(3); // Glide smoothly down to final ground act
  };

  return (
    <section
      id="hero"
      className="geometric-hero-track"
      ref={trackContainerRef}
      aria-label="Intelligent Climate Change Forecasting Opening Experience"
    >
      <div className="geometric-pinned-viewport" ref={viewportRef}>
        {/* Layer 1: Three.js 3D WebGL Low-Poly Geometric World */}
        <ThreeGeometricWorld scrollProgress={scrollProgress} />

        {/* Layer 2: Subtle Deep Space Ambient Stardust */}
        <CosmicField opacity={scrollProgress < 0.35 ? 0.6 : 0.15} />

        {/* Layer 3: Minimal Pure Geometric Storytelling Typography */}
        <GeometricStoryTypography
          initialHeroRef={initialHeroRef}
          narrative1Ref={narrative1Ref}
          narrative2Ref={narrative2Ref}
          finalFrameRef={finalFrameRef}
          onExploreClick={handleExploreClick}
          onInitiateObservation={onInitiateObservation}
        />

        {/* Layer 4: Minimal Clean Masthead & Altitude Tracker */}
        <CleanGeometricMasthead scrollProgress={scrollProgress} />
      </div>
    </section>
  );
};

export default Hero;
