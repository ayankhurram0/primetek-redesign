import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Settings,
  ShieldCheck,
  Users,
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import FancyButton from "@/app/components/button";

const services = [
  {
    id: "01",
    title: "REVENUE INTELLIGENCE & REPORTING",
    identity: "Visibility",
    icon: BarChart3,
    headline: "Gain Clear Visibility Into Your Pharmacy’s Financial Performance",
    description: "We transform raw pharmacy and PBM data into actionable insights, allowing you to detect irregularities, monitor trends, and make informed operational decisions.\n\nReports are delivered twice monthly, with immediate notification if critical discrepancies or performance concerns are identified.",
    whatWeDo: [
      {
        title: "CVS Aberrant Product List Monitoring",
        desc: "Ongoing analysis of CVS Caremark aberrant product lists to identify high-risk dispensing patterns and reduce potential audit exposure and recoupments."
      },
      {
        title: "OptumRx Therapeutic Class Cap Tracking",
        desc: "Bi-monthly monitoring of therapeutic class distribution to ensure your pharmacy remains within OptumRx thresholds and avoids compliance flags."
      },
      {
        title: "Copay & Reimbursement Trend Analysis",
        desc: "Detailed review of copays, reimbursements, and patient out-of-pocket trends to identify inconsistencies, underpayments, and revenue opportunities."
      },
      {
        title: "Inventory vs Claims Reconciliation",
        desc: "Cross-analysis of dispensed claims against inventory movement to detect discrepancies, shrinkage, or potential financial loss."
      },
      {
        title: "Custom PBM & Financial Reports",
        desc: "Tailored reporting based on your pharmacy’s specific needs, payer mix, and operational priorities — delivered as needed."
      }
    ],
    alertSystem: {
      headline: "Proactive Risk Alerts Included",
      desc: "If any breach, discrepancy, or threshold risk is identified during our analysis, your pharmacy is notified immediately owing for fast corrective action before it escalates into financial loss or audit exposure."
    },
    outcomes: [
      "Early identification of compliance risks",
      "Reduced audit exposure and recoupments",
      "Improved reimbursement visibility",
      "Data-driven operational decision-making"
    ],
    stat: "$94K",
    statLabel: "Avg. revenue recovered per client in year one",
    color: "rose-500"
  },
  {
    id: "02",
    title: "CLAIMS & REIMBURSEMENT OPTIMIZATION",
    identity: "Recovery",
    icon: TrendingUp,
    headline: "Capture Missed Revenue and Strengthen Reimbursement Outcomes",
    description: "We actively review and manage your claims activity to resolve payment issues, correct inefficiencies, and ensure your pharmacy is reimbursed accurately and consistently.\n\nReviews are conducted bi-monthly, with prompt escalation of any payment discrepancies or claim-related issues.",
    whatWeDo: [
      {
        title: "Price Comparison & Margin Analysis",
        desc: "Evaluation of reimbursement rates across PBMs and wholesalers to identify margin gaps and opportunities for improved profitability."
      },
      {
        title: "NDC Optimization & Negative Claim Reduction",
        desc: "Analysis of billed NDCs to reduce underpayments, avoid negative reimbursement claims, and improve overall claim outcomes."
      },
      {
        title: "Rejected & Unbilled Claims Recovery",
        desc: "Identification and follow-up on unpaid, rejected, or unbilled claims to recover lost revenue and ensure proper reimbursement."
      },
      {
        title: "MTF / MTP Claims Tracking",
        desc: "Monitoring of Manual Transmission Failures (MTF) and Manual Transmission Processing (MTP) claims to ensure proper resubmission and payment resolution."
      },
      {
        title: "Ongoing PBM Follow-Up",
        desc: "Direct and persistent follow-up with PBMs to resolve claim issues, correct discrepancies, and secure accurate reimbursement."
      }
    ],
    alertSystem: {
      headline: "Proactive Revenue Alerts Included",
      desc: "If any discrepancies, underpayments, or claim risks are identified during our analysis, your pharmacy is notified immediately — allowing for rapid correction before financial impact escalates."
    },
    outcomes: [
      "Increased revenue recovery",
      "Improved claim accuracy and approval rates",
      "Faster and more consistent cash flow",
      "Reduced financial leakage and missed payments"
    ],
    stat: "12%",
    statLabel: "Average increase in net profit margin",
    color: "fuchsia-500"
  },
  {
    id: "03",
    title: "COMPLIANCE & AUDIT PROTECTION",
    identity: "Defense",
    icon: ShieldCheck,
    headline: "Maintain Control in a High-Risk Audit Environment",
    description: "We evaluate your operational and documentation practices against current payer expectations to reduce exposure and reinforce audit preparedness.\n\nCompliance reviews are performed twice per month, with immediate notification of any areas that may increase audit vulnerability.",
    whatWeDo: [
      {
        title: "Documentation & Workflow Standardization",
        desc: "Development and refinement of internal processes to ensure consistent, compliant documentation and operational workflows aligned with PBM and regulatory expectations."
      },
      {
        title: "PBM Compliance Monitoring",
        desc: "Ongoing review of pharmacy activity against PBM guidelines and performance metrics to identify potential compliance risks before they trigger audits."
      },
      {
        title: "Audit Risk Identification",
        desc: "Proactive analysis of dispensing patterns, claims data, and documentation practices to detect areas of elevated audit exposure."
      },
      {
        title: "Reporting & Tracking Systems",
        desc: "Implementation of structured tracking tools to monitor compliance performance, maintain documentation integrity, and support audit preparedness."
      },
      {
        title: "Ongoing Compliance Oversight",
        desc: "Continuous monitoring and guidance to ensure your pharmacy maintains alignment with evolving PBM requirements and regulatory standards."
      }
    ],
    alertSystem: {
      headline: "Proactive Compliance Alerts Included",
      desc: "If any discrepancy, documentation gap, or audit risk is identified during our analysis, your pharmacy is notified immediately — allowing corrective action before it escalates into recoupments or formal audit exposure."
    },
    outcomes: [
      "Reduced audit risk and recoupments",
      "Stronger documentation and workflow consistency",
      "Improved PBM compliance alignment",
      "Confidence in audit preparedness year-round"
    ],
    stat: "0",
    statLabel: "Clawbacks recorded for defended audits",
    color: "orange-500"
  },
  {
    id: "04",
    title: "PATIENT & OPERATIONAL SUPPORT SYSTEMS",
    identity: "Efficiency",
    icon: Users,
    headline: "Reduce Operational Strain and Improve Patient Flow",
    description: "We support day-to-day pharmacy operations by improving communication, managing patient interactions, and helping your team operate more efficiently without added internal burden.\n\nActivity summaries are provided bi-monthly, with visibility into engagement trends and operational gaps.",
    whatWeDo: [
      {
        title: "Bilingual Customer Service (EN/ES)",
        desc: "Dedicated bilingual agents representing your pharmacy to handle patient inquiries, improve communication, and ensure professional patient experience."
      },
      {
        title: "Patient Re-Engagement Programs",
        desc: "Targeted outreach to inactive or non-adherent patients to improve refill consistency, retention, and overall patient engagement."
      },
      {
        title: "Vaccine & Appointment Coordination",
        desc: "Scheduling, reminders, and follow-up support for vaccinations and pharmacy services to increase patient participation and streamline operations."
      },
      {
        title: "Insurance & Enrollment Support",
        desc: "Assistance with insurance verification, plan enrollment, and eligibility coordination to reduce front-end workload and delays."
      },
      {
        title: "Call Handling & Follow-Ups",
        desc: "Structured call management and follow-up processes to ensure no patient request or communication is missed."
      }
    ],
    alertSystem: {
      headline: "Proactive Operational Alerts Included",
      desc: "If any workflow inefficiency, patient communication gap, or operational issue is identified, your pharmacy is notified immediately — allowing for quick resolution and improved service performance."
    },
    outcomes: [
      "Reduced staff workload and operational strain",
      "Improved patient retention and engagement",
      "More efficient communication and scheduling",
      "Better overall patient experience"
    ],
    stat: "15hr",
    statLabel: "Staff time saved per week on average",
    color: "sky-400"
  },
  {
    id: "05",
    title: "PHARMACY GROWTH & PERFORMANCE STRATEGY",
    identity: "Expansion",
    icon: TrendingUp,
    headline: "Make Smarter Decisions That Drive Long-Term Profitability",
    description: "We analyze financial patterns, purchasing behavior, and payer dynamics to identify opportunities that strengthen margins and support sustainable growth.\n\nInsights are delivered twice monthly, with immediate notification of any performance shifts requiring attention.",
    whatWeDo: [
      {
        title: "Wholesaler Price Comparison & Sourcing Analysis",
        desc: "We evaluate acquisition costs across suppliers to highlight pricing inconsistencies and identify opportunities to reduce cost of goods."
      },
      {
        title: "Profitability & Margin Visibility",
        desc: "We break down product-level and category-level performance to pinpoint where margins are being gained — and where they are being lost."
      },
      {
        title: "Payer Mix & Reimbursement Positioning",
        desc: "We assess how different PBMs and plans are impacting your revenue and identify areas where adjustments can improve financial outcomes."
      },
      {
        title: "Operational Performance Review",
        desc: "We analyze key operational patterns that influence profitability, including dispensing trends, product mix, and workflow efficiency."
      },
      {
        title: "Strategic Growth Planning",
        desc: "We provide guidance on where and how to expand — based on your current performance, market position, and operational capacity."
      }
    ],
    alertSystem: {
      headline: "Real-Time Performance Notifications",
      desc: "When margin compression, pricing discrepancies, or performance risks are detected, your pharmacy is notified immediately — enabling faster, informed decisions."
    },
    outcomes: [
      "Clear visibility into what is driving — or limiting — profitability",
      "Better purchasing decisions backed by data",
      "Stronger positioning across payers and product mix",
      "A more controlled and scalable operational model"
    ],
    stat: "3.5x",
    statLabel: "Growth multiplier for multi-store clients",
    color: "emerald-400"
  }
];

