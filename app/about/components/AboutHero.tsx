import { motion } from 'motion/react';

export default function AboutHero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden border-b border-white/5 bg-transparent">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-teal/10 blur-[150px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-teal/5 blur-[120px] rounded-full translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start"
        >
          <span className="text-brand-teal font-display font-bold text-sm uppercase tracking-[0.4em] mb-4">Our Legacy & Mission</span>
          <h1 className="text-6xl md:text-8xl font-display font-medium leading-[1.1] mb-6">
            <span className="text-white block">Engineering the Future of</span>
            <span className="text-gradient italic font-light">Pharmacy Excellence.</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            PrimeTek Services provides the high-precision operational systems that pharmacies need to maintain total control in a volatile market.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
