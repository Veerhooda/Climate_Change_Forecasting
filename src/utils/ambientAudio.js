/**
 * ambientAudio.js:
 * Procedural Web Audio API soundscape generator.
 * Creates an organic, multi-sensory environmental audio experience
 * that shifts dynamically with scroll depth:
 * - Orbit: Ethereal celestial drone & harmonic resonances
 * - Atmosphere: High-altitude wind whistle & air currents
 * - Forest Canopy: Soft breeze & organic acoustic rustle
 * - Cabin: Warm hearth resonance & quiet embers
 *
 * 100% synthesized in-browser with zero external audio assets.
 */

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.orbitGain = null;
    this.windGain = null;
    this.forestGain = null;
    this.cabinGain = null;
    this.noiseNode = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. Orbit Layer: Celestial Drone (Low warm harmonic sines)
    this.orbitGain = this.ctx.createGain();
    this.orbitGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    this.orbitGain.connect(this.masterGain);

    const orbitFreqs = [55, 110, 164.81, 220]; // D1, D2, E3, D3
    orbitFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      // Subtle LFO modulation for breathing celestial feeling
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.8, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      if (panner) {
        panner.pan.setValueAtTime((idx % 2 === 0 ? -1 : 1) * 0.35, this.ctx.currentTime);
        osc.connect(filter);
        filter.connect(panner);
        panner.connect(this.orbitGain);
      } else {
        osc.connect(filter);
        filter.connect(this.orbitGain);
      }

      osc.start();
    });

    // 2. Wind Layer: High-altitude atmospheric currents (Filtered noise)
    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    this.windGain.connect(this.masterGain);

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(520, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Wind modulation
    const windLFO = this.ctx.createOscillator();
    const windLFOGain = this.ctx.createGain();
    windLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    windLFOGain.gain.setValueAtTime(180, this.ctx.currentTime);
    windLFO.connect(windLFOGain);
    windLFOGain.connect(windFilter.frequency);
    windLFO.start();

    whiteNoise.connect(windFilter);
    windFilter.connect(this.windGain);
    whiteNoise.start();

    // 3. Forest & Cabin Layers
    this.forestGain = this.ctx.createGain();
    this.forestGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.forestGain.connect(this.masterGain);

    this.cabinGain = this.ctx.createGain();
    this.cabinGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.cabinGain.connect(this.masterGain);

    this.isInitialized = true;
  }

  /**
   * Delicate crystalline sine ping with rapid exponential decay
   * Used for hovering planetary telemetry nodes and hotspots
   */
  playPing(freq = 920) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.12);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Soft tactile click for toggling scientific lenses and time horizons
   */
  playClick() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Low frequency gentle swoosh when transitioning altitudes
   */
  playSwoosh() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.48);
  }

  toggle() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      const targetGain = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, now, 0.15);
    }
    return !this.isMuted;
  }

  updateScrollDepth(progress) {
    if (!this.isInitialized || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Cross-fade acoustic layers dynamically based on scroll depth
    if (progress < 0.28) {
      // Orbit dominant
      this.orbitGain.gain.setTargetAtTime(0.24, now, 0.3);
      this.windGain.gain.setTargetAtTime(0.02, now, 0.3);
      this.forestGain.gain.setTargetAtTime(0.0, now, 0.3);
      this.cabinGain.gain.setTargetAtTime(0.0, now, 0.3);
    } else if (progress < 0.58) {
      // Stratosphere wind dominant
      this.orbitGain.gain.setTargetAtTime(0.06, now, 0.3);
      this.windGain.gain.setTargetAtTime(0.26, now, 0.3);
      this.forestGain.gain.setTargetAtTime(0.04, now, 0.3);
      this.cabinGain.gain.setTargetAtTime(0.0, now, 0.3);
    } else if (progress < 0.82) {
      // Forest canopy
      this.orbitGain.gain.setTargetAtTime(0.02, now, 0.3);
      this.windGain.gain.setTargetAtTime(0.12, now, 0.3);
      this.forestGain.gain.setTargetAtTime(0.22, now, 0.3);
      this.cabinGain.gain.setTargetAtTime(0.03, now, 0.3);
    } else {
      // Quiet ground clearing
      this.orbitGain.gain.setTargetAtTime(0.01, now, 0.3);
      this.windGain.gain.setTargetAtTime(0.05, now, 0.3);
      this.forestGain.gain.setTargetAtTime(0.12, now, 0.3);
      this.cabinGain.gain.setTargetAtTime(0.20, now, 0.3);
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
export default ambientSound;
