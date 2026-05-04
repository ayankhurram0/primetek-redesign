"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/footer-logo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup";
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  return (
    <div className="relative min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden font-sans py-20 px-4">
      {/* Background Spotlight Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_80%)] pointer-events-none" />
      
      {/* Background Grid - Matching Hero.tsx */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)]" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2dd4bf]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2b4c8c]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <Link href="/">
            <Image
              src={logo}
              alt="PrimeTek Logo"
              width={200}
              height={50}
              className="h-16 w-auto"
            />
          </Link>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Accent Border Glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-white/60 text-sm">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            {type === "login" ? (
              <p className="text-white/40 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#2dd4bf] font-semibold hover:underline">
                  Sign up for free
                </Link>
              </p>
            ) : (
              <p className="text-white/40 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#2dd4bf] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
