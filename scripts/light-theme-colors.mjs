import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..", "app");

const replacements = [
  ["text-white/60", "text-ink-muted"],
  ["text-white/50", "text-ink-subtle"],
  ["text-white/70", "text-ink-muted"],
  ["text-white/80", "text-ink"],
  ["text-white/40", "text-ink-subtle"],
  ["text-white/30", "text-ink-subtle"],
  ["text-white/20", "text-ink-subtle"],
  ["text-slate-400", "text-ink-muted"],
  ["text-slate-500", "text-ink-subtle"],
  ["text-slate-300", "text-ink"],
  ["text-slate-600", "text-ink-subtle"],
  ["border-white/10", "border-ink/10"],
  ["border-white/5", "border-ink/8"],
  ["border-white/20", "border-ink/15"],
  ["border-white/30", "border-ink/20"],
  ["bg-[#020817]", "bg-white/70"],
  ["bg-[#04212a]", "bg-white/75"],
  ["bg-[#04212a]/80", "bg-white/80"],
  ["bg-[#04212a]/40", "bg-white/60"],
  ["bg-[#061018]/75", "bg-white/75"],
  ["bg-[#090E11]", "bg-white/80"],
  ["bg-[#090E11]/95", "bg-white/85"],
  ["bg-[#0E161B]", "bg-white/85"],
  ["bg-[#0F171A]", "bg-white/70"],
  ["bg-[#152024]", "bg-white/80"],
  ["bg-[#010810]/40", "bg-white/60"],
  ["bg-white/5", "bg-white/65"],
  ["hover:bg-white/5", "hover:bg-white/80"],
  ["hover:text-slate-300", "hover:text-ink"],
  ["text-teal-400", "text-accent"],
  ["hover:text-teal-400", "hover:text-accent"],
  ["hover:text-[#2dd4bf]", "hover:text-accent"],
  ["text-[#2dd4bf]", "text-accent"],
  ["text-[#2dd4bf]/80", "text-accent/80"],
  ["text-brand-teal", "text-accent"],
  ["from-brand-teal", "from-accent"],
  ["to-brand-teal", "to-accent"],
  ["border-brand-teal", "border-accent"],
  ["hover:border-brand-teal", "hover:border-accent"],
  ["border-ink/8", "border-ink/10"],
  ["bg-brand-950", "bg-transparent"],
  ["bg-brand-900/30", "bg-transparent"],
  ["bg-brand-900/20", "bg-transparent"],
  ["bg-brand-950/40", "bg-white/70"],
  ["bg-brand-900", "bg-white/60"],
  ["text-white", "text-ink"],
];

const skipFiles = new Set([
  "button.tsx",
  "AuthLayout.tsx",
  "LoginForm.tsx",
  "SignupForm.tsx",
  "AuthInput.tsx",
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith(".tsx") || p.endsWith(".css")) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const base = file.split(/[/\\]/).pop();
  if (skipFiles.has(base)) continue;

  let src = readFileSync(file, "utf8");
  const original = src;

  for (const [from, to] of replacements) {
    src = src.split(from).join(to);
  }

  if (src !== original) {
    writeFileSync(file, src);
    changed++;
    console.log("updated:", file.replace(root, ""));
  }
}

console.log(`Done. ${changed} files updated.`);
