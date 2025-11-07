"use client";

import React from "react";
import { 
  siTypescript,
  siNextdotjs,
  siPostgresql,
  siRedis,
  siTailwindcss,
  siTrpc,
  siPrisma,
  siDocker,
  siPython,
  siDjango,
  siLinux,
  siOdoo,
  siJavascript,
  siCplusplus,
  siDotnet,
  siBootstrap,
  
} from "simple-icons/icons";

type Item = {
  name: string;
  svg: string;   // full svg markup from simple-icons
  hex: string;   // brand color
};

const ITEMS: Item[] = [
    { name: "Python",    svg: siPython.svg,     hex: `#${siPython.hex}` },
    { name: "Linux",    svg: siLinux.svg,     hex: `#${siLinux.hex}` },
    { name: "JavaScript",    svg: siJavascript.svg,     hex: `#${siJavascript.hex}` },
    { name: "C++", svg: siCplusplus.svg, hex: `#${siCplusplus.hex}` },
    { name: "Odoo",    svg: siOdoo.svg,     hex: `#${siOdoo.hex}` },
    { name: "C#", svg: siDotnet.svg, hex: `#${siDotnet.hex}` },
    { name: "Bootstrap", svg: siBootstrap.svg, hex: `#${siBootstrap.hex}` },
    { name: "Django",    svg: siDjango.svg,     hex: `#${siDjango.hex}` },
  { name: "TypeScript", svg: siTypescript.svg, hex: `#${siTypescript.hex}` },
  { name: "Next.js",    svg: siNextdotjs.svg,  hex: `#${siNextdotjs.hex}` },
  { name: "Postgres",   svg: siPostgresql.svg, hex: `#${siPostgresql.hex}` },
  { name: "Redis",      svg: siRedis.svg,      hex: `#${siRedis.hex}` },
  { name: "Tailwind",   svg: siTailwindcss.svg,hex: `#${siTailwindcss.hex}` },
  { name: "Prisma",     svg: siPrisma.svg,     hex: `#${siPrisma.hex}` },
  { name: "Docker",     svg: siDocker.svg,     hex: `#${siDocker.hex}` },
//   { name: "AWS",        svg: siAmazonaws.svg,  hex: `#${siAmazonaws.hex}` },
];

export default function TechMarquee({
  speedMs = 22000,
  grayscale = true,
}: { speedMs?: number; grayscale?: boolean }) {
  const track = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden"
      aria-label="Technologies I use"
    >
      {/* Edge fade mask */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />

      {/* Track */}
      <div
        className="flex gap-8 items-center will-change-transform"
        style={{
          animation: `marquee ${speedMs}ms linear infinite`,

          ['@media (prefersReducedMotion: reduce) as any']: { animation: "none" },
        } as React.CSSProperties}
      >
        {track.map((it, i) => (
          <div
            key={`${it.name}-${i}`}
            className={`flex items-center gap-2 opacity-90 hover:opacity-100 transition ${
              grayscale ? "grayscale hover:grayscale-0" : ""
            }`}
          >
            {/* Icon: render the svg string and control size via wrapper */}
            <span
              className="inline-block size-5 md:size-6"
              // We enforce color via currentColor by swapping the fill on the root svg
              dangerouslySetInnerHTML={{
                __html: it.svg.replace("<svg", `<svg fill="currentColor"`),
              }}
              style={{ color: it.hex }}
              aria-hidden="true"
            />
            <span className="text-zinc-300 text-sm md:text-base">{it.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
