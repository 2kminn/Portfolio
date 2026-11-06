import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import GitHubArchive from "@/components/GitHubArchive";
import ProjectsSection from "@/components/ProjectsSection";
import SiteHeader from "@/components/SiteHeader";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Terminal />
      <SiteHeader />
      <BackToTop />
      <main className="overflow-x-clip ui-surface-dark">
        <About />
        <Skills />
        <ProjectsSection />
        <Experience />
        <Certifications />
        <GitHubArchive />
      </main>
      <footer className="cli-footer">
        <div className="cli-container">
          <span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">cd ~ <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
