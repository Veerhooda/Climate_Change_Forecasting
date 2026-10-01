import React from 'react';
import { ambientSound } from '../../utils/ambientAudio';

const MILESTONES = [
  { stage: 0, label: 'Orbit', altText: '400 KM', progress: 0 },
  { stage: 1, label: 'Stratosphere', altText: '12,000 M', progress: 0.38 },
  { stage: 2, label: 'Canopy', altText: '480 M', progress: 0.68 },
  { stage: 3, label: 'Surface', altText: '2 M', progress: 0.96 },
];

export const EditorialAltimeter = ({ scrollProgress = 0, onSelectStage }) => {
  // Calculate dynamic altitude display string
  const formatAltitude = () => {
    if (scrollProgress < 0.25) {
      const km = Math.round(400 - scrollProgress * (350 / 0.25));
      return `${km} KM`;
    }
    if (scrollProgress < 0.55) {
      const m = Math.round(50000 - ((scrollProgress - 0.25) / 0.3) * 38000);
      return `${m.toLocaleString()} M`;
    }
    if (scrollProgress < 0.8) {
      const m = Math.round(12000 - ((scrollProgress - 0.55) / 0.25) * 11520);
      return `${m.toLocaleString()} M`;
    }
    const m = Math.round(480 - ((scrollProgress - 0.8) / 0.2) * 478);
    return `${Math.max(2, m)} M`;
  };

  const handleMilestoneClick = (milestone) => {
    ambientSound.playSwoosh();
    if (onSelectStage) {
      onSelectStage(milestone.stage);
    }
  };

  // Determine current active milestone
  const getActiveIndex = () => {
    if (scrollProgress < 0.28) return 0;
    if (scrollProgress < 0.58) return 1;
    if (scrollProgress < 0.82) return 2;
    return 3;
  };

  const activeIdx = getActiveIndex();

  return (
    <aside
      className="editorial-altimeter-runway"
      aria-label="Atmospheric Descent Altimeter Navigation"
    >
      <div className="altimeter-telemetry-header">
        <span className="altimeter-axis-tag">ALTITUDE</span>
        <span className="altimeter-live-val" aria-live="polite">
          {formatAltitude()}
        </span>
      </div>

      <div className="altimeter-track-rail">
        <div
          className="altimeter-runner-pip"
          style={{ top: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />

        {MILESTONES.map((item, idx) => {
          const isActive = activeIdx === idx;
          const isPassed = scrollProgress >= item.progress;

          return (
            <button
              key={item.stage}
              type="button"
              className={`altimeter-node ${isActive ? 'current' : ''} ${isPassed ? 'passed' : ''}`}
              style={{ top: `${item.progress * 100}%` }}
              onClick={() => handleMilestoneClick(item)}
              title={`Glide to ${item.label} (${item.altText})`}
              aria-label={`Jump to ${item.label}, ${item.altText}`}
            >
              <span className="altimeter-node-dot" />
              <span className="altimeter-node-details">
                <span className="node-alt">{item.altText}</span>
                <span className="node-label">{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default EditorialAltimeter;
