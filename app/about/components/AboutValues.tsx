"use client";

import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";

export default function AboutValues() {
  const values = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in every operational system we build, ensuring trust and transparency.",
      icon: "⚖️"
    },
    {
      title: "Excellence",
      description: "Our dedicated approach focuses on precision, quality, and results that exceed industry expectations.",
      icon: "🏆"
    },
    {
      title: "Innovation",
      description: "We leverage modern technologies to solve complex healthcare operational challenges.",
      icon: "💡"
    },
    {
      title: "Collaboration",
      description: "We work as an extension of your team, aligning our goals with your organization's mission.",
      icon: "🤝"
    },
    {
      title: "Compliance",
      description: "Ensuring every non-clinical process meets the rigorous regulatory requirements of global healthcare.",
      icon: "📋"
    },
    {
      title: "Resilience",
      description: "We build systems that are audit-proof and designed to withstand the pressures of growth.",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <AnimationWrapper direction="up" distance={20}>
            <span className="text-[#2b4c8c] font-black text-sm uppercase tracking-widest mb-4 block">
              Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#2b4c8c] leading-tight mb-6">
              The Principles That Drive Our <span className="text-[#71c6a4]">Success</span>
            </h2>
          </AnimationWrapper>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <StaggerItem key={index}>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(43,76,140,0.05)] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-16 h-16 bg-[#2b4c8c]/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-[#71c6a4]/10 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-[#2b4c8c] mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
