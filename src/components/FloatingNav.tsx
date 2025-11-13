"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const buildFrames = (deltaX: number, deltaY: number, phase: "dock" | "undock" | "shift"): Keyframe[] => {
    if (phase === "dock") {
        return [
            { transform: `translate(${deltaX}px, ${deltaY}px)`, offset: 0 },
            { transform: `translate(0px, ${deltaY}px)`, offset: 0.65 },
            { transform: "translate(0px, 0px)", offset: 1 },
        ];
    }
    if (phase === "undock") {
        return [
            { transform: `translate(${deltaX}px, ${deltaY}px)`, offset: 0 },
            { transform: `translate(${deltaX}px, 0px)`, offset: 0.35 },
            { transform: "translate(0px, 0px)", offset: 1 },
        ];
    }
    return [
        { transform: `translate(${deltaX}px, ${deltaY}px)` },
        { transform: "translate(0px, 0px)" },
    ];
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

    className = "",
    itemClass = "text-zinc-400  hover:ring-1",
    itemActiveClass = "text-cyan-400 ring-2 ring-cyan-400/40 ",
    railPosition = "right",

}: Props) {
    const [active, setActive] = useState<string>(sections[0]?.id ?? "");
    const [docked, setDocked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const ids = useMemo(() => sections.map((s) => s.id), [sections]);
    const isRightDocked = docked && railPosition === "right";
    const navRef = useRef<HTMLElement | null>(null);
    const previousSnapshot = useRef<{ rect: DOMRect; docked: boolean } | null>(null);

    useEffect(() => {
        const SCROLL_THRESHOLD = 100; // px from top

        const onScroll = () => {
            const scrollY = window.scrollY;
            const shouldDock = scrollY > SCROLL_THRESHOLD;
            setDocked(shouldDock);
            setExpanded(scrollY > 0);
        };

        onScroll(); // run on mount if page reloads

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useLayoutEffect(() => {
        const node = navRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const prev = previousSnapshot.current;

        if (prev) {
            const deltaX = prev.rect.left - rect.left;
            const deltaY = prev.rect.top - rect.top;

            if (deltaX || deltaY) {
                const phase = !prev.docked && docked
                    ? "dock"
                    : prev.docked && !docked
                        ? "undock"
                        : "shift";

                node.animate(buildFrames(deltaX, deltaY, phase), {
                    duration: 900,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                });
            }
        }

        previousSnapshot.current = { rect, docked };
    }, [docked, railPosition]);

    useEffect(() => {
        const MID = window.innerHeight * 0.5; // viewport center

        const pickActive = (entries: IntersectionObserverEntry[]) => {
            const best = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        Math.abs(a.boundingClientRect.top - MID) -
                        Math.abs(b.boundingClientRect.top - MID),
                )[0];

            const id = (best?.target as HTMLElement | undefined)?.id;
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

        const isTop = id === "top";
        setExpanded(!isTop);
        setDocked(!isTop);

        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        el.setAttribute("tabindex", "-1");
        (el as HTMLElement).focus({ preventScroll: true });
    };

    const itemBase =
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2";
    const containerBase =
        "fixed z-50 rounded-2xl transition-[background-color,box-shadow,padding] duration-700 ease-in-out";
    const expandedContainer =
        `p-2 shadow-zinc-700 shadow-md ${className}`;
    const collapsedContainer =
        "p-0 shadow-none border-transparent bg-transparent backdrop-blur-0";
    const dockedContrast =
        docked ? "bg-zinc-950/90 border-white/20 backdrop-blur-xl" : "";
    const containerClasses =
        `${containerBase} ${expanded ? `${expandedContainer} ${dockedContrast}` : collapsedContainer}`;

    return (
        <>
            {/* Mobile bottom pill */}
            <nav aria-label="Section navigation" className={`${containerClasses} bottom-4 inset-x-0 mx-auto w-max max-w-[95vw] md:hidden pb-[env(safe-area-inset-bottom)]`} >
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
            
            {/* Desktop horizontal rail beneath marquee */}
            <nav
                ref={navRef}
                aria-label="Section navigation"
                className={`${containerClasses} hidden md:flex ${isRightDocked
                        ? "flex-col items-stretch gap-1"
                        : "flex-row flex-wrap items-center justify-center gap-2"
                    }
                ${docked
                        ? railPosition === "right"
                            ? "top-3/4 right-12 translate-x-0 -translate-y-1/2"
                            : "top-3/4 left-12 translate-x-0 -translate-y-1/2"
                        : "top-[clamp(50rem,55vh,55rem)] left-1/2 -translate-x-1/2"
                    }`}
            >
                {sections.map(({ id, label, icon: Icon = Home }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={scrollTo(id)}
                        aria-current={active === id ? "page" : undefined}
                        className={`${itemBase} ${active === id ? itemActiveClass : itemClass} ${isRightDocked && expanded ? "w-full justify-between" : ""}`}
                        title={label}
                    >
                        <Icon className="size-8" size={0} />
                        {label}
                    </a>
                ))}
            </nav>
        </>
    );
}
