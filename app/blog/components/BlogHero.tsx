"use client";

import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative pt-40 pb-20 border-b border-ink/10 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-teal/5 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-accent font-display font-bold text-[9px] uppercase tracking-[0.4em] mb-4 block ">Resource Intelligence</span>
          <h1 className="text-6xl md:text-8xl font-display font-medium text-accent mb-8 tracking-tighter uppercase  leading-[0.9]">
            The <span className="text-gradient font-light">Lead</span> <br /> Line.
          </h1>
          <p className="text-ink-muted text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Dispatches on pharmacy operational excellence, PBM audit strategies, and revenue cycle management.
          </p>

          <div className="max-w-md mx-auto relative group">
            <input
              type="text"
              placeholder="Search Technical Papers..."
              className="w-full glass bg-white/65 border-ink/10 rounded-full py-4 px-12 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/50 transition-all font-mono"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle group-focus-within:text-accent transition-colors" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
