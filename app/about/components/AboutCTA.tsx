export default function AboutCTA() {
  return (
    <section className="py-40 relative border-t border-white/5 bg-brand-900/20">
       <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-brand-teal/20 mb-12">
             <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
             <span className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.4em]">Live Operational Impact</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-10 leading-tight">
             Secure your <span className="text-gradient italic">legacy</span> today.
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed mb-16 mx-auto max-w-2xl">
             Join over 1,200 independent pharmacies who have reclaimed their operational narrative through PrimeTek intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button className="px-10 py-5 bg-brand-teal text-brand-950 font-bold rounded-full hover:glow-teal active:scale-95 transition-all uppercase tracking-widest text-xs">
                Request a Strategy Call
             </button>
             <button className="px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                Explore Case Studies
             </button>
          </div>
       </div>
    </section>
  );
}
