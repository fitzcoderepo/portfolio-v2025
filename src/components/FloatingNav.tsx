// components/FloatingNav.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Home, User, FolderGit2, Mail } from "lucide-react";


type Section = {
    id: string;
    label: string;
    icon?: React.ComponentType<{ size: number, className?: string }>
};

type Props = {
    sections?: Section[];
    className?: string;         // container bg/border
    itemClass?: string;         // base item text/hover
    itemActiveClass?: string;   // active item state
    railPosition?: "right" | "left";
};

const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;



export default function FloatingNav({
    sections = [
        { id: "top", label: "Top", icon: Home },
        { id: "about", label: "About", icon: User },
        { id: "projects", label: "Projects", icon: FolderGit2 },
        { id: "contact", label: "Contact", icon: Mail },
    ],

    className = "border border-white/10 bg-zinc-900/70 backdrop-blur-md",
    itemClass = "text-zinc-400 hover:bg-zinc-200/10 hover:outline-1 hover:outline-cyan-400/40",
    itemActiveClass = "text-cyan-400 bg-zinc-100/15 ring-1 ring-cyan-400/40 ",
    railPosition = "right",

}: Props) {
    const [active, setActive] = useState<string>(sections[0]?.id ?? "");
    const [docked, setDocked] = useState(false);
    const ids = useMemo(() => sections.map((s) => s.id), [sections]);

    useEffect(() => {
        const SCROLL_THRESHOLD = 100; // px from top

        const onScroll = () => {
            const shouldDock = window.scrollY > SCROLL_THRESHOLD;
            setDocked(shouldDock);
        };

        onScroll(); // run on mount if page reloads

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const MID = window.innerHeight * 0.5; // viewport center

        const pickActive = (entries: IntersectionObserverEntry[]) => {
            // consider only intersecting sections
            const visible = entries.filter((e) => e.isIntersecting);
            if (!visible.length) return;

            // choose the one whose top is closest to the center line
            let best = visible[0];
            let bestDist = Math.abs(visible[0].boundingClientRect.top - MID);

            for (let i = 1; i < visible.length; i++) {
                const dist = Math.abs(visible[i].boundingClientRect.top - MID);
                if (dist < bestDist) {
                    best = visible[i];
                    bestDist = dist;
                }
            }
            const id = (best.target as HTMLElement).id;
            if (id) setActive(id);
        };

        const observer = new IntersectionObserver(pickActive, {
            root: null,
            // only treat the middle band as "active"
            rootMargin: "-45% 0px -45% 0px",
            threshold: [0, 0.01, 0.1, 0.25, 0.5],
        });

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();

        // dock when going to any section other than top
        if (id === "top") {
            setDocked(false);
        } else {
            setDocked(true);
        }

        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        el.setAttribute("tabindex", "-1");
        (el as HTMLElement).focus({ preventScroll: true });
    };

    const itemBase =
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2";
    const containerBase =
        "fixed z-50 p-2 rounded-2xl shadow-zinc-700 shadow-md";

    return (
        <>
            {/* Mobile bottom pill */}
            <nav aria-label="Section navigation" className={`${containerBase} ${className} bottom-4 inset-x-0 mx-auto w-max max-w-[95vw] md:hidden pb-[env(safe-area-inset-bottom)]`} >
                <ul className="flex items-center gap-1">
                    {sections.map(({ id, label, icon: Icon = Home }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={scrollTo(id)}
                                aria-current={active === id ? "page" : undefined}
                                className={`${itemBase} ${active === id ? itemActiveClass : itemClass}`}
                            >
                                <Icon className="size-4" size={0} />
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            
            {/* Desktop side rail */}
            // TODO 
            <nav
                aria-label="Section navigation"
                className={`${containerBase} ${className}  hidden md:flex flex-col gap-2
                    top-1/2 -translate-y-1/2
                    transform transition-all duration-500
                ${docked
                        ? railPosition === "right"
                            ? "right-4 translate-x-0"
                            : "left-4 translate-x-0"
                        : "left-1/2 -translate-x-1/2"
                    }`}
            >
                {sections.map(({ id, label, icon: Icon = Home }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={scrollTo(id)}
                        aria-current={active === id ? "page" : undefined}
                        className={`${itemBase} justify-start ${active === id ? itemActiveClass : itemClass}`}
                        title={label}
                    >
                        <Icon className="size-4" size={0} />
                        {label}
                    </a>
                ))}
            </nav>
        </>
    );
}
