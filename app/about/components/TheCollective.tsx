import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Linkedin, Mail } from "lucide-react";

const team = [
  { name: "Michael Torres", role: "CEO", initials: "MT", size: "large", bio: "The visionary architect behind our operational logic." },
  { name: "Sandra Patel", role: "Compliance", initials: "SP", size: "small", bio: "Protecting pharmacies from PBM predatory audits." },
  { name: "James Okafor", role: "Intelligence", initials: "JO", size: "medium", bio: "Deciphering the DNA of revenue leakage." },
  { name: "Rachel Kim", role: "Success", initials: "RK", size: "small", bio: "Ensuring every client scales with confidence." },
];

export const TheCollective = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-member", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-44 px-6 relative lg:-mt-20 z-20 overflow-hidden bg-brand-light">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-brand-teal mb-8">The Collective</h2>
            <h3 className="text-6xl font-black text-brand-dark leading-none tracking-tighter uppercase">Experts. <span className="text-brand-teal uppercase">Not</span> Consultants.</h3>
          </div>
          <div className="p-8 bg-white border border-slate-100 rounded-[32px] max-w-xs text-xl font-medium text-slate-400 uppercase leading-relaxed shadow-xl">
            "We don't just advise; we execute side-by-side with your staff using real-world pharmacy DNA."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div 
              key={member.name}
              className={`reveal-member bg-white p-12 rounded-[40px] border border-slate-100 group flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700
                ${member.size === 'large' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-brand-teal opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity" />
              <div className="flex items-start justify-between mb-12">
                <div className="w-20 h-20 rounded-2xl bg-brand-light border border-slate-100 flex items-center justify-center text-3xl font-black text-brand-teal group-hover:bg-brand-dark group-hover:text-white transition-all duration-500">
                  {member.initials}
                </div>
                <div className="flex gap-4">
                  <Linkedin className="w-5 h-5 text-slate-300 hover:text-brand-teal cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 text-slate-300 hover:text-brand-teal cursor-pointer transition-colors" />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal mb-3">{member.role}</div>
                <h4 className="text-4xl font-black text-brand-dark mb-6 uppercase">{member.name}</h4>
                <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-sm">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
