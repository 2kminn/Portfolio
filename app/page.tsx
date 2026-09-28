import Link from "next/link";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";

const nav = [
  ["소개", "about"],
  ["자격사항", "certifications"],
  ["프로젝트", "projects"],
  ["기술 스택", "skills"],
  ["경력", "experience"],
] as const;

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-4 py-6 md:w-[min(1200px,calc(100%-96px))] md:flex-row md:items-center md:justify-between md:gap-8">
        <Link href="/" className="whitespace-nowrap text-sm font-bold tracking-tight">
          이경민 <span className="font-normal text-neutral-500">/ PORTFOLIO</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex gap-5 overflow-x-auto pb-1 text-[13px] font-medium whitespace-nowrap text-neutral-600 md:gap-8">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-black">{label}</a>)}
        </nav>
      </header>

      <Terminal />

      <main className="mx-auto w-[min(1200px,calc(100%-40px))] pt-8 md:w-[min(1200px,calc(100%-96px))]">
        <About />
        <Certifications />
        <section id="projects" className="section-layout" aria-labelledby="projects-title">
          <div className="section-kicker"><span>03</span> PROJECTS</div>
          <div>
            <h2 id="projects-title" className="section-title">프로젝트</h2>
            <p className="mb-7 text-sm leading-7 text-neutral-500">프로젝트 세부 내용은 실제 작업 이력으로 교체할 수 있도록 초안으로 구성했습니다.</p>
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
        <Skills />
        <Experience />
      </main>

      <footer className="bg-[#111] text-white">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col justify-between gap-3 py-8 font-mono text-xs md:w-[min(1200px,calc(100%-96px))] md:flex-row">
          <span>© {new Date().getFullYear()} 이경민.</span><span className="text-neutral-500">PORTFOLIO / DRAFT</span>
        </div>
      </footer>
    </>
  );
}
