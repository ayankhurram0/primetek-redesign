import { motion } from "motion/react";

export const AboutCTA = () => {
  return (
    <section className="py-44 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto rounded-[60px] bg-brand-teal p-20 text-brand-dark text-center relative shadow-2xl z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
           <h2 className="text-6xl md:text-8xl font-display font-medium leading-[0.9] tracking-tighter mb-12 italic">Let's Reclaim Your <br /> Bottom Line.</h2>
           <p className="text-xl font-bold uppercase tracking-widest bg-brand-dark/10 inline-block px-8 py-3 rounded-2xl mb-16">No Risk. Pure Logic.</p>
           <div className="flex flex-wrap justify-center gap-8">
             <button className="bg-brand-dark text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs hover:scale-105 active:scale-95 transition-all">
               Schedule Analysis
             </button>
             <button className="border-2 border-brand-dark/20 text-brand-dark px-12 py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-xs hover:border-brand-dark transition-all">
               Download Methodology
             </button>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
