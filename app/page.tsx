import Link from "next/link";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import ProjectCard from "@/components/ProjectCard";
import SectionNav from "@/components/SectionNav";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-3 py-4 md:w-[min(1200px,calc(100%-96px))] md:flex-row md:items-center md:justify-between md:gap-8 md:py-5">
          <Link href="/" className="whitespace-nowrap text-sm font-bold tracking-tight">
            2kminn <span className="font-normal text-neutral-500">/ PORTFOLIO</span>
          </Link>
          <SectionNav />
        </div>
      </header>

      <Terminal />

      <main className="mx-auto w-[min(1200px,calc(100%-40px))] pt-8 md:w-[min(1200px,calc(100%-96px))]">
        <About />
        <Skills />
        <section id="projects" className="section-layout" aria-labelledby="projects-title">
          <div>
            <h2 id="projects-title" className="section-title">프로젝트</h2>
            <p className="mb-7 text-sm leading-7 text-neutral-500">프로젝트 내용은 실제 작업 이력으로 교체할 수 있도록 초안으로 구성했습니다.</p>
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
        <Experience />
        <Certifications />
      </main>

      <footer className="bg-[#111] text-white">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col justify-between gap-3 py-8 font-mono text-xs md:w-[min(1200px,calc(100%-96px))] md:flex-row">
          <span>© {new Date().getFullYear()} 이경민.</span><span className="text-neutral-500">포트폴리오 초안</span>
        </div>
      </footer>
    </>
  );
}
