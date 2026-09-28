import Link from "next/link";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";

const nav = [
  ["/about", "about"],
  ["/skills", "skills"],
  ["/projects", "projects"],
  ["/experience", "experience"],
  ["/certifications", "certifications"],
] as const;

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-4 py-5 md:w-[min(1200px,calc(100%-96px))] md:flex-row md:items-center md:justify-between md:gap-8">
          <Link href="/" className="whitespace-nowrap text-sm font-bold tracking-tight">
            GYEONGMIN LEE <span className="font-normal text-neutral-500">/ PORTFOLIO</span>
          </Link>
          <nav aria-label="Sections" className="flex gap-5 overflow-x-auto pb-1 font-mono text-[13px] font-medium whitespace-nowrap text-neutral-600 md:gap-8">
            {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-black">{label}</a>)}
          </nav>
        </div>
      </header>

      <Terminal />

      <main className="mx-auto w-[min(1200px,calc(100%-40px))] pt-8 md:w-[min(1200px,calc(100%-96px))]">
        <About />
        <Skills />
        <section id="projects" className="section-layout" aria-labelledby="projects-title">
          <div>
            <h2 id="projects-title" className="section-title">Projects</h2>
            <p className="mb-7 text-sm leading-7 text-neutral-500">Project details are draft placeholders until the real work is added.</p>
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
        <Experience />
        <Certifications />
      </main>

      <footer className="bg-[#111] text-white">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col justify-between gap-3 py-8 font-mono text-xs md:w-[min(1200px,calc(100%-96px))] md:flex-row">
          <span>© {new Date().getFullYear()} Gyeongmin Lee.</span><span className="text-neutral-500">PORTFOLIO / DRAFT</span>
        </div>
      </footer>
    </>
  );
}
