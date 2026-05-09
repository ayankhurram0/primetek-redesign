"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { CheckCircle2 } from "lucide-react";
import { DecorativeBackground } from "../../components/DecorativeBackground";

export const OurStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-story",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
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
      <DecorativeBackground id="story" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div
            data-dir="left"
            className="reveal-story relative"
          >
            <div className="aspect-[4/3] rounded-[48px] overflow-hidden relative group border border-white/10 shadow-2xl backdrop-blur-3xl bg-white/5">
              <img
                src="/pharmacy_team_about_story.png"
                alt="Pharmacy Team"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay" />
              <div className="absolute bottom-10 right-[-20px] bg-brand-dark/80 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl flex flex-col items-center border border-white/10">
                <span className="text-6xl font-bold text-teal-400">8+</span>
                <span className="text-xl font-bold text-white capitalize text-center mt-3 opacity-70">Years Serving<br />Pharmacies</span>
              </div>
            </div>
          </div>

          <div
            data-dir="right"
            className="reveal-story"
          >
            <h3 className="text-6xl font-bold text-teal-400 mb-10 leading-[0.95] tracking-tighter uppercase">Why We <br /><span className="text-white uppercase"> Started PrimeTek.</span></h3>

            <div className="space-y-8 text-slate-400 text-2xl font-light leading-relaxed mb-12">
              <p>
                Independent pharmacies are the backbone of community healthcare — yet they're constantly squeezed by PBM pressure, audit risk, and shrinking reimbursements. Most don't have the internal resources to fight back with data.
              </p>
              <p>
                PrimeTek was founded to change that. We built a team of pharmacy operations specialists, data analysts, and compliance experts with one goal: give independent and multi-location pharmacies
                the same level of operational intelligence that large chains take for granted.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Non-clinical focus — we handle operations, you handle patient care",
                "Pharmacy-exclusive practice — no generalist consulting",
                "Structured, recurring support — not one-time engagements"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-teal transition-all duration-500">
                    <CheckCircle2 className="w-8 h-8 text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-slate-400 font-bold text-lg uppercase tracking-widest group-hover:text-white transition-colors">{text}</span>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};
