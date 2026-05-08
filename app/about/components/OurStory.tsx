import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CheckCircle2 } from "lucide-react";

export const OurStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-story", {
        opacity: 0,
        x: (i, target) => (target as HTMLElement).dataset.dir === "left" ? -40 : 40,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-44 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div 
            data-dir="left"
            className="reveal-story relative"
          >
            <div className="aspect-[4/3] rounded-[48px] overflow-hidden relative group border border-slate-100 shadow-2xl">
               <img 
                src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200" 
                alt="Pharmacy Team" 
                className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
              <div className="absolute bottom-10 right-[-20px] bg-brand-dark p-10 rounded-[40px] shadow-2xl flex flex-col items-center border border-white/10">
                <span className="text-6xl font-black text-brand-teal leading-none">8+</span>
                <span className="text-[12px] font-black text-white uppercase tracking-[0.4em] text-center mt-3 leading-tight opacity-70">Years Serving<br/>Pharmacies</span>
              </div>
            </div>
          </div>

          <div
            data-dir="right"
            className="reveal-story"
          >
            <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">Our Story</h2>
            <h3 className="text-6xl font-black text-brand-dark mb-10 leading-[0.95] tracking-tighter uppercase">Why We Started <br /> <span className="text-brand-teal uppercase">PrimeTek.</span></h3>
            
            <div className="space-y-8 text-slate-500 text-xl font-light leading-relaxed mb-12 max-w-xl">
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
                   <div className="w-8 h-8 rounded-lg bg-brand-light border border-slate-100 flex items-center justify-center group-hover:bg-brand-teal transition-all duration-500">
                      <CheckCircle2 className="w-5 h-5 text-brand-teal group-hover:text-white transition-colors" />
                   </div>
                   <span className="text-slate-500 font-bold text-sm uppercase tracking-widest group-hover:text-brand-dark transition-colors">{text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
