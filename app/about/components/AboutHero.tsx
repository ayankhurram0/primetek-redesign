import { motion, MotionValue } from "motion/react";
import { ArrowRight, BarChart3, ShieldCheck, Users, Calendar } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
}

const stats: Stat[] = [
  { label: "Revenue Recovered", value: "$4.2M+", icon: BarChart3, color: "text-emerald-400" },
  { label: "Audit Readiness", value: "98%", icon: ShieldCheck, color: "text-blue-400" },
  { label: "Pharmacies", value: "100+", icon: Users, color: "text-brand-teal" },
  { label: "Experience", value: "8 Yrs", icon: Calendar, color: "text-amber-400" },
];

interface AboutHeroProps {
  heroScale: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

export const AboutHero = ({ heroScale, heroOpacity }: AboutHeroProps) => {
  return (
    <>
      {/* Top Header Section */}
      <section className="relative pt-40 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <h1 className="text-sm font-black uppercase tracking-[0.6em] text-brand-teal mb-4">The Collective DNA</h1>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-white italic tracking-tighter">About Us</h2>
            <div className="w-24 h-1 bg-brand-teal mx-auto mt-8 opacity-30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Hero Section - Kinetic Edition */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center px-6 pt-32 pb-20 sticky top-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-teal/5 blur-[120px] -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-24 items-end">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
                  The Protocol / 2026
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-medium text-white leading-[0.95] tracking-tighter mb-12">
                  Operational <br />
                  <span className="italic relative">
                    Intelligence
                    <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-brand-teal/30" />
                  </span> <br />
                  By Design.
                </h1>
                <p className="text-xl text-slate-400 font-light leading-relaxed max-w-xl mb-12">
                  PrimeTek is not a consultancy. We are the <span className="text-white font-medium italic">operating system</span> for independent pharmacy survival 
                  in a predatory PBM landscape.
                </p>
                <div className="flex items-center gap-10">
                  <button className="group flex items-center gap-4 text-white font-black text-[11px] uppercase tracking-[0.4em]">
                    The Origin Story <ArrowRight className="w-5 h-5 text-brand-teal group-hover:translate-x-2 transition-transform" />
                  </button>
                  <div className="h-px w-20 bg-white/10" />
                  <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">01 / 05</span>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="p-10 bg-brand-dark/40 group hover:bg-brand-teal/10 transition-all duration-700"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                    <div className="text-4xl font-outfit font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};
