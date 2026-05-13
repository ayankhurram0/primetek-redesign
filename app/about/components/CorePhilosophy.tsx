"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
import { ShieldCheck, Target, Users, Lightbulb } from "lucide-react";

const values = [
  {
    title: "Radical Integrity",
    description: "In an industry of hidden fees, we operate with 100% data transparency.",
    icon: ShieldCheck,
    size: "large"
  },
  {
    title: "Precision First",
    description: "Every claim, every code, every cent accounted for.",
    icon: Target,
    size: "small"
  },
  {
    title: "Human Protocol",
    description: "We handle the machines so you can stay human with your patients.",
    icon: Users,
    size: "small"
  },
  {
    title: "The Intelligence Advantage",
    description: "Transforming raw data into actionable pharmacy survival guides.",
    icon: Lightbulb,
    size: "medium"
  },
];

export const CorePhilosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-philosophy",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
    <section ref={containerRef} className="py-24 px-26 relative bg-transparent overflow-hidden">
      <div className="relative z-10">
        <div className="mb-24">
          <div className="text-6xl font-bold text-teal-400 uppercase leading-none tracking-tighter">We exist to shift the leverage back <br /><span className="text-white uppercase"> to the independent owner.</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[400px]">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`reveal-philosophy bg-white/[0.03] p-10 rounded-[32px] border border-white/10 flex flex-col justify-between group overflow-hidden relative hover:bg-white/[0.06] hover:shadow-2xl transition-all backdrop-blur-xl
                ${v.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${v.size === 'medium' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal opacity-0 group-hover:opacity-5 blur-3xl transition-opacity" />
              <v.icon className="w-12 h-12 text-teal-400 mb-16 opacity-30 group-hover:opacity-100 transition-all" />
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 uppercase leading-none">{v.title}</h3>
                <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-[250px] transition-colors">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
