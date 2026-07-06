"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Target, Eye, Shield, TrendingUp, Sparkles, Layers } from "lucide-react";

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

const corePurposes = [
  {
    keyword: "Simplify.",
    icon: Layers,
    description:
      "We simplify pharmacy operations by eliminating fragmented systems.",
  },
  {
    keyword: "Protect.",
    icon: Shield,
    description:
      "We protect pharmacies through proactive compliance monitoring, revenue intelligence, and early risk detection.",
  },
  {
    keyword: "Grow.",
    icon: TrendingUp,
    description:
      "We help pharmacies grow by turning operational data into business intelligence that drives smarter decisions and higher profitability.",
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

      gsap.fromTo(
        ".reveal-purpose",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".purpose-section",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".reveal-promise",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".promise-section",
            start: "top 82%",
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

        {/* ── Mission & Vision ── */}
        <div className="grid gap-8 md:grid-cols-2">
          {missionVision.map((item) => (
            <div
              key={item.title}
              className="reveal-mission group relative overflow-hidden rounded-[48px] border border-ink/10 bg-white p-16 shadow-xl backdrop-blur-xl transition-all duration-700 hover:shadow-2xl"
            >
              <item.icon className="mb-16 h-16 w-16 text-accent opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
              <h3 className="mb-8 text-6xl font-bold uppercase tracking-tighter text-ink">{item.title}</h3>
              <p className="text-2xl font-medium leading-relaxed text-ink-muted">{item.description}</p>
              <div className="absolute bottom-0 right-0 h-64 w-64 bg-brand-teal opacity-0 blur-[100px] transition-opacity group-hover:opacity-5" />
            </div>
          ))}
        </div>

        {/* ── Our Core Purpose ── */}
        <div className="purpose-section mt-24">
          <div className="reveal-purpose text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-teal-400/40" />
              <span className="text-accent font-bold text-xs tracking-widest uppercase">Our Core Purpose</span>
              <div className="h-[1px] w-12 bg-teal-400/40" />
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-ink tracking-tight">
              Simplify. Protect. <span className="text-accent">Grow.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {corePurposes.map((item) => (
              <div
                key={item.keyword}
                className="reveal-purpose group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-10 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-teal-400/30"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-ink mb-3">{item.keyword}</h3>
                <p className="text-xl leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── The Primetek Promise ── */}
        <div className="promise-section mt-24">
          <div className="reveal-promise rounded-[48px] border border-ink/10 bg-white shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — heading */}
              <div className="p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-ink/10 bg-accent/5">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-accent" />
                  <span className="text-accent font-bold text-sm tracking-widest uppercase">The Primetek Promise</span>
                </div>
                <h2 className="text-5xl font-bold text-ink leading-tight mb-6">
                  One Platform.<br />One Login.<br />
                  <span className="text-accent">Complete Operational Intelligence.</span>
                </h2>
                <div className="h-1 w-16 bg-accent rounded-full mt-2" />
              </div>

              {/* Right — body copy */}
              <div className="p-16 flex flex-col gap-8 justify-center">
                <p className="reveal-promise text-2xl font-medium leading-relaxed text-ink-muted">
                  We believe pharmacy owners should spend their time leading their business—not chasing reports, logging into multiple websites, or trying to interpret complex PBM data.
                </p>
                <p className="reveal-promise text-2xl font-medium leading-relaxed text-ink-muted">
                  Primetek works behind the scenes every day—collecting data, monitoring compliance, analyzing financial performance, and delivering clear recommendations—so pharmacy owners can focus on:
                </p>
                <ul className="reveal-promise space-y-3">
                  {[
                    "Expanding clinical services",
                    "Strengthening patient relationships",
                    "Increasing revenue",
                    "Building the future of their pharmacy",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-3 text-xl font-semibold text-ink">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
