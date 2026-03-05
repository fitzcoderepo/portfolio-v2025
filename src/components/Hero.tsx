'use client'

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] isolate overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* light grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#a0a0a0 1px, transparent 1px), linear-gradient(90deg, #a0a0a0 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cyan glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

       {/* Main content */}
      <div className="relative z-10 px-6 text-center max-w-4xl pb-28 md:pb-0">

        {/* Name */}
        <div className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">
          Alec Fitzgerald
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white">
          Hello,{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #22d3ee" }}
          >
            world.
          </span>
        </h1>

        {/* Role pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 border border-cyan-400/40 text-cyan-400">
            Back-End Engineer
          </span>
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 border border-zinc-700 text-zinc-500">
            Full-Stack Capable
          </span>
          {/* <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 border border-zinc-700 text-zinc-500">
            Python · Django · TypeScript
          </span> */}
        </div>

        <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
          I build back-end systems that businesses run on — 
          APIs, data models, and the infrastructure underneath — 
          designed from the start with practicality and usability in mind, 
          and built to scale with growth. 
          CS degree, product-aware, and full-stack capable when it counts.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan-400 text-zinc-950 font-mono font-bold text-sm tracking-widest uppercase hover:bg-cyan-300 transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-zinc-600 text-zinc-300 font-mono text-sm tracking-widest uppercase hover:border-zinc-400 hover:text-white transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="https://docs.google.com/document/d/1h_Fyrm2cc0_HqdkOWUQHCLoy9kvQYR2t49BvZBorps4/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-zinc-700 text-zinc-500 font-mono text-sm tracking-widest uppercase hover:border-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Resume ↓
          </a>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}