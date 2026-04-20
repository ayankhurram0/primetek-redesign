"use client"
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { StaticImageData } from "next/image";
import service1 from "@/src/assets/service1.png";
import service2 from "@/src/assets/service2.png";
import service3 from "@/src/assets/service3.png";
import service4 from "@/src/assets/service4.png";
import service5 from "@/src/assets/service5.png";

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

interface FancyButtonProps {
  label: string;
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
  rippleColor?: string;
  extraClasses?: string;
}

const FancyButton = ({ label, extraClasses, bgColor }: FancyButtonProps) => (
  <button
    style={{ backgroundColor: bgColor || "#71c6a4" }}
    className={`relative overflow-hidden rounded-full border border-[#71c6a4] text-white px-8 py-4 font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${extraClasses}`}
  >
    <span className="relative z-10">{label}</span>
  </button>
);

interface ServiceSectionProps {
  number: string;
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  zIndex: number;
  key?: string | number;
}

const ServiceSection = (props: ServiceSectionProps) => {
  const { number, title, description, imageSrc, imageAlt, zIndex } = props;
  return (
    <motion.section
      style={{ zIndex }}
      className="sticky top-0 h-screen w-full flex flex-col justify-center bg-white border-t border-black/10 py-12 px-6 md:px-12 2xl:px-20"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-16 mt-10">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-3xl 2xl:text-5xl font-semibold tracking-tight text-[#2b4c8c]">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="2xl:text-4xl text-3xl font-light text-[#71c6a4]">{number}</span>
            <div className="w-[1px] h-12 bg-[#2b4c8c]/20" />
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-[1px] h-6 bg-[#71c6a4]/30" />
              ))}
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Description */}
          <div className="lg:col-span-6 space-y-12">
            <p className="text-lg 2xl:text-xl font-light leading-relaxed text-gray-600">
              {description}
            </p>

            <FancyButton
              label="Explore Service"
              bgColor="#71c6a4"
              extraClasses="shadow-[0_10px_30px_rgba(113,198,164,0.3)] hover:bg-[#2b4c8c] hover:border-[#2b4c8c]"
            />
          </div>

          {/* Right: Portfolio Grid Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3]">
              <img
                src={imageSrc.src}
                alt={imageAlt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b4c8c]/5 via-transparent to-[#71c6a4]/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// --- Main Page Component ---

export default function CombinedLayout() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const headingScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.75], { clamp: true });
  const headingX = useTransform(scrollYProgress, [0, 0.15], ["0%", "-10%"], { clamp: true });
  const headingY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-33%"], { clamp: true });

  // Opacity of the "Critical Insights" label and the sub-heading
  const subHeadingOpacity = useTransform(scrollYProgress, [0.12, 0.18], [0, 1]);
  const introLabelOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Services reveal
  const servicesX = useTransform(scrollYProgress, [0.1, 0.2], ["100%", "0%"]);
  const dividerOpacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);

  const services = [
    {
      number: "01",
      title: "Revenue Intelligence & Reporting",
      description: "Identify Revenue Leakage, Monitor PBM Performance, And Stay Ahead Of Compliance Risks Through Structured Data Analysis.",
      imageSrc: service1,
      imageAlt: "Revenue Intelligence"
    },
    {
      number: "02",
      title: "Claims & Reimbursement Optimization",
      description: "Recover Lost Revenue, Reduce Claim Fees, And Improve Reimbursement Accuracy Across All Payers.",
      imageSrc: service2,
      imageAlt: "Claims Optimization"
    },
    {
      number: "03",
      title: "Compliance & Audit Protection",
      description: "Stay Audit-Ready With Systems Designed To Reduce Recoupment Risk And Maintain Regulatory Alignment.",
      imageSrc: service3,
      imageAlt: "Compliance Protection"
    },
    {
      number: "04",
      title: "Patient & Operational Support Systems",
      description: "Streamline Communication, Improve Workflow Efficiency, And Enhance Patient Engagement Through Structured Support.",
      imageSrc: service4,
      imageAlt: "Patient Support"
    },
    {
      number: "05",
      title: "Pharmacy Growth & Performance Strategy",
      description: "Optimize Pricing, Sourcing, And Operational Strategy To Improve Profitability And Scalability.",
      imageSrc: service5,
      imageAlt: "Growth Strategy"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-white min-h-[500vh]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2b4c8c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Sticky Orchestrator */}
      <div className="sticky top-0 h-screen w-[65%] flex overflow-hidden">

        {/* Left Side: The Evolving Heading */}
        <div className="relative h-screen 2xl:w-[40%] w-[45%] flex flex-col justify-center p-10 2xl:p-20 z-20">
          <motion.div
            style={{
              scale: headingScale,
              x: headingX,
              y: headingY,
            }}
            className="w-[180%] 2xl:w-[200%] origin-center pointer-events-none"
          >
            <h1 className="2xl:text-5xl text-4xl font-bold uppercase leading-tight">
              <span className="block text-[#71c6a4]">
                Operational Systems That
              </span>
              <span className="block text-[#2b4c8c]">
                Protect & Grow
                Pharmacy Revenue
              </span>
            </h1>

            <p className="text-lg 2xl:text-xl font-light leading-relaxed text-gray-700">
              Empower your pharmacy with automated workflows and data-driven insights that safeguard your margins and accelerate revenue generation.
            </p>
            <FancyButton
              label="Become a client"
              bgColor="#71c6a4"
              extraClasses="shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
            />
          </motion.div>

        </div>

        {/* Divider line */}
        <motion.div
          style={{ opacity: dividerOpacity }}
          className="w-[1px] h-[80vh] bg-[#2b4c8c]/10 self-center"
        />

        {/* Right Side: Scrollable Services viewport */}
        <div className="relative h-screen flex-1 overflow-hidden">
          <motion.div
            style={{ x: servicesX }}
            className="h-full w-full"
          >
            <div className="h-full w-full overflow-y-auto hidden-scrollbar">
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 2xl:ml-[40%] ml-[45%] 2xl:w-[60%] w-[55%] bg-white">
        {/* Spacer for the intro stage */}
        <div className="h-[120vh]" />

        {services.map((service, index) => (
          <ServiceSection
            key={service.number}
            number={service.number}
            title={service.title}
            description={service.description}
            imageSrc={service.imageSrc}
            imageAlt={service.imageAlt}
            zIndex={index + 10}
          />
        ))}
      </div>
    </div>
  );
}
