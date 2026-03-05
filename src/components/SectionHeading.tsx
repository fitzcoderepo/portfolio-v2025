'use client'


export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-2">
        {subtitle || "—"}
      </p>
      <h2 className="text-4xl font-black text-white tracking-tight">{title}</h2>
    </div>
  );
}
