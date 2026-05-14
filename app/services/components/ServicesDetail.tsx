import { useState } from "react";
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

export const ServicesDetail = () => {
  const [activeId, setActiveId] = useState("01");
  const activeService = services.find(s => s.id === activeId)!;

  return (
    <section className="relative py-32 px-26 overflow-hidden">
      <div className="relative z-10">
        <div className="grid lg:grid-cols-[400px_1fr] gap-20 items-start">

          {/* Sidebar Selector */}
          <div className="space-y-4 lg:sticky lg:top-32">
            <h2 className="text-xl font-bold uppercase text-teal-400 mb-8">Select a Service</h2>
            <div className="space-y-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`w-full text-left p-6 border-l-2 transition-all duration-500 group flex items-center justify-between ${activeId === service.id
                    ? "text-white"
                    : "bg-white/[0.02] border-transparent text-slate-500 hover:bg-white/[0.04]"
                    }`}
                  style={{
                    borderColor: activeId === service.id ? colorMap[service.color] : 'transparent',
                    backgroundColor: activeId === service.id ? `${colorMap[service.color]}15` : ''
                  }}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="text-lg font-bold tracking-widest transition-colors duration-500"
                      style={{ color: activeId === service.id ? colorMap[service.color] : '#334155' }}
                    >
                      {service.id}
                    </span>
                    <span className="text-xl font-bold tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                      {service.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                  <service.icon
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ color: activeId === service.id ? colorMap[service.color] : '#334155' }}
                  />
                </button>
              ))}
            </div>

            <div className="pt-12 hidden lg:block">
              <div className="p-8 border border-white/5 bg-white/[0.01]">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 mb-4">Current Identity</div>
                <div className="text-3xl font-display  text-white tracking-tight" style={{ color: colorMap[activeService.color] }}>{activeService.identity}</div>
              </div>
            </div>
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
                  className="glass-card p-12 md:p-16 relative overflow-x-hidden h-[800px] overflow-y-auto overscroll-contain custom-scrollbar"
                  data-lenis-prevent="true"
                  onWheel={(e) => e.stopPropagation()}
                  style={{ 
                    background: `linear-gradient(135deg, ${colorMap[activeService.color]}20 0%, #1e40af15 100%)`,
                    '--scrollbar-color': colorMap[activeService.color],
                  } as React.CSSProperties}
                >

                  <div className="flex flex-col md:flex-row justify-between gap-12 mb-24">
                    <div className="max-w-xl">
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

                    <div
                      className="p-12 text-center flex flex-col justify-center min-w-[240px] h-fit sticky top-0 border transition-colors duration-500"
                      style={{
                        backgroundColor: `${colorMap[activeService.color]}10`,
                        borderColor: `${colorMap[activeService.color]}20`
                      }}
                    >
                      <div className="text-6xl font-bold font-outfit text-white mb-3 tracking-tighter">{activeService.stat}</div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.2em] leading-tight max-w-[140px] mx-auto" style={{ color: colorMap[activeService.color] }}>
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
      </div>
    </section>
  );
};
