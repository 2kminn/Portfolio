"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative z-20 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-24 pb-28 text-[#D7E2EA] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-14 text-center sm:mb-20" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-[#8DA0AD]">03 / SELECTED WORK</p>
          <h2 id="projects-title" className="hero-heading font-display text-[clamp(64px,12vw,160px)] leading-none font-black tracking-normal uppercase">Projects</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#8DA0AD] break-keep sm:text-base">프로젝트 이미지와 내용은 실제 작업 이력으로 교체할 수 있도록 초안으로 구성했습니다.</p>
        </FadeIn>
        <div ref={stackRef} className="project-stack relative pb-[12svh]">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} total={projects.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
