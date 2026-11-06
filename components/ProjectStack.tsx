"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <div ref={stackRef} className="project-stack relative pb-[12svh]">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} total={projects.length} progress={scrollYProgress} />)}
    </div>
  );
}
