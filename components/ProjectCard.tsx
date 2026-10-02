"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/data/projects";

const palettes = [
  { dark: "#17283A", light: "#9AB2CC", glow: "#C5D8EA" },
  { dark: "#30233F", light: "#B6A3CA", glow: "#E7CCFF" },
  { dark: "#20332F", light: "#9DBBB2", glow: "#CCE5DA" },
];

export default function ProjectCard({ project, index, total, progress }: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [1, targetScale]);
  const palette = palettes[index % palettes.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="project-card-shell" style={{ "--stack-index": index, zIndex: index + 1 } as CSSProperties}>
      <motion.article style={{ scale: reduceMotion ? 1 : scale }} className="project-stack-card overflow-hidden rounded-[34px] border-2 border-[#D7E2EA]/80 bg-[#111316] p-4 text-[#D7E2EA] sm:rounded-[48px] sm:p-6 md:rounded-[60px] md:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5 md:mb-7">
          <div className="flex min-w-0 items-start gap-4 sm:gap-7">
            <span className="font-display text-[clamp(58px,8vw,120px)] leading-[.85] font-black tracking-normal">{number}</span>
            <div className="min-w-0 pt-1 sm:pt-3">
              <p className="font-mono text-[10px] tracking-[.18em] text-[#93A6B4] sm:text-xs">PROJECT / {project.role}</p>
              <h3 className="mt-2 text-[clamp(20px,2.7vw,38px)] leading-tight font-semibold tracking-[-.05em] break-keep">{project.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#AAB9C3] break-keep sm:text-base">{project.summary}</p>
            </div>
          </div>
          <Link href={`/projects/${project.slug}`} className="project-link inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-5 py-2.5 font-display text-xs font-medium tracking-[.14em] uppercase transition-colors hover:bg-white/10 sm:px-7 sm:py-3 sm:text-sm">
            View Project <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid h-[230px] grid-cols-[.8fr_1.2fr] gap-3 sm:h-[330px] md:h-[clamp(340px,44vh,480px)] md:grid-cols-[.7fr_1.3fr]">
          <div className="grid min-h-0 grid-rows-[.75fr_1fr] gap-3">
            <div className="project-preview relative overflow-hidden rounded-[22px] p-4 sm:rounded-[32px] sm:p-6" style={{ background: `linear-gradient(135deg, ${palette.dark}, ${palette.light})` }}>
              <span className="relative z-10 font-mono text-[10px] tracking-[.2em] text-white/80">WIREFRAME / {number}</span>
              <div aria-hidden="true" className="absolute right-[10%] bottom-[-45%] size-[160px] rounded-full border-[18px] border-white/25 sm:size-[230px] sm:border-[28px]" />
            </div>
            <div className="project-preview relative overflow-hidden rounded-[22px] border border-white/10 bg-[#27323D] p-4 sm:rounded-[32px] sm:p-6">
              <span className="font-mono text-[10px] tracking-[.2em] text-white/70">STRUCTURE</span>
              <div aria-hidden="true" className="mt-6 space-y-3 opacity-70"><i className="block h-2 w-3/4 rounded-full bg-white/50" /><i className="block h-2 w-1/2 rounded-full bg-white/30" /><i className="block h-2 w-2/3 rounded-full bg-white/20" /></div>
              <span className="absolute right-5 bottom-3 font-display text-5xl font-black text-white/15 sm:text-7xl">{number}</span>
            </div>
          </div>
          <div className="project-preview relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[22px] border border-white/10 p-5 sm:rounded-[32px] sm:p-8" style={{ background: `radial-gradient(circle at 65% 45%, ${palette.light} 0%, ${palette.dark} 50%, #10151B 100%)` }}>
            <div className="relative z-10 flex justify-between font-mono text-[10px] tracking-[.2em] text-white/80"><span>2KMINN / PORTFOLIO</span><span>0{index + 1}</span></div>
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[45px] border border-white/40 shadow-[0_0_80px_rgba(255,255,255,.16)] sm:size-[330px] sm:rounded-[70px] md:size-[420px]" />
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[25px] opacity-70 blur-[1px] sm:size-[200px] sm:border-[38px]" style={{ borderColor: palette.glow }} />
            <span className="relative z-10 font-display text-[clamp(27px,5vw,65px)] leading-none font-black tracking-normal text-white uppercase">Project {number}</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
