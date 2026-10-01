import React, { useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';

const HOTSPOTS = [
  {
    id: 'greenland',
    top: '32%',
    left: '61%',
    label: '01',
    cardDirection: 'card-down',
    region: 'Greenland Ice Sheet',
    metric: 'Cryosphere Albedo',
    val: '-280 Gt/yr',
    anomaly: '-35% Reflectivity',
    status: 'Destabilizing',
    severity: 'critical',
    detail:
      'Melt pond networks create dark ice feedback loops, reducing regional albedo and accelerating North Atlantic freshwater input.',
  },
  {
    id: 'amoc',
    top: '47%',
    left: '54%',
    label: '02',
    cardDirection: 'card-left',
    region: 'Atlantic Conveyor',
    metric: 'AMOC Circulation',
    val: '-14.2%',
    anomaly: 'Velocity Slowdown',
    status: 'Tipping Risk',
    severity: 'critical',
    detail:
      'Thermohaline overturning is at its weakest state in over 1,000 years, destabilizing European weather patterns and Sahel monsoons.',
  },
  {
    id: 'amazon',
    top: '70%',
    left: '64%',
    label: '03',
    cardDirection: 'card-up',
    region: 'Amazon Basin',
    metric: 'Canopy Transpiration',
    val: '-38% Vapor',
    anomaly: 'Moisture Deficit',
    status: 'Transition Alert',
    severity: 'warning',
    detail:
      'Drying trends and extended dry seasons risk transitioning 17% of moist evergreen rainforest into seasonal degraded savanna.',
  },
  {
    id: 'sahel',
    top: '51%',
    left: '79%',
    label: '04',
    cardDirection: 'card-left',
    region: 'North African Cell',
    metric: 'Land Surface Temp',
    val: '+2.4°C',
    anomaly: 'Sub-Tropical Expansion',
    status: 'Persistent Drought',
    severity: 'warning',
    detail:
      'Hadley circulation cell expansion shifts rain belts poleward, intensifying heat anomalies across the Mediterranean and Sahel.',
  },
];

export const PlanetaryObservationNodes = ({
  scrollProgress = 0,
  onInspectPlate,
}) => {
  const [activeNode, setActiveNode] = useState(null);

  // Fade out completely as we descend into atmosphere
  const opacity = Math.max(0, 1 - scrollProgress * 3.8);
  if (opacity <= 0.01) return null;

  const handleMouseEnter = (node) => {
    setActiveNode(node);
    ambientSound.playPing(node.severity === 'critical' ? 980 : 840);
  };

  const handleMouseLeave = () => {
    setActiveNode(null);
  };

  return (
    <div
      className="planetary-nodes-container"
      style={{
        opacity,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
      aria-label="Interactive Planetary Climate Observation Nodes"
    >
      {HOTSPOTS.map((node) => {
        const isSelected = activeNode?.id === node.id;

        return (
          <div
            key={node.id}
            className={`planetary-hotspot ${isSelected ? 'active' : ''} ${node.severity}`}
            style={{ top: node.top, left: node.left }}
            onMouseEnter={() => handleMouseEnter(node)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleMouseEnter(node)}
            onBlur={handleMouseLeave}
            tabIndex={0}
            role="button"
            aria-label={`${node.region}: ${node.metric} ${node.val}`}
          >
            {/* Pulsing Beacon Ring */}
            <span className="hotspot-pulse" />
            <span className="hotspot-core">
              <span className="hotspot-index">{node.label}</span>
            </span>

            {/* Micro Coordinates Callout */}
            <span className="hotspot-label-minimal">{node.region}</span>

            {/* Hover Telemetry Card */}
            {isSelected && (
              <div
                className={`hotspot-card ${node.cardDirection || 'card-up'}`}
                role="tooltip"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="card-header">
                  <div className="card-kicker">
                    {node.severity === 'critical' ? (
                      <ShieldAlert size={12} className="alert-icon" />
                    ) : (
                      <AlertTriangle size={12} className="warning-icon" />
                    )}
                    <span>{node.status}</span>
                  </div>
                  <span className="card-region-tag">{node.region}</span>
                </div>

                <div className="card-metric-row">
                  <div className="card-val">{node.val}</div>
                  <div className="card-metric-label">
                    <span>{node.metric}</span>
                    <span className="card-anomaly">{node.anomaly}</span>
                  </div>
                </div>

                <p className="card-body">{node.detail}</p>

                {onInspectPlate && (
                  <button
                    type="button"
                    className="card-inspect-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      ambientSound.playClick();
                      onInspectPlate();
                    }}
                  >
                    <span>Inspect Scientific Plate</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanetaryObservationNodes;
