/**
 * Sacred Temple Sound Engine
 * Synthesizes a peaceful, meditative temple soundscape using Web Audio API:
 * - Meditative C# Tanpura drone with sacred overtones (Sa - Pa)
 * - Pure resonant temple bell chimes (Ghanta) with authentic metallic decay
 * - Warm ambient sanctum resonance
 * Completely self-contained, no external audio assets needed.
 */

class TempleSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.masterGain = null;
    this.droneGain = null;
    this.bellTimer = null;
    this.listeners = new Set();
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm low-pass filter simulating the stone sanctuary acoustic resonance
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.8, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    this.setupDrone();
  }

  setupDrone() {
    if (!this.ctx) return;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    this.droneGain.connect(this.filter);

    // Traditional C# drone (approx 138.6 Hz Sa, 207.65 Hz Pa)
    const frequencies = [69.3, 138.59, 207.65, 277.18, 415.3];
    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow frequency vibrato / pulsation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.04, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.6 + idx * 0.2, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const amp = [0.35, 0.25, 0.2, 0.12, 0.08][idx] || 0.1;
      oscGain.gain.setValueAtTime(amp, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.droneGain);
      osc.start();
    });
  }

  // Ring an authentic Dravidian bronze temple bell
  ringBell(frequency = 880, intensity = 0.5) {
    if (!this.ctx || !this.isPlaying || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Bell harmonic partials: fundamental, minor third, fifth, octave, super-octave
    const partials = [
      { mult: 1.0, gain: 0.6, decay: 5.5 },
      { mult: 1.19, gain: 0.35, decay: 4.8 },
      { mult: 1.51, gain: 0.3, decay: 4.0 },
      { mult: 2.0, gain: 0.45, decay: 3.2 },
      { mult: 2.76, gain: 0.25, decay: 2.5 },
      { mult: 4.07, gain: 0.15, decay: 1.8 }
    ];

    const bellBus = this.ctx.createGain();
    bellBus.gain.setValueAtTime(intensity * 0.45, now);
    bellBus.connect(this.masterGain);

    partials.forEach((p) => {
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * p.mult, now);

      pGain.gain.setValueAtTime(0.001, now);
      pGain.gain.exponentialRampToValueAtTime(p.gain, now + 0.012);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(pGain);
      pGain.connect(bellBus);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }

  startPeriodicBells() {
    this.stopPeriodicBells();
    const scheduleNext = () => {
      if (!this.isPlaying || this.isMuted) return;
      // Ring distant bell with subtle variation every 9 to 18 seconds
      const delay = (9 + Math.random() * 9) * 1000;
      this.bellTimer = setTimeout(() => {
        const bellPitches = [660, 740, 880, 990, 1100];
        const pitch = bellPitches[Math.floor(Math.random() * bellPitches.length)];
        this.ringBell(pitch, 0.45 + Math.random() * 0.3);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
  }

  stopPeriodicBells() {
    if (this.bellTimer) {
      clearTimeout(this.bellTimer);
      this.bellTimer = null;
    }
  }

  async toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isMuted) {
      this.isMuted = false;
      this.isPlaying = true;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.65, now + 1.2);
      this.startPeriodicBells();
      // Chime on start
      this.ringBell(880, 0.6);
    } else {
      this.isMuted = true;
      this.isPlaying = false;
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      this.stopPeriodicBells();
    }

    this.notify();
    return !this.isMuted;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({ isPlaying: this.isPlaying, isMuted: this.isMuted });
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = { isPlaying: this.isPlaying, isMuted: this.isMuted };
    this.listeners.forEach((cb) => cb(state));
  }
}

export const soundEngine = new TempleSoundEngine();

