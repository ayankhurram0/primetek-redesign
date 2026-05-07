import { Briefcase, ArrowRight } from 'lucide-react';

export default function BlogNewsletter() {
  return (
    <section className="py-32 relative border-t border-white/5 bg-brand-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[48px] p-12 lg:p-20 border-white/5 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center mb-8 mx-auto lg:mx-0">
                 <Briefcase className="text-brand-950 w-8 h-8" />
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-teal-400 mb-6 uppercase italic leading-tight">
                 Operational <span className="text-gradient">Briefing</span>.
              </h2>
              <p className="text-slate-400 font-light text-lg leading-relaxed max-w-lg">
                 Receive high-frequency technical updates on pharmacy law, audit changes, and performance optimization models.
              </p>
           </div>
           
           <div className="lg:w-1/2 w-full relative z-10">
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="operator@pharmacy.com" 
                   className="flex-1 glass bg-white/5 border-white/10 rounded-full py-5 px-8 text-sm text-white focus:outline-none focus:border-brand-teal/50 transition-all font-mono"
                 />
                 <button className="px-10 py-5 bg-brand-teal text-brand-950 font-bold rounded-full hover:glow-teal active:scale-95 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                    Subscribe <ArrowRight className="w-4 h-4" />
                 </button>
              </form>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-6 text-center lg:text-left">
                 Privacy Guaranteed. Data secured via encryption standard 2.0.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
