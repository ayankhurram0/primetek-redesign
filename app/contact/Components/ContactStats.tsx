"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100+", label: "Pharmacies Supported" },
  { value: "$4.2M+", label: "Revenue Recovered" },
  { value: "98%", label: "Audit Readiness Score" },
  { value: "1 Day", label: "Response Time" },
];

export const ContactStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-26 border-t border-ink/10 bg-transparent pb-40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="reveal-stat flex-1">
            <div className="text-5xl font-bold text-accent mb-4 tracking-tighter">{stat.value}</div>
            <div className="text-lg font-bold uppercase tracking-[0.4em] text-ink">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
