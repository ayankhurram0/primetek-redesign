"use client";

import { motion } from 'motion/react';

const stats = [
  { label: 'Pharmacies Supported', value: '100+' },
  { label: 'Revenue Recovered', value: '$4.2M+' },
  { label: 'Audit Readiness Score', value: '98%' },
  { label: 'Response Time', value: '1 Day' },
];

export default function ContactStats() {
  return (
    <section className="py-32 bg-brand-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-950 p-12 flex flex-col items-center group hover:bg-brand-teal/[0.02] transition-colors"
            >
              <div className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter mb-4 group-hover:scale-105 transition-transform">{stat.value}</div>
              <div className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] leading-tight text-center">{stat.label.replace(' ', '_')}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
