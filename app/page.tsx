import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import GitHubArchive from "@/components/GitHubArchive";
import MarqueeSection from "@/components/MarqueeSection";
import ProjectsSection from "@/components/ProjectsSection";
import SiteHeader from "@/components/SiteHeader";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <>
      <Terminal />
      <SiteHeader />
      <main className="overflow-x-clip bg-[#0C0C0C]">
        <MarqueeSection />
        <About />
        <Skills />
        <ProjectsSection />
        <Experience />
        <Certifications />
        <GitHubArchive />
      </main>
      <footer className="bg-[#0C0C0C] text-[#8DA0AD]">
        <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col justify-between gap-3 py-8 font-mono text-xs md:w-[min(1200px,calc(100%-96px))] md:flex-row">
          <span>© {new Date().getFullYear()} 이경민.</span><span className="text-neutral-500">포트폴리오 초안</span>
        </div>
      </footer>
    </>
  );
}
