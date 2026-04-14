"use client"

import Image from "next/image";
import hco1 from "@/src/assets/hco1.png";
import badge1 from "@/src/assets/badges1.png";
import badge2 from "@/src/assets/badges2.png";
import badge3 from "@/src/assets/badges3.png";
import badge4 from "@/src/assets/badges4.png";
import coloredlogo from "@/src/assets/logo-colored.png";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  Target,
  BarChart3,
  Settings,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

const StaticIcon = ({
  children,
  x,
  y,
  delay = 0,
  className = "",
  id = ""
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  className?: string;
  id?: string;
}) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 2
      }
    }}
    className={`absolute hero-badge flex items-center justify-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-3 ${className}`}
    style={{ left: x, top: y, transform: 'translate(-50%, -50%)', opacity: 0 }}
  >
    {children}
  </motion.div>
);

const STEPS = [
  {
    number: "01",
    title: "We Focus on What Directly Impacts Your Bottom Line",
    description: "Our work is centered around the areas that matter most — reimbursement performance, compliance exposure, operational efficiency, and long-term profitability."
  },
  {
    number: "02",
    title: "We Translate Complexity Into Actionable Insight",
    description: "Pharmacies are constantly receiving data, reports, and payer updates — but very little of it is actionable. We interpret that information and provide clear direction so you can make informed decisions quickly."
  },
  {
    number: "03",
    title: "We Operate as a Structured Extension of Your Business",
    description: "We are not a generic support vendor. We integrate into your operations with defined processes, consistent reporting, and ongoing visibility — allowing you to maintain control without increasing internal workload."
  },
  {
    number: "04",
    title: "We Maintain Strict Non-Clinical Boundaries",
    description: "All services are designed to support your business operations while respecting clinical responsibilities — ensuring compliance without interfering with patient care decisions."
  },
  {
    number: "05",
    title: "We Prioritize Consistency, Not One-Time Fixes",
    description: "Our approach is ongoing and systematic. By monitoring performance, identifying issues early, and maintaining visibility across key areas, we help prevent problems before they escalate."
  }
];

