import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { resolveSocialImageUrl } from "@/lib/metadata";
import { withBasePath } from "@/lib/base-path";
import ProjectGallery, { ProjectImagePlaceholder, ProjectImageTrigger } from "@/components/ProjectGallery";
import SectionHeading from "@/components/SectionHeading";
import UiIcon from "@/components/UiIcon";

type Props = { params: Promise<{ slug: string }> };

const themes = [
  { deep: "#eae5db", soft: "#f8f5ee" },
  { deep: "#e6e1d7", soft: "#fffefa" },
  { deep: "#ede9df", soft: "#f7f4ec" },
];

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };

  const title = `${project.title} | ${profile.name}`;
  const imageUrl = resolveSocialImageUrl(project.coverImage);
  const images = imageUrl
    ? [{ url: imageUrl, alt: `${project.title} 대표 화면` }]
    : undefined;

  return {
    title,
    description: project.summary,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: `${profile.name} | 개발자 포트폴리오`,
      title,
      description: project.summary,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description: project.summary,
      images,
    },
  };
}

function ProjectMedia({ src, mobileSrc, alt, label, number, index, compact = false, fit = "cover", guide }: {
  src?: string;
  mobileSrc?: string;
  alt: string;
  label: string;
  number: string;
  index: number;
  compact?: boolean;
  fit?: "cover" | "contain";
  guide?: string;
}) {
  return (
    <ProjectImageTrigger index={index} className={`project-detail-media ui-detail-media relative flex w-full overflow-hidden ${compact ? "ui-detail-media-compact" : ""} ${fit === "contain" ? "aspect-video bg-white" : ""}`}>
      {src ? (
        mobileSrc ? (
          <>
            <Image src={withBasePath(mobileSrc)} alt={alt} fill className="object-contain p-2 sm:hidden" sizes="(max-width: 560px) 100vw, 600px" />
            <Image src={withBasePath(src)} alt={alt} fill className="hidden object-contain p-3 sm:block sm:p-6" sizes="(max-width: 768px) 100vw, 1200px" />
          </>
        ) : (
          <Image src={withBasePath(src)} alt={alt} fill className={fit === "contain" ? "object-contain" : "object-cover"} sizes="(max-width: 768px) 100vw, 1200px" />
        )
      ) : (
        <ProjectImagePlaceholder label={label} number={number} compact={compact} guide={guide} />
      )}
    </ProjectImageTrigger>
  );
}

function DetailSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="ui-detail-section">
      <div className="ui-detail-section-heading">
        <span className="ui-label ui-muted ui-numeric">{number}</span>
        <h3 className="ui-title">{title}</h3>
      </div>
      <p className="ui-body">{children}</p>
    </section>
  );
}

