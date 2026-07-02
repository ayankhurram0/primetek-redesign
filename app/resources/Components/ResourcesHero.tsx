"use client";

import { motion } from 'motion/react';
import { Download } from 'lucide-react';


export default function ResourcesHero() {
  return (
    <section className="relative pt-40 pb-20 border-b border-ink/10 overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-white/70 z-0" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.08)_0%,transparent_70%)] blur-[120px] rounded-full translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl md:text-8xl xl:text-8xl font-bold text-ink mb-10 tracking-tighter uppercase leading-none">
            Support <span className="text-accent">Systems.</span>
          </h1>
          <p className="text-2xl text-ink-muted max-w-4xl mx-auto leading-relaxed mb-12">
            Access our repository of implementation guides, compliance checklists, and technical performance frameworks.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