export default function WhyPrimeTek() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      tl.from(".hero-title", {
        y: 60,
        opacity: 0,
        delay: 0.2
      })
        .from(".hero-text", {
          y: 40,
          opacity: 0
        }, "-=0.8")
        .from(".hero-logo", {
          scale: 0.6,
          opacity: 0,
          ease: "elastic.out(1, 0.75)",
          duration: 1.5
        }, "-=0.6")
        .to(".hero-badge", {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          duration: 0.8
        }, "-=1");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="relative w-full bg-white font-sans">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen w-full bg-[#f8fdfd] overflow-hidden flex flex-col items-center justify-start py-20">
        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-teal-50/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]" />
        </div>

        {/* Top Navigation Decoration - Replaced with Badge Row */}
        <div className="absolute top-12 flex items-center justify-center gap-12 w-full px-12">
          <div className="h-[1px] flex-grow max-w-[150px] bg-gray-200 opacity-30" />
          <div className="h-[1px] flex-grow max-w-[150px] bg-gray-200 opacity-30" />
        </div>       {/* Intro Text Block */}
        <div className="relative z-50 max-w-6xl px-8 mt-24 mb-4 text-center">
          <h2 className="hero-title text-3xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#71c6a4] via-[#71c6a4] to-[#1e3a5f] bg-clip-text text-transparent">
            Designed for <span className="text-[#2b4c8c]">Pharmacies Operating Under Pressure</span>
          </h2>
          <p className="hero-text text-lg md:text-xl text-gray-700 leading-relaxed font-medium tracking-tight max-w-5xl mx-auto">
            Pharmacies today operate under constant pressure from reimbursement variability, payer requirements, and operational complexity. PrimeTek delivers structured, non-clinical support within fully compliant, HIPAA-aligned frameworks to improve clarity, control, and consistency—enabling pharmacy owners to run their operations with greater stability. The model is focused on strengthening reimbursement performance and financial visibility, built around actual pharmacy workflows and payer dynamics, and designed to scale efficiently across both independent and multi-location pharmacies without adding operational burden.
          </p>
        </div>

        <div className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center hero-visual-center">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 1000 600">
            <ellipse cx="500" cy="300" rx="250" ry="150" fill="none" stroke="black" strokeWidth="1" />
            <ellipse cx="500" cy="300" rx="400" ry="240" fill="none" stroke="black" strokeWidth="1" />
            <path d="M 200,300 Q 350,100 800,250" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 800,350 Q 650,550 200,350" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Central Hub - Replaced Wand/Shield with PrimeTek Logo */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="hero-logo w-96 h-96 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center border border-white/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#71c6a4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Image
                src={coloredlogo}
                alt="PrimeTek"
                width={300}
                height={100}
                priority
                className="w-[60%] h-auto relative z-10"
              />
            </div>
          </div>

          {/* Integration Icons */}
          <StaticIcon x="65%" y="35%" delay={0} className="z-30 w-40 h-40">
            <Image src={badge1} alt="Badge 1" width={100} height={100} className="w-[80%] h-auto hover:scale-110 transition-transform" />
          </StaticIcon>

          <StaticIcon x="62%" y="54%" delay={0.1} className="z-30 w-40 h-40">
            <Image src={hco1} alt="HCO" width={80} height={40} className="w-[70%] h-auto hover:rotate-3 transition-transform" />
          </StaticIcon>

          <StaticIcon x="38%" y="56%" delay={0.2} className="z-30 w-40 h-40">
            <Image src={badge2} alt="Badge 2" width={50} height={50} className="w-[80%] h-auto" />
          </StaticIcon>

          <StaticIcon x="36%" y="75%" delay={0.3} className="z-30 w-40 h-40">
            <Image src={badge3} alt="Badge 3" width={60} height={60} className="w-[80%] h-auto" />
          </StaticIcon>

          <StaticIcon x="55%" y="75%" delay={0.4} className="z-30 w-40 h-40">
            <Image src={badge4} alt="Badge 4" width={50} height={50} className="w-[80%] h-auto" />
          </StaticIcon>
        </div>
      </div>

      {/* Accordion Steps Section - Like WorkingProcess */}
      <section ref={containerRef} id="process" className="relative h-[400vh] bg-white text-black border-t border-black/10">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          <div className="max-w-[80%] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-8 w-full mt-20">
            <div className="w-[50%]">
              <h2 className="text-4xl 2xl:text-5xl font-bold max-w-3xl leading-tight uppercase text-[#2b4c8c]">
                Why PrimeTek
              </h2>
              <h4 className="text-md 2xl:text-lg font-medium max-w-3xl leading-tight uppercase mt-10">
                Operational Control for a Complex Pharmacy Environment
              </h4>
            </div>
            <div className="w-[50%]">

              <span className="text-black 2xl:text-md text-sm">Independent and multi-location pharmacies are operating in an increasingly complex environment — where PBM pressure, reimbursement variability, and audit exposure directly impact financial performance. PrimeTek was built to address these challenges through focused, non-clinical operational support that brings clarity, structure, and control to your day-to-day operations.

              </span>
              <h3 className="text-3xl 2xl:text-5xl font-bold mt-10 text-[#71c6a4]">What Makes PrimeTek Different
              </h3>
            </div>
          </div>

          <div className="h-[45vh] h-[50vh] flex flex-col md:flex-row border-t border-black relative">
            {STEPS.map((step, i) => {
              const stepStart = i / STEPS.length;
              const stepEnd = (i + 1) / STEPS.length;

              // Ensure ranges are within [0, 1] and strictly increasing
              const getSafeRange = (baseRange: number[]) => {
                return baseRange.map((val, idx, arr) => {
                  const clamped = Math.max(0, Math.min(1, val));
                  if (idx > 0 && clamped <= arr[idx - 1]) {
                    return Math.min(1, arr[idx - 1] + 0.0001);
                  }
                  return clamped;
                });
              };

              const flexRange = getSafeRange([
                i === 1 ? -0.1 : stepStart - 0.05,
                i === 1 ? 0 : stepStart,
                i === STEPS.length - 1 ? 1 : stepEnd,
                i === STEPS.length - 1 ? 1.1 : stepEnd + 0.05
              ]);

              const icons = [
                <Target className="w-5 h-5" key="1" />,
                <BarChart3 className="w-5 h-5" key="2" />,
                <Settings className="w-5 h-5" key="3" />,
                <ShieldCheck className="w-5 h-5" key="4" />,
                <CheckCircle2 className="w-5 h-5" key="5" />
              ];

              // Flex value: 8 when active, 0.15 when inactive
              const flexValue = useTransform(
                scrollYProgress,
                flexRange,
                [i === 1 ? 8 : 0.15, 8, 8, i === STEPS.length - 1 ? 8 : 0.15]
              );

              return (
                <motion.div
                  key={i}
                  style={{ flex: flexValue }}
                  className={`relative flex flex-col border-black ${i !== STEPS.length - 1 ? 'md:border-r' : ''} border-b md:border-b-0 group overflow-hidden bg-white`}
                >
                  <div className="flex h-full w-full relative">
                    {/* Step Label (Always Visible) */}
                    <div className="w-14 border-r border-white/30 flex flex-col items-center justify-between py-12 flex-shrink-0 bg-[#2b4c8c] z-10">
                      <span className="rotate-[-90deg] whitespace-nowrap text-[12px] 2xl:text-[14px] font-bold uppercase tracking-[0.3em] text-white">
                        Step {step.number}
                      </span>
                      <div className="text-white group-hover:text-white transition-colors">
                        {icons[i]}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <motion.div className="flex-1 p-8 md:p-16 flex flex-col min-w-[300px] md:min-w-[500px]">
                      <div className="mb-12">
                        <h3 className="text-2xl 2xl:text-3xl font-bold uppercase tracking-tight mb-8 leading-tight text-[#2b4c8c]">
                          {step.title}
                        </h3>
                        <p className="text-md 2xl:text-xl text-black mb-10 leading-relaxed max-w-xl">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-black relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute top-0 left-0 h-full w-full bg-[#71c6a4] origin-left"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