export default async function ProjectDetail({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const theme = themes[index % themes.length];
  const mediaStyle = {
    "--project-deep": theme.deep,
    "--project-soft": theme.soft,
  } as CSSProperties;

  return (
    <ProjectGallery project={project} number={number} style={mediaStyle}>
    <main style={mediaStyle} className="ui-surface-dark min-h-screen">
      <header className="ui-surface-dark ui-divider sticky top-0 z-40 border-b pt-[env(safe-area-inset-top)]">
        <div className="ui-container flex items-center justify-between gap-4 py-2">
          <Link href="/" className="ui-touch-link ui-label">{profile.handle} <span className="ui-muted ml-2 hidden sm:inline">/ 포트폴리오</span></Link>
          <Link href="/#projects" className="ui-button mr-[7.75rem] sm:mr-0" aria-label="프로젝트 목록으로"><UiIcon icon={ArrowLeft} size="sm" /><span className="hidden sm:inline">프로젝트</span></Link>
        </div>
      </header>

      <div className="ui-container">
        <section className="py-8" aria-labelledby="project-title">
          <div className="ui-divider ui-label ui-muted flex items-center justify-between gap-4 border-b pb-4">
            <span>프로젝트</span><span className="ui-numeric">{index + 1} / {projects.length}</span>
          </div>
          <div className="py-8">
            <h1 id="project-title" className="ui-display">{project.title}</h1>
            <p className="ui-body mt-4">{project.summary}</p>
          </div>
          <div className="ui-divider ui-label ui-muted flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <span>{project.period}</span>
          </div>
        </section>

        <ProjectMedia src={project.coverImage} alt={`${project.title} 대표 화면`} label="대표 화면" number={number} index={0} fit={project.slug === "moduflow" ? "contain" : "cover"} guide={project.capturePlan?.[0]?.description} />
        <dl className="grid gap-6 py-8">
          <div><dt className="ui-label ui-muted">기간</dt><dd className="ui-body mt-2">{project.period}</dd></div>
          <div><dt className="ui-label ui-muted">역할</dt><dd className="ui-body mt-2">{project.role}</dd></div>
          <div><dt className="ui-label ui-muted">기술</dt><dd className="ui-body mt-2">{project.technologies.join(" · ")}</dd></div>
        </dl>
      </div>

      <div className="ui-section ui-surface-light">
        <div className="ui-container">
          <SectionHeading id="project-story-title" title="프로젝트 기록" />

          <DetailSection number="01" title="프로젝트 소개">{project.challenge}</DetailSection>
          <DetailSection number="02" title="구현 과정">{project.solution}</DetailSection>

          {project.contributions && (
            <section className="moduflow-contributions" aria-labelledby="contributions-title">
              <h3 id="contributions-title" className="ui-title">담당한 일</h3>
              <div className="moduflow-contribution-grid">
                {project.contributions.map((item) => (
                  <div key={item.title} className="moduflow-contribution">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.capturePlan ? (
            <section className="moduflow-captures" aria-labelledby="captures-title">
              <div className="moduflow-section-heading">
                <h3 id="captures-title" className="ui-title">실제 화면</h3>
                <p className="ui-body">데모 계정에서 주요 흐름을 실행해 촬영했습니다. 서버와 자세 인식 기능은 연결되지 않은 화면입니다.</p>
              </div>
              <div className="moduflow-capture-grid">
                {project.capturePlan.map((item, captureIndex) => (
                  <figure key={item.title} className={`moduflow-capture moduflow-capture-${item.format}`}>
                    <div className={`moduflow-capture-frame ${item.image ? "has-image" : ""}`} aria-label={item.image ? `${item.title} 화면 캡처` : `${item.title} 화면 캡처 예정`}>
                      {item.image ? (
                        <a href={withBasePath(item.image)} target="_blank" rel="noopener noreferrer" className="relative block h-full w-full cursor-zoom-in" aria-label={`${item.title} 원본 화면 보기`}>
                          <Image src={withBasePath(item.image)} alt={`${project.title} ${item.title} 화면`} fill className="object-contain" sizes={item.format === "mobile" ? "(max-width: 639px) 100vw, 340px" : "(max-width: 768px) 100vw, 672px"} />
                        </a>
                      ) : (
                        <>
                          <span className="moduflow-capture-number">{String(captureIndex + 1).padStart(2, "0")}</span>
                          <span className="moduflow-capture-icon" aria-hidden="true">{item.format === "mobile" ? "▯" : "▱"}</span>
                          <span className="moduflow-capture-status">화면 캡처 위치</span>
                        </>
                      )}
                    </div>
                    <figcaption>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : (
            <div className="my-8 grid gap-4">
              <ProjectMedia src={project.screenImage} alt={`${project.title} 화면`} label="화면 캡처" number={`${number}.1`} index={1} compact />
              <ProjectMedia src={project.structureImage} alt={`${project.title} 구조도`} label="구조도" number={`${number}.2`} index={2} compact />
            </div>
          )}

          {project.capturePlan && project.structureImage && (
            <section className="moduflow-architecture" aria-labelledby="architecture-title">
              <div className="moduflow-section-heading">
                <h3 id="architecture-title" className="ui-title">시스템 구성</h3>
                <p className="ui-body">{project.structureCaption}</p>
              </div>
              <ProjectMedia src={project.structureImage} mobileSrc={project.structureMobileImage} alt={project.structureCaption ?? `${project.title} 시스템 구성도`} label="시스템 구성도" number={`${number}.2`} index={2} compact />
            </section>
          )}

          <DetailSection number="03" title="결과와 배운 점">{project.result}</DetailSection>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="ui-button">GitHub <UiIcon icon={ArrowUpRight} size="sm" /></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ui-button ui-button-primary">서비스 보기 <UiIcon icon={ArrowUpRight} size="sm" /></a>}
          </div>
        </div>
      </div>

      <nav aria-label="프로젝트 탐색" className="ui-section ui-surface-dark">
        <div className="ui-container ui-divider grid gap-8 border-t pt-8">
          <Link href={`/projects/${previous.slug}`} className="group flex min-w-0 flex-col items-start gap-3 text-left">
            <span className="ui-label ui-muted inline-flex items-center gap-2"><UiIcon icon={ArrowLeft} size="sm" /> 이전 프로젝트</span>
            <span className="ui-title group-hover:underline">{previous.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex min-w-0 flex-col items-start gap-3">
            <span className="ui-label ui-muted inline-flex items-center gap-2">다음 프로젝트 <UiIcon icon={ArrowRight} size="sm" /></span>
            <span className="ui-title group-hover:underline">{next.title}</span>
          </Link>
        </div>
      </nav>
    </main>
    </ProjectGallery>
  );
}
