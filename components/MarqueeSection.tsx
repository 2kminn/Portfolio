"use client";

import { useEffect, useRef } from "react";

type Tile = { title: string; label: string; tone: string; mark: string };

const firstRow: Tile[] = [
  { title: "REACT", label: "INTERFACE", tone: "from-[#162336] to-[#374e67]", mark: "01" },
  { title: "TYPESCRIPT", label: "LANGUAGE", tone: "from-[#2a2041] to-[#615878]", mark: "02" },
  { title: "TAILWIND", label: "STYLING", tone: "from-[#162f32] to-[#5b787b]", mark: "03" },
  { title: "FRONTEND", label: "CLIENT", tone: "from-[#363224] to-[#776c51]", mark: "04" },
  { title: "RESPONSIVE", label: "LAYOUT", tone: "from-[#232b3e] to-[#58657f]", mark: "05" },
];

const secondRow: Tile[] = [
  { title: "BACKEND", label: "SERVER", tone: "from-[#263027] to-[#697965]", mark: "06" },
  { title: "API", label: "CONNECTION", tone: "from-[#362532] to-[#77566d]", mark: "07" },
  { title: "DATABASE", label: "DATA", tone: "from-[#212b3a] to-[#556d87]", mark: "08" },
  { title: "LINUX", label: "SYSTEM", tone: "from-[#30302b] to-[#74746b]", mark: "09" },
  { title: "ANALYSIS", label: "INSIGHT", tone: "from-[#252a35] to-[#68728c]", mark: "10" },
];

function TileView({ tile }: { tile: Tile }) {
  return (
    <div className={`marquee-tile relative flex h-[190px] w-[290px] shrink-0 flex-col overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-br ${tile.tone} p-5 text-[#EAF0F4] sm:h-[235px] sm:w-[370px] md:h-[270px] md:w-[420px] md:p-7`}>
      <div aria-hidden="true" className="marquee-orbit absolute top-1/2 left-1/2 size-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 sm:size-[230px]" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[110px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/20 sm:size-[150px]" />
      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[.22em] sm:text-xs"><span>2KMINN / LAB</span><span>{tile.mark}</span></div>
      <div className="relative flex flex-1 items-center justify-center"><strong className="text-center font-display text-[clamp(28px,3.5vw,43px)] leading-none font-black tracking-normal break-all">{tile.title}</strong></div>
      <div className="relative flex justify-between border-t border-white/30 pt-3 font-mono text-[10px] tracking-[.18em] sm:text-xs"><span>{tile.label}</span><span>↗</span></div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstTrack = useRef<HTMLDivElement>(null);
  const secondTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const tracks = [firstTrack.current, secondTrack.current];
        if (!section || !tracks[0] || !tracks[1]) return;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const offset = Math.max(0, (window.scrollY - sectionTop + window.innerHeight) * 0.3);
        tracks.forEach((track, index) => {
          if (!track) return;
          const sequenceWidth = track.scrollWidth / 3;
          const shift = sequenceWidth ? offset % sequenceWidth : 0;
          track.style.transform = `translate3d(${index === 0 ? -sequenceWidth + shift : -shift}px, 0, 0)`;
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pt-24 pb-14 sm:pt-32 md:pt-40" aria-label="기술 키워드 갤러리">
      <h2 className="sr-only">기술 키워드</h2>
      <div className="space-y-3" aria-hidden="true">
        {[firstRow, secondRow].map((row, rowIndex) => (
          <div key={rowIndex} ref={rowIndex === 0 ? firstTrack : secondTrack} className="flex w-max gap-3 will-change-transform">
            {Array.from({ length: 3 }, (_, repeat) => row.map((tile) => <TileView key={`${repeat}-${tile.mark}`} tile={tile} />))}
          </div>
        ))}
      </div>
    </section>
  );
}
