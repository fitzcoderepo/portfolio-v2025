"use client";
import React from "react";
import { 
  siTypescript,
  siNextdotjs,
  siPostgresql,
  siTailwindcss,
  siDocker,
  siPython,
  siDjango,
  siLinux,
  siOdoo,
  siJavascript,
  siCplusplus,
  siFlutter,
} from "simple-icons/icons";


type Item = { name: string; svg: string; hex: string; };

const ITEMS: Item[] = [
    { name: "Python",         svg: siPython.svg,          hex: `#${siPython.hex}` },
    { name: "Linux",          svg: siLinux.svg,           hex: `#${siLinux.hex}` },
    { name: "Flutter",        svg: siFlutter.svg,         hex: `#${siFlutter.hex}`},
    { name: "JavaScript",     svg: siJavascript.svg,      hex: `#${siJavascript.hex}` },
    { name: "C++",            svg: siCplusplus.svg,       hex: `#${siCplusplus.hex}` },
    { name: "Odoo",           svg: siOdoo.svg,            hex: `#${siOdoo.hex}` },
    { name: "Django",         svg: siDjango.svg,          hex: `#${siDjango.hex}` },
    { name: "TypeScript",     svg: siTypescript.svg,      hex: `#${siTypescript.hex}` },
    { name: "Next.js",        svg: siNextdotjs.svg,       hex: `#${siNextdotjs.hex}` },
    { name: "Postgres",       svg: siPostgresql.svg,      hex: `#${siPostgresql.hex}` },
    { name: "Tailwind",       svg: siTailwindcss.svg,     hex: `#${siTailwindcss.hex}` },
    { name: "Docker",         svg: siDocker.svg,          hex: `#${siDocker.hex}` },
  ];

export default function TechMarquee() {
  const track = ITEMS; 

  return (
    <div className="relative overflow-hidden" aria-label="Technologies I use">

      {/* Track */}
      <div className="marquee-content flex gap-8 items-center animate-marquee will-change-transform">
        {track.map((it, i) => (
          <div key={`${it.name}-${i}`} className={`flex items-center gap-2 opacity-90 hover:opacity-100 transition `}>

            {/* Icon: render and control size via wrapper // enforce color via currentColor by swapping the fill on the root svg */}
            <span className="inline-block size-6 md:size-8" dangerouslySetInnerHTML={{ __html: it.svg.replace("<svg", `<svg fill="currentColor"`),}}
              style={{ color: it.hex }}
              aria-hidden="true"
            />
            <span className="text-zinc-700 text-sm md:text-base">{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
