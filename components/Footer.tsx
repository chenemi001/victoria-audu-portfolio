"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { name: "GitHub", href: "https://github.com/chenemi001", icon: GithubIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedinIcon },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#05070d] px-6 pb-8 pt-16 text-white md:px-12 lg:px-20">
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[min(800px,120vw)] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-[120px]"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]"
        >
          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                V<span className="text-cyan-400">.</span>
              </span>
              <span className="text-sm font-medium tracking-wide text-white/70">
                VICTORIA AUDU
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
              Frontend developer crafting refined, responsive web
              experiences from Abuja, Nigeria.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-cyan-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/35">
              Say hello
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:YOUR_EMAIL@example.com"
                  className="inline-flex items-center gap-3 text-white/60 transition-colors hover:text-cyan-300"
                >
                  <Mail size={16} className="text-cyan-300" />
                 auduviktoria@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2349169012907"
                  className="inline-flex items-center gap-3 text-white/60 transition-colors hover:text-cyan-300"
                >
                  <Phone size={16} className="text-cyan-300" />
                  +234 916 901 2907
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs tracking-wide text-white/35">
            © {new Date().getFullYear()} Victoria Audu. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all group-hover:-translate-y-1 group-hover:border-cyan-300/50 group-hover:text-cyan-300">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
