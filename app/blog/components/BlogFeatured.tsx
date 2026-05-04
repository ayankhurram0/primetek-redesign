import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogFeatured() {
  return (
    <section className="py-20 border-b border-white/5 bg-brand-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="relative glass rounded-[40px] border-white/5 overflow-hidden group cursor-pointer"
        >
           <div className="flex flex-col lg:flex-row items-stretch">
              <div className="lg:w-1/2 relative overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200&h=800" 
                   alt="Featured" 
                   className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-linear-to-r from-brand-950/80 to-transparent" />
                 <div className="absolute top-8 left-8">
                    <span className="px-4 py-1 rounded-full bg-brand-teal text-brand-950 font-bold text-[10px] uppercase tracking-widest">White Paper</span>
                 </div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center bg-brand-950/40 backdrop-blur-3xl">
                 <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <span className="text-brand-teal">By Operational Lead</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 12 MIN READ</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 uppercase italic leading-tight">
                   The Anatomy of <span className="text-gradient font-light">PBM Audits</span> in 2026.
                 </h2>
                 <p className="text-slate-400 font-light leading-relaxed mb-10 text-lg">
                   A comprehensive breakdown of evolving audit tactics and the systemic defensive measures independent pharmacies must adopt to survive clinical validation requests.
                 </p>
                 <div className="flex items-center gap-6">
                    <button className="px-8 py-4 bg-brand-teal text-brand-950 font-bold rounded-full hover:glow-teal active:scale-95 transition-all text-xs uppercase tracking-widest">
                       Read Technical Paper
                    </button>
                    <ArrowRight className="text-white w-6 h-6 group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
