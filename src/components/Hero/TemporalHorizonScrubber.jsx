import React from 'react';
import { Clock } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

export const SCENARIOS = [
  {
    year: '2026',
    title: 'Baseline Observation',
    co2: '421.8 PPM',
    temp: '+1.28°C',
    tempAlert: false,
    status: 'ACTIVE SENSING',
    insight: 'Reading the vital signs of an accelerating Anthropocene.',
    thermalGlowOpacity: 0.18,
  },
  {
    year: '2035',
    title: '1.5°C Tipping Threshold',
    co2: '454.0 PPM',
    temp: '+1.52°C',
    tempAlert: true,
    status: 'THRESHOLD RISK',
    insight: 'Arctic summer sea ice loss triggers cascading albedo decline.',
    thermalGlowOpacity: 0.35,
  },
  {
    year: '2050',
    title: '2.0°C Overshoot Cascade',
    co2: '512.4 PPM',
    temp: '+2.18°C',
    tempAlert: true,
    status: 'SYSTEM CASCADE',
    insight: 'Simultaneous Amazon dieback and AMOC slowdown destabilize continents.',
    thermalGlowOpacity: 0.55,
  },
];

export const TemporalHorizonScrubber = ({
  activeScenario = SCENARIOS[0],
  onScenarioChange,
}) => {
  const handleSelect = (scenario) => {
    ambientSound.playClick();
    if (onScenarioChange) {
      onScenarioChange(scenario);
    }
  };

  return (
    <div
      className="temporal-scrubber-container"
      aria-label="Climate Temporal Scenario Projections"
    >
      <div className="scrubber-header">
        <span className="scrubber-lead-icon">
          <Clock size={11} strokeWidth={2.2} />
        </span>
        <span className="scrubber-lead-text">SCENARIO HORIZON:</span>
      </div>

      <div className="scrubber-options-rail" role="radiogroup">
        {SCENARIOS.map((sc) => {
          const isSelected = activeScenario.year === sc.year;

          return (
            <button
              key={sc.year}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`scenario-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(sc)}
              title={`${sc.year}: ${sc.title}`}
            >
              <span className="scenario-year">{sc.year}</span>
              <span className="scenario-temp">{sc.temp}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemporalHorizonScrubber;
