import { motion } from "motion/react";
import { ShieldCheck, Target, Users, Lightbulb } from "lucide-react";

const values = [
  { 
    title: "Radical Integrity", 
    description: "In an industry of hidden fees, we operate with 100% data transparency.", 
    icon: ShieldCheck,
    size: "large"
  },
  { 
    title: "Precision First", 
    description: "Every claim, every code, every cent accounted for.", 
    icon: Target,
    size: "small"
  },
  { 
    title: "Human Protocol", 
    description: "We handle the machines so you can stay human with your patients.", 
    icon: Users,
    size: "small"
  },
  { 
    title: "The Intelligence Advantage", 
    description: "Transforming raw data into actionable pharmacy survival guides.", 
    icon: Lightbulb,
    size: "medium"
  },
];

export const CorePhilosophy = () => {
  return (
    <section className="relative py-44 px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-6">Core Philosophy</h2>
          <div className="text-4xl md:text-5xl font-display font-medium text-white italic">"We exist to shift the leverage back <br /> to the independent owner."</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 rounded-[32px] flex flex-col justify-between group overflow-hidden relative
                ${v.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${v.size === 'medium' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal opacity-0 group-hover:opacity-5 blur-3xl transition-opacity" />
              <v.icon className="w-10 h-10 text-brand-teal mb-16 opacity-30 group-hover:opacity-100 transition-all" />
              <div>
                <h3 className="text-2xl font-display font-medium text-white mb-4 italic leading-none">{v.title}</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed max-w-[200px] group-hover:text-slate-300 transition-colors">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
