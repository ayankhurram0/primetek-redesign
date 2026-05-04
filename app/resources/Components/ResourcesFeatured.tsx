import { motion } from 'motion/react';
import { FileText, Download, ChevronRight } from 'lucide-react';

const assets = [
  { title: "2026 Audit Readiness Checklist", size: "2.4 MB", type: "PDF" },
  { title: "Revenue Leakage Analysis Template", size: "1.1 MB", type: "XLSX" },
  { title: "PBM Contract Review Framework", size: "4.8 MB", type: "PDF" }
];

export default function ResourcesFeatured() {
  return (
    <section className="py-24 bg-brand-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {assets.map((asset, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border-white/5 hover:border-brand-teal/20 transition-all group"
              >
                 <div className="w-12 h-12 rounded-xl bg-brand-900 border border-white/10 flex items-center justify-center mb-8 group-hover:glow-teal transition-all">
                    <FileText className="text-brand-teal w-6 h-6" />
                 </div>
                 <h3 className="text-lg font-display font-bold text-white uppercase italic tracking-tight mb-2">{asset.title}</h3>
                 <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-8">
                    <span>{asset.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-800" />
                    <span>{asset.size}</span>
                 </div>
                 <button className="w-full py-4 glass rounded-2xl border-white/5 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-teal group-hover:text-brand-950 transition-all">
                    <Download className="w-3 h-3" /> Download Asset
                 </button>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
