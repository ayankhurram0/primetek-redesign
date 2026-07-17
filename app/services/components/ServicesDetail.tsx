import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  ShieldCheck,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import FancyButton from "@/app/components/button";
import { ServiceIllustration } from "@/app/components/ServiceIllustration";
import {
  FeatureStepCard,
  FEATURE_BLUE as BLUE,
  FEATURE_TEAL as TEAL,
} from "@/app/components/FeatureStepCard";

const services = [
  {
    id: "01",
    title: "REVENUE INTELLIGENCE & REPORTING",
    identity: "Visibility",
    cardBlurb:
      "Clear visibility into financial performance, risk, and reimbursement trends.",
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
    cardBlurb:
      "Recover missed revenue and strengthen clean-claim reimbursement outcomes.",
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
    cardBlurb:
      "Stay audit-ready by catching compliance gaps before they become liabilities.",
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
    cardBlurb:
      "Streamline patient workflows and operational coordination across your pharmacy.",
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
    cardBlurb:
      "Grow margins with procurement, pricing, and performance strategy.",
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
  "brand-teal": "#0d9488",
};

export const ServicesDetail = () => {
  const [activeId, setActiveId] = useState("01");
  const activeService = services.find((s) => s.id === activeId)!;
  const accent = colorMap[activeService.color];

  return (
    <section className="relative w-[85%] mx-auto py-16 md:py-24">
      <div className="relative z-10 space-y-8">
        {/* Service selector — same card component as Why PrimeTek */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-8 pl-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
            {services.map((service, index) => (
              <FeatureStepCard
                key={service.id}
                id={service.id}
                title={service.identity}
                description={service.cardBlurb}
                icon={service.icon}
                accent={index % 2 === 0 ? BLUE : TEAL}
                active={activeId === service.id}
                onClick={() => setActiveId(service.id)}
              />
            ))}
          </div>
        </div>

        <div className="px-5 py-6 md:px-8 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_12px_40px_rgba(6,43,52,0.1)]"
          >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent 80%)` }}
              />

              {/* Hero */}
              <div className="border-b border-ink/10 p-8 md:p-12 lg:p-14">
                <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${accent}14`,
                          border: `1px solid ${accent}30`,
                        }}
                      >
                        <activeService.icon className="h-5 w-5" style={{ color: accent }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-ink-subtle">
                          Service {activeService.id} · {activeService.identity}
                        </p>
                        <p
                          className="mt-0.5 text-md font-bold uppercase tracking-[0.2em]"
                          style={{ color: accent }}
                        >
                          {activeService.title}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-montserrat font-bold text-ink tracking-tight leading-[1.1] mb-6">
                      {activeService.headline}
                    </h2>
                    <p className="max-w-4xl whitespace-pre-line text-base font-light leading-relaxed text-ink-muted md:text-lg">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Sidebar: flow graphic + stat */}
                  <div className="flex flex-col gap-4">
                    <div className="relative flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-slate-50 p-3">
                      <ServiceIllustration
                        index={parseInt(activeService.id, 10) - 1}
                        color={accent}
                      />
                    </div>
                    <div className="rounded-2xl border border-ink/10 bg-slate-50 p-6 text-center shadow-[0_4px_20px_rgba(6,43,52,0.05)]">
                      <div
                        className="mb-2 text-4xl font-bold tracking-tight"
                        style={{ color: accent }}
                      >
                        {activeService.stat}
                      </div>
                      <p className="text-[10px] text-ink-muted uppercase tracking-wider leading-relaxed font-medium">
                        {activeService.statLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What we do */}
              <div className="border-b border-ink/10 p-8 md:p-12 lg:p-14">
                <h3
                  className="mb-8 text-xl font-bold uppercase tracking-[0.4em]"
                  style={{ color: accent }}
                >
                  What We Do
                </h3>
                <div className="grid gap-4 md:grid-cols-1">
                  {activeService.whatWeDo.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-ink/10 bg-slate-50 p-5 transition-colors hover:bg-white"
                      style={{ borderLeftWidth: "2px", borderLeftColor: accent }}
                    >
                      <h4 className="text-ink text-lg font-bold mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-ink-muted text-md leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alert + Outcomes */}
              <div className="grid gap-0 lg:grid-cols-2 lg:divide-x divide-ink/10">
                <div className="p-8 md:p-12 lg:p-14">
                  <h3
                    className="mb-4 text-xl font-bold uppercase tracking-[0.4em]"
                    style={{ color: accent }}
                  >
                    Alert System
                  </h3>
                  <h4 className="text-xl font-bold text-ink mb-4 leading-snug">
                    {activeService.alertSystem.headline}
                  </h4>
                  <p className="text-ink-muted text-md leading-relaxed">
                    {activeService.alertSystem.desc}
                  </p>
                </div>

                <div className="border-t border-ink/10 p-8 md:p-12 lg:border-t-0 lg:p-14">
                  <h3
                    className="mb-6 text-xl font-bold uppercase tracking-[0.4em]"
                    style={{ color: accent }}
                  >
                    Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {activeService.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${accent}18` }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" style={{ color: accent }} />
                        </div>
                        <span className="text-md font-medium leading-snug text-ink-muted">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 border-t border-ink/10 px-8 py-8 md:px-12 lg:px-14">
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
                  extraClasses="text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 border border-ink/15 hover:bg-white/65"
                />
              </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
