"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ChevronRight, BarChart3, AlertTriangle, ShieldCheck } from "lucide-react";
import type { StaticImageData } from "next/image";

import auditCard from "@/src/assets/audit_card.png";
import gapsCard from "@/src/assets/gaps_card.png";
import operationalAnalysisChart from "@/src/assets/operational_analysis_chart.png";
import thresholdsCard from "@/src/assets/thresholds_card.png";
import mtfCard from "@/src/assets/mtf_card.png";

interface SlideData {
  src: string | StaticImageData;
  title: string;
  desc: string;
  alertText: string;
  icon: React.ReactNode;
}

interface SlideCardProps {
  slide: SlideData;
  index: number;
  totalSlides: number;
  scrollYProgress: MotionValue<number>;
}

const SlideCard = ({ slide, index, totalSlides, scrollYProgress }: SlideCardProps) => {
  const step = 0.7 / (totalSlides - 1);
  const center = 0.16 + (index * step);

  // Correctly clamp ranges and ensure unique mapping
  const safeCenter = Math.max(0.2, Math.min(0.8, center));

  // Ensure all input keys are valid and in ascending order
  const inputRange = [
    0,
    Math.max(0.05, safeCenter - 0.15),
    safeCenter,
    Math.min(0.95, safeCenter + 0.12),
    Math.min(1, safeCenter + 0.25)
  ];

  const scale = useTransform(
    scrollYProgress,
    inputRange,
    [0.75, 0.9, 1.05, 0.9, 0.75]
  );

  const filter = useTransform(
    scrollYProgress,
    inputRange,
    ["grayscale(100%) blur(4px)", "grayscale(50%) blur(2px)", "grayscale(0%) blur(0px)", "grayscale(50%) blur(2px)", "grayscale(100%) blur(4px)"]
  );

  const y = useTransform(
    scrollYProgress,
    inputRange,
    [0, 0, 0, 100, 200]
  );

  // Make slide disappear completely after scrolling past it
  const opacityInputRange = [
    0,
    Math.max(0.05, safeCenter - 0.12),
    Math.max(0.1, safeCenter - 0.05),
    safeCenter,
    Math.min(0.95, safeCenter + 0.05),
    Math.min(1, safeCenter + 0.15)
  ];

  const slideOpacity = useTransform(
    scrollYProgress,
    opacityInputRange,
    [0, 0.3, 1, 1, 0.3, 0]
  );

  return (
    <motion.div
      style={{ scale, opacity: slideOpacity, y, filter }}
      className="relative flex-shrink-0 w-[800px] h-[600px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-gray-50 origin-center group"
    >
      <Image
        src={slide.src}
        alt={slide.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={index === 0}
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top Badge */}
      <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        {slide.icon}
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">{slide.alertText}</span>
      </div>

      {/* Content HUD */}
      <motion.div className="absolute bottom-10 left-10 right-10">
        <h3 className="text-white text-3xl font-bold mb-3 tracking-tight">{slide.title}</h3>
        <p className="text-white/80 text-lg leading-relaxed mb-6 font-medium">
          {slide.desc}
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#71c6a4] text-white rounded-full text-md font-bold uppercase tracking-widest hover:bg-[#5eb08f] transition-colors shadow-lg shadow-[#71c6a4]/20 group/btn">
          Analyze Exposure
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function News() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1: Text Conversion (0 to 0.2)
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.5], { clamp: true });
  const textX = useTransform(scrollYProgress, [0, 0.2], ["0%", "-25%"], { clamp: true });
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-80%"], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0.7], { clamp: true });

  // Carousel opacity - hidden initially, appears earlier as user scrolls
  const carouselOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 0, 1], { clamp: true });

  // Slide Data
  const slides = [
    {
      src: auditCard,
      title: "PBM Audit Compliance",
      desc: "Would Your Pharmacy Pass a PBM Audit Today? Small documentation and compliance issues can trigger audits, recoupments, and long-term revenue loss.",
      alertText: "AUDIT RISK",
      icon: <ShieldCheck className="w-5 h-5 text-[#71c6a4]" />
    },
    {
      src: operationalAnalysisChart,
      title: "Operational Analysis",
      desc: "Are Small Operational Gaps Creating Significant Financial Exposure? Minor inefficiencies in workflow and reporting often lead to major financial and compliance risks.",
      alertText: "OPERATIONAL GAP",
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />
    },
    {
      src: thresholdsCard,
      title: "Reimbursement Performance",
      desc: "Are PBM Thresholds Quietly Reducing Your Reimbursements? Many pharmacies unknowingly exceed PBM thresholds — increasing audit risk and reducing profitability.",
      alertText: "THRESHOLD ALERT",
      icon: <BarChart3 className="w-5 h-5 text-blue-500" />
    },
    {
      src: mtfCard,
      title: "Backend Revenue Control",
      desc: "MTF Revenue Leakage Control: If you are not actively tracking, reconciling, and disputing MTF payments, you are silently losing backend revenue on every eligible claim.",
      alertText: "REVENUE LEAKAGE",
      icon: <BarChart3 className="w-5 h-5 text-emerald-500" />
    }
  ];

  const slideWidth = 800;
  const gap = 48;
  const totalMove = (slides.length - 1) * (slideWidth + gap);
  const trackX = useTransform(scrollYProgress, [0.2, 0.9], [0, -totalMove], { clamp: true });

  return (
    <section id="critical-insights" ref={containerRef} className="relative h-[600vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            style={{
              scale: textScale,
              x: textX,
              y: textY,
              opacity: textOpacity
            }}
            className="absolute z-40 pointer-events-none w-full px-12 md:px-24 text-left origin-center"
          >
            <p className="text-[#71c6a4] font-bold text-2xl 2xl:text-3xl mb-4 uppercase tracking-[0.3em]">Critical Insights</p>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-[#2b4c8c] capitalize max-w-8xl mx-auto">
              Pharmacy Compliance & Revenue Performance
            </h2>
          </motion.div>

          {/* Carousel Track */}
          <motion.div
            style={{ x: trackX, opacity: carouselOpacity }}
            className="absolute left-0 right-0 flex items-center gap-12 px-[calc(50vw-400px)] z-10"
          >
            {slides.map((slide, i) => (
              <SlideCard
                key={i}
                slide={slide}
                index={i}
                totalSlides={slides.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 rounded-full border-2 border-black/20 flex justify-center p-1 will-change-transform"
          >
            <div className="w-1 h-2 bg-[#71c6a4] rounded-full" />
          </motion.div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
}
