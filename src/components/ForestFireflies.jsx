import { useEffect, useRef } from 'react';

const COUNT = 60;
const COLORS = ['#4F9B93', '#3E6F85', '#7EC8C0', '#5AACB0', '#82C4C0'];
const REPEL_RADIUS = 120;
const REPEL_FORCE  = 3;

function makeFirefly(w, h) {
  return {
    x:     Math.random() * w,
    y:     Math.random() * h,
    vx:    (Math.random() - 0.5) * 0.3,
    vy:    (Math.random() - 0.5) * 0.3,
    size:  Math.random() * 1.8 + 0.6,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.012 + 0.004,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function ForestFireflies() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx    = canvas.getContext('2d');
    let w = 0, h = 0, t = 0;
    let flies = [];

    function resize() {
      const r = parent.getBoundingClientRect();
      w = canvas.width  = r.width;
      h = canvas.height = r.height;
      flies = Array.from({ length: COUNT }, () => makeFirefly(w, h));
    }

    function tick() {
      t++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;

      for (const f of flies) {
        // organic drift
        f.x += f.vx + Math.sin(t * f.speed + f.phase)       * 0.28;
        f.y += f.vy + Math.cos(t * f.speed + f.phase * 0.7) * 0.22;

        // mouse repulsion
        const dx = f.x - mx, dy = f.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_RADIUS && d > 0) {
          const force = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE;
          f.x += (dx / d) * force;
          f.y += (dy / d) * force;
        }

        // wrap around edges
        if (f.x < 0) f.x = w; else if (f.x > w) f.x = 0;
        if (f.y < 0) f.y = h; else if (f.y > h) f.y = 0;

        // pulsing alpha
        const alpha = 0.35 + Math.sin(t * f.speed * 1.6 + f.phase) * 0.28;

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, alpha);
        ctx.shadowColor = f.color;
        ctx.shadowBlur  = f.size * 12;
        ctx.fillStyle   = f.color;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    const onMove  = e => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    tick();

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
