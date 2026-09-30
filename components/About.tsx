
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Layers3, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, accessible web applications.",
  },
  {
    icon: Layers3,
    title: "UI Engineering",
    description: "Turning thoughtful designs into polished interfaces.",
  },
  {
    icon: Sparkles,
    title: "Creative Thinking",
    description: "Combining creativity and technology to solve problems.",
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#08090c] px-5 py-20 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/[0.07] blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-x-12 gap-y-12 md:grid-cols-[1fr_0.85fr] md:gap-y-10 lg:gap-x-24">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-none md:col-start-1 md:row-start-1"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-blue-300" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs">
              A little about me
            </span>
          </div>

          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em]">
            Beyond the{" "}
            <span className="font-light italic text-white/50">interface.</span>
          </h2>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="order-3 md:order-none md:col-start-1 md:row-start-2"
        >
          <p className="mb-6 text-lg font-light leading-relaxed text-white/85 sm:text-xl lg:text-[1.4rem]">
            I&apos;m Victoria Audu, a developer passionate about creating
            digital experiences that are as functional as they are
            visually engaging.
          </p>

          <p className="mb-5 text-sm leading-8 text-white/55 sm:text-base">
            With a background in Computer Science and hands-on
            experience building web applications, I enjoy turning
            complex ideas into intuitive, responsive interfaces.
          </p>

          <p className="text-sm leading-8 text-white/55 sm:text-base">
            My work combines modern frontend technologies,
            attention to detail and a continuous desire to learn.
            I&apos;m particularly interested in building products that
            are scalable, accessible and enjoyable to use.
          </p>

          {/* Highlights */}
          <div className="mt-9 space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.12,
                  }}
                  className="group flex gap-4 border-t border-white/10 pt-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-blue-200 transition-colors group-hover:border-blue-300/40 group-hover:bg-blue-300/10">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-white/45 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <a
            href="#projects"
            className="group mt-9 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-sm text-white/80 transition-colors hover:border-blue-300 hover:text-blue-200"
          >
            Explore my projects
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative order-2 mx-auto mb-6 w-full max-w-[340px] sm:max-w-[400px] md:order-none md:mb-0 md:col-start-2 md:row-span-2 md:row-start-1 md:sticky md:top-28 md:max-w-[420px] md:self-start"
        >
          <div className="absolute -inset-3 rounded-[2rem] border border-white/[0.07] sm:-inset-4" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#11141b]">
            <Image
              src="/images/victoria.png"
              alt="Victoria Audu"
              fill
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                The developer
              </p>
              <p className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                Victoria Audu
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 right-3 rounded-xl border border-white/10 bg-[#11141b]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-6 sm:px-5 sm:py-4 lg:-right-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              Currently exploring
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Creative engineering
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}