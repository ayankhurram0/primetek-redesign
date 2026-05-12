"use client";

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';


const faqs = [
  {
    q: "How does PrimeTek manage PBM audits?",
    a: "We deploy a proactive monitoring system that flags high-risk NDC patterns and ensures your documentation matches PBM requirements before an audit is even triggered."
  },
  {
    q: "Is there a long-term commitment needed?",
    a: "Our operational systems are built for continuity, but we offer modular service agreements that can be scaled based on your pharmacy's volume and specific risk profile."
  },
  {
    q: "How secure is my pharmacy's patient data?",
    a: "We utilize AES-256 military-grade encryption and full HIPAA-aligned data processing nodes. All systems are SOC2 Type II compliant."
  }
];

export default function ResourcesFAQ() {
  return (
    <section className="py-32 px-26 relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase leading-tight tracking-tighter">
          Common <span className="text-teal-400">Questions.</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden group hover:border-teal-400/30 transition-colors"
          >
            <details className="w-full">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{faq.q}</h3>
                <ChevronDown className="text-teal-400 w-10 h-10 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-8 pb-8 text-slate-400 text-2xl leading-relaxed border-t border-white/5 pt-6">
                {faq.a}
              </div>
            </details>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
