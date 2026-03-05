'use client'
import SectionHeading from "@/components/SectionHeading";
import TechMarquee from "@/components/TechMarquee";


export function About() {
  return (
    <section id="about" className="min-h-[80vh] px-6 py-24 bg-zinc-900">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="About" subtitle="A little about me" />

         {/* Background blurb */}
        <p className="mt-6 text-zinc-300 leading-relaxed text-lg">
          I'm a mid-level software engineer with a Computer Science degree from East Tennessee State University and
          3+ years of hands-on experience. My foundation is back-end; APIs,
          data modelling, auth, performance; but I've shipped front-end work
          too and I'm comfortable across the full stack. I take pride and ownership of
          the systems I work on and care about what they actually do for people.
        </p>

        {/* Skill grid */}
        <div className="mt-10 grid gap-px sm:grid-cols-2 border border-zinc-700/50 overflow-hidden">
          {[
            {
              label: "Core",
              value: "Python · Django · JS / TS · Node.js · HTML · CSS",
            },
            {
              label: "Backend",
              value: "REST API · Data Modelling · Authentication · Background Jobs · Async",
            },
            {
              label: "Databases & Infra",
              value: "AWS · Postgres · Linux Env · Prisma · Docker · CI/CD · SQLite",
            },
            {
              label: "Front End(supporting)",
              value: "Next.js · Flutter · React · TailwindCSS · Bootstrap ",
            },
          ].map(({ label, value }) => (
            <div key={label} className="bg-zinc-800/60 p-5 hover:bg-zinc-800 transition-colors">
              <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-2">{label}</p>
              <p className="text-zinc-300 text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <TechMarquee />
        </div>

        {/* Currently building */}
        <div className="mt-12 border-l-2 border-cyan-400 pl-5 space-y-4">
          <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Currently Building</p>
          <div>
            <p className="text-white font-semibold">NexStep — Decision Tree Workflow Platform</p>
            <p className="mt-1 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">Django · DRF · Next.js · React</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A configurable platform for building and managing decision-tree workflows — troubleshooting guides,
              manufacturing work orders, operational procedures, and more. The backend is Django + DRF with
              dynamic branching logic, relational workflow models, and API-driven state transitions.
              The frontend consumes those APIs via Next.js and React. Architected so organisations can define,
              modify, and deploy new workflows without touching code.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold">Automation Studio — Automation Dashboard</p>
            <p className="mt-1 text-zinc-500 font-mono text-xs tracking-widest uppercase mb-2">Next.js · Prisma · OpenAI</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              An event-driven backend automation platform built with Next.js server components and Prisma ORM.
              Handles secure server-side file ingestion, webhook processing for async task execution,
              and deep OpenAI integration — structured outputs, retrieval pipelines, and vector store management.
              Designed around modular backend services so automation workflows can be chained and extended cleanly.
            </p>
          </div>
         
        </div>

        {/* Personal */}
        <div className="mt-12 grid sm:grid-cols-2 gap-px border border-zinc-700/50 overflow-hidden">
          <div className="bg-zinc-800/40 p-5">
            <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-2">Off the clock</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              I wrench on my Subaru WRX in my spare time; performance upgrades,
              tuning, and getting the most out of the car. When I'm not under
              the hood, I'm out driving it, or pushing a sport bike on a good road.
            </p>
          </div>
          <div className="bg-zinc-800/40 p-5">
            <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-2">How I work</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
                Different problems call for different approaches. I don't believe in one-size-fits-all solutions.
                When I'm working, I like to keep my code clean and organized. 
                I appreciate well documented code that explains the <em>why</em>, not always just the what.
                I like understanding the <em>why</em> before touching the keyboard, and I don't consider
                something done until it meets or exceeds expectations and is clean enough to hand off.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}