const colorMap: Record<string, string> = {
  "rose-500": "#f43f5e",
  "fuchsia-500": "#d946ef",
  "orange-500": "#f97316",
  "sky-400": "#38bdf8",
  "emerald-400": "#34d399",
  "brand-teal": "#2dd4bf"
};

const lottieUrls: Record<string, string> = {
  "01": "https://lottie.host/7db875b4-cfdb-4b5c-897c-9b88939c3e1e/b87l1w8u2X.json", // Revenue Intelligence (Analytics/Data representation)
  "02": "https://lottie.host/8cd7b2f6-eb21-4d37-bc60-d7b32ef8a176/R3Q9RkGlaT.json", // Claims Optimization (Trend / Growth)
  "03": "https://lottie.host/cf6f14b9-1d0b-4bd4-9a8c-9b2f3479a32c/dGskP4v5d4.json", // Compliance / Shield / Security
  "04": "https://lottie.host/fb04cbe3-61b8-466d-9be2-4467c6be725c/eXk9j2Jb3B.json", // Patient Support / Headset / Communication
  "05": "https://lottie.host/cd12fcae-8df8-450e-8fb8-db4cb7a3b379/c1uVfE2N3X.json", // Growth Strategy (Rocket/Speed)
};

const RevenueIntelligenceGraphic = () => {
  const curve = "M 30,110 C 55,110 55,55 80,55 C 105,55 105,75 130,75 C 155,75 155,40 180,40 C 205,40 205,85 230,85 C 255,85 255,45 280,45 C 305,45 305,35 330,35";
  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative overflow-hidden bg-black/30 border border-white/5 rounded-2xl p-6">
      <motion.div
        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-rose-500/60 to-transparent z-10 pointer-events-none"
        animate={{ x: ["30px", "330px", "30px"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <div className="relative flex-1 h-28 w-full flex items-center justify-center">
        <div className="absolute inset-0 opacity-5 flex flex-col justify-between py-6 px-4 pointer-events-none">
          <div className="border-b border-dashed border-white w-full" />
          <div className="border-b border-dashed border-white w-full" />
          <div className="border-b border-dashed border-white w-full" />
        </div>
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 350 110" fill="none">
          <defs>
            <linearGradient id="redCurveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${curve} L 330,110 L 30,110 Z`}
            fill="url(#redCurveGrad)"
          />
          <motion.path
            d={curve}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="4"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
          />
          <g>
            <motion.circle
              cx="330" cy="35" r="9"
              fill="#f43f5e" className="opacity-75"
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
            />
            <circle cx="330" cy="35" r="5" fill="white" stroke="#f43f5e" strokeWidth="3.5" />
          </g>
        </svg>
      </div>
    </div>
  );
};

const ClaimsOptimizationGraphic = () => {
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsRouting(true);
      setTimeout(() => {
        setIsRouting(false);
        setActiveRouteIndex((prev) => (prev + 1) % 3);
      }, 1200);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative overflow-hidden bg-black/30 border border-white/5 rounded-2xl p-6">
      <svg className="w-full h-24 overflow-visible" viewBox="0 0 320 100" fill="none">
        <path d="M50 50 L120 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 20" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 50" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M120 50 L215 80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
        <motion.path
          d={
            activeRouteIndex === 0
              ? "M50 50 L120 50 Q162 35 215 20"
              : activeRouteIndex === 1
                ? "M50 50 L120 50 L215 50"
                : "M50 50 L120 50 Q162 65 215 80"
          }
          stroke="#d946ef"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="drop-shadow-[0_0_6px_rgba(217,70,239,0.5)]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          key={activeRouteIndex}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {isRouting && (
          <motion.circle
            r="4"
            fill="#d946ef"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              motionPath: `path('${activeRouteIndex === 0
                ? "M50 50 L120 50 Q162 35 215 20"
                : activeRouteIndex === 1
                  ? "M50 50 L120 50 L215 50"
                  : "M50 50 L120 50 Q162 65 215 80"
                }')`
            }}
          />
        )}
        <circle cx="50" cy="50" r="5" fill="#d946ef" />
        <circle cx="120" cy="50" r="8" fill="#d946ef" />
        {[20, 50, 80].map((y, idx) => (
          <circle key={y} cx="215" cy={y} r={idx === activeRouteIndex ? 5.5 : 4} fill={idx === activeRouteIndex ? "#d946ef" : "rgba(255,255,255,0.3)"} />
        ))}
      </svg>
    </div>
  );
};

