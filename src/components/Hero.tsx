'use client'
import TechMarquee from "./TechMarquee";

// directive used to indicate that the file should be treated as a client-side component. This is telling Next.js that this component must be rendered in the browser, not on the server.

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] isolate overflow-hidden flex items-center justify-center border border-cyan-400"
    >
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 [--spread:42%] [--grad:conic-gradient(from_180deg_at_50%_50%,_#0ea5e9_0deg,_#60a5fa_110deg,_#94a3b8_200deg,_#0b1220_280deg,_#0ea5e9_360deg)]">
        <div className="absolute -inset-24 blur opacity-40 [background:var(--grad)] [mask-image:radial-gradient(var(--spread)_var(--spread)_at_50%_40%,black,transparent_70%)]" />
      </div>

      <div className="absolute flex flex-col top-15 left-20">
          <span className="flex flex-row text-2xl font-bold uppercase text-cyan-6
          00">
            Alec Fitzgerald
          </span>
          <span className="text-lg text-zinc-500">
            Software Developer
          </span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-zinc-200">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-normal">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-slate-200 to-zinc-700">
            Hello, world.
          </span>
        </h1>

        <div className="mx-auto max-w-4xl mt-12 justify-center text-zinc-400 text-lg">
          I'm a software developer who enjoys taking vague ideas and collaborating with others to turn them into clear, working systems.
          I bring a strong back-end foundation with a product-driven mindset. I don't just write code, I focus on supporting the customer experience and business goals.
          I take responsibility for the systems I work on, proactively solve problems, and continuously look for ways to improve the overall product.
          Continuous learning is part of the craft, and I adapt quickly to new tools and evolving requirements.
        </div>

        
      </div>
    </section>
  );
}
