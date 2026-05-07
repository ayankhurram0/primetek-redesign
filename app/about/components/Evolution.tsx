import { motion } from "motion/react";

const timeline = [
  { year: "2018", event: "Genesis" },
  { year: "2020", event: "Expansion" },
  { year: "2022", event: "Live Logic" },
  { year: "2024", event: "Surplus" },
  { year: "2026", event: "Horizon" },
];

export const Evolution = () => {
  return (
    <section className="py-44 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">Evolution</h2>
          <h3 className="text-6xl font-display font-light text-white mb-12 tracking-tighter">The Trajectory of <br /> <span className="italic font-normal">Impact.</span></h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-md">
            From a small New Jersey office to a national operational hub. We didn't grow by marketing; we grew by winning audit defenses and recovering millions in ghost revenue.
          </p>
          <button className="bg-white text-brand-dark px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal transition-all">
            Join the Network
          </button>
        </div>

        <div className="space-y-4">
          {timeline.map((t, i) => (
            <motion.div 
              key={t.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-8 group"
            >
              <div className="font-outfit text-4xl font-black text-white/10 group-hover:text-brand-teal transition-colors tracking-tighter">{t.year}</div>
              <div className="h-px flex-1 bg-white/5 relative overflow-hidden group-hover:bg-white/10">
                <div className="absolute inset-0 bg-brand-teal translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">{t.event}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
