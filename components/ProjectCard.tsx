import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="record">
      <div className="record-label">{project.period}</div>
      <div>
        <h3><Link href={`/projects/${project.slug}`} className="underline-offset-4 hover:underline">{project.title} <span aria-hidden="true" className="text-base">↗</span></Link></h3>
        <p>{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-x-3 font-mono text-xs text-neutral-500"><span>{project.role}</span><span>·</span><span>{project.technologies.join(" · ")}</span></div>
      </div>
    </article>
  );
}
