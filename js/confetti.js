/**
 * Lightweight Zero-Dependency Canvas Confetti Engine
 * Perfect for celebration triggers when the countdown hits zero
 */

class FestivalConfetti {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.id = "confetti-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100vw";
    this.canvas.style.height = "100vh";
    this.canvas.style.pointerEvents = "none";
    this.canvas.style.zIndex = "9999";
    document.body.appendChild(this.canvas);

    this.particles = [];
    this.animationFrame = null;
    this.colors = ["#00f2fe", "#ff007f", "#9d4edd", "#ffd166", "#06d6a0", "#ffffff"];

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  fire(options = {}) {
    const count = options.particleCount || 100;
    const originX = options.x !== undefined ? options.x : 0.5;
    const originY = options.y !== undefined ? options.y : 0.6;
    const spread = options.spread || 70;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 180) * (-90 + (Math.random() - 0.5) * spread);
      const velocity = 8 + Math.random() * 12;

      this.particles.push({
        x: originX * this.width,
        y: originY * this.height,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 6 + Math.random() * 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        drag: 0.96 + Math.random() * 0.02,
        gravity: 0.35 + Math.random() * 0.15,
        tiltAngle: Math.random() * Math.PI,
        tiltSpeed: 0.1 + Math.random() * 0.1
      });
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  burstFestivalCelebration() {
    // Cannon sequence from bottom corners and center
    this.fire({ x: 0.2, y: 0.8, particleCount: 60, spread: 60 });
    this.fire({ x: 0.8, y: 0.8, particleCount: 60, spread: 60 });

    setTimeout(() => {
      this.fire({ x: 0.5, y: 0.5, particleCount: 120, spread: 100 });
    }, 300);

    setTimeout(() => {
      this.fire({ x: 0.1, y: 0.7, particleCount: 80, spread: 80 });
      this.fire({ x: 0.9, y: 0.7, particleCount: 80, spread: 80 });
    }, 700);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;

      p.rotation += p.rotationSpeed;
      p.tiltAngle += p.tiltSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      const scaleX = Math.sin(p.tiltAngle);
      this.ctx.scale(scaleX, 1);

      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    } else {
      this.animationFrame = null;
    }
  }
}

window.confettiEngine = null;
document.addEventListener("DOMContentLoaded", () => {
  window.confettiEngine = new FestivalConfetti();
});

