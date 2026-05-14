"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FancyButton from "./button";

import {
  ArrowRight,
  Activity,
  TrendingUp,
  BarChart3,
  ChevronRight
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';
import pharmacistImg from "@/src/assets/pharmacist.png";


// Data for Charts
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

const pbmData = [
  { name: 'Verified', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Flagged', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden font-sans border-b border-white/5">
      {/* Background Grid & Gloom */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />


      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto h-screen flex items-center pt-20">

        {/* Left Col: Text Content */}
        <div className="w-[50%] flex flex-col items-start text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="2xl:text-4xl font-bold tracking-widest uppercase text-teal-400">
              OPERATIONAL SYSTEMS BUILT FOR INDEPENDENT PHARMACIES
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl 2xl:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-8"
          >
            Is your pharmacy losing revenue due to hidden <span className="text-teal-400">compliance gaps?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-lg 2xl:text-2xl text-white/60 mb-10 leading-relaxed"
          >
            Built to support pharmacies navigating PBM pressure, audit risk, and operational complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-6"
          >
            <FancyButton
              label="Request a Strategy Call"
              textColor="white"
              borderColor="teal-400"
              rippleColor="#2b4c8c"
              bgColor="teak-400"
              extraClasses="hover:border-[#2b4c8c] hover:text-white transition-all font-bold! duration-200 2xl:py-6 2xl:px-8 2xl:text-[18px]" />
            <FancyButton
              label="See How We Protect Revenue"
              textColor="white"
              borderColor="[#2b4c8c]"
              rippleColor="teak-400"
              bgColor="#2b4c8c"
              extraClasses="backdrop-blur-md hover:border-teal-400 font-bold! transition-all duration-500 2xl:py-6 2xl:px-8 2xl:text-[18px]"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            />
          </motion.div>
        </div>

        {/* Right Col: Triple Column Layout (Charts - Image - Charts) */}
        <div className="w-[50%] h-full flex items-center justify-end relative">

          <div className="flex gap-4 2xl:gap-8 items-center h-full">
            {/* Charts Col 1 */}
            <div className="flex flex-col gap-6 scale-90 2xl:scale-100">
              <div className="w-56 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">Verification Audit</span>
                  <Activity size={12} className="text-white/40" />
                </div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pbmData}
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pbmData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold text-white">75%</div>
                </div>
              </div>

              <div className="w-56 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">Readiness Score</span>
                  <TrendingUp size={12} className="text-white/40" />
                </div>
                <div className="h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={auditData}>
                      <Line type="monotone" dataKey="value" stroke="teak-400" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2">
                  <div className="text-3xl font-bold text-white">90%</div>
                  <div className="text-[8px] text-white/40">Ready for Review</div>
                </div>
              </div>
            </div>

            {/* Pharmacist Col */}
            <div className="relative w-64 2xl:w-80 h-[80%] flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="h-full w-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent z-10" />
                <Image
                  src={pharmacistImg}
                  alt="Pharmacist"
                  className="h-full w-full object-cover rounded-t-[100px] border-x-4 border-t-4 border-white/5"
                  priority />
              </motion.div>
            </div>

            {/* Charts Col 2 */}
            <div className="flex flex-col gap-6 scale-90 2xl:scale-100">
              {/* Card: Revenues Recovery */}
              <div className="w-56 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">Revenues Recovery</span>
                  <BarChart3 size={12} className="text-white/40" />
                </div>
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold text-white tracking-tighter">92%</div>
                  <div className="text-[9px] text-teal-400 font-bold uppercase mt-1">Ready for Review</div>
                </div>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complianceData}>
                      <Area type="monotone" dataKey="value" stroke="teak-400" fill="teak-400" fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="w-56 bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-teal-400 uppercase">Revenue Identified</span>
                  <ChevronRight size={12} className="text-white/40" />
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white">$1.2M</div>
                  <div className="text-[9px] text-teal-400 font-bold">vs last month ↑ 18%</div>
                </div>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={auditData}>
                      <Bar dataKey="value" fill="teak-400" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
