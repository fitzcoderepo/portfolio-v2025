'use client'
import TechMarquee from "./TechMarquee";

 // directive used to indicate that the file should be treated as a client-side component. This is telling Next.js that this component must be rendered in the browser, not on the server.

// app/components/Hero.tsx
export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] isolate overflow-hidden flex items-center justify-center"
    >
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 [--spread:62%] [--grad:conic-gradient(from_180deg_at_50%_50%,_#0ea5e9_0deg,_#60a5fa_110deg,_#94a3b8_200deg,_#0b1220_280deg,_#0ea5e9_360deg)]">
        <div className="absolute -inset-24 blur-3xl opacity-40 [background:var(--grad)] [mask-image:radial-gradient(var(--spread)_var(--spread)_at_50%_40%,black,transparent_70%)]" />
      </div>

      {/* Base + grid + noise
      <div className="absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_0%,#0b1220,60%,#05070b)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="[background-image:radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:18px_18px] [background-position:-9px_-9px] opacity-20" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><filter id=%22n%22><feTurbulence baseFrequency=%220.7%22/></filter><rect width=%224%22 height=%224%22 filter=%22url(%23n)%22/></svg>')]" />
      </div> */}

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-zinc-200">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-slate-200 to-zinc-100">
            Hello, world.
          </span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-zinc-300/90 max-w-2xl mx-auto">
          I build robust backends and the UIs they power.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group relative rounded-xl px-6 py-3 font-medium ring-1 ring-blue-300/30 bg-blue-400/10 hover:bg-blue-400/20 transition"
          >
            <span className="absolute inset-0 -z-10 rounded-xl blur-lg opacity-0 group-hover:opacity-60 bg-blue-400/30 transition" />
            See projects
          </a>
          <a
            href="#about"
            className="rounded-xl px-6 py-3 font-medium ring-1 ring-white/15 hover:bg-white/10 transition"
          >
            About me
          </a>
          <a
            href="#contact"
            className="rounded-xl px-6 py-3 font-medium ring-1 ring-white/15 hover:bg-white/10 transition"
          >
            Contact
          </a>
        </div>

        {/* Marquee */}
        <div className="mt-10">
          <TechMarquee speedMs={22000} grayscale />

        </div>
      </div>
    </section>
  );
}
