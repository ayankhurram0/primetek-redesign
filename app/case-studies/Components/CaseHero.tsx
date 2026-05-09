"use client";

import { motion } from 'motion/react';
import { Terminal, Activity, ShieldCheck, Database, Target } from 'lucide-react';
import { DecorativeBackground } from '../../components/DecorativeBackground';

const stats = [
  { label: 'Revenue Recovered', value: '$2.1M+', icon: Database },
  { label: 'Defense Success', value: '100%', icon: ShieldCheck },
  { label: 'Total Nodes', value: '50+', icon: Activity },
  { label: 'Market Tenure', value: '6YRS', icon: Target },
];

export default function CaseHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-44">
      <DecorativeBackground id="casehero" />
      {/* Background technical grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

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
