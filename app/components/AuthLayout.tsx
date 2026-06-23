"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";
import pharmacistImage from "@/src/assets/pharmacist.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  return (
    <div className="relative w-screen h-screen bg-[#020817] flex overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          overflow: hidden !important;
          height: 100% !important;
          width: 100% !important;
          scrollbar-width: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
          display: none !important;
        }
      `}} />
      
      {/* Left side: Premium Image Block (hidden on mobile/tablet, shown on lg and above) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative bg-[#01141a] overflow-hidden flex-col justify-between p-16 border-r border-white/10">
        {/* Subtle dark green overlay for blending into theme */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020817] via-transparent to-[#005969]/40 z-10" />
        
        {/* Background Image */}
        <Image
          src={pharmacistImage}
          alt="Pharmacy professional"
          fill
          priority
          className="object-cover opacity-60 z-0 scale-110"
        />

        {/* Logo at the top left */}
        <div className="relative z-20">
          <Link href="/">
            <Image
              src={logo}
              alt="PrimeTek Logo"
              width={220}
              height={55}
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Testimonial Quote at the bottom */}
        <div className="relative z-20 bg-[#020817]/70 backdrop-blur-md p-10 rounded-3xl border border-white/10 max-w-lg shadow-2xl">
          <p className="text-white text-xl font-medium leading-relaxed mb-6 font-display italic">
            "PrimeTek restored complete visibility over our claims margins and protected us from clawbacks when we faced PBM audit pressure."
          </p>
          <div>
            <div className="text-white font-bold uppercase tracking-wider text-sm">Independent Pharmacy Owner</div>
            <div className="text-teal-400 text-xs mt-1 uppercase tracking-wider">Multi-Store Client</div>
          </div>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="w-full lg:w-[55%] xl:w-[60%] flex items-center justify-center p-8 md:p-16 relative overflow-y-auto overflow-x-hidden no-scrollbar">
         {/* Background Spotlight Gradient */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.06)_0%,transparent_80%)] pointer-events-none" />
         
         {/* Background Grid - Matching Hero.tsx */}
         <div 
           className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
         />

         {/* Decorative Blur Orbs */}
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2dd4bf]/3 blur-[120px] rounded-full pointer-events-none" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2b4c8c]/5 blur-[120px] rounded-full pointer-events-none" />

         <div className="w-full max-w-lg relative z-10 py-10">
           {/* Logo for mobile only */}
           <div className="flex justify-center mb-10 lg:hidden">
             <Link href="/">
               <Image
                 src={logo}
                 alt="PrimeTek Logo"
                 width={200}
                 height={50}
                 className="h-12 w-auto"
               />
             </Link>
           </div>

           <div className="mb-10 text-center">
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
               {title}
             </h1>
             <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md mx-auto">
               {subtitle}
             </p>
           </div>

           {children}

           <div className="mt-10 pt-10 border-t border-white/5 text-center">
             {type === "login" ? (
               <p className="text-white/40 text-base">
                 Don't have an account?{" "}
                 <Link href="/signup" className="text-[#2dd4bf] font-semibold hover:underline">
                   Sign up for free
                 </Link>
               </p>
             ) : (
               <p className="text-white/40 text-base">
                 Already have an account?{" "}
                 <Link href="/login" className="text-[#2dd4bf] font-semibold hover:underline">
                   Sign in
                 </Link>
               </p>
             )}
           </div>

           {/* Back to Home */}
           <div className="text-center mt-10">
             <Link href="/" className="text-white/40 hover:text-white text-base transition-colors flex items-center justify-center gap-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="m15 18-6-6 6-6"/>
               </svg>
               Back to homepage
             </Link>
           </div>
         </div>
      </div>
    </div>
  );
};
