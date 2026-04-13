"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import FancyButton from "./button";
import service1 from "@/src/assets/service1.png";
import service2 from "@/src/assets/service2.png";
import service3 from "@/src/assets/service3.png";
import service4 from "@/src/assets/service4.png";
import service5 from "@/src/assets/service5.png";

export default function Services() {
  const projects = [
    {
      name: "Revenue Intelligence & Reporting",
      year: "2025",
      overview: "Identify revenue leakage, monitor PBM performance, and stay ahead of compliance risks through structured data analysis.",
      tags: "Data Analytics, PBM Monitoring",
      industry: "Pharmacy, Healthcare",
      image: service1
    },
    {
      name: "Claims & Reimbursement Optimization",
      year: "2024",
      overview: "Recover lost revenue, reduce claim errors, and improve reimbursement accuracy across all payers.",
      tags: "Claims Management, Revenue Recovery",
      industry: "Pharmacy, Healthcare",
      image: service2
    },
    {
      name: "Compliance & Audit Protection",
      year: "2024",
      overview: "Stay audit-ready with systems designed to reduce recoupment risk and maintain regulatory alignment.",
      tags: "Audit Protection, Regulatory Compliance",
      industry: "Pharmacy, Healthcare",
      image: service3
    },
    {
      name: "Patient & Operational Support Systems",
      year: "2023",
      overview: "Streamline communication, improve workflow efficiency, and enhance patient engagement through structured support.",
      tags: "Workflow Optimization, Patient Engagement",
      industry: "Pharmacy, Healthcare",
      image: service4
    },
    {
      name: "Pharmacy Growth & Performance Strategy",
      year: "2023",
      overview: "Optimize pricing, sourcing, and operational strategy to improve profitability and scalability.",
      tags: "Growth Strategy, Performance Optimization",
      industry: "Pharmacy, Healthcare",
      image: service5
    }
  ];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest) => {
      setCurrentIdx(Math.round(latest));
    });
    return () => unsubscribe();
  }, [activeIndex]);

  const project = projects[currentIdx];

  return (
    <section id="services" ref={containerRef} className="relative h-[500vh] bg-white text-black border-t border-black/5">
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        {/* Left Side: Service List */}
        <div className="hidden md:flex w-1/2 h-full relative items-center justify-center">
          <div className="absolute left-12 top-1/2 -translate-y-1/2 text-black/20 font-mono text-sm">
            {project.year}
          </div>

          <div className="flex flex-col gap-4 items-start px-24">
            {projects.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  const target = containerRef.current;
                  if (target) {
                    const scrollPos = (i / (projects.length - 1)) * (target.scrollHeight - window.innerHeight);
                    window.scrollTo({ top: target.offsetTop + scrollPos, behavior: 'smooth' });
                  }
                }}
                animate={{
                  opacity: currentIdx === i ? 1 : 0.2,
                  x: currentIdx === i ? 20 : 0
                }}
                className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-left hover:opacity-100 transition-opacity"
              >
                {p.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side: Image and Details */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-6 md:p-12 border-r border-black/10">
          <div className="h-[50vh] relative rounded-2xl overflow-hidden mb-8 md:mb-12 mt-20 bg-black/5">
            <motion.img
              key={currentIdx}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={project.image.src}
              alt={project.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="space-y-0 text-xs md:text-sm">
            <div className="grid grid-cols-3 py-4 md:py-6 border-t border-black">
              <span className="text-black font-bold uppercase tracking-widest text-sm">Overview</span>
              <p className="col-span-2 text-black/80 leading-relaxed text-sm">{project.overview}</p>
            </div>
            <div className="grid grid-cols-3 py-4 md:py-6 border-t border-black">
              <span className="text-black font-bold uppercase tracking-widest text-sm">Tags</span>
              <p className="col-span-2 text-black text-sm">{project.tags}</p>
            </div>
            <div className="grid grid-cols-3 py-4 md:py-6 border-t border-black">
              <span className="text-black font-bold uppercase tracking-widest text-sm">Industry</span>
              <p className="col-span-2 text-black text-sm">{project.industry}</p>
            </div>
            <div className="pt-6 md:pt-8">
              <FancyButton
                label="Explore Service"
                textColor="white"
                borderColor="[#71c6a4]"
                rippleColor="#2b4c8c"
                bgColor="#71c6a4"
                extraClasses="!py-4 !px-8 !text-base hover:border-[#2b4c8c] transition-all duration-200"
                icon={<ArrowRight className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
