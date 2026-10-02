import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

const themes = [
  { deep: "#17283A", soft: "#9AB2CC" },
  { deep: "#30233F", soft: "#B6A3CA" },
  { deep: "#20332F", soft: "#9DBBB2" },
];

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return {
    title: project ? `${project.title} | 이경민` : "프로젝트를 찾을 수 없습니다",
    description: project?.summary,
  };
}

function ProjectMedia({ src, alt, label, number, compact = false }: {
  src?: string;
  alt: string;
  label: string;
  number: string;
  compact?: boolean;
}) {
  return (
    <div className={`project-detail-media relative flex overflow-hidden border border-white/15 ${compact ? "min-h-[260px] rounded-[26px] sm:min-h-[360px] sm:rounded-[36px]" : "min-h-[430px] rounded-[30px] sm:min-h-[560px] sm:rounded-[48px]"}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
      ) : (
        <div className="relative flex w-full flex-col justify-between p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-[.16em] text-white/70">
            <span>2KMINN / PORTFOLIO</span><span>{number}</span>
          </div>
          <span aria-hidden="true" className="self-center font-display text-[clamp(140px,27vw,370px)] leading-[.7] font-black tracking-[-.12em] text-white/15">{number}</span>
          <div className="flex items-end justify-between gap-4 border-t border-white/40 pt-5">
            <span className="text-base font-semibold text-white sm:text-xl">{label}</span>
            <span className="font-mono text-xs text-white/65">이미지 준비 중</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 border-t border-[#111]/20 py-10 sm:grid-cols-[minmax(180px,.55fr)_minmax(0,1fr)] sm:gap-10 sm:py-16">
      <div className="flex items-start gap-5">
        <span className="font-mono text-sm text-[#666]">{number}</span>
        <h2 className="text-[clamp(23px,2.7vw,38px)] leading-tight font-semibold tracking-[-.05em]">{title}</h2>
      </div>
      <p className="max-w-2xl text-base leading-8 text-[#454545] break-keep sm:text-lg sm:leading-9">{children}</p>
    </section>
  );
}

export default async function ProjectDetail({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const theme = themes[index % themes.length];
  const mediaStyle = {
    "--project-deep": theme.deep,
    "--project-soft": theme.soft,
  } as CSSProperties;

  return (
    <main style={mediaStyle} className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#0C0C0C]/95 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] items-center justify-between gap-5 py-4 md:w-[min(1200px,calc(100%-96px))] md:py-5">
          <Link href="/" className="text-sm font-bold tracking-tight">2kminn <span className="font-normal text-[#8DA0AD]">/ PORTFOLIO</span></Link>
          <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs tracking-[.1em] text-[#B6C7D2] transition-colors hover:text-white"><ArrowLeft aria-hidden="true" className="size-4" /> PROJECTS</Link>
        </div>
      </header>

      <div className="mx-auto w-[min(1200px,calc(100%-40px))] md:w-[min(1200px,calc(100%-96px))]">
        <section className="flex min-h-[min(680px,78svh)] flex-col justify-between py-14 sm:py-20" aria-labelledby="project-title">
          <div className="flex items-center justify-between gap-6 border-b border-white/20 pb-5 font-mono text-xs tracking-[.17em] text-[#92A6B5]">
            <span>SELECTED WORK / {number}</span><span>{number} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="py-20">
            <h1 id="project-title" className="hero-heading font-display max-w-5xl text-[clamp(54px,10vw,144px)] leading-[.94] font-black tracking-[-.07em] break-keep">{project.title}</h1>
            <p className="mt-10 max-w-2xl text-lg leading-8 text-[#ACBCC7] break-keep sm:text-[22px] sm:leading-10">{project.summary}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-5 font-mono text-xs tracking-[.12em] text-[#92A6B5]">
            <span>{project.period}</span>
            <span>아래로 스크롤 ↓</span>
          </div>
        </section>

        <ProjectMedia src={project.coverImage} alt={`${project.title} 대표 화면`} label="대표 화면" number={number} />
        <div className="grid gap-7 py-9 sm:grid-cols-3 sm:gap-10 sm:py-12">
          <div><span className="font-mono text-xs tracking-[.15em] text-[#8DA0AD]">01 / 기간</span><p className="mt-2 text-base">{project.period}</p></div>
          <div><span className="font-mono text-xs tracking-[.15em] text-[#8DA0AD]">02 / 역할</span><p className="mt-2 text-base">{project.role}</p></div>
          <div><span className="font-mono text-xs tracking-[.15em] text-[#8DA0AD]">03 / 기술</span><p className="mt-2 text-base leading-7">{project.technologies.join(" · ")}</p></div>
        </div>
      </div>

      <div className="relative z-10 mt-12 rounded-t-[36px] bg-[#F0F2F3] px-5 py-20 text-[#111] sm:rounded-t-[52px] sm:px-8 sm:py-28 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6 sm:mb-24">
            <div><p className="mb-5 font-mono text-xs tracking-[.2em] text-[#6B6B6B]">PROJECT STORY / {number}</p><h2 className="font-display text-[clamp(48px,8vw,112px)] leading-none font-black tracking-[-.07em]">프로젝트 기록</h2></div>
            <span className="font-mono text-xs text-[#666]">{number} / {String(projects.length).padStart(2, "0")}</span>
          </div>

          <DetailSection number="01" title="프로젝트 소개">{project.challenge}</DetailSection>
          <DetailSection number="02" title="구현 과정">{project.solution}</DetailSection>

          <div className="my-12 grid gap-4 sm:my-20 sm:grid-cols-2 sm:gap-5">
            <ProjectMedia src={project.screenImage} alt={`${project.title} 화면`} label="화면 캡처" number={`${number}.1`} compact />
            <ProjectMedia src={project.structureImage} alt={`${project.title} 구조도`} label="구조도" number={`${number}.2`} compact />
          </div>

          <DetailSection number="03" title="결과와 배운 점">{project.result}</DetailSection>
          <div className="mt-14 flex flex-wrap gap-3 sm:mt-20">
            {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#111] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#111] hover:text-white">GitHub <ArrowUpRight aria-hidden="true" className="size-4" /></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#111] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#111] hover:text-white">서비스 보기 <ArrowUpRight aria-hidden="true" className="size-4" /></a>}
          </div>
        </div>
      </div>

      <nav aria-label="프로젝트 탐색" className="px-5 py-16 sm:px-8 sm:py-24 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-white/20 pt-8 sm:grid-cols-2">
          <Link href={`/projects/${previous.slug}`} className="group flex min-w-0 flex-col items-start gap-3 text-left">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[.12em] text-[#92A6B5]"><ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" /> 이전 프로젝트</span>
            <span className="text-[clamp(23px,3vw,38px)] font-semibold tracking-[-.05em] break-keep group-hover:underline">{previous.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex min-w-0 flex-col items-start gap-3 sm:items-end sm:text-right">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[.12em] text-[#92A6B5]">다음 프로젝트 <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" /></span>
            <span className="text-[clamp(23px,3vw,38px)] font-semibold tracking-[-.05em] break-keep group-hover:underline">{next.title}</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
