"use client";

import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";
import Link from "next/link";

export default function BlogHero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden pt-20 bg-[#2b4c8c]">
      {/* Decorative pulse background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#71c6a4] rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 w-[95%] max-w-[1800px] px-8 flex flex-col items-center">
        <StaggerContainer delayChildren={0.3} staggerChildren={0.15} className="flex flex-col items-center">
          <StaggerItem>
            <div className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase mb-6 text-[#71c6a4]">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Our Blogs</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight text-white drop-shadow-xl">
              NEWS & <br className="hidden md:block" />
              PUBLICATIONS
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
              Stay ahead of the curve with PrimeTek's latest operational insights, compliance strategies, and industry news.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
