"use client"
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


      {/* Accordion Steps Section - Like WorkingProcess */}
      <section ref={containerRef} id="process" className="relative h-[400vh] bg-white text-black border-t border-black/10">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          <div className="max-w-[80%] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start gap-8 w-full mt-20">
            <div className="w-[100%]">
              <h2 className="text-4xl 2xl:text-5xl font-bold max-w-3xl leading-tight uppercase text-[#2b4c8c]">
                Why PrimeTek
              </h2>
              <h4 className="text-md 2xl:text-lg font-semibold max-w-3xl leading-tight uppercase mt-6">
                Operational Control for a Complex Pharmacy Environment
              </h4>
              <p className="text-black 2xl:text-lg text-base mt-4">Independent and multi-location pharmacies are operating in an increasingly complex environment — where PBM pressure, reimbursement variability, and audit exposure directly impact financial performance. PrimeTek was built to address these challenges through focused, non-clinical operational support that brings clarity, structure, and control to your day-to-day operations.
              </p>
              <h3 className="text-2xl 2xl:text-3xl font-bold mt-6 text-black">What Makes PrimeTek Different
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
                stepStart - 0.05,
                stepStart,
                i === STEPS.length - 1 ? 1 : stepEnd,
                i === STEPS.length - 1 ? 1.1 : stepEnd + 0.05
              ]);

              const icons = [
                <Target className="2xl:w-8 2xl:h-8 w-6 h-6" key="1" />,
                <BarChart3 className="2xl:w-8 2xl:h-8 w-6 h-6" key="2" />,
                <Settings className="2xl:w-8 2xl:h-8 w-6 h-6" key="3" />,
                <ShieldCheck className="2xl:w-8 2xl:h-8 w-6 h-6" key="4" />,
                <CheckCircle2 className="2xl:w-8 2xl:h-8 w-6 h-6" key="5" />
              ];

              // Flex value: 8 when active, 0.15 when inactive
              const flexValue = useTransform(
                scrollYProgress,
                flexRange,
                [0.30, 8, 8, i === STEPS.length - 1 ? 8 : 0.30]
              );

              return (
                <motion.div
                  key={i}
                  style={{ flex: flexValue }}
                  className={`relative flex flex-col border-black ${i !== STEPS.length - 1 ? 'md:border-r' : ''} border-b md:border-b-0 group overflow-hidden bg-white`}
                >
                  <div className="flex h-full w-full relative">
                    {/* Step Label (Always Visible) */}
                    <div className="2xl:w-18 w-12 border-r border-white/30 flex flex-col items-center justify-between py-12 flex-shrink-0 bg-[#2b4c8c] z-10">
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
          <div className="h-1 w-full bg-white relative">
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
