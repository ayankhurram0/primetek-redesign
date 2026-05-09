"use client";

import { motion } from 'motion/react';
import { FileText, Download, ChevronRight } from 'lucide-react';
import { DecorativeBackground } from '../../components/DecorativeBackground';

const assets = [
  { title: "2026 Audit Readiness Checklist", size: "2.4 MB", type: "PDF" },
  { title: "Revenue Leakage Analysis Template", size: "1.1 MB", type: "XLSX" },
  { title: "PBM Contract Review Framework", size: "4.8 MB", type: "PDF" }
];

export default function ResourcesFeatured() {
  return (
    <section className="py-24 px-26 relative bg-transparent overflow-hidden border-b border-white/5">
      <DecorativeBackground id="resources-featured" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {assets.map((asset, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-brand-teal/20 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-teal transition-all">
                <FileText className="text-teal-400 group-hover:text-white transition-colors w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">{asset.title}</h3>
              <div className="flex items-center gap-4 text-lg text-slate-500 font-bold uppercase tracking-widest mb-8">
                <span>{asset.type}</span>
                <span className="w-3 h-3 rounded-full bg-slate-800" />
                <span>{asset.size}</span>
              </div>
              <button className="w-full py-5 bg-white/5 rounded-2xl border border-white/10 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-brand-teal group-hover:border-transparent group-hover:text-brand-dark transition-all">
                <Download className="w-4 h-4" /> Download Asset
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
