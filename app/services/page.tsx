"use client";

import React, { useRef, useEffect, useState } from "react";
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
  ChevronRight 
} from "lucide-react";
import Navbar from "@/app/components/Navbar";

const services = [
  {
    title: "CVS Aberrant Product List Monitoring",
    description: "Ongoing analysis of CVS Caremark aberrant product lists to identify high-risk dispensing patterns and reduce potential audit exposure and recoupments.",
    icon: <Search className="w-6 h-6" />,
    id: "service-cvs"
  },
  {
    title: "OptumRx Therapeutic Class Cap Tracking",
    description: "Bi-monthly monitoring of therapeutic class distribution to ensure your pharmacy remains within OptumRx thresholds and avoids compliance flags.",
    icon: <ShieldCheck className="w-6 h-6" />,
    id: "service-optum"
  },
  {
    title: "Copay & Reimbursement Trend Analysis",
    description: "Detailed review of copays, reimbursements, and patient out-of-pocket trends to identify inconsistencies, underpayments, and revenue opportunities.",
    icon: <TrendingUp className="w-6 h-6" />,
    id: "service-copay"
  },
  {
    title: "Inventory vs Claims Reconciliation",
    description: "Cross-analysis of dispensed claims against inventory movement to detect discrepancies, shrinkage, or potential financial loss.",
    icon: <ClipboardCheck className="w-6 h-6" />,
    id: "service-inventory"
  },
  {
    title: "Custom PBM & Financial Reports",
    description: "Tailored reporting based on your pharmacy's specific needs, payer mix, and operational priorities — delivered as needed.",
    icon: <BarChart3 className="w-6 h-6" />,
    id: "service-custom"
  }
];

