"use client";
import React from "react";
import {
  siTypescript, siNextdotjs, siPostgresql, siTailwindcss, siDocker,
  siPython, siDjango, siLinux, siOdoo, siJavascript, siCplusplus, siFlutter,
} from "simple-icons/icons";

type Item = { name: string; svg: string; hex: string };

const ITEMS: Item[] = [
  { name: "Python",      svg: siPython.svg,      hex: `#${siPython.hex}` },
  { name: "Linux",       svg: siLinux.svg,        hex: `#${siLinux.hex}` },
  { name: "Flutter",     svg: siFlutter.svg,      hex: `#${siFlutter.hex}` },
  { name: "JavaScript",  svg: siJavascript.svg,   hex: `#${siJavascript.hex}` },
  { name: "C++",         svg: siCplusplus.svg,    hex: `#${siCplusplus.hex}` },
  { name: "Odoo",        svg: siOdoo.svg,         hex: `#${siOdoo.hex}` },
  { name: "Django",      svg: siDjango.svg,       hex: `#${siDjango.hex}` },
  { name: "TypeScript",  svg: siTypescript.svg,   hex: `#${siTypescript.hex}` },
  { name: "Next.js",     svg: siNextdotjs.svg,    hex: `#${siNextdotjs.hex}` },
  { name: "Postgres",    svg: siPostgresql.svg,   hex: `#${siPostgresql.hex}` },
  { name: "Tailwind",    svg: siTailwindcss.svg,  hex: `#${siTailwindcss.hex}` },
  { name: "Docker",      svg: siDocker.svg,       hex: `#${siDocker.hex}` },
];

function Track() {
  return (
    <>
      {ITEMS.map((it, i) => (
        <div
          key={`${it.name}-${i}`}
          className="flex shrink-0 items-center gap-2 px-4 opacity-70 hover:opacity-100 transition-opacity"
        >
          <span
            className="inline-block size-5 md:size-6"
            dangerouslySetInnerHTML={{
              __html: it.svg.replace("<svg", `<svg fill="currentColor"`),
            }}
            style={{ color: it.hex }}
            aria-hidden="true"
          />
          <span className="text-zinc-400 text-sm font-mono whitespace-nowrap">{it.name}</span>
        </div>
      ))}
    </>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="marquee-container relative overflow-hidden"
      aria-label="Technologies I use"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-zinc-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-zinc-900 to-transparent" />

      {/* Two identical tracks side-by-side; animate the wrapper by -50% */}
      <div className="marquee-track flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
