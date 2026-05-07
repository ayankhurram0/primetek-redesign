import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export const OurStory = () => {
  return (
    <section className="relative py-44 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[48px] overflow-hidden relative group">
               <img 
                src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200" 
                alt="Pharmacy Team" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply" />
              <div className="absolute bottom-10 right-[-20px] bg-brand-teal p-10 rounded-[40px] shadow-2xl flex flex-col items-center">
                <span className="text-5xl font-black font-outfit text-brand-dark">8+</span>
                <span className="text-[10px] font-black text-brand-dark uppercase tracking-[0.4em] text-center mt-3 leading-tight opacity-70">Years Serving<br/>Pharmacies</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">Our Story</h2>
            <h3 className="text-6xl font-display font-medium text-white mb-10 leading-[0.95] tracking-tighter">Why We Started <br /> <span className="italic">PrimeTek.</span></h3>
            
            <div className="space-y-8 text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-xl">
              <p>
                Independent pharmacies are the backbone of community healthcare — yet they're constantly squeezed by PBM pressure, audit risk, and shrinking reimbursements. Most don't have the internal resources to fight back with data.
              </p>
              <p>
                PrimeTek was founded to change that. We built a team of pharmacy operations specialists, data analysts, and compliance experts with one goal: give independent and multi-location pharmacies 
                the same level of operational intelligence that large chains take for granted.
              </p>
            </div>

            <div className="space-y-5">
               {[ 
                 "Non-clinical focus — we handle operations, you handle patient care",
                 "Pharmacy-exclusive practice — no generalist consulting",
                 "Structured, recurring support — not one-time engagements"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-5 group">
                   <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-teal transition-all duration-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal group-hover:text-brand-dark transition-colors" />
                   </div>
                   <span className="text-slate-400 font-medium text-xs uppercase tracking-widest group-hover:text-white transition-colors">{text}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
