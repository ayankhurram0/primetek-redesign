"use client";

import { motion } from 'motion/react';
import { useRef } from 'react';
import { Radio } from 'lucide-react';


export default function NetworkPulse() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-ink/10">
      <div className="px-26">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Tactical Visualization */}
          <div className="lg:col-span-12 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-brand-teal" />
              <span className="text-accent font-mono text-[9px] font-bold uppercase tracking-[0.5em] ">Live_Network_Telemetry</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-accent  uppercase tracking-tighter mb-8 leading-none">
                  Global <br />
                  <span className="text-ink">Operational Grid.</span>
                </h2>
                <p className="text-ink-muted font-mono text-xs uppercase max-w-sm leading-relaxed mb-12 opacity-60">
                  Real-time visualization of audit interception nodes and revenue synchronization across the Northeast pharmacy corridor.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="text-accent font-display font-bold text-3xl  tracking-tighter">4,812</div>
                    <div className="text-[8px] text-ink-subtle font-mono font-bold uppercase tracking-widest mt-1">ACTIVE_NODES</div>
                  </div>
                  <div>
                    <div className="text-accent font-display font-bold text-3xl  tracking-tighter">128ms</div>
                    <div className="text-[8px] text-ink-subtle font-mono font-bold uppercase tracking-widest mt-1">AVG_LATENCY</div>
                  </div>
                </div>
              </div>

              {/* Grid Vis */}
              <div className="relative aspect-square lg:aspect-video bg-white/[0.02] border border-ink/10 overflow-hidden group">
                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Visual Nodes */}
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                    className="absolute w-2 h-2 bg-brand-teal rounded-full"
                    style={{
                      top: `${Math.random() * 90 + 5}%`,
                      left: `${Math.random() * 90 + 5}%`
                    }}
                  >
                    <div className="absolute inset-0 bg-brand-teal/50 blur-[4px] rounded-full" />
                  </motion.div>
                ))}

                {/* Scanning Line */}
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 w-full h-[1px] bg-brand-teal/20 pointer-events-none"
                />

                <div className="absolute top-6 right-6 flex flex-col items-end">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-sm border border-accent/30 bg-brand-teal/5">
                    <Radio className="w-3 h-3 text-accent animate-pulse" />
                    <span className="text-[8px] font-mono text-accent font-bold uppercase tracking-widest">TRANSMISSION_ACTIVE</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 text-[7px] font-mono text-ink-subtle font-bold uppercase tracking-[0.2em]">
                  SECURE_LINK_ENCRYPTION_PROTOCOL_v4.2.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
