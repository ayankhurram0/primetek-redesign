"use client";

import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/5 bg-brand-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-sm border border-brand-teal/30 bg-brand-teal/5 mb-10"
        >
          <Terminal className="w-4 h-4 text-brand-teal" />
          <span className="text-[10px] font-mono text-brand-teal uppercase tracking-[0.4em] font-black">Authentication_Portal // V1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase mb-8"
        >
          Connect <br/>
          <span className="text-gradient font-light">The Node.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto font-mono uppercase tracking-tight leading-tight"
        >
          Initiate your pharmacy network assessment. Average response time for new inquiries is currently 1.4 hours.
        </motion.p>
      </div>
    </section>
  );
}
