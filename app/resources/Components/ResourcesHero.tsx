import { motion } from 'motion/react';
import { Download } from 'lucide-react';

export default function ResourcesHero() {
  return (
    <section className="relative pt-40 pb-20 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-brand-teal/5 blur-[120px] rounded-full translate-y-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-teal font-display font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block italic">Technical Documentation</span>
          <h1 className="text-6xl md:text-8xl font-display font-medium text-white mb-8 tracking-tighter uppercase italic leading-none">
            Support <span className="text-gradient font-light">Systems</span>.
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Access our repository of implementation guides, compliance checklists, and technical performance frameworks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
             {['Implementation', 'Compliance', 'Revenue', 'Reporting'].map((tag, i) => (
                <span key={i} className="px-4 py-1.5 glass rounded-full border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{tag}</span>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
