
"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

const experiences = [
  {
    period: "Jul 2024 – Sep 2024",
    role: "Frontend Developer Intern",
    company: "NNPC",
    location: "Abuja, Nigeria",
    type: "Internship",
    description:
      "Worked in the App Development Department, building responsive interfaces and improving web application experiences.",
    achievements: [
      "Developed reusable UI components using React.js and Tailwind CSS.",
      "Built an NNPC Tip Portal user guide page using Next.js.",
      "Translated Figma designs into responsive web interfaces.",
      "Worked on debugging, documentation, and interface improvements.",
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "Figma"],
  },
  {
    period: "2024",
    role: "ICT Trainee",
    company: "NABDA",
    location: "Nigeria",
    type: "Training",
    description:
      "Participated in ICT training and developed foundational knowledge of cloud computing.",
    achievements: [
      "Completed AWS Cloud Practitioner Essentials training.",
      "Built foundational knowledge of cloud computing concepts and AWS services.",
    ],
    technologies: ["AWS", "Cloud Computing"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden bg-[#0a0816] px-6 py-28 text-white md:px-12 lg:px-20"
    >
      {/* Background: indigo base, violet aurora, faint diagonal lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#08090d] via-[#0d0a1f] to-[#0a0816]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_22px)] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">
            My journey
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-light tracking-tight md:text-6xl">
              Experience &{" "}
              <span className="text-white/45">growth.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              My professional journey, training, and experience building
              digital products.
            </p>
          </div>
        </motion.div>

        <div className="relative ml-3 pl-8 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gradient-to-b before:from-cyan-300/60 before:via-violet-400/40 before:to-transparent md:ml-6 md:pl-12">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[39.5px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-cyan-300 bg-[#0d0a1f] shadow-[0_0_15px_rgba(103,232,249,0.3)] md:-left-[55.5px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>

              <div className="rounded-2xl border border-white/10 bg-[#120f24]/70 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-violet-300/30 md:p-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs text-cyan-300">
                        {experience.type}
                      </span>
                      <span className="text-xs tracking-wide text-white/40">
                        {experience.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                      {experience.role}
                    </h3>

                    <p className="mt-2 text-sm text-white/50">
                      {experience.company} · {experience.location}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-300">
                    {experience.type === "Training" ? (
                      <GraduationCap size={21} />
                    ) : (
                      <BriefcaseBusiness size={21} />
                    )}
                  </div>
                </div>

                <p className="mb-6 max-w-3xl text-sm leading-7 text-white/55">
                  {experience.description}
                </p>

                <ul className="mb-7 space-y-3">
                  {experience.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-3 text-sm leading-6 text-white/65"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55"
                    >
                      {technology}
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