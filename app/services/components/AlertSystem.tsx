import { motion } from "motion/react";
import { AlertCircle, Zap, ShieldAlert, BellRing, ArrowRight } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Critical",
    title: "CVS Aberrant Product List",
    description: "Threshold breach detected for NDC 0012-3456-01. Audit probability: High.",
    time: "2m ago",
    icon: ShieldAlert,
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    id: 2,
    type: "Warning",
    title: "Reimbursement Variance",
    description: "$2,400 discrepancy flagged in PBM claim pool for Region 4.",
    time: "15m ago",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    id: 3,
    type: "Info",
    title: "OptumRx 25% Cap Risk",
    description: "Approaching therapeutic cap for Diabetic Supplies category.",
    time: "1h ago",
    icon: BellRing,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  }
];

export const AlertSystem = () => {
  return (
    <section className="relative py-44 px-26 overflow-hidden font-montserrat">
      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-ink/10 text-rose-500 text-xl font-bold uppercase tracking-[0.4em] mb-10">
              <AlertCircle className="w-3 h-3 animate-pulse" />
              Real-Time Alert Protocol
            </div>
            <h2 className="text-6xl md:text-5xl xl:text-6xl font-montserrat font-bold text-ink mb-10 tracking-tighter leading-none">
              Issues Caught. <br />
              <span className="text-ink-subtle">Before They Cost You.</span>
            </h2>
            <p className="text-xl font-montserrat text-ink-muted leading-relaxed mb-12 max-w-2xl">
              Every PrimeTek service includes our real-time alert layer. When a threshold breach, compliance risk, or reporting cycle anomaly occurs, your dedicated team and your staff are notified instantly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "CVS Aberrant Monitoring",
                "OptumRx Cap Tracking",
                "MTF / MTP Detection",
                "Flagging IR-90 Claims"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:scale-150 transition-transform" />
                  <span className="text-lg font-bold uppercase tracking-widest text-ink-subtle group-hover:text-ink transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[48px] p-1 bg-white/65 border-ink/10 shadow-2xl relative"
          >
            <div className="bg-white/60 backdrop-blur-3xl rounded-[44px] overflow-hidden border border-ink/10">
              <div className="px-8 py-6 border-b border-ink/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-rose-500" />
                    <div className="w-4 h-4 rounded-full bg-amber-500" />
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-base font-bold uppercase tracking-widest text-ink-subtle">PrimeTek Alert Feed — Live</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-base font-bold uppercase tracking-widest text-emerald-500">Active</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-6 bg-white/[0.02] border border-ink/10 rounded-3xl hover:bg-white/[0.04] transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${alert.bg} ${alert.color}`}>
                          <alert.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-lg font-bold uppercase tracking-[0.2em] text-ink-subtle group-hover:text-ink transition-colors">{alert.title}</div>
                          <div className="text-base font-bold uppercase tracking-widest mt-0.5 opacity-50">{alert.time}</div>
                        </div>
                      </div>
                      <div className={`text-base font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-current ${alert.color} opacity-70`}>
                        {alert.type}
                      </div>
                    </div>
                    <p className="text-xl text-ink-subtle font-light leading-relaxed pl-[60px]">
                      {alert.description}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full py-6 text-center text-base font-bold uppercase tracking-[0.3em] text-ink-subtle hover:text-ink hover:bg-white/65 transition-all border-t border-ink/10 flex items-center justify-center gap-2">
                View Systematic Log <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
