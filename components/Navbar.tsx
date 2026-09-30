
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-8 sm:pt-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#080b14]/75 px-4 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:px-7 sm:py-3">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-bold text-cyan-200 transition-all duration-300 group-hover:border-cyan-300 group-hover:bg-cyan-300/20">
            V
          </span>
          <span className="text-base font-semibold tracking-wide text-white">
            Victoria<span className="text-cyan-300">.</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative py-2 text-xs font-medium tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="group hidden shrink-0 items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-2.5 lg:px-5 text-xs font-medium text-cyan-100 transition-all duration-300 hover:border-cyan-200/60 hover:bg-cyan-300/20 md:inline-flex"
        >
          Let&apos;s talk
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={reduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-3 max-h-[calc(100svh-6rem)] max-w-7xl overflow-y-auto rounded-3xl border border-white/10 bg-[#080b14]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-cyan-200"
                >
                  {link.name}
                  <ArrowUpRight size={15} className="opacity-40" />
                </motion.a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#030712] transition-colors hover:bg-cyan-200"
            >
              Let&apos;s work together
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}