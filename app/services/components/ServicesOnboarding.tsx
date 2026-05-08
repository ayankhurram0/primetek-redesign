import { motion } from "motion/react";
import { Search, FolderSync, FileCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discovery Audit",
    description: "We learn your pharmacy's specific challenges, PBM contracts, and reimbursement goals through an initial deep-dive analysis.",
    icon: Search
  },
  {
    id: "02",
    title: "Secure Onboarding",
    description: "Our technical team handles the secure data intake and system setup within the first seven days of partnership.",
    icon: FolderSync
  },
  {
    id: "03",
    title: "Intelligence Cycle",
    description: "Within 14 days, your first performance reports are delivered with immediate, actionable findings and risk alerts.",
    icon: FileCheck
  }
];

export const ServicesOnboarding = () => {
  return (
    <section className="relative py-44 px-26 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="relative z-10 text-center">
        <h2 className="text-lg font-black uppercase tracking-[0.5em] text-brand-teal mb-8">The Workflow</h2>
        <h3 className="text-6xl md:text-6xl xl:text-6xl font-poppins font-bold text-teal-400 mb-24 tracking-tighter">From Onboarding <br className="md:hidden" /> to Intelligence.</h3>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-white/5" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="w-24 h-24 bg-brand-dark border-2 border-white/5 flex items-center justify-center mx-auto mb-12 relative z-10 group-hover:border-brand-teal transition-all duration-700 shadow-2xl">
                 <div className="absolute inset-0 bg-teal-400 opacity-0 group-hover:opacity-5 blur-xl" />
                 <step.icon className="w-10 h-10 text-slate-600 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="text-base font-black uppercase tracking-[0.4em] text-teal-400 mb-4">Step {step.id}</div>
              <h4 className="text-3xl font-poppins font-display font-medium text-white mb-6">{step.title}</h4>
              <p className="text-slate-500 font-poppins text-xl leading-relaxed max-w-[280px] mx-auto group-hover:text-slate-300 transition-colors">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
