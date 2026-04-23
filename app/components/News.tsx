import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";
import { ChevronRight } from "lucide-react";
import FancyButton from "./button";
import type { StaticImageData } from "next/image";
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
  const cardCenter = index / (totalSlides - 1);

  // Use smoothProgress directly for focus calculation so first slide shows at start
  const focus = useTransform(
    smoothProgress,
    [Math.max(0, cardCenter - 0.15), cardCenter, Math.min(1, cardCenter + 0.15)],
    [0, 1, 0]
  );

  const scale = useTransform(focus, [0, 1], [0.65, 1]);
  const opacity = useTransform(focus, [0, 1], [0, 1]);
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
        <motion.div
          style={{ filter: blur }}
          className="relative w-full h-full"
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b35]/90 via-[#0e1b35]/30 to-transparent" />
      </div>

      <motion.div
        style={{ opacity: uiOpacity, y: useTransform(focus, [0, 1], [40, 0]) }}
        className="absolute inset-0 pointer-events-none z-10 p-10 flex flex-col justify-end text-left"
      >
        <h3 className="text-white text-xl 2xl:text-4xl font-bold mb-3 tracking-tight">{slide.title}</h3>
        <p className="text-white/80 text-lg 2xl:text-xl leading-relaxed mb-6 font-medium max-w-xl">
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
            extraClasses="text-xs 2xl:text-lg font-bold capitalize tracking-widest transition-colors shadow-lg shadow-[#71c6a4]/20 group/btn"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

interface PharmacySliderProps {
  label?: string;
  title?: React.ReactNode;
  slides?: SlideData[];
}

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

const News: React.FC<PharmacySliderProps> = ({
  label = "Critical Insights",
  title = <>Pharmacy Compliance <br /> & Revenue Performance</>,
  slides: passedSlides
}) => {
  const displaySlides = passedSlides || slides;
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

  // Headings Animation - Left side appears IMMEDIATELY, carousel comes MUCH later
  // Label: "Critical Insights" appears instantly (0-5%)
  const labelOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1], { clamp: true });
  const labelY = useTransform(scrollYProgress, [0, 0.05], [30, 0], { clamp: true });

  // Main Heading: "Pharmacy Compliance..." appears quickly after (5-15%)
  const mainHeadingOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1], { clamp: true });
  const mainHeadingY = useTransform(scrollYProgress, [0.05, 0.15], [30, 0], { clamp: true });

  // Keep headings visible (no fade out until very end)
  const finalFade = useTransform(scrollYProgress, [0.90, 0.98], [1, 0], { clamp: true });

  // Carousel progress - each slide takes 3x more scroll (range: 85-99.5%)
  const carouselRaw = useTransform(smoothProgress, [0.85, 0.995], [0, 1], { clamp: true });
  const snappedValue = useTransform(carouselRaw, (val) => {
    const steps = displaySlides.length - 1;
    return Math.round(val * steps) / steps;
  });

  const carouselSnapProgress = useSpring(snappedValue, {
    stiffness: 120,
    damping: 22,
    mass: 0.8
  });

  // Carousel appears at 85%, fades in by 90%, stays until end
  const carouselOpacity = useTransform(smoothProgress, [0.85, 0.90], [0, 1], { clamp: true });
  const finalCarouselFade = useTransform(smoothProgress, [0.99, 0.999], [1, 0], { clamp: true });

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1600);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const is2xl = windowWidth >= 1536;
  const slideWidth = is2xl ? 700 : 540;
  const gap = 48;
  const slideStep = slideWidth + gap;
  const totalTrackWidth = (displaySlides.length - 1) * slideStep;

  // Track starts at left: 50%. We offset by half-slide width to center slide 0 initially.
  const initialOffset = -(slideWidth / 2);
  const trackX = useTransform(carouselSnapProgress, [0, 1], [initialOffset, initialOffset - totalTrackWidth]);

  return (
    <section ref={containerRef} className="relative h-[1000vh] bg-white text-[#2b4c8c] font-sans selection:bg-[#71c6a4]/30">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0, 1], ["-10vw", "10vw"]),
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] bg-gradient-radial from-[#71c6a4]/30 via-transparent to-transparent"
          />
        </div>

        <div className="w-full h-full flex items-center max-w-[1700px] mx-auto px-16 relative">

          {/* Left Column: 40% for Headings */}
          <div className="w-[40%] h-full flex items-center pr-12 relative z-40">
            <motion.div
              style={{ opacity: finalFade }}
              className="pointer-events-none origin-left"
            >
              <motion.p
                style={{ opacity: labelOpacity, y: labelY }}
                className="text-[#71c6a4] font-bold text-2xl 2xl:text-6xl mb-4 2xl:mb-8"
              >
                {label}
              </motion.p>
              <motion.h2
                style={{ opacity: mainHeadingOpacity, y: mainHeadingY }}
                className="2xl:text-5xl text-4xl font-bold tracking-tight leading-[1.05] text-[#2b4c8c] capitalize"
              >
                {title}
              </motion.h2>
            </motion.div>
          </div>

          {/* Right Column: 60% for Carousel Area */}
          <motion.div
            style={{ opacity: useTransform([carouselOpacity, finalCarouselFade], ([o1, o2]: number[]) => o1 * o2) }}
            className="w-[60%] h-full flex items-center relative overflow-hidden"
          >
            {/* FIXED SELECTION FRAME - Centered in the 60% zone */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] 2xl:w-[700px] h-[440px] 2xl:h-[600px] z-30 pointer-events-none origin-center">
              <div className="absolute inset-[-20px] border-[1.5px] border-dotted border-[#71c6a4]/90 rounded-[40px]" />
              {/* Corner Accents */}
              <div className="absolute top-[-24px] right-[-24px] w-5 h-5 bg-[#71c6a4] rounded-full shadow-[0_0_20px_rgba(113,198,164,0.6)]" />
              <div className="absolute bottom-[-24px] left-[-24px] w-3 h-3 border-2 border-[#71c6a4] rounded-full" />
            </div>

            {/* Moving Track */}
            <motion.div
              style={{
                x: trackX,
                left: "50%",
              }}
              className="flex items-center gap-12 absolute top-1/2 -translate-y-1/2 will-change-transform"
            >
              {displaySlides.map((slide, i) => (
                <SlideCard
                  key={i}
                  slide={slide}
                  index={i}
                  totalSlides={displaySlides.length}
                  smoothProgress={carouselSnapProgress}
                />
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* HUD */}
        <div className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-4 pointer-events-none z-50">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-[#2b4c8c]/10 flex items-center justify-center bg-white/50 backdrop-blur-sm"
          >
            <div className="w-[1.5px] h-3.5 bg-[#71c6a4] rounded-full" />
          </motion.div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[8px] text-[#2b4c8c]/50 pl-2">Scroll to explore</span>
        </div>

      </div>
    </section>
  );
};

export default News;
