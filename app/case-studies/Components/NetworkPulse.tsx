import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Activity, Radio, Database, ShieldAlert, Cpu } from 'lucide-react';

interface NetworkEvent {
  id: string;
  type: 'SYNC' | 'AUDIT' | 'REV' | 'NODE';
  message: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'CRITICAL';
}

const EVENT_TYPES = {
  SYNC: { icon: Database, color: 'text-blue-400', label: 'NODE_SYNC' },
  AUDIT: { icon: ShieldAlert, color: 'text-red-400', label: 'AUDIT_SHIELD' },
  REV: { icon: Activity, color: 'text-brand-teal', label: 'REV_CAPTURE' },
  NODE: { icon: Cpu, color: 'text-slate-400', label: 'SYSTEM_UP' },
};

const LOCATIONS = ['NEW_YORK', 'BOSTON', 'PHILADELPHIA', 'NEW_JERSEY', 'MARYLAND', 'VIRGINIA', 'DELAWARE'];

export default function NetworkPulse() {
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateEvent = () => {
      const types: (keyof typeof EVENT_TYPES)[] = ['SYNC', 'AUDIT', 'REV', 'NODE'];
      const type = types[Math.floor(Math.random() * types.length)];
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

      const newEvent: NetworkEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        message: `${location} :: ${Math.floor(Math.random() * 1000)}ms latency :: PROTOCOL_${Math.floor(Math.random() * 900) + 100}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        status: Math.random() > 0.8 ? 'WARNING' : 'SUCCESS',
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 50));
    };

    const interval = setInterval(generateEvent, 3000);
    generateEvent(); // Initial call

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-brand-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Tactical Visualization */}
          <div className="lg:col-span-12 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-brand-teal" />
              <span className="text-teal-400 font-mono text-[10px] font-black uppercase tracking-[0.5em] italic">Live_Network_Telemetry</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-teal-400 italic uppercase tracking-tighter mb-8 leading-none">
                  Global <br />
                  <span className="text-white">Operational Grid.</span>
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase max-w-sm leading-relaxed mb-12 opacity-60">
                  Real-time visualization of audit interception nodes and revenue synchronization across the Northeast pharmacy corridor.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <div className="text-white font-display font-black text-3xl italic tracking-tighter">4,812</div>
                    <div className="text-[9px] text-slate-500 font-mono font-black uppercase tracking-widest mt-1">ACTIVE_NODES</div>
                  </div>
                  <div>
                    <div className="text-brand-teal font-display font-black text-3xl italic tracking-tighter">128ms</div>
                    <div className="text-[9px] text-slate-500 font-mono font-black uppercase tracking-widest mt-1">AVG_LATENCY</div>
                  </div>
                </div>
              </div>

              {/* Grid Vis */}
              <div className="relative aspect-square lg:aspect-video bg-white/[0.02] border border-white/5 overflow-hidden group">
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
                  <div className="flex items-center gap-2 px-3 py-1 rounded-sm border border-brand-teal/30 bg-brand-teal/5">
                    <Radio className="w-3 h-3 text-brand-teal animate-pulse" />
                    <span className="text-[9px] font-mono text-brand-teal font-black uppercase tracking-widest">TRANSMISSION_ACTIVE</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 text-[8px] font-mono text-slate-500 font-bold uppercase tracking-[0.2em]">
                  SECURE_LINK_ENCRYPTION_PROTOCOL_v4.2.0
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Log */}
          <div className="lg:col-span-12">
            <div className="bg-brand-950 border border-white/5 rounded-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-[10px] font-mono text-white font-black uppercase tracking-widest">LIVE_TELEMETRY_FEED</span>
                </div>
                <span className="text-[9px] text-slate-500 font-mono font-bold uppercase">Uptime: 99.98%</span>
              </div>

              <div
                ref={scrollRef}
                className="h-80 overflow-y-auto font-mono scrollbar-hide text-[10px] p-6 space-y-2 select-none"
              >
                {events.length === 0 && (
                  <div className="text-slate-600 animate-pulse">Initializing data streams...</div>
                )}
                {events.map((event) => {
                  const Meta = EVENT_TYPES[event.type];
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 py-1 group"
                    >
                      <span className="text-slate-600 font-bold">[{event.timestamp}]</span>
                      <span className={`${Meta.color} font-black w-24 shrink-0`}>{Meta.label}</span>
                      <span className="text-slate-400 group-hover:text-white transition-colors">{event.message}</span>
                      <span className={`ml-auto font-black ${event.status === 'SUCCESS' ? 'text-brand-teal' : 'text-red-400 opacity-80'}`}>
                        {event.status}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
