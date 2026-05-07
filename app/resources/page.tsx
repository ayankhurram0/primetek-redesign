"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import { motion } from "motion/react";
import { FileText, Play, Download, Search, ArrowRight } from "lucide-react";
import FancyButton from "@/app/components/button";

const resources = [
  {
    title: "2025 Pharmacy Compliance Whitepaper",
    category: "Whitepaper",
    desc: "A comprehensive guide to upcoming PBM audit trends and documentation standards.",
    icon: <FileText className="w-6 h-6 text-teal-400" />,
    link: "Download Report"
  },
  {
    title: "Optimizing Revenue Leakage: Video Series",
    category: "Video",
    desc: "Watch our experts breakdown the top 5 areas where pharmacies lose backend revenue.",
    icon: <Play className="w-6 h-6 text-blue-400" />,
    link: "Watch Now"
  },
  {
    title: "PBM Audit Readiness Checklist",
    category: "Toolkit",
    desc: "Download our 50-point checklist to ensure your pharmacy is ready for a PBM inspection.",
    icon: <Download className="w-6 h-6 text-orange-400" />,
    link: "Get Checklist"
  },
  {
    title: "Claims Denial Management Guide",
    category: "E-Book",
    desc: "A step-by-step methodology for reducing claim rejections and maximizing recovery.",
    icon: <Search className="w-6 h-6 text-emerald-400" />,
    link: "Read Guide"
  }
];

export default function ResourcesPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#resources-hero-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#resources-hero-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#resources-hero-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="resources-hero-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#resources-hero-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#resources-hero-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#resources-hero-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="resources-hero-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-400/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-400 font-bold text-xs uppercase tracking-[0.4em] mb-6 block"
          >
            Knowledge Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
            Resources for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Pharmacy Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Access our library of whitepapers, toolkits, and insights designed to help pharmacies safeguard revenue and optimize operations.
          </motion.p>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="py-24 relative">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#resources-grid-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#resources-grid-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#resources-grid-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="resources-grid-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#resources-grid-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#resources-grid-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#resources-grid-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#71c6a4" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="resources-grid-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#71c6a4" stopOpacity="1" /><stop offset="50%" stopColor="#71c6a4" stopOpacity="0.5" /><stop offset="100%" stopColor="#71c6a4" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#0a1122]/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[32px] hover:bg-teal-400/5 hover:border-teal-400/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-teal-400/10 transition-colors">
                    {resource.icon}
                  </div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 py-1 rounded-full border border-white/5">
                    {resource.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">{resource.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed mb-10">{resource.desc}</p>
                
                <div className="flex items-center gap-4 text-teal-400 font-bold text-sm tracking-widest uppercase group/btn cursor-pointer">
                  {resource.link}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
      <Footer />
    </main>
  );
}
