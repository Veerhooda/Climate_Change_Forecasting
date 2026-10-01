import React, { useState } from 'react';
import { ambientSound } from '../../utils/ambientAudio';

/**
 * CleanGeometricMasthead:
 * Minimalist, restrained editorial masthead following the geometric & pixel design language.
 * No generic AI badges or distracting controls.
 */
export const CleanGeometricMasthead = ({ scrollProgress = 0 }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const getAltitudeLabel = () => {
    if (scrollProgress < 0.28) return 'ORBIT · 400 KM';
    if (scrollProgress < 0.58) return 'STRATOSPHERE · 12,000 M';
    if (scrollProgress < 0.82) return 'CANOPY · 480 M';
    return 'SURFACE · 0 M';
  };

  return (
    <header className="clean-geometric-masthead" role="banner">
      <div className="masthead-brand">
        <span className="brand-pixel-pip" />
        <span className="brand-word">TERRA</span>
      </div>

      <div className="masthead-right">
        <div className="masthead-altitude" aria-live="polite">
          <span className="altitude-text">{getAltitudeLabel()}</span>
        </div>

        <button
          type="button"
          className={`geometric-sound-toggle ${isPlayingAudio ? 'active' : ''}`}
          onClick={toggleSound}
          aria-label={isPlayingAudio ? 'Mute environmental audio' : 'Enable environmental audio'}
          title={isPlayingAudio ? 'Mute audio' : 'Enable atmospheric soundscape'}
        >
          <div className="sound-pixel-bars" aria-hidden="true">
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
            <span className={`bar ${isPlayingAudio ? 'animating' : ''}`} />
          </div>
          <span className="sound-status-label">
            {isPlayingAudio ? 'SOUND ON' : 'SOUND OFF'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default CleanGeometricMasthead;
