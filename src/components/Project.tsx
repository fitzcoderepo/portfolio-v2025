'use client'
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";


type Project = {
    title: string;
    summary: string;
    tags?: string[];
    url?: string;
    repo?: string;
};

// PROJECTS
const PROJECTS: Project[] = [

    {
        title: "WIQT Dashboard",
        summary:
            "Internal operations dashboard for WaterIQ — a Django monolith covering device management, alerting, reporting, and a Wagtail-powered knowledge base. Integrated Celery and Django Channels for async task processing and real-time features across multiple app modules.",
        tags: ["Django", "Celery", "Django Channels", "Wagtail", "Postgres"],
        repo: "https://github.com/fitzcoderepo/wiqt-dashboard-site"
    },
    {
        title: "ADC Telemetry Helper",
        summary:
            "Python utility for the Onion Omega2 that reads and counts ADC voltage transitions from single or dual pulsar heads. Implements edge detection with debounce logic, configurable rise/fall thresholds, and a 60-second sampling window — outputting per-channel counts and voltages as JSON.",
        tags: ["Python", "Embedded", "Onion Omega2", "ADC", "IoT"],
        repo: "https://github.com/fitzcoderepo/various-scripts/blob/main/adc_counts",
    },
    {
        title: "WaterIQ Cloud Mobile",
        summary:
            "Cross-platform Flutter app giving WaterIQ customers a mobile dashboard for their units and sensors — live charts, maps, and push notifications powered by the WaterIQ Cloud API and Firebase Cloud Messaging.",
        tags: ["Flutter", "Dart", "Firebase", "REST API"],
        repo: "https://github.com/fitzcoderepo/flutter-mobile-wiqt"
    },
    {
        title: "Odoo ERP Customisation",
        summary:
            "Developed custom modules across multiple Odoo apps — Inventory, Purchasing, Sales, and more — to tailor the platform to specific business workflows and requirements. Also built a Python XML-RPC utility to migrate product data between Odoo instances, using barcode matching with name-based fallback and dry-run support for safe batch transfers.",
        tags: ["Python", "Odoo", "XML-RPC", "ERP"],
    },
    
];


export function Projects() {
    return (
        <section id="projects" className="min-h-[80vh] px-6 py-24 bg-zinc-950">
            <div className="mx-auto max-w-5xl">
                <SectionHeading title="Projects" subtitle="A few things I've worked on professionally." />

                <ul className="mt-10 grid gap-px sm:grid-cols-2 border border-zinc-800 overflow-hidden">
                    {PROJECTS.map((p, i) => (
                        <li
                            key={p.title}
                            className="group relative bg-zinc-900 p-6 hover:bg-zinc-800/80 transition-colors"
                        >
                            <span className="font-mono text-xs text-zinc-600 tracking-widest">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <h3 className="mt-2 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                {p.title}
                            </h3>

                            <p className="mt-2 text-zinc-400 text-sm leading-relaxed">{p.summary}</p>

                            {p.tags?.length ? (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="font-mono text-xs text-cyan-400/70 border border-cyan-400/20 px-2 py-0.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            <div className="mt-5 flex gap-4">
                                {p.url && (
                                    <Link
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-zinc-400 hover:text-cyan-400 tracking-widest uppercase transition-colors"
                                    >
                                        Live ↗
                                    </Link>
                                )}
                                {p.repo && (
                                    <Link
                                        href={p.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-zinc-400 hover:text-cyan-400 tracking-widest uppercase transition-colors"
                                    >
                                        Code ↗
                                    </Link>
                                )}
                            </div>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-500" />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}