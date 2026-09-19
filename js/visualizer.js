/**
 * The Rhythm 2026 - Canvas Visualizer & Ambient Synth Engine
 * Creates flowing warm acoustic soundwaves, golden ember particles, and Web Audio beat pulse.
 */

class RhythmVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.particles = [];
    this.particleCount = 45;
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.wavePhase = 0;
    this.audioPulse = 0;
    this.isPlayingBeat = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Spawn initial golden dust particles
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }

    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle() {
    // Warm golden, amber, and champagne sparks matching poster palette
    const colors = ["#fbe2a7", "#d4af37", "#e59866", "#f5e6c8", "#ffffff"];
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6 - 0.2, // gentle upward ember drift
      baseRadius: Math.random() * 2 + 0.8
    };
  }

  drawWaves() {
    const ctx = this.ctx;
    const waveCount = 3;
    const colors = [
      "rgba(212, 175, 55, 0.08)",
      "rgba(245, 230, 200, 0.06)",
      "rgba(229, 152, 102, 0.07)"
    ];

    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      const frequency = 0.0025 + w * 0.001;
      const amplitude = 30 + w * 18 + this.audioPulse * 35;
      const baselineY = this.height * 0.82 + w * 25;

      ctx.moveTo(0, this.height);
      for (let x = 0; x <= this.width; x += 15) {
        const y = Math.sin(x * frequency + this.wavePhase + w * 1.5) * amplitude + baselineY;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(this.width, this.height);
      ctx.closePath();

      ctx.fillStyle = colors[w];
      ctx.fill();
    }
  }

  drawParticles() {
    const ctx = this.ctx;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse gentle dispersion
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x -= (dx / dist) * force * 2.5;
        p.y -= (dy / dist) * force * 2.5;
      }

      // Draw particle
      ctx.beginPath();
      const currentRadius = p.baseRadius + this.audioPulse * 1.8;
      ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect nearby particles with delicate warm lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (pDist < 85) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.12 * (1 - pDist / 85)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.wavePhase += 0.015;
    this.audioPulse *= 0.92;

    this.drawWaves();
    this.drawParticles();

    requestAnimationFrame(() => this.animate());
  }

  triggerPulse(strength = 1) {
    this.audioPulse = Math.min(this.audioPulse + strength, 1.4);
  }
}

/**
 * Native Web Audio Synthesizer for Festival Beats
 * Synthesizes warm acoustic kick and musical chord chime.
 */
class RhythmAudioEngine {
  constructor(visualizer) {
    this.visualizer = visualizer;
    this.audioCtx = null;
    this.intervalId = null;
    this.isPlaying = false;
    this.bpm = 114;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  playKick() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.32);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.33);

    if (this.visualizer) {
      this.visualizer.triggerPulse(0.65);
    }
  }

  playSynthChime() {
    if (!this.audioCtx) return;
    // Warm pentatonic harmony notes
    const notes = [220.0, 277.18, 329.63, 440.0, 554.37];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    const now = this.audioCtx.currentTime;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.71);
  }

  toggle() {
    this.initContext();

    if (this.isPlaying) {
      clearInterval(this.intervalId);
      this.isPlaying = false;
      return false;
    } else {
      this.isPlaying = true;
      const intervalMs = (60 / this.bpm) * 1000;
      let beatCounter = 0;

      this.playKick();

      this.intervalId = setInterval(() => {
        this.playKick();
        beatCounter++;
        if (beatCounter % 2 === 0) {
          this.playSynthChime();
        }
      }, intervalMs);

      return true;
    }
  }
}

window.RhythmVisualizer = RhythmVisualizer;
window.RhythmAudioEngine = RhythmAudioEngine;
