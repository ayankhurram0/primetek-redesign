"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Mail } from "lucide-react";


const team = [
  { name: "Michael Torres", role: "CEO", initials: "MT", size: "large", bio: "The visionary architect behind our operational logic." },
  { name: "Sandra Patel", role: "Compliance", initials: "SP", size: "small", bio: "Protecting pharmacies from PBM predatory audits." },
  { name: "James Okafor", role: "Intelligence", initials: "JO", size: "medium", bio: "Deciphering the DNA of revenue leakage." },
  { name: "Rachel Kim", role: "Success", initials: "RK", size: "small", bio: "Ensuring every client scales with confidence." },
];

export const TheCollective = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-collective, .reveal-member",
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-12">
          <div className="max-w-2xl reveal-collective">
            <h3 className="text-6xl font-bold text-white leading-none tracking-tighter uppercase">Experts. <span className="text-teal-400 uppercase">Not</span> Consultants.</h3>
          </div>
          <div className="reveal-collective p-8 bg-white/[0.03] border border-white/10 rounded-[32px] max-w-md text-2xl font-medium text-slate-400 uppercase leading-relaxed shadow-xl backdrop-blur-xl">
            "We don't just advise; we execute side-by-side with your staff using real-world pharmacy DNA."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`reveal-member bg-white/[0.02] p-12 rounded-[40px] border border-white/10 group flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 backdrop-blur-xl
                ${member.size === 'large' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-brand-teal opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity" />
              <div className="flex items-start justify-between mb-12">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-teal-400 group-hover:bg-teal-400 group-hover:text-white transition-all duration-500">
                  {member.initials}
                </div>
                <div className="flex gap-4">
                  <Mail className="w-8 h-8 text-slate-500 hover:text-teal-400 cursor-pointer transition-colors" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold uppercase tracking-[0.4em] text-teal-400 mb-3">{member.role}</div>
                <h4 className="text-4xl font-bold text-white mb-6 uppercase">{member.name}</h4>
                <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-sm group-hover:text-slate-300 transition-colors">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
