"use client";

import Image from "next/image";
import aboutMissionImg from "@/src/assets/sec2.png"; // Reusing an asset or using a placeholder
import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";

export default function AboutMission() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <AnimationWrapper direction="left" distance={50} className="w-full lg:w-1/2">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
              <Image
                src={aboutMissionImg}
                alt="Our Mission"
                className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2b4c8c]/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="right" distance={50} className="w-full lg:w-1/2 flex flex-col gap-8">
            <div>
              <span className="text-[#71c6a4] font-black text-sm uppercase tracking-widest mb-4 block">
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#2b4c8c] leading-tight mb-6">
                Redefining Operational Excellence in Healthcare
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                Our mission is to empower healthcare providers by delivering 
                high-impact, non-clinical operational solutions that ensure 
                compliance, maximize efficiency, and foster sustainable growth.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <span className="text-[#71c6a4] font-black text-sm uppercase tracking-widest mb-4 block">
                Our Vision
              </span>
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                To be the leading strategic partner for pharmacies and medical groups, 
                defining the standard for operational control and compliance in the 
                ever-evolving healthcare landscape.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
