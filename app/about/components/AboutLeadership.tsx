import { motion } from 'motion/react';

const leadership = [
  { name: 'Dr. Sarah Mitchell', role: 'Chief Operational Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Marcus Chen', role: 'Head of Compliance', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'Elena Rodriguez', role: 'Revenue Strategy Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400' },
  { name: 'David Hoffman', role: 'Senior Audit Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400' },
];

export default function AboutLeadership() {
  return (
    <section className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <span className="text-brand-teal font-display font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Our Leadership</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white leading-tight">
              Operational <span className="text-gradient italic font-light">Architects.</span>
            </h2>
          </div>
          <p className="text-slate-400 font-light text-lg max-w-sm leading-relaxed">
            Decades of experience in healthcare policy, pharmacy operations, and systems engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((person, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group w-full"
            >
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-6 border border-white/5 relative bg-white/[0.03] group-hover:border-brand-teal/30 transition-all duration-500">
                 <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-brand-950 via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-xl font-display font-bold text-white uppercase italic tracking-tight">{person.name}</h4>
                    <p className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{person.role}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
