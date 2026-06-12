export default function BlogCategories() {
  const categories = ['All Intelligence', 'Audit Strategy', 'Revenue Integrity', 'Workflow Systems', 'Compliance Updates'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-12 border-b border-white/5 bg-brand-950">
      {categories.map((cat, i) => (
        <button 
          key={i}
          className={`px-6 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-brand-teal border-brand-teal text-brand-950' : 'bg-transparent border-white/10 text-slate-400 hover:border-brand-teal/50 hover:text-brand-teal'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
