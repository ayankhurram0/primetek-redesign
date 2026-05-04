import { Binary, ShieldAlert, BarChart3, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    title: "Operational Intelligence",
    icon: Binary,
    desc: "Transforming raw pharmacy data into actionable clinical and financial insights.",
    features: ["Real-time KPI Tracking", "Workflow Bottleneck Detection", "Inventory Optimization"]
  },
  {
    title: "Risk Mitigation",
    icon: ShieldAlert,
    desc: "Proactive identification of compliance vulnerabilities before they become audit liabilities.",
    features: ["PBM Audit Readiness", "Regulatory Monitoring", "Data Privacy Guards"]
  },
  {
    title: "Financial Integrity",
    icon: BarChart3,
    desc: "Securing the financial future of independent pharmacies through leak detection.",
    features: ["Revenue Recovery", "Claim Rejection Analysis", "Margin Protection"]
  }
];

export default function AboutPillars() {
  return (
    <section className="py-32 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[32px] overflow-hidden">
          {pillars.map((pillar, idx) => (
            <div key={idx} className={`p-12 flex flex-col gap-8 group hover:bg-white/[0.02] transition-colors ${idx !== pillars.length - 1 ? 'md:border-r border-b md:border-b-0 border-white/10' : ''}`}>
               <div className="w-16 h-16 rounded-2xl bg-brand-900 border border-white/10 flex items-center justify-center group-hover:glow-teal transition-all">
                  <pillar.icon className="text-brand-teal w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-2xl font-display font-bold text-white uppercase italic mb-4 tracking-tight">{pillar.title}</h3>
                  <p className="text-slate-400 font-light text-sm leading-relaxed mb-8">{pillar.desc}</p>
                  <ul className="space-y-3">
                    {pillar.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <CheckCircle2 className="text-brand-teal w-3 h-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
