import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import GitHubArchive from "@/components/GitHubArchive";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import SiteHeader from "@/components/SiteHeader";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Terminal />
      <SiteHeader />

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

      <GitHubArchive />
      <ScrollReveal />

      <footer className="bg-[#111] text-white">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col justify-between gap-3 py-8 font-mono text-xs md:w-[min(1200px,calc(100%-96px))] md:flex-row">
          <span>© {new Date().getFullYear()} 이경민.</span><span className="text-neutral-500">포트폴리오 초안</span>
        </div>
      </footer>
    </>
  );
}
