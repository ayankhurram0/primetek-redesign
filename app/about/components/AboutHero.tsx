import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BarChart3, ShieldCheck, Users, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
}

const stats: Stat[] = [
  { label: "Revenue Recovered", value: "$4.2M+", icon: BarChart3, color: "text-emerald-400" },
  { label: "Audit Readiness", value: "98%", icon: ShieldCheck, color: "text-blue-400" },
  { label: "Pharmacies", value: "100+", icon: Users, color: "text-brand-teal" },
  { label: "Experience", value: "8 Yrs", icon: Calendar, color: "text-amber-400" },
];

export const AboutHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".hero-top", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".hero-content > *", {
        opacity: 0,
        x: -30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out"
      });

      // Scroll animations
      gsap.to(heroRef.current, {
        scale: 0.95,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Top Header Section */}
      <section className="relative pt-40 pb-12 px-6 overflow-hidden hero-top">
        <div className="absolute inset-0 bg-hero-gradient opacity-100" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.6em] text-brand-teal mb-4">The Collective DNA</h3>
            <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase">About Us</h2>
            <div className="w-24 h-1 bg-brand-teal mx-auto mt-8 opacity-30 rounded-full" />
          </div>
        </div>
      </section>

      {/* Hero Section - Kinetic Edition */}
      <section 
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center px-6 pt-32 pb-20 sticky top-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-teal/5 blur-[120px] -z-10 animate-pulse" />
        
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="max-w-3xl hero-content">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-brand-teal text-[12px] font-black uppercase tracking-[0.4em] mb-10">
                  <Calendar className="w-4 h-4" />
                  The Protocol / 2026
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-12 uppercase">
                  Operational <br />
                  Intelligence <br />
                  By Design.
                </h1>
                <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-xl mb-12">
                  PrimeTek is not a consultancy. We are the <span className="text-brand-teal font-black uppercase">operating system</span> for independent pharmacy survival 
                  in a predatory PBM landscape.
                </p>
                <div className="flex items-center gap-10">
                  <button className="bg-white text-brand-dark px-10 py-5 rounded-xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-brand-teal transition-all">
                    The Origin Story
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="p-12 bg-brand-dark/40 group hover:bg-brand-teal/10 transition-all duration-700 stat-card"
                  >
                    <stat.icon className={`w-10 h-10 ${stat.color} mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                    <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                    <div className="text-[12px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
