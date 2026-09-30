"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Starfield from "@/components/Starfield";

const rotatingWords = ["alive.", "effortless.", "considered.", "human."];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "Responsive UI",
  "Accessibility",
];

type Token = { text: string; color?: string };

// Syntax-highlighted snippet shown in the editor card
const codeLines: Token[][] = [
  [
    { text: "const ", color: "text-violet-300" },
    { text: "victoria", color: "text-sky-300" },
    { text: " = {" },
  ],
  [
    { text: "  role: " },
    { text: '"Frontend Developer"', color: "text-emerald-300" },
    { text: "," },
  ],
  [
    { text: "  based: " },
    { text: '"Abuja, Nigeria"', color: "text-emerald-300" },
    { text: "," },
  ],
  [
    { text: "  stack: [" },
    { text: '"Next.js"', color: "text-emerald-300" },
    { text: ", " },
    { text: '"TS"', color: "text-emerald-300" },
    { text: ", " },
    { text: '"Tailwind"', color: "text-emerald-300" },
    { text: "]," },
  ],
  [
    { text: "  loves: " },
    { text: '"design × engineering"', color: "text-emerald-300" },
    { text: "," },
  ],
  [{ text: "};" }],
  [],
  [
    { text: "victoria", color: "text-sky-300" },
    { text: "." },
    { text: "build", color: "text-amber-200" },
    { text: "(" },
    { text: '"something great"', color: "text-emerald-300" },
    { text: ");" },
  ],
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  // Cursor-follow spotlight + card tilt
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-9, 9]);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(56,189,248,0.13), transparent 70%)`;

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2600
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
    tiltX.set(0);
    tiltY.set(0);
  }

  const fadeUp = (delay: number, y = 20) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#05070d] text-white"
    >
      {/* Space scene: drifting nebulae + interactive starfield */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[10%] -top-[25%] h-[75vh] w-[60vw] rounded-full bg-indigo-600/30 blur-[140px] will-change-transform"
        />
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[30%] h-[45vh] w-[32vw] rounded-full bg-fuchsia-500/15 blur-[130px] will-change-transform"
        />
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 70, 0], y: [0, -30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10%] top-[10%] h-[55vh] w-[40vw] rounded-full bg-cyan-500/10 blur-[140px] will-change-transform"
        />
      </div>

      <Starfield className="absolute inset-0 -z-20 h-full w-full" />

      {/* Readability overlay behind the copy */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05070d]/60 via-transparent to-transparent" />
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* Main content */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pb-10 pt-28 sm:px-10 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-16">
        {/* Copy */}
        <div>
          <motion.div
            {...fadeUp(0, 12)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] tracking-wide text-white/75 sm:text-xs">
              Available for new projects
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.05, 12)}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-sky-200/70 sm:text-xs"
          >
            Victoria Audu — Frontend Developer
          </motion.p>

          <motion.h1
            {...fadeUp(0.12, 28)}
            className="text-[clamp(2.4rem,6.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.045em]"
          >
            Crafting interfaces
            <br />
            that feel{" "}
            <span className="relative inline-grid align-bottom">
              {/* Reserves width of the longest word to prevent layout jump */}
              <span className="invisible col-start-1 row-start-1 font-light italic">
                considered.
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "-0.4em", filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="col-start-1 row-start-1 bg-gradient-to-r from-sky-200 via-cyan-300 to-violet-300 bg-clip-text pr-[0.08em] font-light italic text-transparent"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.28, 18)}
            className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
          >
            I turn ideas into refined, responsive web experiences, where
            thoughtful design and precise code meet.
          </motion.p>

          <motion.div
            {...fadeUp(0.4, 16)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#05070d] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-sky-200 to-cyan-300 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">View my work</span>
              <ArrowUpRight
                size={17}
                className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:text-white"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Code card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden [perspective:1200px] md:block"
        >
          <motion.div
            style={reduceMotion ? undefined : { rotateX, rotateY }}
            className="relative mx-auto max-w-md [transform-style:preserve-3d] lg:ml-auto"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-sky-300/40 via-white/5 to-violet-400/30" />
            <div className="absolute -inset-10 -z-10 rounded-full bg-sky-500/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl bg-[#0a0f1c]/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-white/40">
                  victoria.ts
                </span>
              </div>

              <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-7 text-white/80">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.8 + i * 0.12 }}
                    className="flex"
                  >
                    <span className="mr-5 w-4 select-none text-right text-white/20">
                      {i + 1}
                    </span>
                    <span>
                      {line.map((token, j) => (
                        <span key={j} className={token.color}>
                          {token.text}
                        </span>
                      ))}
                      {i === codeLines.length - 1 && (
                        <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-sky-300" />
                      )}
                    </span>
                  </motion.div>
                ))}
              </pre>
            </div>

            {/* Floating chips */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateZ: 40 }}
              className="absolute -left-8 -top-5 rounded-xl border border-white/10 bg-[#0d1424]/90 px-4 py-2.5 shadow-xl backdrop-blur-xl"
            >
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Lighthouse
              </p>
              <p className="mt-0.5 text-sm font-medium text-emerald-300">
                Performance-first
              </p>
            </motion.div>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateZ: 60 }}
              className="absolute -bottom-6 -right-4 rounded-xl border border-white/10 bg-[#0d1424]/90 px-4 py-2.5 shadow-xl backdrop-blur-xl"
            >
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Pixel-perfect
              </p>
              <p className="mt-0.5 text-sm font-medium text-sky-200">
                Design → Code
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar: location, stack marquee, scroll cue */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="border-t border-white/10 bg-[#05070d]/60 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4 sm:px-10 lg:px-16">
          <div className="hidden shrink-0 sm:block">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              Based in
            </p>
            <p className="text-xs text-white/75">Abuja, Nigeria</p>
          </div>

          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-8"
            >
              {[...stack, ...stack].map((item, i) => (
                <span
                  key={i}
                  aria-hidden={i >= stack.length}
                  className="flex items-center gap-8 whitespace-nowrap text-xs tracking-wide text-white/50"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-sky-300/60" />
                </span>
              ))}
            </motion.div>
          </div>

          <a
            href="#about"
            aria-label="Scroll to about section"
            className="group flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/55 transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">Scroll</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-sky-300/50">
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <ArrowDown size={14} />
              </motion.span>
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
