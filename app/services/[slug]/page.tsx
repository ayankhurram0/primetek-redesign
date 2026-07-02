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
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}

export default function ServiceInnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden font-montserrat">

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-teal-400/5 to-[#2b4c8c]/10">
        <div
          className="max-w-5xl relative z-10"
        >
          <div>
            <span className="inline-block px-4 py-1.5 mb-8 text-[9px] font-bold uppercase tracking-[0.3em] bg-white/65 border border-ink/10 rounded-full text-accent">
              {service.title}
            </span>
          </div>

          <RevealText className="mb-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter text-ink">
              Maximize Your Pharmacy <span className="text-gradient">Revenue Potential</span>
            </h1>
          </RevealText>

          <p
            className="text-xl md:text-2xl text-ink-muted max-w-3xl leading-relaxed mb-12 font-light"
          >
            {service.fullDesc}
            <br className="hidden md:block" />
            <span className="mt-4 block text-ink">Transform raw operational data into actionable insights that drive profitability and ensure regulatory alignment.</span>
          </p>

          <div
            className="flex flex-wrap gap-6"
          >
            <FancyButton
              label="Get Started"
              textColor="white"
              borderColor="teal-400"
              rippleColor="white"
              bgColor="teak-400"
              extraClasses="hover:border-[#2b4c8c] hover:text-ink transition-all duration-200"
            />
            <div className="flex items-center gap-4 px-8 py-5 border border-ink/10 rounded-full text-xs font-bold uppercase tracking-widest text-ink-muted bg-white/65 backdrop-blur-md">
              <span className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(113,198,164,0.5)]" />
              Monthly Reports Delivered
            </div>
          </div>
        </div>

        {/* Parallax Background Elements */}
        <div
          className="absolute top-1/4 right-0 -z-10 w-1/2 aspect-square bg-teal-400/5 rounded-full blur-[120px]"
        />
        <div
          className="absolute bottom-0 left-1/4 -z-10 w-1/3 aspect-square bg-[#2b4c8c]/10 rounded-full blur-[150px]"
        />
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white/70 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <RevealText>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-accent uppercase  leading-none">Key <span className="text-gradient font-light">Features</span></h2>
            </RevealText>
            <p
              className="text-ink-muted text-xl max-w-3xl mx-auto font-light"
            >
              Comprehensive tools and insights designed specifically for pharmacy revenue optimization and compliance management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group glass p-10 border border-ink/10 rounded-[32px] hover:border-teal-400/30 transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-teal-400 flex items-center justify-center text-brand-950 shadow-[0_0_20px_rgba(113,198,164,0.2)]">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl font-medium text-accent uppercase  leading-tight group-hover:text-teal-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-ink-muted leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent relative overflow-hidden border-y border-ink/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <RevealText>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-accent uppercase  leading-none">How It <span className="text-gradient font-light">Works</span></h2>
            </RevealText>
            <p
              className="text-ink-muted text-xl max-w-3xl mx-auto font-light"
            >
              Our systematic approach ensures comprehensive coverage of your pharmacy&apos;s revenue and compliance landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="relative group"
              >
                <div className="glass p-10 rounded-[32px] border border-ink/10 hover:border-teal-400/20 transition-all duration-500 h-full">
                  <div className="w-10 h-10 bg-teal-400 text-brand-950 rounded-full flex items-center justify-center font-bold text-sm mb-8">
                    {step.step}
                  </div>
                  <h3 className="font-display text-xl font-medium text-accent uppercase  mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white/70 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <RevealText>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.9] text-accent uppercase ">
                  Transform Your <span className="text-gradient font-light">Pharmacy Operations</span>
                </h2>
              </RevealText>
              <p
                className="text-ink-muted text-xl mb-12 max-w-md font-light leading-relaxed"
              >
                Our revenue intelligence service provides the foundation for sustainable growth and compliance excellence.
              </p>
              <FancyButton
                label="Schedule Consultation"
                textColor="white"
                borderColor="[#2b4c8c]"
                rippleColor="teak-400"
                bgColor="#2b4c8c"
                extraClasses="hover:border-teal-400 font-bold! transition-all duration-500"
              />
            </div>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-8 glass border border-ink/10 rounded-[32px] group transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-white/65 flex items-center justify-center text-accent group-hover:bg-teal-400 group-hover:text-brand-950 transition-all duration-500">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <span className="font-bold text-xl text-ink group-hover:translate-x-2 transition-transform duration-500 ease-out">{benefit}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-ink-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-500" />
                </div>
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
