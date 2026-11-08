"use client";

import type { CSSProperties } from "react";
import UiIcon from "@/components/UiIcon";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import ProjectGallery, { ProjectImageTrigger } from "@/components/ProjectGallery";

const palettes = [
  { dark: "#eae5db", light: "#f8f5ee", glow: "#c7c0b4" },
  { dark: "#e6e1d7", light: "#fffefa", glow: "#bdb5a8" },
  { dark: "#ede9df", light: "#f7f4ec", glow: "#cbc3b7" },
];

export default function ProjectCard({ project, index, total, progress }: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [1, targetScale]);
  const palette = palettes[index % palettes.length];
  const number = String(index + 1).padStart(2, "0");
  const secondaryPreview = project.galleryExtras?.[0];
  const secondaryImage = secondaryPreview?.image ?? project.structureImage;
  const secondaryLabel = secondaryPreview?.label ?? "구조도";

  return (
    <div className="project-card-shell" style={{ "--stack-index": index, zIndex: index + 1 } as CSSProperties}>
      <ProjectGallery project={project} number={number} style={{ "--project-deep": palette.dark, "--project-soft": palette.light } as CSSProperties}>
      <motion.article style={{ scale: reduceMotion ? 1 : scale }} className="project-stack-card overflow-hidden rounded-[34px] border-2 p-4 sm:rounded-[48px] sm:p-6 md:rounded-[60px] md:p-8 ui-muted ui-card ui-surface-dark ui-divider">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5 md:mb-7">
          <div className="flex min-w-0 items-start gap-4 sm:gap-7">
            <span className="ui-title shrink-0">{number}</span>
            <div className="min-w-0 pt-1 sm:pt-3">
              <p className="hidden font-mono ui-label ui-muted sm:block">PROJECT / {project.role}</p>
              <h3 className="mt-2 break-keep ui-title">{project.title}</h3>
              <p className="mt-2 max-w-xl break-keep ui-body ui-muted">{project.summary}</p>
            </div>
          </div>
          <Link href={`/projects/${project.slug}`} className="project-link inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-5 py-2.5 transition-colors hover:bg-black/5 sm:px-7 sm:py-3 ui-button ui-divider">
            자세히 보기 <UiIcon icon={ArrowUpRight} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:h-[330px] sm:grid-cols-[.8fr_1.2fr] md:h-[clamp(340px,44vh,480px)] md:grid-cols-[.7fr_1.3fr]">
          <div className="order-2 grid h-[150px] min-h-0 grid-cols-2 gap-3 sm:order-1 sm:h-auto sm:grid-cols-1 sm:grid-rows-[.75fr_1fr]">
            <ProjectImageTrigger index={secondaryPreview ? 0 : 1} className="project-preview relative overflow-hidden rounded-[22px] p-4 sm:rounded-[32px] sm:p-6" style={{ background: `linear-gradient(135deg, ${palette.dark}, ${palette.light})` }}>
              {project.screenImage ? <Image src={withBasePath(project.screenImage)} alt={`${project.title} ${project.screenLabel ?? "화면 캡처"}`} fill sizes="(max-width: 768px) 40vw, 400px" className={project.slug === "moduflow" ? "object-contain bg-[#f4f7fb] p-2" : "object-cover"} /> : <>
              <span className="relative z-10 font-mono ui-caption ui-muted">{project.capturePlan ? "SCREEN / 운동 · 루틴" : `WIREFRAME / ${number}`}</span>
              <div aria-hidden="true" className="absolute right-[10%] bottom-[-45%] size-[160px] rounded-full border-[18px] border-black/10 sm:size-[230px] sm:border-[28px]" />
              </>}
            </ProjectImageTrigger>
            <ProjectImageTrigger index={secondaryPreview ? 0 : 2} className="project-preview relative overflow-hidden rounded-[22px] border p-4 sm:rounded-[32px] sm:p-6 ui-divider">
              {secondaryImage ? <Image src={withBasePath(secondaryImage)} alt={`${project.title} ${secondaryLabel}`} fill sizes="(max-width: 768px) 40vw, 400px" className={project.slug === "moduflow" ? "object-contain bg-white p-2" : "object-cover"} /> : <>
              <span className="font-mono ui-caption ui-muted">STRUCTURE</span>
              <div aria-hidden="true" className="mt-6 space-y-3 opacity-70"><i className="block h-2 w-3/4 rounded-full bg-black/30" /><i className="block h-2 w-1/2 rounded-full bg-black/20" /><i className="block h-2 w-2/3 rounded-full bg-black/10" /></div>
              <span className="absolute right-5 bottom-3 ui-title ui-muted">{number}</span>
              </>}
            </ProjectImageTrigger>
          </div>
          <ProjectImageTrigger index={secondaryPreview ? 1 : 0} className="project-preview relative order-1 flex h-[220px] min-w-0 flex-col justify-between overflow-hidden rounded-[22px] border p-5 sm:order-2 sm:h-auto sm:rounded-[32px] sm:p-8 ui-divider" style={{ background: `radial-gradient(circle at 65% 45%, ${palette.light} 0%, ${palette.dark} 80%)` }}>
            {project.coverImage ? <Image src={withBasePath(project.coverImage)} alt={`${project.title} ${project.coverLabel ?? (secondaryPreview ? "관리자 CMS" : "대표 화면")}`} fill sizes="(max-width: 768px) 100vw, 700px" className={project.slug === "moduflow" ? "object-contain bg-white p-2" : "object-cover"} /> : <>
            <div className="relative z-10 flex justify-between font-mono ui-muted"><span>{profile.handle.toUpperCase()} / PORTFOLIO</span><span>0{index + 1}</span></div>
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[45px] border border-black/20 sm:size-[330px] sm:rounded-[70px] md:size-[420px]" />
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[25px] opacity-70 blur-[1px] sm:size-[200px] sm:border-[38px]" style={{ borderColor: palette.glow }} />
              <span className="relative z-10 ui-title">{project.capturePlan ? project.title : `Project ${number}`}</span>
            </>}
          </ProjectImageTrigger>
        </div>
      </motion.article>
      </ProjectGallery>
    </div>
  );
}
