import React, { forwardRef } from 'react';

/**
 * AtmosphericLayers: Creates visual depth around the central illustration
 * through organic ambient lighting, subtle cloud mist drift, and cinematic grain.
 */
export const AtmosphericLayers = forwardRef(
  (
    {
      coronaRef,
      mistRef,
      sporesRef,
      smokeRef,
    },
    ref
  ) => {
    return (
      <div className="hero-atmospheric-system" ref={ref}>
        {/* Subtle radial glow centered behind Earth in Stage 1 */}
        <div className="earth-corona-glow" ref={coronaRef} aria-hidden="true" />

        {/* Floating atmospheric mist across cloud & bird deck in Stage 3 */}
        <div className="atmospheric-mist-container" ref={mistRef} aria-hidden="true">
          <div className="mist-cloud mist-cloud-1" />
          <div className="mist-cloud mist-cloud-2" />
        </div>

        {/* Forest canopy ambient light & motes */}
        <div className="canopy-spores-container" ref={sporesRef} aria-hidden="true" />

        {/* Subtle chimney smoke waft accent above cabin */}
        <div className="chimney-smoke-accent" ref={smokeRef} aria-hidden="true" />

        {/* Cinematic edge vignette */}
        <div className="hero-vignette-overlay" aria-hidden="true" />

        {/* Subtle documentary film grain */}
        <div className="hero-film-grain" aria-hidden="true" />
      </div>
    );
  }
);

AtmosphericLayers.displayName = 'AtmosphericLayers';

export default AtmosphericLayers;
