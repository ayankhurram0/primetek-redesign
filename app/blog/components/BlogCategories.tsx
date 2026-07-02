export default function BlogCategories() {
  const categories = ['All Intelligence', 'Audit Strategy', 'Revenue Integrity', 'Workflow Systems', 'Compliance Updates'];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-12 border-b border-ink/10 bg-transparent">
      {categories.map((cat, i) => (
        <button 
          key={i}
          className={`px-6 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-brand-teal border-accent text-brand-950' : 'bg-transparent border-ink/10 text-ink-muted hover:border-accent/50 hover:text-accent'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
