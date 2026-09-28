import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} | 이경민` : "프로젝트를 찾을 수 없습니다", description: project?.summary };
}

export default async function ProjectDetail({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const details = [["문제", project.challenge], ["접근", project.solution], ["결과", project.result]] as const;

  return (
    <main className="mx-auto min-h-screen w-[min(960px,calc(100%-40px))] py-8 md:w-[min(960px,calc(100%-96px))] md:py-12">
      <Link href="/#projects" className="font-mono text-sm text-neutral-500 hover:text-black">← 프로젝트 목록</Link>
      <header className="mt-20 border-b border-black pb-12 md:mt-28">
        <p className="mb-7 font-mono text-xs tracking-wide text-neutral-500">PROJECT / DRAFT</p>
        <h1 className="text-[clamp(40px,6vw,76px)] leading-tight font-bold tracking-[-.07em]">{project.title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600 break-keep">{project.summary}</p>
      </header>
      <div className="grid gap-10 border-b border-neutral-300 py-8 text-sm sm:grid-cols-3">
        <div><span className="font-mono text-xs text-neutral-500">PERIOD</span><p className="mt-2">{project.period}</p></div>
        <div><span className="font-mono text-xs text-neutral-500">ROLE</span><p className="mt-2">{project.role}</p></div>
        <div><span className="font-mono text-xs text-neutral-500">STACK</span><p className="mt-2">{project.technologies.join(" · ")}</p></div>
      </div>
      <div className="py-12 md:py-20">
        {details.map(([label, value], index) => <section key={label} className="grid gap-6 border-t border-neutral-300 py-9 sm:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-sm text-neutral-500">0{index + 1} / {label}</h2><p className="max-w-2xl text-lg leading-9 break-keep">{value}</p>
        </section>)}
      </div>
      <Link href="/#projects" className="inline-block border-b border-black pb-1 text-sm">모든 프로젝트 보기 ↗</Link>
    </main>
  );
}
