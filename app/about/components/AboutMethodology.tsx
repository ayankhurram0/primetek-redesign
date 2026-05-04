import { Microscope, Zap, ShieldCheck, Dna, Globe2 } from 'lucide-react';

export default function AboutMethodology() {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00d2c1 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <div>
            <span className="text-brand-teal font-display font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Core Methodology</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-8 leading-tight">
              A Systemic Approach <br/>
              <span className="text-slate-500 font-light italic">to Reliability.</span>
            </h2>
            <div className="space-y-12 mt-12">
              {[
                { icon: Microscope, title: 'Granular Diagnostics', text: 'We perform deep-layer analysis of your pharmacy operations, identifying micro-leaks in revenue and compliance.' },
                { icon: Zap, title: 'Synchronous Integration', text: 'Our systems integrate seamlessly with existing software, creating a unified operational dashboard.' },
                { icon: ShieldCheck, title: 'Defensive Architecture', text: 'Every process is built with audit-defense in mind, ensuring 100% readiness for regulatory scrutiny.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl glass border-brand-teal/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-brand-teal w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold uppercase italic tracking-tight mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
         </div>
         
         <div className="relative">
            <div className="absolute -inset-10 bg-brand-teal/5 blur-[120px] rounded-full" />
            <div className="glass rounded-[48px] p-12 border-white/5 relative z-10">
               <div className="flex items-center justify-between mb-12">
                 <div className="flex items-center gap-2">
                    <Dna className="text-brand-teal w-6 h-6 animate-pulse" />
                    <span className="text-white font-display font-bold text-xs uppercase tracking-widest italic">PrimeTek DNA</span>
                 </div>
                 <div className="px-4 py-1 rounded-full border border-brand-teal/20 text-[10px] text-brand-teal font-bold uppercase tracking-widest">Active Standard: v2.6</div>
               </div>
               
               <div className="space-y-8">
                 <div className="h-64 w-full glass rounded-3xl border-brand-teal/10 flex items-center justify-center group overflow-hidden">
                    <Globe2 className="w-40 h-40 text-brand-teal/10 absolute -bottom-10 -right-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                    <div className="text-center">
                       <div className="text-6xl font-display font-black text-white italic mb-2 tracking-tighter">1.2k+</div>
                       <div className="text-xs text-brand-teal font-bold uppercase tracking-[0.3em]">Pharmacies Optimized</div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 glass rounded-3xl border-white/5">
                      <div className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-2">Audit Wins</div>
                      <div className="text-3xl font-display font-bold text-white uppercase italic">98%</div>
                    </div>
                    <div className="p-6 glass rounded-3xl border-white/5">
                      <div className="text-slate-500 text-[8px] font-bold uppercase tracking-widest mb-2">Avg Improvement</div>
                      <div className="text-3xl font-display font-bold text-brand-teal uppercase italic">18.5%</div>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
