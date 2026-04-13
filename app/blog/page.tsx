"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";
import FancyButton from "@/app/components/button";
import BlogHero from "./components/BlogHero";
import { blogs } from "./blogData";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50">
      <Navbar />
      <BlogHero />

      <section className="py-24 w-[95%] max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <AnimationWrapper direction="up" distance={20}>
            <span className="text-[#2b4c8c] font-black text-sm uppercase tracking-widest mb-4 block">
              Knowledge Base
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#2b4c8c] leading-tight mb-6">
              Latest <span className="text-[#71c6a4]">Articles</span>
            </h2>
          </AnimationWrapper>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((post, index) => (
            <StaggerItem key={index}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full border border-slate-100">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={post.image!}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#2b4c8c]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-xs text-[#2b4c8c] tracking-wider uppercase">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-1 z-10 relative">
                    <span className="text-[#71c6a4] text-sm font-black tracking-widest uppercase mb-4 block">
                      {post.date}
                    </span>
                    <h4 className="text-[#2b4c8c] font-black text-xl md:text-2xl mb-4 leading-snug line-clamp-3 group-hover:text-[#71c6a4] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 flex-1 font-light line-clamp-3">
                      {post.description}
                    </p>
                    <div className="w-fit pointer-events-none mt-auto">
                      <FancyButton
                        label="Read Full Post"
                        textColor="white"
                        borderColor="[#71c6a4]"
                        rippleColor="#2b4c8c"
                        bgColor="#78dcca"
                        extraClasses="!py-3 !text-xs group-hover:translate-x-1 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <ConsultationCTA />
      <Footer />
    </main>
  );
}