const outcomes = [
  "Early identification of compliance risks",
  "Reduced audit exposure and recoupments",
  "Improved reimbursement visibility",
  "Data-driven operational decision-making"
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

export default function ServicesPage() {
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

  // Navbar scroll effect using state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="relative min-h-screen bg-white overflow-x-hidden">
        
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-400 z-[60] origin-left"
        style={{ 
          scaleX,
          opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0])
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-teal-400/10 to-[#2b4c8c]/10">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#services-hero-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#services-hero-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#services-hero-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-hero-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#services-hero-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#services-hero-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#services-hero-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-hero-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 mb-8 text-[10px] font-bold uppercase tracking-[0.2em] bg-gray-100 rounded-full text-[#2b4c8c]">
              Revenue Intelligence & Reporting
            </span>
          </motion.div>
          
          <RevealText className="mb-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-[#2b4c8c]">
              Gain Clear Visibility Into Your Pharmacy&apos;s Financial Performance
            </h1>
          </RevealText>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-12"
          >
            We transform raw pharmacy and PBM data into actionable insights, allowing you to detect irregularities, monitor trends, and make informed operational decisions.
            <br className="hidden md:block" />
            Reports are delivered twice monthly, with immediate notification if critical discrepancies or performance concerns are identified.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <button className="group flex items-center gap-3 px-10 py-5 bg-teal-400 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg shadow-teal-400/20">
              View Reports
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-8 py-5 border border-gray-200 rounded-full text-sm font-medium text-gray-500 bg-white/50 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
              Reports delivered twice monthly
            </div>
          </motion.div>
        </motion.div>

        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: useTransform(heroScroll, [0, 1], [0, -150]) }}
          className="absolute top-1/4 right-0 -z-10 w-1/3 aspect-square bg-teal-400/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(heroScroll, [0, 1], [0, 100]) }}
          className="absolute bottom-0 left-1/4 -z-10 w-1/4 aspect-square bg-[#2b4c8c]/5 rounded-full blur-3xl" 
        />
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6 md:px-12 lg:px-24 bg-white relative z-20">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#services-grid-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#services-grid-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#services-grid-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-grid-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#services-grid-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#services-grid-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#services-grid-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-grid-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <RevealText>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 uppercase text-[#2b4c8c]">What We Do</h2>
            </RevealText>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-500 text-xl max-w-lg"
            >
              Comprehensive monitoring and analysis tailored to your pharmacy&apos;s specific needs.
            </motion.p>
          </div>
          <div className="text-right hidden md:block">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              viewport={{ once: true }}
              className="text-9xl font-display font-black text-[#2b4c8c]"
            >
              01
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white p-12 hover:shadow-[0_20px_50px_rgba(43,76,140,0.1)] transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Animated background accent */}
              <motion.div 
                className="absolute -right-12 -bottom-12 w-48 h-48 bg-teal-400/5 rounded-full blur-3xl group-hover:bg-teal-400/15 transition-colors duration-500"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
              />
              
              <div className="absolute top-0 left-0 w-1 h-0 bg-teal-400 group-hover:h-full transition-all duration-700" />
              
              <motion.div 
                className="mb-10 text-[#2b4c8c] origin-left relative z-10"
                whileHover={{ 
                  rotate: [0, -15, 15, -15, 0],
                  scale: 1.2,
                  color: "#71c6a4"
                }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="font-display text-2xl font-bold mb-6 text-[#2b4c8c] group-hover:translate-x-2 transition-transform duration-500 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-500 relative z-10">
                {service.description}
              </p>
              
              <motion.div 
                className="mt-8 flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 relative z-10"
                initial={{ x: -20 }}
                whileHover={{ x: 5 }}
              >
                Explore Solution <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Alert System Section */}
      <section id="alerts" className="py-32 px-6 md:px-12 lg:px-24 bg-[#2b4c8c] text-white overflow-hidden relative">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#services-alerts-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#services-alerts-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#services-alerts-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-alerts-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#services-alerts-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#services-alerts-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#services-alerts-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-alerts-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        <div className="max-w-5xl relative z-10 mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center animate-pulse">
                  <AlertCircle className="w-7 h-7 text-[#2b4c8c]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.4em] text-teal-400">Alert System</span>
              </motion.div>
              
              <RevealText>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[0.9]">Proactive Risk Alerts Included</h2>
              </RevealText>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-xl leading-relaxed mb-12 max-w-xl"
              >
                If any breach, discrepancy, or threshold risk is identified during our analysis, your pharmacy is notified immediately allowing for fast corrective action before it escalates into financial loss or audit exposure.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
              >
                <div className="p-3 bg-teal-400/20 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-lg font-medium">Real-time notifications for critical discrepancies</p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-2/5 aspect-square relative"
            >
              <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full bg-white/5 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-xl">
                <div className="w-3/4 h-3/4 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <div className="w-1/2 h-1/2 bg-teal-400 rounded-full flex items-center justify-center shadow-2xl shadow-teal-400/50">
                    <BarChart3 className="w-12 h-12 text-[#2b4c8c]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-32 px-6 md:px-12 lg:px-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#services-outcomes-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#services-outcomes-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#services-outcomes-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-outcomes-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>

        {/* Decorative Elements - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
          <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
            <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#services-outcomes-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#services-outcomes-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#services-outcomes-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
            {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2b4c8c" opacity={0.6 + i * 0.05} />))}
            <defs><linearGradient id="services-outcomes-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2b4c8c" stopOpacity="1" /><stop offset="50%" stopColor="#2b4c8c" stopOpacity="0.5" /><stop offset="100%" stopColor="#2b4c8c" stopOpacity="0" /></linearGradient></defs>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <RevealText>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[0.85] text-[#2b4c8c]">
                  What This Means for Your Pharmacy
                </h2>
              </RevealText>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-xl mb-12 max-w-md"
              >
                Our intelligence reporting provides foundation for a more secure and profitable operation.
              </motion.p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-[#2b4c8c] text-[#2b4c8c] font-bold uppercase tracking-widest text-sm hover:bg-[#2b4c8c] hover:text-white transition-all rounded-full shadow-xl shadow-[#2b4c8c]/5"
              >
                Download Sample Report
              </motion.button>
            </div>
            <div className="space-y-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    x: -15,
                    backgroundColor: "rgba(113, 198, 164, 0.05)",
                    borderColor: "#71c6a4",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  className="flex items-center justify-between p-8 bg-white border border-gray-100 rounded-3xl group transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-teal-400/20 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-teal-400 transition-all duration-500 shadow-inner"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        transition: { duration: 0.6, ease: "easeOut" }
                      }}
                    >
                      <CheckCircle2 className="w-7 h-7 text-black group-hover:text-white transition-colors duration-500" />
                    </motion.div>
                    <span className="font-bold text-xl text-[#2b4c8c] group-hover:translate-x-4 transition-transform duration-500 ease-out">{outcome}</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-7 h-7 text-gray-300 group-hover:text-teal-400 transition-colors duration-500" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
