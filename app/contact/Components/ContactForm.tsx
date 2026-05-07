import React from 'react';
import { Send, Hash } from 'lucide-react';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="lg:col-span-8 bg-brand-950 p-10 md:p-20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 select-none pointer-events-none opacity-[0.03]">
        <span className="text-9xl font-display font-black tracking-tighter uppercase leading-none">STRATEGY<br/>SYNC</span>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-12">
           <div className="flex items-center gap-2 px-3 py-1 rounded-sm border border-brand-teal/30 bg-brand-teal/5">
              <Hash className="w-3 h-3 text-brand-teal" />
              <span className="text-[9px] font-mono text-brand-teal font-black uppercase tracking-[0.3em]">FORM_ACCESS_GRANTED</span>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_REQUESTOR_NAME</label>
              <input
                required
                type="text"
                placeholder="ENTER_FULL_NAME..."
                className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-sm tracking-tight transition-colors placeholder:text-slate-700"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_EMAIL_IDENTITY</label>
              <input
                required
                type="email"
                placeholder="ENTER_SECURE_EMAIL..."
                className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-sm tracking-tight transition-colors placeholder:text-slate-700"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_TELECOMM_ID</label>
              <input
                type="tel"
                placeholder="000.000.0000"
                className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-sm tracking-tight transition-colors placeholder:text-slate-700"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_PHARMACY_NODE</label>
              <input
                required
                type="text"
                placeholder="ENTITY_NAME..."
                className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-sm tracking-tight transition-colors placeholder:text-slate-700"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_UNIT_COUNT</label>
              <select className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-[10px] tracking-widest transition-colors cursor-pointer uppercase font-bold text-slate-400">
                <option className="bg-brand-950" value="">SELECT_LOCATIONS...</option>
                <option className="bg-brand-950" value="1">1_NODE</option>
                <option className="bg-brand-950" value="2-5">2-5_NODES</option>
                <option className="bg-brand-950" value="6+">6+_NODES</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] block">_SYSTEM_OBJECTIVE</label>
              <select className="w-full h-14 bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-[10px] tracking-widest transition-colors cursor-pointer uppercase font-bold text-slate-400">
                <option className="bg-brand-950" value="">SELECT_PROTOCOL...</option>
                <option className="bg-brand-950" value="compliance">AUDIT_PROTECTION</option>
                <option className="bg-brand-950" value="revenue">REVENUE_CAPTURE</option>
                <option className="bg-brand-950" value="workflow">WORKFLOW_BIOS</option>
                <option className="bg-brand-950" value="other">OTHER_DIAGNOSTIC</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-[0.4em] italic block">_SITUATION_REPORT</label>
            <textarea
              rows={4}
              placeholder="DESCRIBE_CURRENT_OPERATIONAL_CHALLENGES..."
              className="w-full bg-transparent border-b border-white/10 focus:border-brand-teal outline-none font-mono text-sm tracking-tight transition-colors placeholder:text-slate-700 resize-none py-4"
            ></textarea>
          </div>

          <div className="flex flex-col items-center gap-6 pt-10">
            <button
              type="submit"
              className="w-full py-8 bg-brand-teal text-brand-950 font-display font-black text-xs uppercase tracking-[0.5em] italic rounded-sm hover:-translate-y-1 hover:glow-teal transition-all flex items-center justify-center gap-4 group"
            >
              Transmit Strategy Request <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[9px] font-mono text-slate-600 font-bold uppercase tracking-widest italic tracking-tighter">
               Auth_Protocol: CRC_32_VERIFIED // SECURE_ACCESS_POINT
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
