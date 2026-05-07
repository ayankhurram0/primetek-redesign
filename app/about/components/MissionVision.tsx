import { motion } from "motion/react";
import { Target, Eye } from "lucide-react";

const missionVision = [
  {
    title: "Our Mission",
    description: "To empower independent pharmacies with the operational intelligence, compliance protection, and revenue insights they need to thrive in an increasingly complex healthcare landscape — without adding clinical burden.",
    icon: Target,
    type: "mission"
  },
  {
    title: "Our Vision",
    description: "A future where every independent pharmacy — regardless of size — has access to enterprise-grade operational intelligence, enabling them to compete, protect their revenue, and deliver exceptional care to their communities.",
    icon: Eye,
    type: "vision"
  }
];

export const MissionVision = () => {
  return (
    <section className="relative py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {missionVision.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`p-16 rounded-[60px] relative overflow-hidden group
                ${item.type === 'mission' ? 'bg-white/5 border border-white/10' : 'bg-brand-teal/10 border border-brand-teal/20'}
              `}
            >
              <item.icon className="w-12 h-12 text-brand-teal mb-12 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <h3 className="text-4xl font-display font-medium text-white mb-8 italic tracking-tighter">{item.title}</h3>
              <p className="text-lg text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                {item.description}
              </p>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-teal opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
