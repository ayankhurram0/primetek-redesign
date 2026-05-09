"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo(".reveal-evolution",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-26 relative overflow-hidden bg-transparent">
      <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
        <div>
          <h3 className="text-6xl font-bold text-white mb-12 tracking-tighter uppercase leading-none">The Trajectory of <br /> <span className="text-teal-400">Impact.</span></h3>
          <p className="text-slate-400 text-2xl font-light leading-relaxed mb-12 w-[90%]">
            From a small New Jersey office to a national operational hub. We didn't grow by marketing; we grew by winning audit defenses and recovering millions in ghost revenue.
          </p>
        </div>

        <div className="space-y-4">
          {timeline.map((t, i) => (
            <div
              key={t.year}
              className="reveal-evolution flex items-center gap-8 group"
            >
              <div className="text-5xl font-bold text-white/5 group-hover:text-teal-400 transition-colors tracking-tighter duration-500">{t.year}</div>
              <div className="h-px flex-1 bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out" />
              </div>
              <div className="text-lg font-bold uppercase tracking-[0.3em] text-slate-500 group-hover:text-teal-400 transition-colors duration-500">{t.event}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
