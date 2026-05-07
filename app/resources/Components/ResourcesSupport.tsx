import { MessageSquare, ArrowRight } from 'lucide-react';

export default function ResourcesSupport() {
  return (
    <section className="py-40 relative border-t border-white/5 bg-brand-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-8 uppercase leading-tight tracking-tighter">
                 Operational <br/>
                 <span className="text-gradient">Advocacy</span>.
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-lg">
                 Facing a complex audit or technical rejection? Our operational leads are available for immediate strategic escalation.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                 <button className="px-10 py-5 bg-brand-teal text-brand-950 font-bold rounded-full hover:glow-teal active:scale-95 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Open Support Ticket
                 </button>
                 <button className="px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                    Technical Specifications
                 </button>
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute -inset-10 bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="glass rounded-[48px] p-12 border-white/10 relative z-10 text-center">
                 <div className="text-brand-teal text-[8px] font-bold uppercase tracking-[0.5em] mb-4">Support Latency</div>
                 <div className="text-6xl font-display font-black text-white mb-2 tracking-tighter">&lt; 15m</div>
                 <div className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mb-12">Average Response Time</div>
                 
                 <div className="h-40 w-full glass rounded-3xl border-brand-teal/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,193,0.1)_0%,transparent_70%)] animate-pulse" />
                    <span className="relative text-[10px] text-brand-teal font-bold uppercase tracking-[0.4em] z-10">Monitoring Network Status...</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
