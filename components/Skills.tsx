
"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Cloud,
  Palette,
  Database,
  Wrench,
} from "lucide-react";

const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    description: "Building responsive, modern web experiences.",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Framer Motion",
    ],
  },
  {
    number: "02",
    title: "Backend Development",
    description: "Creating APIs and application logic.",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
    ],
  },
  {
    number: "03",
    title: "DevOps & Cloud",
    description: "Automating deployments and managing infrastructure.",
    icon: Cloud,
    skills: [
      "AWS",
      "Docker",
      "Docker Compose",
      "Nginx",
      "Terraform",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    number: "04",
    title: "UI/UX Design",
    description: "Turning ideas into polished interfaces.",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "Responsive Design", "Prototyping"],
  },
  {
    number: "05",
    title: "Databases",
    description: "Working with data and application storage.",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Supabase", "SQL"],
  },
  {
    number: "06",
    title: "Tools & Workflow",
    description: "Tools that support efficient development.",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify", "npm"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#08090d] px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">
            My expertise
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-light tracking-tight md:text-6xl">
              Skills &{" "}
              <span className="text-white/45">technologies.</span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              Technologies and tools I use to design, build, and deploy
              modern digital products.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.div
                key={group.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.045] md:p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/5 text-cyan-300 transition-colors duration-300 group-hover:bg-cyan-300 group-hover:text-black">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <span className="text-xs tracking-[0.3em] text-white/30">
                    {group.number}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-medium tracking-tight">
                  {group.title}
                </h3>

                <p className="mb-6 text-sm leading-6 text-white/45">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-white/65 transition-colors duration-300 group-hover:border-white/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}