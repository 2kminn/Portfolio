import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="record group -mx-3 rounded-sm px-3 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50">
      <div className="record-label">{project.period}</div>
      <div>
        <h3>{project.title} <span aria-hidden="true" className="inline-block text-base transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></h3>
        <p>{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-x-3 font-mono text-xs text-neutral-500"><span>{project.role}</span><span>·</span><span>{project.technologies.join(" · ")}</span></div>
      </div>
    </Link>
  );
}
