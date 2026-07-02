'use client'
import Image from "next/image";
import hco1 from "@/src/assets/hco1.png";
import hco2 from "@/src/assets/hco2.png";
import hco3 from "@/src/assets/hco3.png";
import FancyButton from "./button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Operations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Step-based animations (0 to 1 scroll progress)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [50, 0]);

  const imagesOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const imagesScale = useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1]);

  const buttonOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  const highlights = [
    "Focused on reimbursement performance and financial visibility",
    "Built around real pharmacy workflows and payer dynamics",
    "Scalable support for independent and multi-location operations"
  ];
  return (
    <div className="relative">
      <section className="flex items-center bg-white py-40">
        <div className="w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 pt-10 lg:pt-0">
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-4"
              >
                <span className="text-accent">Designed for</span>{" "}
                <span className="text-[#2b4c8c]">Pharmacies Operating Under Pressure</span>
              </h2>

              <div
                className="space-y-6"
              >
                <p className="text-black text-base md:text-base leading-relaxed mb-4 font-light">
                  Pharmacies today face constant pressure from reimbursement variability, payer requirements, and operational complexity.
                  PrimeTek provides structured, non-clinical support designed to bring clarity, control, and consistency to these environments — allowing pharmacy owners to operate with greater confidence and stability.
                </p>

                <div className="mb-6">
                  <h3 className="text-[#2b4c8c] font-bold text-lg mb-4 uppercase tracking-widest flex items-center">
                    Key Highlights
                  </h3>
                  <div className="flex flex-col gap-2">
                    {highlights.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-black text-base"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col gap-5 mt-8"
              >
                <FancyButton
                  label="Explore Our Services →"
                  textColor="white"
                  borderColor="teal-400"
                  rippleColor="#2b4c8c"
                  bgColor="teak-400"
                  extraClasses="w-fit hover:border-[#2b4c8c] transition-all duration-200"
                />
              </div>
            </div>

            <div
              className="relative w-full lg:w-1/2 group"
            >
              <div className="relative overflow-hidden transition-transform duration-700">
                <Image
                  src={hco1}
                  alt="Primetek Logo"
                  className="w-80 m-auto h-auto"
                />
                <Image
                  src={hco2}
                  alt="Primetek Logo"
                  className="w-[85%]  m-auto h-auto"
                />
                <Image
                  src={hco3}
                  alt="Primetek Logo"
                  className="w-full m-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

