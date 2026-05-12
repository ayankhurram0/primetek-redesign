"use client";

import { motion } from 'motion/react';
import { Search, ShieldAlert, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';


const steps = [
  {
    id: '01',
    title: 'Deep Packet Audit',
    desc: 'Full historical claim extraction for the previous 24 months to identify risk patterns.',
    icon: Search,
  },
  {
    id: '02',
    title: 'Node Hardening',
    desc: 'Deployment of the local interception layer and real-time PBM policy sync.',
    icon: ShieldAlert,
  },
  {
    id: '03',
    title: 'Logic Integration',
    desc: 'Configuration of the Workflow_BIOS to align staff actions with clinical efficiency.',
    icon: Cpu,
  },
  {
    id: '04',
    title: 'Validated Armor',
    desc: 'System stress test and 100% audit-proof certification for the specific pharmacy node.',
    icon: CheckCircle2,
  }
];

export default function CaseMethodology() {
  return (
    <section className="py-32 relative border-t border-white/5 overflow-hidden">
      <div className="px-26">
        <div className="mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-teal-400 leading-none tracking-tighter uppercase">
            How We Secure <br />
            <span className="text-white">The Node.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-12 group hover:bg-brand-teal/[0.02] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-white/5 font-display font-bold text-6xl select-none">
                {step.id}
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 rounded-sm border border-white/10 flex items-center justify-center mb-10 group-hover:border-brand-teal transition-colors">
                  <step.icon className="w-10 h-10 text-teal-400  transition-colors" />
                </div>

                <h3 className="text-4xl font-display font-bold text-white uppercase  tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-xl text-slate-500 font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                  {step.desc}
                </p>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-white/5" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
