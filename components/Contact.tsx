
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";


export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );

    window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
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
            Get in touch
          </p>

          <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-tight md:text-6xl">
            Have a project in mind?
            <span className="block text-white/45">
              Let&apos;s make it happen.
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-8 max-w-md text-sm leading-8 text-white/55">
              I&apos;m open to frontend development opportunities, freelance
              projects, and collaborations. If you have an idea, I&apos;d love
              to hear about it.
            </p>

            <a
              href="mailto:YOUR_EMAIL@example.com"
              className="group mb-4 flex w-fit items-center gap-3 text-lg transition-colors hover:text-cyan-300 md:text-xl"
            >
              <Mail size={21} className="text-cyan-300" />
             auduviktoria@gmail.com
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <a
              href="tel:+2349169012907"
              className="group mb-8 flex w-fit items-center gap-3 text-lg transition-colors hover:text-cyan-300 md:text-xl"
            >
              <Phone size={20} className="text-cyan-300" />
              +234 916 901 2907
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <div className="mb-8 flex items-center gap-3 text-sm text-white/50">
              <MapPin size={18} className="text-cyan-300" />
              Abuja, Nigeria
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/chenemi001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-300"
              >
                <GithubIcon size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-300"
              >
                <LinkedinIcon size={19} />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50"
              >
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-cyan-300/50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-cyan-300/50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/50"
              >
                Your message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-cyan-300/50"
              />
            </div>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-cyan-200"
            >
              Send message
              <Send
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.form>
        </div>

      </div>
    </section>
  );
}