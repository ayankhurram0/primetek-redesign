import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative pt-40 pb-20 border-b border-white/5 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-teal/5 blur-[120px] rounded-full -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-brand-teal font-display font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block italic">Resource Intelligence</span>
          <h1 className="text-6xl md:text-8xl font-display font-medium text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
            The <span className="text-gradient font-light">Lead</span> <br /> Line.
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Dispatches on pharmacy operational excellence, PBM audit strategies, and revenue cycle management.
          </p>

          <div className="max-w-md mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search Technical Papers..." 
              className="w-full glass bg-white/5 border-white/10 rounded-full py-4 px-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/50 transition-all font-mono"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-teal transition-colors" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
