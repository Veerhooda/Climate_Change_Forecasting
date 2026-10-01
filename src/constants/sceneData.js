/**
 * Centralized configuration for the Climate Journey Hero experience.
 * All animations, telemetry markers, editorial statements, and color stops
 * are managed here for clear tuning and maintenance.
 */

export const SCENE_CONFIG = {
  // Total scroll track height in vh units (350vh - 500vh recommended range)
  scrollDistanceVh: 420,

  // Image aspect ratio: 290w / 1024h = ~0.2832
  aspectRatio: 290 / 1024,

  // Original image pixel coordinates for vertical landmarks (0 to 1024)
  landmarks: {
    spaceTop: 0,
    earthCenter: 240,
    atmosphereStart: 380,
    cloudDeck: 480,
    birds: 540,
    canopyStart: 660,
    forestDense: 780,
    cabinStart: 890,
    humanForeground: 960,
    bottom: 1024,
  },

  // Narrative beats matching vertical descent
  stages: [
    {
      id: 'orbit',
      label: 'ORBIT',
      sublabel: 'EXOSPHERE',
      altRange: '840 KM',
      progressRange: [0.0, 0.22],
      telemetry: {
        sensor: 'MULTI-SPECTRAL IR',
        resolution: '1.2 KM / PX',
        pressure: '0.00 HPA',
      },
    },
    {
      id: 'atmosphere',
      label: 'MESO / STRATO',
      sublabel: 'BOUNDARY',
      altRange: '36,000 M',
      progressRange: [0.22, 0.46],
      narrative: 'From planetary signals...',
      telemetry: {
        sensor: 'AEROSOL OPTICAL FLUX',
        resolution: '250 M / PX',
        pressure: '12.4 HPA',
      },
    },
    {
      id: 'troposphere',
      label: 'TROPOSPHERE',
      sublabel: 'CLOUD FORMATION',
      altRange: '2,600 M',
      progressRange: [0.46, 0.70],
      narrative: '...to local consequences.',
      telemetry: {
        sensor: 'THERMAL WIND GRADIENT',
        resolution: '50 M / PX',
        pressure: '740 HPA',
      },
    },
    {
      id: 'canopy',
      label: 'CANOPY',
      sublabel: 'BIOSPHERE',
      altRange: '480 M',
      progressRange: [0.70, 0.88],
      narrative: 'Forecast what comes next.',
      telemetry: {
        sensor: 'BIOMASS TRANSPIRATION',
        resolution: '5 M / PX',
        pressure: '960 HPA',
      },
    },
    {
      id: 'ground',
      label: 'GROUND',
      sublabel: 'HUMAN INTERFACE',
      altRange: '120 M',
      progressRange: [0.88, 1.0],
      narrative: 'Ground-truth verified.',
      telemetry: {
        sensor: 'MICROCLIMATE SENSOR 01',
        resolution: 'SUB-METER',
        pressure: '1013.2 HPA',
      },
    },
  ],

  // Background ambient color stops across the descent
  // Matched from the artwork's authentic palette
  ambientGradients: {
    orbit: {
      bg: '#080a0d',
      glow: 'rgba(69, 148, 141, 0.16)', // subtle earth teal
      haze: 'rgba(25, 34, 44, 0.4)',
    },
    atmosphere: {
      bg: '#0e171e',
      glow: 'rgba(75, 163, 157, 0.22)',
      haze: 'rgba(227, 249, 252, 0.12)',
    },
    troposphere: {
      bg: '#142127',
      glow: 'rgba(210, 238, 244, 0.28)', // misty cloud glow
      haze: 'rgba(227, 249, 252, 0.35)',
    },
    canopy: {
      bg: '#0c1a14',
      glow: 'rgba(38, 84, 58, 0.25)', // deep pine aura
      haze: 'rgba(94, 114, 118, 0.18)',
    },
    ground: {
      bg: '#13110e',
      glow: 'rgba(172, 97, 44, 0.22)', // warm earthen cabin ochre
      haze: 'rgba(58, 56, 13, 0.15)',
    },
  },
};
