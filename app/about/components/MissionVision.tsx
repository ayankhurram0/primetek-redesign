"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Target, Eye } from "lucide-react";

const missionVision = [
  {
    title: "Our Mission",
    description: "To empower independent pharmacies with the operational intelligence, compliance protection, and revenue insights they need to thrive in an increasingly complex healthcare landscape — without adding clinical burden.",
    icon: Target,
    type: "mission"
  },
  {
    title: "Our Vision",
    description: "A future where every independent pharmacy — regardless of size — has access to enterprise-grade operational intelligence, enabling them to compete, protect their revenue, and deliver exceptional care to their communities.",
    icon: Eye,
    type: "vision"
  }
];

export const MissionVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-mission",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
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
    <section ref={containerRef} className="py-24 px-26 relative bg-transparent">
      <div className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {missionVision.map((item, i) => (
            <div
              key={item.title}
              className={`reveal-mission p-16 rounded-[48px] relative overflow-hidden group bg-white/[0.02] border border-ink/10 shadow-xl hover:shadow-2xl transition-all duration-700 backdrop-blur-xl
              `}
            >
              <item.icon className="w-16 h-16 text-accent mb-16 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <h3 className="text-6xl font-bold text-ink mb-8 tracking-tighter uppercase">{item.title}</h3>
              <p className="text-2xl text-ink-muted font-medium leading-relaxed">
                {item.description}
              </p>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-teal opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
