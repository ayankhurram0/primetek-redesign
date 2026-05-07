import { Phone, Printer, Mail, MapPin, Share2, Activity } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '(908) 521-4440', href: 'tel:9085214440' },
  { icon: Printer, label: 'Fax', value: '(908) 760-6990', href: 'fax:9087606990' },
  { icon: Mail, label: 'Email', value: 'info@primetekservices.com', href: 'mailto:info@primetekservices.com' },
  { icon: MapPin, label: 'Location', value: 'New Jersey, USA', href: '#' },
  { icon: Share2, label: 'LinkedIn', value: 'PrimeTek Services', href: '#' },
];

const whatToExpect = [
  '30-minute focused strategy call',
  'Review of your current compliance posture',
  'Identification of revenue recovery opportunities',
  'Overview of services tailored to your pharmacy',
  'No obligation — just clarity',
];

export default function ContactInfo() {
  return (
    <div className="lg:col-span-4 bg-brand-950 divide-y divide-white/5">
      {/* Contact Information */}
      <div className="p-10 md:p-12">
        <div className="flex items-center gap-3 mb-10">
           <span className="text-brand-teal font-mono text-[10px] font-black uppercase tracking-[0.4em]">_DIRECT_LINK</span>
        </div>
        <div className="space-y-8">
          {contactInfo.map((info, i) => (
            <a key={i} href={info.href} className="flex items-start gap-5 group">
              <div className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-teal transition-colors">
                <info.icon className="w-4 h-4 text-slate-500 group-hover:text-brand-teal transition-colors" />
              </div>
              <div>
                <div className="text-[8px] uppercase tracking-[0.3em] text-slate-500 font-black mb-1">{info.label}</div>
                <div className="text-white font-mono text-sm leading-none">{info.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* What to Expect */}
      <div className="p-10 md:p-12 bg-white/[0.02]">
        <div className="flex items-center gap-3 mb-10">
           <span className="text-brand-teal font-mono text-[10px] font-black uppercase tracking-[0.4em]">_PROTOCOL_EXPECTATIONS</span>
        </div>
        <ul className="space-y-6">
          {whatToExpect.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0" />
              <span className="text-slate-400 font-mono text-[11px] leading-tight uppercase opacity-80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Office Hours */}
      <div className="p-10 md:p-12">
        <div className="flex items-center gap-3 mb-10">
           <span className="text-brand-teal font-mono text-[10px] font-black uppercase tracking-[0.4em]">_OPERATIONAL_HOURS</span>
        </div>
        <div className="space-y-4 font-mono text-[10px] uppercase">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-500 font-bold">MON – FRI</span>
            <span className="text-white font-black tracking-widest text-right">09:00 – 18:00 ET</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-500 font-bold">SATURDAY</span>
            <span className="text-white font-black tracking-widest text-right">BY APPOINTMENT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold">SUNDAY</span>
            <span className="text-brand-teal font-black tracking-widest text-right">OFFLINE</span>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 pt-12 border-t border-white/5 opacity-40">
          <div className="flex items-center gap-3">
             <Activity className="w-3 h-3 text-brand-teal" />
             <span className="text-[8px] text-white font-bold uppercase tracking-widest">GATEWAY: OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
