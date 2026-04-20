"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ChevronRight } from "lucide-react";
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

  const safeCenter = Math.max(0.2, Math.min(0.8, center));

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

  const y = useTransform(
    scrollYProgress,
    inputRange,
    [0, 0, 0, 100, 200]
  );

  return (
    <motion.div
      style={{ scale, y }}
      className="relative flex-shrink-0 2xl:mt-10 w-[600px] 2xl:w-[800px] h-[500px] 2xl:h-[600px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-white origin-center group"
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

      {/* Content HUD */}
      <motion.div className="absolute bottom-10 left-10 right-10">
        <h3 className="text-white text-xl 2xl:text-3xl font-bold mb-3 tracking-tight">{slide.title}</h3>
        <p className="text-white text-sm 2xl:text-lg leading-relaxed mb-6 font-medium">
          {slide.desc}
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#71c6a4] text-white rounded-full text-xs 2xl:text-md font-bold uppercase tracking-widest hover:bg-[#5eb08f] transition-colors shadow-lg shadow-[#71c6a4]/20 group/btn">
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
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 1], { clamp: true });

  // Carousel opacity - hidden initially, then fully visible
  const carouselOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1], { clamp: true });

  // Slide Data
  const slides = [
    {
      src: auditCard,
      title: "Would Your Pharmacy Pass a PBM Audit Today?",
      desc: "Would Your Pharmacy Pass a PBM Audit Today? Small documentation and compliance issues can trigger audits, recoupments, and long-term revenue loss."
    },
    {
      src: operationalAnalysisChart,
      title: "Are PBM Thresholds Quietly Reducing Your Reimbursements?",
      desc: "Are Small Operational Gaps Creating Significant Financial Exposure? Minor inefficiencies in workflow and reporting often lead to major financial and compliance risks."
    },
    {
      src: thresholdsCard,
      title: "Are Small Operational Gaps Creating Significant Financial Exposure?",
      desc: "Are PBM Thresholds Quietly Reducing Your Reimbursements? Many pharmacies unknowingly exceed PBM thresholds — increasing audit risk and reducing profitability."
    },
    {
      src: mtfCard,
      title: "Backend Revenue Control",
      desc: "MTF Revenue Leakage Control: If you are not actively tracking, reconciling, and disputing MTF payments, you are silently losing backend revenue on every eligible claim."
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
            <h2 className="text-7xl 2xl:text-8xl font-bold tracking-tight leading-[0.9] text-[#2b4c8c] capitalize w-[80%] 2xl:w-[100%]! ">
              Pharmacy Compliance <br />& Revenue Performance
            </h2>
          </motion.div>

          {/* Carousel Track */}
          <motion.div
            style={{ x: trackX, opacity: carouselOpacity }}
            className="absolute 2xl:left-80 left-100 right-0 flex items-center gap-12 px-[calc(50vw-400px)] z-10"
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