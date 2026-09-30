"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "Luxury Real Estate",
    category: "Real Estate",
    description:
      "A modern luxury real estate website featuring elegant visuals, refined typography, and a seamless browsing experience.",
    image: "/images/real-estate.jpeg",
    link: "#",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    number: "02",
    title: "Luxora Hotel",
    category: "Hospitality",
    description:
      "A sophisticated hotel website designed to showcase premium hospitality through immersive visuals and smooth animations.",
    image: "/images/luxora.jpeg",
    link: "https://luxora-hotel-two.vercel.app/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    number: "03",
    title: "Luxury Nail Tech",
    category: "Beauty & Lifestyle",
    description:
      "A luxurious nail technician website with elegant styling, interactive animations, and a polished experience for clients.",
    image: "/images/nail-tech.jpeg",
    link: "https://luxury-nail-tech-website.vercel.app/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    number: "04",
    title: "LectureMind AI",
    category: "AI & Education",
    description:
      "An AI-powered lecture note generation application designed to transform lectures into organized, easy-to-understand notes.",
    image: "/images/lecturemind.jpeg",
    link: "https://lecturemind-ai.vercel.app/",
    tags: ["Next.js", "TypeScript", "Supabase", "AI"],
  },
];

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#070b14] px-6 py-24 text-white sm:py-28 md:px-12 lg:px-20"
    >
      {/* Background: deep navy with a faint grid and cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">
            Selected work
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-light tracking-tight md:text-6xl">
              Projects that bring
              <span className="block text-white/45">
                ideas to life.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              A selection of projects focused on thoughtful design,
              performance, and memorable digital experiences.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80 backdrop-blur-sm transition-colors duration-500 hover:border-cyan-300/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#11141c]">
                <Image
                  src={project.image}
                  alt={`${project.title} website screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70" />

                <a
                  href={project.link}
                  target={project.link === "#" ? undefined : "_blank"}
                  rel={project.link === "#" ? undefined : "noopener noreferrer"}
                  aria-label={`View ${project.title}`}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-cyan-300 hover:text-black"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs tracking-[0.3em] text-cyan-300">
                    {project.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {project.category}
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
                  />
                </div>

                <p className="mb-6 text-sm leading-7 text-white/50">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] tracking-wide text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}