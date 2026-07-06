"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Target, Eye } from "lucide-react";

const missionVision = [
  {
    title: "Our Mission",
    description:
      "At Primetek Services, our mission is to transform the independent pharmacy industry by bringing every critical operational function into one intelligent platform. We leverage AI, advanced analytics, and pharmacy expertise to automate reporting, simplify compliance, and uncover hidden revenue opportunities—so owners get their time back. We do the analysis. You make the decisions.",
    icon: Target,
    type: "mission",
  },
  {
    title: "Our Vision",
    description:
      "To become the leading AI-powered operational intelligence platform for independent pharmacies across the United States—centralizing every critical insight in one secure dashboard so pharmacies can stay compliant, maximize reimbursements, detect risks early, and thrive in an increasingly complex healthcare environment.",
    icon: Eye,
    type: "vision",
  },
];

export const MissionVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-mission",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-transparent px-26 py-24">
      <div className="relative z-10">
        <div className="grid gap-8 md:grid-cols-2">
          {missionVision.map((item) => (
            <div
              key={item.title}
              className="reveal-mission group relative overflow-hidden rounded-[48px] border border-ink/10 bg-white/[0.02] p-16 shadow-xl backdrop-blur-xl transition-all duration-700 hover:shadow-2xl"
            >
              <item.icon className="mb-16 h-16 w-16 text-accent opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
              <h3 className="mb-8 text-6xl font-bold uppercase tracking-tighter text-ink">{item.title}</h3>
              <p className="text-2xl font-medium leading-relaxed text-ink-muted">{item.description}</p>
              <div className="absolute bottom-0 right-0 h-64 w-64 bg-brand-teal opacity-0 blur-[100px] transition-opacity group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
