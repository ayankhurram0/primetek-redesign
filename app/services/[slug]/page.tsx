"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Search, 
  ClipboardCheck, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  FileText,
  DollarSign,
  Eye,
  Target
} from "lucide-react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../servicesData";
import Navbar from "@/app/components/Navbar";
import ConsultationCTA from "@/app/components/ConsultationCTA";
import Footer from "@/app/components/Footer";
import FancyButton from "@/app/components/button";

const features = [
  {
    title: "Revenue Leakage Identification",
    description: "Advanced algorithms analyze your claims data to identify patterns of revenue loss and underpayment issues that may be affecting your bottom line.",
    icon: <DollarSign className="w-6 h-6" />,
    id: "feature-1"
  },
  {
    title: "PBM Performance Monitoring",
    description: "Real-time tracking of PBM contract performance across all major payers to ensure you're receiving optimal reimbursement rates.",
    icon: <Target className="w-6 h-6" />,
    id: "feature-2"
  },
  {
    title: "Compliance Risk Analysis",
    description: "Proactive identification of potential compliance issues before they become audit risks, with detailed mitigation recommendations.",
    icon: <ShieldCheck className="w-6 h-6" />,
    id: "feature-3"
  },
  {
    title: "Structured Data Reporting",
    description: "Comprehensive monthly reports with actionable insights, trend analysis, and performance benchmarks against industry standards.",
    icon: <FileText className="w-6 h-6" />,
    id: "feature-4"
  }
];

const benefits = [
  "Maximized revenue capture through systematic analysis",
  "Proactive compliance management with early warning system",
  "Data-driven decision making with real-time insights",
  "Reduced financial exposure through risk mitigation"
];

const processSteps = [
  {
    title: "Data Integration",
    description: "Secure integration with your pharmacy management system to collect comprehensive operational data.",
    step: "01",
    id: "step-1"
  },
  {
    title: "Analysis Engine",
    description: "Our proprietary algorithms process your data to identify patterns, anomalies, and optimization opportunities.",
    step: "02",
    id: "step-2"
  },
  {
    title: "Report Generation",
    description: "Monthly comprehensive reports delivered with actionable insights and compliance recommendations.",
    step: "03",
    id: "step-3"
  },
  {
    title: "Ongoing Monitoring",
    description: "Continuous monitoring with immediate alerts for critical issues that require attention.",
    step: "04",
    id: "step-4"
  }
];

function RevealText({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function ServiceInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroBgY1 = useTransform(heroScroll, [0, 1], [0, -150]);
  const heroBgY2 = useTransform(heroScroll, [0, 1], [0, 100]);

  return (
  
    <div className="relative min-h-screen bg-[#020817]">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#71c6a4] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-48 pb-32 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[#71c6a4]/10 to-[#2b4c8c]/20">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 border border-white/10 rounded-full text-[#71c6a4]">
              {service.title}
            </span>
          </motion.div>
          
          <RevealText className="mb-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter text-white">
              Maximize Your Pharmacy <span className="text-gradient">Revenue Potential</span>
            </h1>
          </RevealText>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-light"
          >
            {service.fullDesc}
            <br className="hidden md:block" />
            <span className="mt-4 block text-slate-300">Transform raw operational data into actionable insights that drive profitability and ensure regulatory alignment.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <FancyButton
              label="Get Started"
              textColor="white"
              borderColor="[#71c6a4]"
              rippleColor="white"
              bgColor="#71c6a4"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all duration-200"
            />
            <div className="flex items-center gap-4 px-8 py-5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#71c6a4] rounded-full animate-pulse shadow-[0_0_10px_rgba(113,198,164,0.5)]" />
              Monthly Reports Delivered
            </div>
          </motion.div>
        </motion.div>

        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: heroBgY1 }}
          className="absolute top-1/4 right-0 -z-10 w-1/2 aspect-square bg-[#71c6a4]/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: heroBgY2 }}
          className="absolute bottom-0 left-1/4 -z-10 w-1/3 aspect-square bg-[#2b4c8c]/10 rounded-full blur-[150px]" 
        />
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#020817] relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <RevealText>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white uppercase italic leading-none">Key <span className="text-gradient font-light">Features</span></h2>
            </RevealText>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-xl max-w-3xl mx-auto font-light"
            >
              Comprehensive tools and insights designed specifically for pharmacy revenue optimization and compliance management.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="group glass p-10 border border-white/5 rounded-[32px] hover:border-[#71c6a4]/30 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#71c6a4] flex items-center justify-center text-brand-950 shadow-[0_0_20px_rgba(113,198,164,0.2)]">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl font-medium text-white uppercase italic leading-tight group-hover:text-[#71c6a4] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#020817]/50 relative overflow-hidden border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <RevealText>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white uppercase italic leading-none">How It <span className="text-gradient font-light">Works</span></h2>
            </RevealText>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-400 text-xl max-w-3xl mx-auto font-light"
            >
              Our systematic approach ensures comprehensive coverage of your pharmacy&apos;s revenue and compliance landscape.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="relative group"
              >
                <div className="glass p-10 rounded-[32px] border border-white/5 hover:border-[#71c6a4]/20 transition-all duration-500 h-full">
                  <div className="w-10 h-10 bg-[#71c6a4] text-brand-950 rounded-full flex items-center justify-center font-black text-sm mb-8">
                    {step.step}
                  </div>
                  <h3 className="font-display text-xl font-medium text-white uppercase italic mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#020817] relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <RevealText>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.9] text-white uppercase italic">
                  Transform Your <span className="text-gradient font-light">Pharmacy Operations</span>
                </h2>
              </RevealText>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-400 text-xl mb-12 max-w-md font-light leading-relaxed"
              >
                Our revenue intelligence service provides the foundation for sustainable growth and compliance excellence.
              </motion.p>
              <FancyButton
                label="Schedule Consultation"
                textColor="white"
                borderColor="[#2b4c8c]"
                rippleColor="#71c6a4"
                bgColor="#2b4c8c"
                extraClasses="hover:border-[#71c6a4] font-bold! transition-all duration-500"
              />
            </div>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    x: -15,
                    backgroundColor: "rgba(113, 198, 164, 0.05)",
                    borderColor: "rgba(113, 198, 164, 0.3)",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  className="flex items-center justify-between p-8 glass border border-white/5 rounded-[32px] group transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-[#71c6a4] group-hover:bg-[#71c6a4] group-hover:text-brand-950 transition-all duration-500">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <span className="font-bold text-xl text-white group-hover:translate-x-2 transition-transform duration-500 ease-out">{benefit}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-[#71c6a4] group-hover:translate-x-1 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultationCTA />
      <Footer />
    </div>
  );
}
