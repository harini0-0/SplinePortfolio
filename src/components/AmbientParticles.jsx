import { useEffect, useRef } from 'react';

/* Subtle ambient teal particles — slow upward drift, occasional soft pulse.
   Drop this inside any `position: relative` section. */

const TEAL = [79, 155, 147];
const COUNT = 32;

class Particle {
  constructor(w, h, init = false) {
    this.w = w;
    this.h = h;
    this.reset(init);
  }

  reset(init = false) {
    this.x  = Math.random() * this.w;
    this.y  = init ? Math.random() * this.h : this.h + 10;
    this.r  = 1.2 + Math.random() * 2.8;          // radius 1.2–4px
    this.vy = 0.12 + Math.random() * 0.22;         // upward speed
    this.vx = (Math.random() - 0.5) * 0.15;        // slight horizontal drift
    this.phase   = Math.random() * Math.PI * 2;    // oscillation phase
    this.phaseSpd= 0.004 + Math.random() * 0.007;
    this.alpha   = 0.03 + Math.random() * 0.08;    // baseline opacity
    this.alphaTgt= this.alpha;
    this.pulseTimer = 80 + Math.random() * 200;    // frames until next pulse
  }

  update() {
    this.y     -= this.vy;
    this.x     += this.vx + Math.sin(this.phase) * 0.25;
    this.phase += this.phaseSpd;

    // soft pulse every so often
    this.pulseTimer--;
    if (this.pulseTimer <= 0) {
      this.alphaTgt   = 0.14 + Math.random() * 0.12;
      this.pulseTimer = 120 + Math.random() * 200;
    }
    this.alpha += (this.alphaTgt - this.alpha) * 0.025;
    if (Math.abs(this.alpha - this.alphaTgt) < 0.005) {
      this.alphaTgt = 0.03 + Math.random() * 0.07;
    }

    if (this.y < -this.r * 4) this.reset();
  }

  draw(ctx) {
    const grd = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.r * 4,
    );
    grd.addColorStop(0, `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},${this.alpha})`);
    grd.addColorStop(1, `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }
}

export default function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particles = Array.from({ length: COUNT },
        (_, i) => new Particle(canvas.width, canvas.height, true),
      );
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    tick();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
