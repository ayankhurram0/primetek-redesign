"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";

gsap.registerPlugin(ScrollTrigger);
import FancyButton from "./button";
import service1 from "@/src/assets/service1.png";
import service2 from "@/src/assets/service2.png";
import service3 from "@/src/assets/service3.png";
import service4 from "@/src/assets/service4.png";
import service5 from "@/src/assets/service5.png";

interface ServiceSectionProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  zIndex: number;
}

const ServiceSection = ({ number, title, description, imageSrc, imageAlt, zIndex }: ServiceSectionProps) => {
  return (
    <motion.section
      style={{ zIndex }}
      className="sticky top-0 h-screen w-full flex flex-col justify-center bg-white border-t border-black/10 py-12 2xl:px-30 px-10"
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
              textColor="white"
              borderColor="[#71c6a4]"
              bgColor="#71c6a4"
              rippleColor="#2b4c8c"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-5 2xl:px-10 px-8 py-4 font-bold text-sm shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
            />
          </div>

          {/* Right: Portfolio Grid Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b4c8c]/5 via-transparent to-[#71c6a4]/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default function ServicesSticky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states explicitly
      gsap.set([".hero-word", ".hero-desc", ".hero-btn"], { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%", // Triggers when hero container top hits 80% of viewport
          toggleActions: "play none none none"
        },
        defaults: { ease: "power4.out", duration: 1.2 }
      });

      tl.to(".hero-word", {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        delay: 0.2
      })
        .to(".hero-desc", {
          opacity: 1,
          y: 0,
          duration: 1
        }, "-=0.8")
        .to(".hero-btn", {
          opacity: 1,
          y: 0,
          duration: 1
        }, "-=0.8");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Receding effect: Hero scales down and fades as services scroll up
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

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

  const titleWords = "Operational Systems That Protect & Grow Pharmacy Revenue".split(" ");

  return (
    <section id="services" ref={containerRef} className="relative flex items-start">
      {/* Hero Section - Fixed Left Sidebar */}
      <motion.div
        ref={heroRef}
        className="sticky top-0 h-screen flex flex-col justify-center bg-white z-0 2xl:pl-30 pl-10 overflow-hidden 2xl:w-[38%] w-[40%] self-start "
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-[-1] opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2b4c8c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, -40, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-[-100px]"
            style={{ backgroundImage: 'linear-gradient(to right, #71c6a4 1px, transparent 1px), linear-gradient(to bottom, #71c6a4 1px, transparent 1px)', backgroundSize: '100px 100px' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="2xl:max-w-7xl mx-auto max-w-[100%] mb-12">
            <h1 className="2xl:text-5xl text-4xl text-left font-bold uppercase flex flex-wrap justify-left gap-x-3">
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={`hero-word inline-block ${word === "Protect" || word === "&" || word === "Grow" || word === "Revenue" || word === "Pharmacy" ? "text-[#2b4c8c]" : "text-[#71c6a4]"}`}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          {/* Hero Content Grid */}
          <div className="flex flex-col items-left gap-12 max-w-4xl mx-auto text-left">
            <p className="hero-desc text-md 2xl:text-xl font-light leading-relaxed text-gray-700 max-w-3xl">
              Empower your pharmacy with automated workflows and data-driven insights that safeguard your margins and accelerate revenue generation.
            </p>

            <div className="hero-btn">
              <FancyButton
                label="Become a client"
                textColor="white"
                borderColor="[#71c6a4]"
                bgColor="#71c6a4"
                rippleColor="#2b4c8c"
                extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200 2xl:py-5 2xl:px-10 px-8 py-4 font-bold text-sm shadow-[0_10px_30px_rgba(113,198,164,0.3)]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Sections - Scrollable Right Content */}
      <div className="bg-white 2xl:w-[62%] w-[60%]">
        {services.map((service, index) => (
          <ServiceSection
            key={service.number}
            zIndex={index + 10}
            {...service}
          />
        ))}
      </div>
    </section >
  );
}
