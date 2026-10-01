import React, { forwardRef } from 'react';
import { PlanetaryObservationNodes } from './PlanetaryObservationNodes';

/**
 * VisualStage:
 * Full-bleed 16:9 cinematic environmental stages:
 * 1. Scene 1: Orbit / Deep Space & Earth
 * 2. Scene 2: High Atmosphere, Geometric Clouds & Soaring Raptors
 * 3. Scene 3: Lush Geometric Pine Forest Canopy & Mist
 * 4. Scene 4: Forest Clearing with Log Cabin & Human Observer
 *
 * Integrated Planetary Observation Lenses (generated via Nanobanana):
 * - Thermal Heat Flux & Jet Stream Vector Lens
 * - Cryosphere Albedo & Rossby Planetary Wave Lens
 * - Biosphere Transpiration & Canopy Respiration Lens
 *
 * Interactive Hotspots:
 * - Planetary Observation Nodes on Earth globe (Greenland, AMOC, Amazon, Sahel)
 */
export const VisualStage = forwardRef(
  (
    {
      sceneSpaceRef,
      sceneAtmosphereRef,
      sceneForestRef,
      sceneCabinRef,
      activeLens = 'natural',
      scrollProgress = 0,
      onInspectPlate,
    },
    ref
  ) => {
    return (
      <div className="hero-visual-stage" ref={ref} aria-hidden="true">
        {/* Scene 1: Orbit / Deep Space & Earth (16:9 Full Bleed) */}
        <div className="wide-scene-layer scene-space" ref={sceneSpaceRef}>
          <img
            src="/assets/wide/space_earth.webp"
            alt="Intelligent Climate Forecasting Orbit View"
            className="wide-scene-img"
            loading="eager"
            fetchPriority="high"
          />

          {/* Interactive Planetary Climate Observation Nodes on the Globe */}
          <PlanetaryObservationNodes
            scrollProgress={scrollProgress}
            onInspectPlate={onInspectPlate}
          />
        </div>

        {/* Scene 2: Atmosphere, Billowing Geometric Clouds & Soaring Raptors */}
        <div className="wide-scene-layer scene-atmosphere" ref={sceneAtmosphereRef}>
          <img
            src="/assets/wide/atmosphere_birds.webp"
            alt="Atmosphere and soaring raptors over mountain peaks"
            className="wide-scene-img"
            loading="lazy"
          />
        </div>

        {/* Scene 3: Lush Geometric Pine Forest Canopy */}
        <div className="wide-scene-layer scene-forest" ref={sceneForestRef}>
          <img
            src="/assets/wide/forest_canopy.webp"
            alt="Dense geometric evergreen forest canopy"
            className="wide-scene-img"
            loading="lazy"
          />
        </div>

        {/* Scene 4: Forest Clearing with Log Cabin, Firewood, Chimney & Seated Human */}
        <div className="wide-scene-layer scene-cabin" ref={sceneCabinRef}>
          <img
            src="/assets/wide/cabin_human.webp"
            alt="Forest clearing with log cabin and human observer"
            className="wide-scene-img"
            loading="lazy"
          />
        </div>

        {/* ------------------------------------------------------------------
            NANOBANANA SCIENTIFIC LENS OVERLAYS (PURE DISSOLVE, ZERO BLEED)
            ------------------------------------------------------------------ */}

        {/* Lens 1: Thermal Energy Flux & Jet Stream Vector Lens */}
        <div
          className="wide-scene-layer lens-overlay lens-thermal"
          style={{
            opacity: activeLens === 'thermal' ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/assets/wide/thermal_flux_lens.webp"
            alt="Thermal Heat Flux and Jet Stream Vector Lens"
            className="wide-scene-img thermal-lens-img"
            loading="lazy"
          />
        </div>

        {/* Lens 2: Cryosphere Polar Albedo & Rossby Planetary Wave Lens */}
        <div
          className="wide-scene-layer lens-overlay lens-cryosphere"
          style={{
            opacity: activeLens === 'cryosphere' ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/assets/wide/cryosphere_rossby_lens.webp"
            alt="Cryosphere Polar Ice Albedo and Rossby Wave Lens"
            className="wide-scene-img cryosphere-lens-img"
            loading="lazy"
          />
        </div>

        {/* Lens 3: Biosphere Transpiration & Moisture Canopy Lens */}
        <div
          className="wide-scene-layer lens-overlay lens-biosphere"
          style={{
            opacity: activeLens === 'biosphere' ? 1 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/assets/wide/biosphere_canopy_lens.webp"
            alt="Biosphere Transpiration and Canopy Respiration Lens"
            className="wide-scene-img"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
);

VisualStage.displayName = 'VisualStage';

export default VisualStage;
