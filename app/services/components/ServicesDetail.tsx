import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  ShieldCheck,
  Users,
  TrendingUp,
  CheckCircle2,
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
    color: "rose-500",
    stages: ["Data In", "Analyze", "Alert"],
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
    color: "fuchsia-500",
    stages: ["Flag", "Recover", "Resolve"],
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
    color: "orange-500",
    stages: ["Gap Scan", "Audit Ready", "Protected"],
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
    color: "sky-400",
    stages: ["Engage", "Support", "Retain"],
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
    color: "emerald-400",
    stages: ["Measure", "Strategize", "Scale"],
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

const ARC_PATH = "M 52 62 Q 160 8 268 62";

const STAGE_POSITIONS = [
  { x: 52, y: 62 },
  { x: 160, y: 22 },
  { x: 268, y: 62 },
];

/** 3-stage service flow — same meaning as a process timeline, different visual (arc + diamonds) */
const ServiceProcessFlow = ({
  stages,
  color,
}: {
  stages: [string, string, string];
  color: string;
}) => {
  const [activeStage, setActiveStage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const pathProgress = activeStage === 0 ? 0 : activeStage === 1 ? 0.5 : 1;

  return (
    <div className="w-full min-h-[200px] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/10 bg-[#061018]/75 p-6">
      <div
        className="absolute inset-0 opacity-[0.28] pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="absolute left-5 top-[42%] w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
        style={{ boxShadow: "0 0 18px 5px rgba(255,255,255,0.45)" }}
      />

      <svg
        className="w-full max-w-[340px] h-[118px] overflow-visible relative z-10"
        viewBox="0 0 320 118"
        fill="none"
      >
        <path
          d={ARC_PATH}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d={ARC_PATH}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: pathProgress }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />

        {stages.map((label, idx) => {
          const { x, y } = STAGE_POSITIONS[idx];
          const isActive = activeStage === idx;
          const isPast = idx < activeStage;
          const size = isActive ? 20 : 16;

          return (
            <g key={label}>
              <motion.rect
                x={x - size / 2}
                y={y - size / 2}
                width={size}
                height={size}
                rx={2}
                transform={`rotate(45 ${x} ${y})`}
                fill="#0a0f1d"
                stroke={isActive || isPast ? color : "rgba(255,255,255,0.15)"}
                strokeWidth={isActive ? 2.5 : 1.5}
                animate={
                  isActive
                    ? {
                        scale: [1, 1.08, 1],
                        filter: [
                          `drop-shadow(0 0 4px ${color}60)`,
                          `drop-shadow(0 0 14px ${color})`,
                          `drop-shadow(0 0 4px ${color}60)`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />

              {isPast && !isActive ? (
                <path
                  d={`M ${x - 4} ${y} L ${x - 1} ${y + 3.5} L ${x + 5} ${y - 3.5}`}
                  stroke={color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 3.5 : 2.5}
                  fill={isActive || isPast ? color : "rgba(255,255,255,0.2)"}
                />
              )}

              <text
                x={x}
                y={98}
                textAnchor="middle"
                fill={isActive ? color : "rgba(255,255,255,0.22)"}
                fontSize="8"
                fontWeight="700"
                letterSpacing="0.12em"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const ServicesDetail = () => {
  const [activeId, setActiveId] = useState("01");
  const activeService = services.find((s) => s.id === activeId)!;
  const accent = colorMap[activeService.color];

  return (
    <section className="relative w-[85%] mx-auto py-16 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none transition-all duration-500"
        style={{
          backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 space-y-8">
        {/* Service selector */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
            {services.map((service) => {
              const isActive = activeId === service.id;
              const color = colorMap[service.color];
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={`w-full flex flex-col items-center justify-center gap-3 px-3 py-4 rounded-xl border transition-all duration-300 min-h-[88px] ${
                    isActive
                      ? "border-white/20 bg-white/[0.08]"
                      : "border-transparent bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                  style={{
                    borderColor: isActive ? `${color}50` : undefined,
                    boxShadow: isActive ? `0 4px 24px ${color}20` : undefined,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-sm font-bold font-mono tabular-nums shrink-0"
                      style={{ color: isActive ? color : "#64748b" }}
                    >
                      {service.id}
                    </span>
                    <service.icon
                      className="w-5 h-5 shrink-0"
                      style={{ color: isActive ? color : "#64748b" }}
                    />
                  </div>
                  <span
                    className={`text-sm sm:text-base font-bold uppercase tracking-wide text-center leading-snug whitespace-normal ${
                      isActive ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <div
              className="rounded-3xl border border-white/10 bg-[#04212a]/85 backdrop-blur-xl overflow-hidden"
              style={{ boxShadow: `0 20px 60px ${accent}12` }}
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent 80%)` }}
              />

              {/* Hero */}
              <div className="p-8 md:p-12 lg:p-14 border-b border-white/[0.06]">
                <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${accent}18`,
                          border: `1px solid ${accent}35`,
                        }}
                      >
                        <activeService.icon className="w-5 h-5" style={{ color: accent }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                          Service {activeService.id} · {activeService.identity}
                        </p>
                        <p
                          className="text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5"
                          style={{ color: accent }}
                        >
                          {activeService.title}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-montserrat font-bold text-white tracking-tight leading-[1.1] mb-6">
                      {activeService.headline}
                    </h2>
                    <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed whitespace-pre-line max-w-4xl">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Sidebar: flow graphic + stat */}
                  <div className="flex flex-col gap-4">
                    <ServiceProcessFlow
                      stages={activeService.stages as [string, string, string]}
                      color={accent}
                    />
                    <div
                      className="rounded-2xl p-6 text-center border"
                      style={{
                        borderColor: `${accent}30`,
                        backgroundColor: `${accent}0a`,
                      }}
                    >
                      <div
                        className="text-4xl font-bold font-outfit tracking-tight mb-2"
                        style={{ color: accent }}
                      >
                        {activeService.stat}
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider leading-relaxed font-medium">
                        {activeService.statLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What we do */}
              <div className="p-8 md:p-12 lg:p-14 border-b border-white/[0.06]">
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.4em] mb-8"
                  style={{ color: accent }}
                >
                  What We Do
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeService.whatWeDo.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors"
                      style={{ borderLeftWidth: "2px", borderLeftColor: accent }}
                    >
                      <h4 className="text-white text-sm font-bold mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-sm font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert + Outcomes */}
              <div className="grid lg:grid-cols-2 gap-0 lg:divide-x divide-white/[0.06]">
                <div className="p-8 md:p-12 lg:p-14">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-[0.4em] mb-4"
                    style={{ color: accent }}
                  >
                    Alert System
                  </h3>
                  <h4 className="text-xl font-bold text-white mb-4 leading-snug">
                    {activeService.alertSystem.headline}
                  </h4>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    {activeService.alertSystem.desc}
                  </p>
                </div>

                <div className="p-8 md:p-12 lg:p-14 border-t lg:border-t-0 border-white/[0.06]">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-[0.4em] mb-6"
                    style={{ color: accent }}
                  >
                    Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {activeService.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${accent}20` }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accent }} />
                        </div>
                        <span className="text-slate-200 text-sm font-medium leading-snug">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="px-8 md:px-12 lg:px-14 py-8 border-t border-white/[0.06] flex flex-wrap gap-4">
                <FancyButton
                  label="Schedule Analysis"
                  variant="primary"
                  extraClasses="text-sm font-bold uppercase tracking-[0.2em] px-10 py-5"
                />
                <FancyButton
                  label="View Case Studies"
                  variant="primary"
                  textColor="white"
                  borderColor="white/20"
                  rippleColor="white"
                  bgColor="transparent"
                  extraClasses="text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 border border-white/20 hover:bg-white/5"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
