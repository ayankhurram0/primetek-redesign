"use client";

import { motion } from 'motion/react';


export default function CaseHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-44">

      <div className="px-26 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase mb-8"
          >
            <span className="text-white">Proven</span> <br />
            <span className="text-teal-400">Outcomes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-tight mb-20"
          >
            Technical validation of PrimeTek system deployments across the Northeast independent pharmacy network.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
