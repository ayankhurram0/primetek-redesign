"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Info, TrendingUp, Activity, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from "react";
import pharmacist from "@/src/assets/pharmacist.png";
import Image from "next/image";
import FancyButton from "./button";

const auditData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 75 },
  { name: 'Jun', value: 90 },
];

const complianceData = [
  { name: 'W1', value: 65 },
  { name: 'W2', value: 58 },
  { name: 'W3', value: 82 },
  { name: 'W4', value: 78 },
  { name: 'W5', value: 85 },
];

const reimbursementData = [
  { name: 'Recov', value: 12400 },
  { name: 'Pend', value: 4200 },
  { name: 'Loss', value: 1500 },
];

const pbmData = [
  { name: 'Verified', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Flagged', value: 100 },
];

const COLORS = ['#99f6e4', '#5eead4', '#2dd4bf', '#0d9488'];

const HealthCards = ({ mounted }: { mounted: boolean }) => (
  !mounted ? (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-72 h-72 bg-[#042f2e]/90 backdrop-blur-xl rounded-3xl p-5 border border-[#2dd4bf]/20 flex flex-col justify-between shrink-0 animate-pulse" />
      ))}
    </>
  ) : (
    <>
      {/* Card 1: Audit Readiness (Line Chart) */}
      <div className="w-72 h-72 bg-[#042f2e]/90 backdrop-blur-lg rounded-3xl p-5 border border-[#2dd4bf]/30 flex flex-col justify-between shrink-0 shadow-lg shadow-teal-900/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-white font-bold" />
            <span className="text-[10px] uppercase tracking-widest text-white font-bold">Audit Readiness</span>
          </div>
          <Info size={14} className="text-white" />
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={auditData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2dd4bf"
                strokeWidth={3}
                dot={{ r: 4, fill: '#2dd4bf' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2">
            <h3 className="text-lg font-display font-bold leading-tight text-white">Readiness Score</h3>
            <p className="text-[10px] text-white">90% increase in compliance readiness over Q1.</p>
          </div>
        </div>
        <div className="bg-teal-900/20 p-2 px-3 rounded-2xl flex items-center justify-between mt-1">
          <span className="text-[10px] font-bold text-white">Ready for Review</span>
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
        </div>
      </div>

      {/* Card 2: Compliance Protocol (Area Chart) */}
      <div className="w-72 h-72 bg-[#042f2e]/90 backdrop-blur-lg rounded-3xl p-5 border border-[#2dd4bf]/30 flex flex-col justify-between shrink-0 shadow-lg shadow-teal-900/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-white font-bold" />
            <span className="text-[10px] uppercase tracking-widest text-white font-bold">Compliance Protocol</span>
          </div>
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={complianceData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2dd4bf"
                fillOpacity={1}
                fill="url(#colorVal)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2">
            <h3 className="text-lg font-display font-bold leading-tight text-white">Protocol Adherence</h3>
            <p className="text-[10px] text-white">Real-time monitoring of institutional requirements.</p>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2 text-white">
          <div className="text-2xl font-bold">85%</div>
          <div className="text-[10px] opacity-60 mb-1 font-bold">Weekly Avg</div>
        </div>
      </div>

      {/* Card 3: Reimbursement Reconciliation (Bar Chart) */}
      <div className="w-72 h-72 bg-[#042f2e]/90 backdrop-blur-lg rounded-3xl p-5 border border-[#2dd4bf]/30 flex flex-col justify-between shrink-0 shadow-lg shadow-teal-900/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-white font-bold" />
            <span className="text-[10px] uppercase tracking-widest text-white font-bold">Reconciliation</span>
          </div>
          <ChevronRight size={14} className="text-white" />
        </div>
        <div className="flex-1 mt-4">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={reimbursementData}>
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {reimbursementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#4ade80' : index === 1 ? '#fbbf24' : '#f87171'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2">
            <h3 className="text-lg font-display font-bold leading-tight text-white">Revenue Recovery</h3>
            <p className="text-[10px] text-white">Discrepancy resolution and cycle efficiency.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-white/5 p-2 rounded-xl">
            <div className="text-[8px] text-white uppercase font-bold">Recovered</div>
            <div className="text-xs font-bold text-green">+$12.4k</div>
          </div>
          <div className="bg-teal-900/20 p-2 rounded-xl">
            <div className="text-[8px] text-white uppercase font-bold">Pending</div>
            <div className="text-xs font-bold text-yellow">$4.2k</div>
          </div>
        </div>
      </div>

      {/* Card 4: PBM Checklist (Pie Chart) */}
      <div className="w-72 h-72 bg-[#042f2e]/90 backdrop-blur-lg rounded-3xl p-5 border border-[#2dd4bf]/30 flex flex-col justify-between shrink-0 shadow-lg shadow-teal-900/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <PieChartIcon size={14} className="text-white font-bold" />
            <span className="text-[10px] uppercase tracking-widest text-white font-bold">PBM Checklist</span>
          </div>
          <Info size={14} className="text-white" />
        </div>
        <div className="flex-1 mt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={pbmData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {pbmData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 mt-2">
          <h3 className="text-lg font-display font-bold leading-tight text-white">Verification Audit</h3>
          <div className="flex gap-2 text-[8px] text-white font-bold">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" /> Verified
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5eead4]" /> Pending
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#99f6e4]" /> Flagged
            </div>
          </div>
        </div>
      </div>
    </>
  )
);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Decorative Elements - Top Right */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M500 0 C250 0, 250 250, 0 250" stroke="url(#newhero-gradient-tr)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M500 80 C300 80, 300 300, 80 300" stroke="url(#newhero-gradient-tr)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M500 160 C350 160, 350 350, 160 350" stroke="url(#newhero-gradient-tr)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`tr-${i}`} cx={450 - i * 35} cy={30 + i * 25} r="3" fill="#2dd4bf" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="newhero-gradient-tr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2dd4bf" stopOpacity="1" /><stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" /><stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none z-0 opacity-80">
        <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
          <path d="M0 500 C250 500, 250 250, 500 250" stroke="url(#newhero-gradient-bl)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M0 420 C200 420, 200 200, 420 200" stroke="url(#newhero-gradient-bl)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M0 340 C150 340, 150 150, 340 150" stroke="url(#newhero-gradient-bl)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          {[...Array(8)].map((_, i) => (<circle key={`bl-${i}`} cx={30 + i * 35} cy={470 - i * 25} r="3" fill="#2dd4bf" opacity={0.6 + i * 0.05} />))}
          <defs><linearGradient id="newhero-gradient-bl" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2dd4bf" stopOpacity="1" /><stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" /><stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" /></linearGradient></defs>
        </svg>
      </div>

      {/* Background Spotlight Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_80%)] pointer-events-none" />
            {/* Background Cards Layer - 3D Infinite Autoplay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden [perspective:1200px] -translate-y-60!">
        <motion.div
          animate={{
            x: ["0%", "-25%"]
          }}
          transition={{
            duration: 45,
            ease: "linear",
            repeat: Infinity
          }}
          className="flex transform rotate-16 [transform-style:preserve-3d] opacity-60"
        >
          {/* Multiple Sets for Seamless Loop (Ensures coverage on wide screens) */}
          <div className="flex gap-12 pr-12">
            <HealthCards mounted={mounted} />
          </div>
          <div className="flex gap-12 pr-12">
            <HealthCards mounted={mounted} />
          </div>
          <div className="flex gap-12 pr-12">
            <HealthCards mounted={mounted} />
          </div>
          <div className="flex gap-12 pr-12">
            <HealthCards mounted={mounted} />
          </div>
        </motion.div>
      </div>

      {/* Foreground Image (Pharmacist - Right Aligned) */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="relative 2xl:h-[90%] w-auto flex items-end"
        >
          <Image
            src={pharmacist}
            alt="Professional female pharmacist"
            className="h-full w-auto object-contain object-bottom drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.2)]"
            priority
          />
                  </motion.div>
      </div>

      {/* Hero Content - Left Aligned Layout */}
      <div className="relative z-10 w-full h-screen flex flex-col justify-center items-start pt-15 px-6 2xl:px-24 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
        
        <div className="relative flex flex-col items-center text-left 2xl:w-[58%] w-[55%] pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=""
          >
            <div className="py-12 rounded-full">
              <span className="text-md 2xl:text-4xl font-bold tracking-wider uppercase text-[#2dd4bf]">
                OPERATIONAL SYSTEMS BUILT FOR INDEPENDENT & MULTI-LOCATION PHARMACIES
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight text-white"
          >
            Is your pharmacy losing revenue due to hidden <span className="text-[#2dd4bf]">compliance gaps?</span>
          </motion.h1>
        </div>

        {/* Bottom Section: Description + Buttons */}
        <div className="flex flex-col items-start text-left max-w-3xl pointer-events-auto mt-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-lg 2xl:text-3xl text-white/60 mb-14 font-medium z-10"
          >
            Built to support pharmacies navigating PBM pressure, audit risk, and operational complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <FancyButton
              label="Request a Strategy Call"
              textColor="white"
              borderColor="teal-400"
              rippleColor="#2b4c8c"
              bgColor="#2dd4bf"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all font-bold! duration-200 2xl:py-6 2xl:px-8 2xl:text-[22px]" />
            <FancyButton
              label="See How We Protect Revenue"
              textColor="white"
              borderColor="[#2b4c8c]"
              rippleColor="#2dd4bf"
              bgColor="#2b4c8c"
              extraClasses="backdrop-blur-md hover:border-teal-400 font-bold! transition-all duration-500 2xl:py-6 2xl:px-8 2xl:text-[22px]"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            />
          </motion.div>
        </div>
      </div>

          </div>
  );
}
