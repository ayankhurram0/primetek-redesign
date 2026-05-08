"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Building2, MousePointer2 } from "lucide-react";

const locations = [
  { city: "Newark, NJ", address: "One Gateway Center, Suite 2301", type: "Command Center" },
  { city: "Philadelphia, PA", address: "1901 Market St, Level 42", type: "Analytics Hub" },
  { city: "New York, NY", address: "250 Park Ave, Floor 7", type: "Client Relations" }
];

export const OfficeLocations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".location-reveal", {
        opacity: 0,
        y: 30,
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
    <section ref={containerRef} className="py-44 px-6 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="location-reveal text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">Physical Presence</h2>
          <h3 className="location-reveal text-6xl font-black text-brand-dark leading-[0.9] tracking-tighter uppercase mb-2">Our Strategic <br /> <span className="text-brand-teal">Network.</span></h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <div key={i} className="location-reveal bg-brand-light p-12 rounded-[48px] group hover:bg-white hover:shadow-2xl transition-all border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity" />
               <div className="flex items-start justify-between mb-12">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl group-hover:bg-brand-dark group-hover:text-white group-hover:border-brand-dark transition-all duration-500 shadow-sm">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal bg-brand-teal/5 px-4 py-1.5 rounded-full border border-brand-teal/10">
                    {loc.type}
                  </div>
               </div>
               <h4 className="text-3xl font-black text-brand-dark mb-4 uppercase tracking-tighter">{loc.city}</h4>
               <p className="text-slate-500 font-medium text-lg mb-10 group-hover:text-slate-600 transition-colors">
                 {loc.address}
               </p>
               <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-dark transition-colors group/btn">
                 Get Directions <MousePointer2 className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
               </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
