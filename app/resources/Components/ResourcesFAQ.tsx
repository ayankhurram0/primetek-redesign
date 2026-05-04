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
    <section className="py-32 border-t border-white/5 bg-brand-900/10">
      <div className="max-w-3xl mx-auto px-6 text-center mb-20">
         <span className="text-brand-teal font-display font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Intelligence Base</span>
         <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 uppercase italic leading-tight">
            Common <span className="text-gradient">Questions</span>.
         </h2>
      </div>

      <div className="max-w-3xl mx-auto px-6 space-y-4">
         {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl border-white/5 overflow-hidden group"
            >
               <details className="w-full">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                     <h3 className="text-lg font-display font-bold text-white uppercase italic tracking-tight">{faq.q}</h3>
                     <ChevronDown className="text-brand-teal w-5 h-5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-8 pb-8 text-slate-400 font-light text-sm leading-relaxed border-t border-white/5 pt-6">
                     {faq.a}
                  </div>
               </details>
            </motion.div>
         ))}
      </div>
    </section>
  );
}
