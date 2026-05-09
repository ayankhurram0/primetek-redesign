import { MessageSquare, ArrowRight } from 'lucide-react';
import { DecorativeBackground } from '../../components/DecorativeBackground';

export default function ResourcesSupport() {
   return (
      <section className="py-32 px-26 relative overflow-hidden bg-transparent border-t border-white/5">
         <DecorativeBackground id="resources-support" />
         <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-5xl md:text-6xl xl:text-6xl font-bold text-white mb-8 uppercase leading-none tracking-tighter">
                     Operational <br />
                     <span className="text-teal-400">Advocacy.</span>
                  </h2>
                  <p className="text-slate-400 text-2xl font-light leading-relaxed mb-12 max-w-2xl">
                     Facing a complex audit or technical rejection? Our operational leads are available for immediate strategic escalation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                     <button className="px-10 py-5 bg-teal-400 text-brand-dark font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-base flex items-center justify-center gap-3">
                        <MessageSquare className="w-5 h-5" /> Open Support Ticket
                     </button>
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute -inset-10 bg-teal-400/5 blur-[120px] rounded-full pointer-events-none" />
                  <div className="bg-white/5 backdrop-blur-md rounded-[48px] p-12 border border-white/10 relative z-10 text-center">
                     <div className="text-teal-400 text-sm font-bold uppercase tracking-[0.5em] mb-4">Support Latency</div>
                     <div className="text-7xl font-bold text-white mb-4 tracking-tighter">&lt; 15m</div>
                     <div className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em] mb-12">Average Response Time</div>

                     <div className="h-40 w-full bg-white/5 rounded-3xl border border-teal-400/20 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)] animate-pulse" />
                        <span className="relative text-xs text-teal-400 font-bold uppercase tracking-[0.4em] z-10">Monitoring Network Status...</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
