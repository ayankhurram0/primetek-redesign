import { useEffect, useRef } from "react";
import gsap from "gsap";

const timeline = [
  { year: "2018", event: "Genesis" },
  { year: "2020", event: "Expansion" },
  { year: "2022", event: "Live Logic" },
  { year: "2024", event: "Surplus" },
  { year: "2026", event: "Horizon" },
];

export const Evolution = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-evolution", {
        opacity: 0,
        x: 40,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-44 px-6 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <div>
          <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">Evolution</h2>
          <h3 className="text-6xl font-black text-brand-dark mb-12 tracking-tighter uppercase leading-none">The Trajectory of <br /> <span className="text-brand-teal">Impact.</span></h3>
          <p className="text-slate-500 text-xl font-light leading-relaxed mb-12 max-w-md">
            From a small New Jersey office to a national operational hub. We didn't grow by marketing; we grew by winning audit defenses and recovering millions in ghost revenue.
          </p>
          <button className="bg-brand-dark text-white px-10 py-5 rounded-xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-brand-teal transition-all">
            Join the Network
          </button>
        </div>

        <div className="space-y-4">
          {timeline.map((t, i) => (
            <div 
              key={t.year}
              className="reveal-evolution flex items-center gap-8 group"
            >
              <div className="text-5xl font-black text-slate-100 group-hover:text-brand-teal transition-colors tracking-tighter">{t.year}</div>
              <div className="h-px flex-1 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-teal translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              </div>
              <div className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-brand-dark transition-colors">{t.event}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
