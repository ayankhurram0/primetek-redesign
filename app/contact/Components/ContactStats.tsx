"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { value: "100+", label: "Pharmacies Supported" },
  { value: "$4.2M+", label: "Revenue Recovered" },
  { value: "98%", label: "Audit Readiness Score" },
];

export const ContactStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-stat", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-6 border-t border-white/5 bg-brand-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="reveal-stat flex-1">
            <div className="text-5xl font-black text-white mb-4 tracking-tighter">{stat.value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
