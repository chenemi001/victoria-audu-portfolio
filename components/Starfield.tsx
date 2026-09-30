"use client";

import { useEffect, useRef } from "react";

type Star = {
  // position as a fraction of the canvas, so resizing keeps the layout
  fx: number;
  fy: number;
  radius: number;
  depth: number; // 0.15 (far) – 1 (near): drift speed, brightness, parallax
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
  bright: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

type StarfieldProps = {
  className?: string;
  /** Stars per 10,000 px² of canvas area */
  density?: number;
};

const PARALLAX = 28; // max px a near star shifts with the cursor
const LINK_RADIUS = 170; // cursor radius in which constellations form
const LINK_DISTANCE = 95; // max distance between linked stars
const MAX_STARS = 900;

// Pre-rendered soft glow with a faint four-point sparkle, reused for bright stars
function createGlowSprite() {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const g = sprite.getContext("2d");
  if (!g) return sprite;

  const c = size / 2;
  const halo = g.createRadialGradient(c, c, 0, c, c, c);
  halo.addColorStop(0, "rgba(255,255,255,0.9)");
  halo.addColorStop(0.12, "rgba(200,230,255,0.35)");
  halo.addColorStop(0.4, "rgba(150,200,255,0.08)");
  halo.addColorStop(1, "rgba(150,200,255,0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, size, size);

  for (const [w, h] of [
    [size, 1.2],
    [1.2, size],
  ]) {
    const spike = g.createRadialGradient(c, c, 0, c, c, c);
    spike.addColorStop(0, "rgba(220,240,255,0.55)");
    spike.addColorStop(1, "rgba(220,240,255,0)");
    g.fillStyle = spike;
    g.fillRect(c - w / 2, c - h / 2, w, h);
  }
  return sprite;
}

// Interactive canvas starfield: parallax depth, twinkling, a faint Milky Way
// band, cursor constellations and shooting stars. Pauses off-screen; renders
// a single static frame for reduced motion.
export default function Starfield({ className, density = 1.8 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const glowSprite = createGlowSprite();

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let frameId = 0;
    let running = false;
    let lastTime = 0;
    let nextShootingStar = 1800;

    let pointer: { x: number; y: number } | null = null;
    let parallaxX = 0;
    let parallaxY = 0;

    const makeStar = (fx: number, fy: number, faint = false): Star => {
      const depth = faint ? 0.15 + Math.random() * 0.25 : 0.15 + Math.random() ** 1.6 * 0.85;
      const bright = !faint && Math.random() > 0.975;
      return {
        fx,
        fy,
        radius: bright ? 1.2 + Math.random() * 0.6 : 0.3 + depth * Math.random() * 1.1,
        depth: bright ? Math.max(depth, 0.7) : depth,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.82 ? 25 + Math.random() * 25 : 195 + Math.random() * 50,
        bright,
      };
    };

    const createStars = () => {
      const count = Math.min(Math.round(((width * height) / 10000) * density), MAX_STARS);
      stars = Array.from({ length: count }, () => makeStar(Math.random(), Math.random()));

      // Milky Way: a diagonal band of faint, densely packed stars
      const bandCount = Math.round(count * 0.45);
      for (let i = 0; i < bandCount; i++) {
        const t = Math.random();
        // gaussian-ish spread across the band
        const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 0.14;
        stars.push(makeStar(t, 0.15 + t * 0.55 + spread, true));
      }
    };

    let sizedArea = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // only rebuild when the area changes a lot; otherwise stars keep their spots
      const area = width * height;
      if (!sizedArea || Math.abs(area - sizedArea) / sizedArea > 0.35) {
        createStars();
        sizedArea = area;
      }
      if (reduceMotion || !running) draw(performance.now(), 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= width && y <= height ? { x, y } : null;
    };

    const handlePointerLeave = () => {
      pointer = null;
    };

    const spawnShootingStar = () => {
      const angle = Math.PI / 6 + Math.random() * 0.35;
      const speed = 1 + Math.random() * 0.7;
      shootingStars.push({
        x: width * (0.1 + Math.random() * 0.8),
        y: Math.random() * height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 650 + Math.random() * 450,
      });
    };

    const draw = (time: number, delta: number) => {
      ctx.clearRect(0, 0, width, height);

      const targetX = pointer ? pointer.x / width - 0.5 : 0;
      const targetY = pointer ? pointer.y / height - 0.5 : 0;
      const ease = Math.min(delta * 0.004, 1);
      parallaxX += (targetX - parallaxX) * ease;
      parallaxY += (targetY - parallaxY) * ease;

      const linkable: { x: number; y: number; strength: number }[] = [];
      const wrap = (PARALLAX + 4) / width;

      for (const star of stars) {
        // slow drift to the left; nearer stars move faster
        star.fx -= (star.depth * 0.01 * delta) / width;
        if (star.fx < -wrap) {
          star.fx = 1 + wrap;
          if (!star.bright && star.depth > 0.4) star.fy = Math.random();
        }

        const x = star.fx * width - parallaxX * PARALLAX * star.depth;
        const y = star.fy * height - parallaxY * PARALLAX * star.depth;
        if (y < -4 || y > height + 4) continue;

        const twinkle = reduceMotion
          ? 0.85
          : 0.5 + 0.5 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        let alpha = (0.2 + star.depth * 0.8) * (0.35 + 0.65 * twinkle);

        if (pointer) {
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          if (d < LINK_RADIUS) {
            const boost = 1 - d / LINK_RADIUS;
            alpha = Math.min(1, alpha + boost * 0.6);
            if (star.depth > 0.35) linkable.push({ x, y, strength: boost });
          }
        }

        if (star.bright) {
          const size = star.radius * 14;
          ctx.globalAlpha = alpha;
          ctx.drawImage(glowSprite, x - size / 2, y - size / 2, size, size);
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 85%, 92%, ${alpha})`;
        ctx.fill();
      }

      // constellation lines between stars around the cursor
      if (linkable.length > 1) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < linkable.length; i++) {
          for (let j = i + 1; j < linkable.length; j++) {
            const a = linkable[i];
            const b = linkable[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > LINK_DISTANCE) continue;
            const alpha = (1 - d / LINK_DISTANCE) * Math.min(a.strength, b.strength) * 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.life += delta;
        s.x += s.vx * delta;
        s.y += s.vy * delta;

        const alpha = Math.sin((s.life / s.maxLife) * Math.PI);
        const tailX = s.x - s.vx * 110;
        const tailY = s.y - s.vy * 110;

        const trail = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        trail.addColorStop(0, `rgba(240, 249, 255, ${alpha})`);
        trail.addColorStop(0.3, `rgba(125, 211, 252, ${alpha * 0.5})`);
        trail.addColorStop(1, "rgba(125, 211, 252, 0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.globalAlpha = alpha;
        ctx.drawImage(glowSprite, s.x - 10, s.y - 10, 20, 20);
        ctx.globalAlpha = 1;
      }
    };

    const loop = (time: number) => {
      // clamp delta so returning to the tab doesn't make stars jump
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      nextShootingStar -= delta;
      if (nextShootingStar <= 0) {
        spawnShootingStar();
        nextShootingStar = 3000 + Math.random() * 4500;
      }

      draw(time, delta);
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // only animate while the hero is on screen
    const visibilityObserver = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    );
    visibilityObserver.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