const ComplianceAuditGraphic = () => {
  const [activeStage, setActiveStage] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative overflow-hidden bg-black/30 border border-white/5 rounded-2xl p-6">
      <div className="relative w-full flex justify-between items-center px-4 z-10">
        <div className="absolute left-[38px] right-[38px] top-[22px] -translate-y-1/2 h-[2.5px] bg-white/10" />
        <motion.div
          className="absolute left-[38px] top-[22px] -translate-y-1/2 h-[2.5px] bg-[#f97316] origin-left"
          style={{ right: "38px" }}
          initial={false}
          animate={{ scaleX: activeStage === 0 ? 0 : activeStage === 1 ? 0.5 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {[0, 1, 2].map((idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                activeStage === idx
                  ? "bg-[#0a0f1d] border-[#f97316] text-[#f97316] scale-110 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  : activeStage > idx
                    ? "bg-[#0a0f1d] border-[#f97316] text-[#f97316]"
                    : "bg-[#0a0f1d] border-white/10 text-white/30"
              }`}
            >
              {activeStage > idx ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="font-mono">0{idx + 1}</span>
              )}
            </div>
            <span className={`text-[8px] font-bold uppercase tracking-wider ${activeStage === idx ? "text-[#f97316]" : "text-white/20"}`}>
              {idx === 0 ? "Gap Scan" : idx === 1 ? "Audit Ready" : "Protected"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PatientOperationalGraphic = () => {
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const queue = [
    { name: "Sarah Jenkins, PharmD", detail: "Prior auth audit completed." },
    { name: "David Miller, RPh", detail: "Inventory reconciliation done." },
    { name: "Elena Rostova, CPht", detail: "Compliance checks complete." }
  ];

  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative overflow-hidden bg-black/30 border border-white/5 rounded-2xl p-6">
      <div className="relative w-full max-w-[280px] h-[100px]">
        <AnimatePresence mode="popLayout">
          {queue.map((item, idx) => {
            if (idx !== activeItem) return null;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/50 border border-[#38bdf8]/20 rounded-xl p-3 flex flex-col justify-center gap-1 shadow-lg"
              >
                <span className="text-[9px] text-[#38bdf8] font-bold uppercase tracking-widest">Active Queue Sync</span>
                <span className="text-[10px] font-bold text-white mt-1">{item.name}</span>
                <span className="text-[10px] text-slate-400 leading-snug">{item.detail}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PharmacyGrowthGraphic = () => {
  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center relative overflow-hidden bg-black/30 border border-white/5 rounded-2xl p-6">
      <svg className="w-full h-24 overflow-visible" viewBox="0 0 350 90" fill="none">
        <line x1="20" y1="80" x2="330" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map((i) => {
          const heights = [20, 35, 25, 45, 60];
          const x = 35 + i * 65;
          const h = heights[i];
          const y = 80 - h;
          return (
            <motion.rect
              key={i}
              x={x}
              y={80}
              width="30"
              rx="4"
              fill="#34d399"
              className="drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]"
              animate={{ y: [80, y, y, 80], height: [0, h, h, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: i * 0.15 }}
            />
          );
        })}
        <motion.path
          d="M 50 60 L 115 45 L 180 55 L 245 35 L 310 20"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_5px_rgba(52,211,153,0.4)]"
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export const ServicesDetail = () => {
  const [activeId, setActiveId] = useState("01");
  const activeService = services.find(s => s.id === activeId)!;

  return (
    <section className="relative w-[85%] mx-auto py-32 overflow-hidden">
      {/* Background Grid - Matching Homepage style */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none transition-all duration-500"
        style={{ 
          backgroundImage: `radial-gradient(circle, ${colorMap[activeService.color]} 1.5px, transparent 1.5px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      {/* Glowing background blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${colorMap[activeService.color]} 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 space-y-12">

          {/* Top Service Selector */}
          <div className="flex flex-wrap justify-center gap-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`shrink-0 px-8 py-6 border-b-[3px] transition-all duration-500 group flex items-center justify-center gap-6 ${activeId === service.id
                    ? "text-white"
                    : "bg-white/[0.02] border-transparent text-slate-500 hover:bg-white/[0.04]"
                    }`}
                  style={{
                    borderColor: activeId === service.id ? colorMap[service.color] : 'transparent',
                    backgroundColor: activeId === service.id ? `${colorMap[service.color]}15` : ''
                  }}
                >
                  <span
                    className="text-xl font-bold tracking-widest transition-colors duration-500"
                    style={{ color: activeId === service.id ? colorMap[service.color] : '#334155' }}
                  >
                    {service.id}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight uppercase whitespace-nowrap group-hover:translate-y-[-1px] transition-transform">
                    {service.title}
                  </span>
                  <service.icon
                    className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: activeId === service.id ? colorMap[service.color] : '#334155' }}
                  />
                </button>
              ))}
          </div>

          {/* Content Area */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full"
              >
                <div
                  className="glass-card p-12 md:p-16 relative overflow-x-hidden h-auto animate-glow"
                  style={{ 
                    background: `linear-gradient(135deg, ${colorMap[activeService.color]}20 0%, #1e40af15 100%)`,
                    '--scrollbar-color': colorMap[activeService.color],
                  } as React.CSSProperties}
                >

                  <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-24">
                    <div className="max-w-5xl w-full">
                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className="w-14 h-14 border flex items-center justify-center transition-colors duration-500"
                          style={{
                            backgroundColor: `${colorMap[activeService.color]}15`,
                            borderColor: `${colorMap[activeService.color]}30`
                          }}
                        >
                          <activeService.icon className="w-7 h-7" style={{ color: colorMap[activeService.color] }} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold uppercase tracking-[0.4em]" style={{ color: colorMap[activeService.color] }}>Service {activeService.id}</span>
                          <span className="text-white/40 text-lg font-bold uppercase tracking-[0.3em]">{activeService.identity}</span>
                        </div>
                      </div>
                      <h3 className="text-6xl md:text-6xl xl:text-6xl font-montserrat font-bold text-white mb-10 tracking-tighter leading-none">
                        {activeService.headline}
                      </h3>
                      <p className="text-slate-400 text-2xl font-montserrat font-light leading-relaxed whitespace-pre-line">
                        {activeService.description}
                      </p>
                    </div>

                    {/* Central Graphic Area matching homepage style */}
                    <div className="flex-1 w-full min-h-[220px] max-w-[450px] aspect-video relative flex items-center justify-center">
                      {activeId === "01" && <RevenueIntelligenceGraphic />}
                      {activeId === "02" && <ClaimsOptimizationGraphic />}
                      {activeId === "03" && <ComplianceAuditGraphic />}
                      {activeId === "04" && <PatientOperationalGraphic />}
                      {activeId === "05" && <PharmacyGrowthGraphic />}
                    </div>

                    <div
                      className="p-12 text-center flex flex-col justify-center min-w-[240px] h-fit border transition-colors duration-500"
                      style={{
                        backgroundColor: `${colorMap[activeService.color]}10`,
                        borderColor: `${colorMap[activeService.color]}20`
                      }}
                    >
                      <div className="text-6xl font-bold font-outfit text-white mb-3 tracking-tighter">{activeService.stat}</div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] leading-tight max-w-[140px] mx-auto" style={{ color: colorMap[activeService.color] }}>
                        {activeService.statLabel}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-32">
                    {/* WHAT WE DO Section */}
                    <div className="relative">
                      <h4 className="text-lg font-bold uppercase tracking-[0.5em] mb-12 flex items-center gap-4" style={{ color: colorMap[activeService.color] }}>
                        <span className="w-12 h-px" style={{ backgroundColor: `${colorMap[activeService.color]}40` }} />
                        WHAT WE DO
                      </h4>
                      <div className="grid md:grid-cols-1 gap-12">
                        {activeService.whatWeDo.map((item, i) => (
                          <div key={i} className="group grid md:grid-cols-[250px_1fr] gap-8 items-start border-b border-white/5 pb-12 last:border-0 hover:border-white/10 transition-colors">
                            <h5 className="text-white text-xl font-bold tracking-tight transition-colors flex items-center gap-3">
                              <span className="w-2 h-2" style={{ backgroundColor: colorMap[activeService.color] }} />
                              {item.title}
                            </h5>
                            <p className="text-slate-400 text-xl font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alert System Section */}
                    <div
                      className="p-12 relative overflow-hidden border transition-colors duration-500"
                      style={{
                        backgroundColor: `${colorMap[activeService.color]}08`,
                        borderColor: `${colorMap[activeService.color]}15`
                      }}
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <activeService.icon className="w-40 h-40" style={{ color: colorMap[activeService.color] }} />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-lg font-bold uppercase tracking-[0.5em] mb-6" style={{ color: colorMap[activeService.color] }}>ALERT SYSTEM</h4>
                        <h5 className="text-2xl font-montserrat font-bold text-white mb-6 tracking-tight">{activeService.alertSystem.headline}</h5>
                        <p className="text-slate-400 text-xl font-light max-w-2xl leading-relaxed">
                          {activeService.alertSystem.desc}
                        </p>
                      </div>
                    </div>

                    {/* Outcomes Section */}
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-[0.5em] mb-12" style={{ color: colorMap[activeService.color] }}>OUTCOME</h4>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {activeService.outcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                            <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" style={{ color: colorMap[activeService.color] }} />
                            <span className="text-slate-200 text-xl font-medium tracking-tight leading-snug">
                              {outcome}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-6 pt-12 pb-12">
                      <FancyButton
                        label="Schedule Analysis"
                        textColor="white"
                        borderColor="teal-400"
                        rippleColor="white"
                        bgColor={colorMap[activeService.color]}
                        extraClasses="text-base hover:text-black hover:border-white font-bold uppercase tracking-[0.3em] px-12 py-6 shadow-2xl"
                      />
                      <FancyButton
                        label="View Case Studies"
                        textColor="white"
                        borderColor="white/10"
                        rippleColor="white"
                        bgColor="transparent"
                        extraClasses="text-base hover:text-black font-bold uppercase tracking-[0.3em] px-12 py-6 border border-white/10 hover:bg-white/5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

      </div>
    </section>
  );
};
