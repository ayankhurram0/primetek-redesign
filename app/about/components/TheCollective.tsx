import { motion } from "motion/react";
import { Linkedin, Mail } from "lucide-react";

const team = [
  { name: "Michael Torres", role: "CEO", initials: "MT", size: "large", bio: "The visionary architect behind our operational logic." },
  { name: "Sandra Patel", role: "Compliance", initials: "SP", size: "small", bio: "Protecting pharmacies from PBM predatory audits." },
  { name: "James Okafor", role: "Intelligence", initials: "JO", size: "medium", bio: "Deciphering the DNA of revenue leakage." },
  { name: "Rachel Kim", role: "Success", initials: "RK", size: "small", bio: "Ensuring every client scales with confidence." },
];

export const TheCollective = () => {
  return (
    <section className="py-44 px-6 relative lg:-mt-20 z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a1122] to-[#020817] opacity-100" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">The Collective</h2>
            <h3 className="text-7xl font-display font-light text-white leading-none tracking-tighter">Experts. <span className="italic">Not</span> Consultants.</h3>
          </div>
          <div className="p-8 glass-card rounded-[32px] max-w-xs text-xs font-medium text-slate-500 italic leading-relaxed">
            "We don't just advise; we execute side-by-side with your staff using real-world pharmacy DNA."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`glass-card p-12 rounded-[40px] group flex flex-col justify-between relative overflow-hidden
                ${member.size === 'large' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-brand-teal opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity" />
              <div className="flex items-start justify-between mb-12">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-2xl font-black font-outfit text-white group-hover:bg-brand-teal group-hover:text-brand-dark transition-all duration-500">
                  {member.initials}
                </div>
                <div className="flex gap-4">
                  <Linkedin className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal mb-3">{member.role}</div>
                <h4 className="text-4xl font-display font-medium text-white mb-6 italic">{member.name}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed max-w-sm group-hover:text-slate-300 transition-colors">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
