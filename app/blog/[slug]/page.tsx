"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "../blogData";
import Navbar from "@/app/components/Navbar";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";
import AnimationWrapper, { StaggerContainer, StaggerItem } from "@/app/components/AnimationWrapper";

export default function BlogInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  // Very simple read time estimation based on word count
  const wordCount = post.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200) || 1;

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Navbar />

      {/* Blog Hero Container - No large image bg, elegant text focus */}
      <section className="relative pt-40 pb-20 bg-[#f8fbfa] border-b border-[#71c6a4]/20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <StaggerContainer delayChildren={0.2} staggerChildren={0.15}>
            <StaggerItem>
              <div className="flex items-center justify-center gap-2 text-sm font-black tracking-widest uppercase mb-6 text-[#71c6a4]">
                <Link href="/" className="hover:text-[#2b4c8c] transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/blog" className="hover:text-[#2b4c8c] transition-colors">Blog</Link>
                <span className="text-slate-300">/</span>
                <span className="text-[#2b4c8c]">{post.category}</span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight text-[#2b4c8c] max-w-4xl mx-auto">
                {post.title}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center justify-center gap-6 text-slate-500 font-medium text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#71c6a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span>{post.author}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#71c6a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <span>{post.date}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#71c6a4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{readTime} Min Read</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <AnimationWrapper direction="up" distance={40}>
            {/* Featured Image */}
            <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-16 ring-8 ring-slate-50">
              <Image 
                src={post.image!} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="up" distance={30}>
            {/* The Prose Container for raw HTML rendering */}
            <article 
              className="prose prose-lg md:prose-xl prose-slate max-w-none 
                         prose-headings:font-black prose-headings:text-[#2b4c8c] prose-headings:mb-6
                         prose-h2:text-3xl prose-h2:mt-12
                         prose-p:font-light prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8
                         prose-a:text-[#71c6a4] prose-a:font-bold hover:prose-a:text-[#2b4c8c]
                         prose-strong:text-[#2b4c8c] prose-strong:font-bold
                         prose-li:text-slate-600 prose-li:font-light
                         border-b border-slate-200 pb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimationWrapper>

          {/* Social Share / Tags Footer */}
          <AnimationWrapper direction="up" distance={20} className="mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share Article:</span>
                {/* Placeholder social buttons */}
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#2b4c8c] hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#2b4c8c] hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
              
              <Link href="/blog" className="px-6 py-3 bg-[#71c6a4]/10 text-[#2b4c8c] font-black uppercase tracking-wider text-xs rounded-full hover:bg-[#71c6a4] hover:text-white transition-colors">
                Back to All Articles
              </Link>
            </div>
          </AnimationWrapper>

        </div>
      </section>

      <ConsultationCTA />
      <Footer />
    </main>
  );
}
