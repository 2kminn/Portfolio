import Image from "next/image";
import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/base-path";

export default function ProjectScreensPreview({ project }: { project: Project }) {
  const screens = [
    ...(project.screenImage ? [{ label: "홈", image: project.screenImage }] : []),
    ...(project.galleryExtras ?? []),
  ];

  return (
    <div className="project-screens-preview" aria-hidden="true">
      {screens.map((screen) => (
        <span key={screen.image} className="project-screens-preview-frame">
          <Image
            src={withBasePath(screen.image)}
            alt=""
            fill
            sizes="(max-width: 639px) 30vw, (max-width: 1023px) 25vw, 260px"
            className="object-contain"
          />
        </span>
      ))}
    </div>
  );
}
