"use client";

import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Shield, FlaskConical } from 'lucide-react';

const tiers = [
  {
    tier: 'Node_Alpha',
    volume: '< 1k Scripts / Mo',
    recovery: '$12k - $18k',
    efficiency: '+22%',
    icon: FlaskConical
  },
  {
    tier: 'Node_Beta',
    volume: '2k - 5k Scripts / Mo',
    recovery: '$45k - $90k',
    efficiency: '+34%',
    icon: BarChart3
  },
  {
    tier: 'Node_Gamma',
    volume: '10k+ Scripts / Mo',
    recovery: '$240k+',
    efficiency: '+48%',
    icon: TrendingUp
  }
];

export default function PerformanceMatrix() {
  return (
    <section className="py-32 relative border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-teal/[0.02] -skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <span className="text-brand-teal font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-6 block italic">Impact_Data_Set</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-teal-400 leading-[0.9] tracking-tighter uppercase italic mb-8">
               Performance <br/>
               <span className="text-gradient">Benchmarks.</span>
            </h2>
            <p className="text-slate-400 font-mono text-xs uppercase leading-relaxed font-bold opacity-60 mb-10">
               Aggregated data from over 1,200 independent pharmacy nodes currently operating on the PrimeTek Secure-Link™ standard.
            </p>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm">
               <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-5 h-5 text-brand-teal" />
                  <span className="text-[10px] font-mono text-white font-black uppercase tracking-widest">Statistical_Certainty</span>
               </div>
               <p className="text-[10px] text-slate-500 font-mono leading-tight uppercase">
                  Data reflects 2024–2025 fiscal verification. Standard deviation: &lt; 0.02%.
               </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass border-white/5 p-8 flex flex-col justify-between h-[400px] hover:border-brand-teal/30 transition-all rounded-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <node.icon className="w-16 h-16" />
                </div>

                <div>
                   <div className="text-[10px] font-mono text-brand-teal font-black uppercase tracking-widest mb-2 italic">[{node.tier}]</div>
                   <div className="text-white font-mono text-xs uppercase tracking-tight opacity-40 font-bold">{node.volume}</div>
                </div>

                <div className="space-y-8">
                   <div>
                      <div className="text-[9px] text-slate-500 font-mono font-black uppercase tracking-widest mb-1">AVG_MONTHLY_RECOVERY</div>
                      <div className="text-3xl font-display font-black text-teal-400 italic tracking-tighter">{node.recovery}</div>
                   </div>
                   <div className="pt-6 border-t border-white/5">
                      <div className="text-[9px] text-slate-500 font-mono font-black uppercase tracking-widest mb-1">EFFICIENCY_DELTA</div>
                      <div className="text-3xl font-display font-black text-brand-teal italic tracking-tighter">{node.efficiency}</div>
                   </div>
                </div>
                
                <div className="mt-8">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                        className="h-full bg-linear-to-r from-brand-teal/50 to-brand-teal"
                     />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
