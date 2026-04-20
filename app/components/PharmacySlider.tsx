"use client"
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import FancyButton from "./button";
import auditCard from "@/src/assets/audit_card.png";
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
  smoothProgress: MotionValue<number>;
}

const SlideCard: React.FC<SlideCardProps> = ({ slide, index, totalSlides, smoothProgress }) => {
  // Normalize the card's center position relative to the 0-1 progress
  const cardCenter = (index / (totalSlides - 1));

  // Focus range for scaling and opacity - tightened for exact lock-in
  const focus = useTransform(
    smoothProgress,
    [cardCenter - 0.15, cardCenter, cardCenter + 0.15],
    [0, 1, 0]
  );

  const scale = useTransform(focus, [0, 1], [0.65, 1]);
  const opacity = useTransform(focus, [0, 1], [0.25, 1]);
  const blur = useTransform(focus, [0, 1], ["blur(8px)", "blur(0px)"]);
  const uiOpacity = useTransform(focus, [0.85, 1], [0, 1]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="relative flex-shrink-0 w-[540px] 2xl:w-[700px] 2xl:h-[600px] h-[440px] rounded-3xl flex items-center justify-center will-change-transform"
    >
      <div className="absolute inset-0 overflow-hidden bg-gray-100 shadow-2xl rounded-3xl">
        <motion.img
          src={typeof slide.src === 'string' ? slide.src : slide.src.src}
          alt={slide.title}
          referrerPolicy="no-referrer"
          style={{ filter: blur }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b35]/90 via-[#0e1b35]/30 to-transparent" />
      </div>

      {/* Floating Content */}
      <motion.div
        style={{ opacity: uiOpacity, y: useTransform(focus, [0, 1], [40, 0]) }}
        className="absolute inset-0 pointer-events-none z-10 p-10 flex flex-col justify-end"
      >
        <h3 className="text-white text-xl 2xl:text-4xl font-bold mb-3 tracking-tight">{slide.title}</h3>
        <p className="text-white text-lg 2xl:text-xl leading-relaxed mb-6 font-medium">
          {slide.desc}
        </p>
        <div className="pointer-events-auto">
          <FancyButton
            label="Analyze Exposure"
            textColor="white"
            borderColor="[#71c6a4]"
            bgColor="#71c6a4"
            rippleColor="#2b4c8c"
            icon={<ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />}
            extraClasses="text-xs 2xl:text-lg font-bold uppercase tracking-widest transition-colors shadow-lg shadow-[#71c6a4]/20 group/btn"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PharmacySlider: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 18,
    restDelta: 0.0001,
    mass: 1.2
  });

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
      desc: "MTF Revenue Leakage Control: If you are not actively tracking, reconciliation, and disputing MTF payments, you are silently losing backend revenue on every eligible claim."
    }
  ];

  const textScale = useTransform(scrollYProgress, [0, 0.2], [1.5, 1], { clamp: true });
  const textX = useTransform(scrollYProgress, [0, 0.2], ["30%", "-10%"], { clamp: true });
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 1], { clamp: true });

  // Continuous RAW progress for the carousel phase (0.2 to 0.9 of total scroll)
  const carouselRaw = useTransform(smoothProgress, [0.2, 0.9], [0, 1], { clamp: true });

  // Snap the continuous progress to discrete slide steps (0, 0.33, 0.66, 1)
  const snappedValue = useTransform(carouselRaw, (val) => {
    const steps = slides.length - 1;
    return Math.round(val * steps) / steps;
  });

  // Apply a smooth spring to the snapped steps for a "gliding lock" feel
  const carouselSnapProgress = useSpring(snappedValue, {
    stiffness: 120,
    damping: 22,
    mass: 0.8
  });

  const carouselOpacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1], { clamp: true });




  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1600);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const is2xl = windowWidth >= 1536;
  const slideWidth = is2xl ? 700 : 540;
  const gap = 48; // gap-12
  const slideStep = slideWidth + gap;

  const totalTrackWidth = (slides.length - 1) * slideStep;
  // Track moves relative to snapped carouselSnapProgress
  const trackX = useTransform(carouselSnapProgress, [0, 1], [0, -totalTrackWidth]);

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-white text-[#2b4c8c] font-sans selection:bg-[#71c6a4]/30">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Subtle Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0, 1], ["-10vw", "10vw"]),
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.2, 0.1])
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] bg-gradient-radial from-[#71c6a4]/20 via-transparent to-transparent"
          />
        </div>

        <div className="container mx-auto px-16 relative h-full flex items-center max-w-[1600px] justify-center">

          {/* Transitioning Heading */}
          <motion.div
            style={{
              scale: textScale,
              x: textX,
              y: textY,
              opacity: textOpacity
            }}
            className="absolute z-40 pointer-events-none w-full px-12 2xl:px-24 text-left origin-center"
          >
            <p className="text-[#71c6a4] font-bold text-2xl 2xl:text-5xl mb-8 uppercase tracking-[0.3em]">Critical Insights</p>
            <h2 className="text-7xl 2xl:text-6xl font-bold tracking-tight leading-[0.9] text-[#2b4c8c] capitalize w-[80%] 2xl:w-[100%]! ">
              Pharmacy Compliance  <br /> & Revenue Performance
            </h2>
          </motion.div>

          {/* Carousel Area - Centered in the right space next to heading */}
          <motion.div
            style={{ opacity: carouselOpacity }}
            className="flex-1 h-full flex items-center relative pl-[40%] 2xl:pl-[45%] overflow-visible"
          >
            {/* FIXED SELECTION FRAME - Synchronized centered position */}
            <div className="absolute left-[40%] 2xl:left-[45%] top-1/2 -translate-y-1/2 w-[540px] 2xl:w-[700px] h-[440px] 2xl:h-[600px] z-20 pointer-events-none origin-center">
              <div className="absolute inset-[-16px] border-[1.5px] border-dotted border-[#71c6a4]/90 rounded-3xl" />
              <div className="absolute top-[-22px] right-[-22px] w-3 h-3 bg-[#71c6a4] rounded-full shadow-[0_0_20px_rgba(113,198,164,0.5)]" />
            </div>

            <motion.div
              style={{ x: trackX }}
              className="flex items-center gap-12 absolute left-[40%] 2xl:left-[45%] will-change-transform"
            >
              {slides.map((slide, i) => (
                <SlideCard
                  key={i}
                  slide={slide}
                  index={i}
                  totalSlides={slides.length}
                  smoothProgress={carouselSnapProgress}
                />
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom HUD */}
        <div className="absolute bottom-16 inset-x-0 flex flex-col items-center gap-6 pointer-events-none">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            className="w-14 h-14 rounded-full border border-[#2b4c8c]/10 flex items-center justify-center"
          >
            <div className="w-[1.5px] h-3.5 bg-[#71c6a4] rounded-full shadow-[0_0_10px_rgba(113,198,164,0.3)]" />
          </motion.div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[10px] text-[#2b4c8c]/30 pl-4">Scroll to explore</span>
        </div>

      </div>
    </section>
  );
};
