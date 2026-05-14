import { motion } from "motion/react";
import { Search, FolderSync, FileCheck, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery Call",
    description: "We learn your pharmacy's specific challenges, PBM contracts, and performance goals.",
    icon: Search
  },
  {
    id: "02",
    title: "Data Onboarding",
    description: "Secure data intake and system setup.",
    icon: FolderSync
  },
  {
    id: "03",
    title: "First Report Cycle",
    description: "Your first performance report with immediate findings.",
    icon: FileCheck
  },
  {
    id: "04",
    title: "Ongoing Intelligence",
    description: "Real-time alerts and quarterly strategy reviews.",
    icon: TrendingUp
  }
];

export const ServicesOnboarding = () => {
  return (
    <section className="relative py-44 px-26 overflow-hidden">
      <div className="relative z-10 text-center">
        <h2 className="text-lg font-bold uppercase tracking-[0.5em] text-brand-teal mb-8">The Workflow</h2>
        <h3 className="text-6xl md:text-6xl xl:text-6xl font-montserrat font-bold text-teal-400 mb-24 tracking-tighter">From Onboarding <br className="md:hidden" /> to Intelligence.</h3>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px bg-white/5" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="w-24 h-24 bg-white/5 backdrop-blur-md border-2 border-white/5 flex items-center justify-center mx-auto mb-12 relative z-10 group-hover:border-teal-400 transition-all duration-700 shadow-2xl">
                <div className="absolute inset-0 bg-teal-400 opacity-0 group-hover:opacity-5 blur-xl" />
                <step.icon className="w-10 h-10 text-slate-600 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="text-base font-bold uppercase tracking-[0.4em] text-teal-400 mb-4">Step {step.id}</div>
              <h4 className="text-3xl font-montserrat font-display font-medium text-white mb-6">{step.title}</h4>
              <p className="text-slate-500 font-montserrat text-xl leading-relaxed max-w-[280px] mx-auto group-hover:text-slate-300 transition-colors">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
