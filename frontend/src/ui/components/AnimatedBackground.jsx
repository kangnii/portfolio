import React, { useEffect, useRef } from 'react';

/**
 * Animated background with subtle "nebula" particles.
 * Pure Canvas (no deps). Uses devicePixelRatio for crispness.
 */
export default function AnimatedBackground(){
  const ref = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    const state = { w: 0, h: 0, dpr: 1, t: 0 };
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vx: (-0.15 + Math.random() * 0.3) / 1200,
      vy: (-0.15 + Math.random() * 0.3) / 1200,
      a: 0.15 + Math.random() * 0.55,
    }));

    const resize = () => {
      state.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      state.w = window.innerWidth;
      state.h = window.innerHeight;
      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = state.w + 'px';
      canvas.style.height = state.h + 'px';
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    const step = () => {
      state.t += 1;

      // Clear with alpha for trail
      ctx.clearRect(0, 0, state.w, state.h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, state.w, state.h);

      // Soft gradient fog
      const g = ctx.createRadialGradient(
        state.w * 0.62, state.h * 0.38, 50,
        state.w * 0.62, state.h * 0.38, Math.max(state.w, state.h)
      );
      g.addColorStop(0, 'rgba(217,70,239,0.14)');
      g.addColorStop(0.55, 'rgba(34,211,238,0.10)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.w, state.h);

      // Particles
      ctx.globalCompositeOperation = 'lighter';
      for(const p of particles){
        p.x = (p.x + p.vx) % 1; if(p.x < 0) p.x += 1;
        p.y = (p.y + p.vy) % 1; if(p.y < 0) p.y += 1;

        const x = p.x * state.w;
        const y = p.y * state.h;
        const pulse = 0.7 + 0.3 * Math.sin((state.t / 80) + (p.x * 6.28));
        const r = p.r * pulse;

        const cg = ctx.createRadialGradient(x, y, 0, x, y, r * 10);
        cg.addColorStop(0, `rgba(255,255,255,${0.10 * p.a})`);
        cg.addColorStop(0.2, `rgba(217,70,239,${0.10 * p.a})`);
        cg.addColorStop(0.6, `rgba(34,211,238,${0.07 * p.a})`);
        cg.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(x, y, r * 10, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener('resize', resize);
    raf.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      if(raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
      }}
    />
  );
}
