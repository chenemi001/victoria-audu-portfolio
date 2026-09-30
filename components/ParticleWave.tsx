"use client";

import { useEffect, useRef } from "react";

type ParticleWaveProps = {
  className?: string;
};

const Z_NEAR = 120;
const Z_FAR = 1600;
const ROWS = 46;
const CAMERA_HEIGHT = 150;
const LIFT_RADIUS = 190; // px around the cursor where the surface rises
const LIFT_HEIGHT = 70;

// A perspective grid of dots rolling in waves toward the horizon.
// The surface swells under the cursor. Static frame for reduced motion.
export default function ParticleWave({ className }: ParticleWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let focal = 0;
    let horizon = 0;
    let xSpan = 0;
    let frameId = 0;

    // eased cursor position so the swell glides instead of snapping
    let pointer: { x: number; y: number } | null = null;
    let liftX = -9999;
    let liftY = -9999;
    let liftStrength = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      focal = width < 768 ? width * 1.1 : width * 0.75;
      // place the far edge of the field at 45% of the height
      horizon = height * 0.45 - (CAMERA_HEIGHT * focal) / Z_FAR;
      xSpan = ((width / 2) * Z_FAR) / focal;
      cols = width < 768 ? 60 : 110;
      if (reduceMotion) draw(0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= width && y <= height ? { x, y } : null;
    };

    const handlePointerLeave = () => {
      pointer = null;
    };

    const draw = (time: number) => {
      const t = time * 0.001;
      ctx.clearRect(0, 0, width, height);

      if (pointer) {
        liftX += (pointer.x - liftX) * 0.08;
        liftY += (pointer.y - liftY) * 0.08;
        if (liftX < -9000) {
          liftX = pointer.x;
          liftY = pointer.y;
        }
      }
      liftStrength += ((pointer ? 1 : 0) - liftStrength) * 0.05;

      // far rows first so near dots draw on top
      for (let r = ROWS - 1; r >= 0; r--) {
        // denser rows near the horizon for an even look on screen
        const depth = r / (ROWS - 1);
        const z = Z_NEAR + (Z_FAR - Z_NEAR) * depth ** 1.6;
        const scale = focal / z;
        const fade = (1 - depth) ** 0.9;
        const hue = 190 + depth * 75; // cyan → violet
        const radius = Math.max(0.5, Math.min(2.6, 260 / z));

        for (let c = 0; c < cols; c++) {
          const x = -xSpan + (2 * xSpan * c) / (cols - 1);

          const y =
            Math.sin(x * 0.0045 + t * 0.9) * 22 +
            Math.cos(z * 0.0065 - t * 1.1) * 26 +
            Math.sin((x + z) * 0.003 + t * 0.5) * 14;

          const sx = width / 2 + x * scale;
          if (sx < -10 || sx > width + 10) continue;
          let sy = horizon + (CAMERA_HEIGHT - y) * scale;

          let glow = 0;
          if (liftStrength > 0.01) {
            const d = Math.hypot(sx - liftX, sy - liftY);
            if (d < LIFT_RADIUS) {
              glow = (1 - d / LIFT_RADIUS) ** 2 * liftStrength;
              sy -= glow * LIFT_HEIGHT * Math.min(scale, 1.4);
            }
          }

          if (sy > height + 10 || sy < -10) continue;

          // brighter on wave crests
          const crest = 0.55 + (y + 60) / 240;
          const edgeFade = 1 - Math.abs(x / xSpan) ** 3;
          const alpha = Math.min(1, fade * crest * edgeFade * 0.9 + glow * 0.8);
          if (alpha < 0.02) continue;

          ctx.beginPath();
          ctx.arc(sx, sy, radius * (1 + glow * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue - glow * 30}, 90%, ${70 + glow * 20}%, ${alpha})`;
          ctx.fill();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frameId = requestAnimationFrame(loop);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      frameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
