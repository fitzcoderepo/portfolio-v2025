"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Home, User, FolderGit2, Mail } from "lucide-react";

type Section = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size: number; className?: string }>;
};

type Props = {
  sections?: Section[];
  railPosition?: "right" | "left";
};

const buildFrames = (deltaX: number, deltaY: number, phase: "dock" | "undock" | "shift"): Keyframe[] => {
  if (phase === "dock")   return [{ transform: `translate(${deltaX}px,${deltaY}px)`, offset: 0 }, { transform: `translate(0,${deltaY}px)`, offset: 0.65 }, { transform: "translate(0,0)", offset: 1 }];
  if (phase === "undock") return [{ transform: `translate(${deltaX}px,${deltaY}px)`, offset: 0 }, { transform: `translate(${deltaX}px,0)`, offset: 0.35 }, { transform: "translate(0,0)", offset: 1 }];
  return [{ transform: `translate(${deltaX}px,${deltaY}px)` }, { transform: "translate(0,0)" }];
};

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function FloatingNav({
  sections = [
    { id: "top",      label: "Top",      icon: Home },
    { id: "about",    label: "About",    icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact",  label: "Contact",  icon: Mail },
  ],
  railPosition = "right",
}: Props) {
  const [active,   setActive]   = useState<string>(sections[0]?.id ?? "");
  const [docked,   setDocked]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const isRightDocked = docked && railPosition === "right";
  const navRef = useRef<HTMLElement | null>(null);
  const previousSnapshot = useRef<{ rect: DOMRect; docked: boolean } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDocked(y > 100);
      setExpanded(y > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const node = navRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const prev = previousSnapshot.current;
    if (prev) {
      const dx = prev.rect.left - rect.left;
      const dy = prev.rect.top  - rect.top;
      if (dx || dy) {
        const phase = !prev.docked && docked ? "dock" : prev.docked && !docked ? "undock" : "shift";
        node.animate(buildFrames(dx, dy, phase), { duration: 900, easing: "cubic-bezier(0.4,0,0.2,1)" });
      }
    }
    previousSnapshot.current = { rect, docked };
  }, [docked, railPosition]);

  useEffect(() => {
    const MID = window.innerHeight * 0.5;
    const pick = (entries: IntersectionObserverEntry[]) => {
      const best = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - MID) - Math.abs(b.boundingClientRect.top - MID))[0];
      const id = (best?.target as HTMLElement | undefined)?.id;
      if (id) setActive(id);
    };
    const obs = new IntersectionObserver(pick, { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.1, 0.25, 0.5] });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(id !== "top");
    setDocked(id !== "top");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    el.setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  };

  // Styles
  const itemBase = "inline-flex items-center gap-2 rounded-none px-3 py-2 text-xs font-mono tracking-widest uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";
  const itemIdle   = "text-zinc-500 hover:text-zinc-200";
  const itemActive = "text-cyan-400 border-l-2 border-cyan-400 pl-2.5";

  const containerBase = "fixed z-50 transition-[background-color,box-shadow,padding] duration-700 ease-in-out";
  const expandedStyle = "p-2 bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl shadow-xl shadow-black/40";
  const collapsedStyle = "p-0 shadow-none border-transparent bg-transparent";

  const containerCls = `${containerBase} ${expanded ? expandedStyle : collapsedStyle}`;

  return (
    <>
      {/* Mobile bottom pill */}
      <nav
        aria-label="Section navigation"
        className={`${containerCls} bottom-8 inset-x-0 mx-auto w-max max-w-[95vw] md:hidden pb-[env(safe-area-inset-bottom)]`}
      >
        <ul className="flex items-center gap-1">
          {sections.map(({ id, label, icon: Icon = Home }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={scrollTo(id)}
                aria-current={active === id ? "page" : undefined}
                className={`${itemBase} ${active === id ? itemActive : itemIdle}`}
              >
                <Icon className="size-4" size={0} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop rail */}
      <nav
        ref={navRef}
        aria-label="Section navigation"
        className={`${containerCls} hidden md:flex flex-col items-stretch gap-1
          ${railPosition === "right" ? "top-1/2 right-12 -translate-y-1/2" : "top-1/2 left-12 -translate-y-1/2"}
          transition-opacity duration-500
          ${docked ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {sections.map(({ id, label, icon: Icon = Home }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={scrollTo(id)}
            aria-current={active === id ? "page" : undefined}
            title={label}
            className={`${itemBase} ${active === id ? itemActive : itemIdle} ${expanded ? "w-full justify-between" : ""}`}
          >
            <Icon className="size-4" size={0} />
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}