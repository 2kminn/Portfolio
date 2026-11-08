"use client";

import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import UiIcon from "@/components/UiIcon";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const pageVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, rotate: direction > 0 ? 3 : -3, opacity: 0 }),
  center: { x: 0, rotate: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -220 : 220, rotate: direction > 0 ? -7 : 7, opacity: 0 }),
};
const GalleryContext = createContext<{ selectImage: (index: number) => void; labels: string[] } | null>(null);

export function ProjectImagePlaceholder({ label, number, compact = false, guide }: {
  label: string;
  number: string;
  compact?: boolean;
  guide?: string;
}) {
  return (
    <div className={`relative flex h-full min-h-[inherit] w-full flex-col justify-between ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10"}`}>
      <div className="ui-caption ui-muted flex items-center justify-between gap-4">
        <span>{profile.handle} / 포트폴리오</span><span>{number}</span>
      </div>
      <span aria-hidden="true" className={`self-center font-display leading-[.85] font-black tracking-[-.04em] text-black/10 ${compact ? "text-[clamp(90px,14vw,180px)]" : "text-[clamp(100px,23vw,300px)]"}`}>{number}</span>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t pt-5 pr-12 ui-divider">
        <span className="ui-label">{label}</span>
        <span className="ui-caption ui-muted">{guide ?? "이미지 준비 중"}</span>
      </div>
    </div>
  );
}

export function ProjectImageTrigger({ index, children, className, style }: {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const gallery = useContext(GalleryContext);
  if (!gallery) throw new Error("ProjectImageTrigger requires ProjectGallery");

  return (
    <Dialog.Trigger
      onClick={() => gallery.selectImage(index)}
      aria-label={`${gallery.labels[index]} 확대 보기`}
      style={style}
      className={`group relative min-h-11 min-w-11 cursor-zoom-in text-left ${className ?? ""}`}
    >
      {children}
      <span aria-hidden="true" className="ui-icon-button ui-surface-dark pointer-events-none absolute right-3 bottom-3 z-20">
        <UiIcon icon={Maximize2} />
      </span>
    </Dialog.Trigger>
  );
}

export default function ProjectGallery({ project, number, style, children }: {
  project: Project;
  number: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const hasGroupedScreens = !!project.galleryExtras?.length;
  const coverPage = { label: project.coverLabel ?? (hasGroupedScreens ? "관리자 CMS" : "대표 화면"), source: project.coverImage ? withBasePath(project.coverImage) : undefined, mobileSource: undefined as string | undefined };
  const screenPage = { label: project.screenLabel ?? (hasGroupedScreens ? "사용자 화면" : "화면 캡처"), source: project.screenImage ? withBasePath(project.screenImage) : undefined, mobileSource: undefined as string | undefined };
  const structurePage = { label: "구조도", source: project.structureImage ? withBasePath(project.structureImage) : undefined, mobileSource: project.structureMobileImage ? withBasePath(project.structureMobileImage) : undefined };
  const pages = hasGroupedScreens
    ? project.structureImage ? [screenPage, coverPage, structurePage] : [screenPage, coverPage]
    : [coverPage, screenPage, structurePage];
  const labels = pages.map((page) => page.label);
  const activePage = pages[activeIndex];
  const source = activePage.source;
  const isCollection = hasGroupedScreens && activeIndex === 0 && !!source;
  const collectionItems = source ? [
    { label: project.screenLabel ?? "홈", source },
    ...(project.galleryExtras?.map((item) => ({ label: item.label, source: withBasePath(item.image) })) ?? []),
  ] : [];
  const originalMobileSource = activePage.mobileSource ?? source;
  const landscapeCover = project.slug === "moduflow" && activeIndex === 1;
  const imageNumber = activeIndex === 0 ? number : `${number}.${activeIndex}`;
  const move = (step: number) => {
    setDirection(step);
    setActiveIndex((current) => (current + step + pages.length) % pages.length);
  };
  const selectPage = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <GalleryContext.Provider value={{ selectImage: setActiveIndex, labels }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Popup
            initialFocus={closeRef}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            className="notebook-viewer fixed inset-0 z-[101] flex flex-col overflow-hidden outline-none"
          >
            <div className="notebook-viewer-header">
              <div className="min-w-0">
                <p className="ui-caption ui-muted break-words">{project.title} / 프로젝트 자료</p>
                <Dialog.Title className="ui-title">{labels[activeIndex]}</Dialog.Title>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span aria-hidden="true" className="ui-caption ui-muted ui-numeric">{String(activeIndex + 1).padStart(2, "0")} / {String(labels.length).padStart(2, "0")}</span>
                <Dialog.Close ref={closeRef} aria-label="자료 보기 닫기" className="notebook-viewer-close"><UiIcon icon={X} /></Dialog.Close>
              </div>
            </div>
            <Dialog.Description className="sr-only">좌우 방향키, 화면의 버튼 또는 손가락으로 종이를 넘길 수 있습니다. Escape 키로 닫습니다.</Dialog.Description>

            <div
              className={`notebook-viewer-stage ${landscapeCover ? "notebook-viewer-stage-landscape" : ""} ${isCollection ? "notebook-viewer-stage-collection" : ""}`}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                touchStart.current = { x: touch.clientX, y: touch.clientY };
              }}
              onTouchEnd={(event) => {
                if (!touchStart.current) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - touchStart.current.x;
                const dy = touch.clientY - touchStart.current.y;
                touchStart.current = null;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
              }}
              onTouchCancel={() => { touchStart.current = null; }}
            >
              <button type="button" aria-label="이전 종이" onClick={() => move(-1)} className="notebook-viewer-arrow"><UiIcon icon={ChevronLeft} /></button>
              <div className="notebook-viewer-stack">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduceMotion ? 0 : .34, ease: [.22, 1, .36, 1] }}
                    className="notebook-viewer-page"
                    style={style}
                  >
                    <div className="notebook-viewer-page-heading">
                      <span>{project.title}</span>
                      <span>{labels[activeIndex]} / {String(activeIndex + 1).padStart(2, "0")}</span>
                    </div>
                    <div className={`notebook-viewer-media ${isCollection ? "notebook-viewer-media-collection" : ""}`}>
                      {isCollection ? (
                        <div className="notebook-viewer-collection" onTouchStart={(event) => event.stopPropagation()} onTouchEnd={(event) => event.stopPropagation()} onTouchCancel={(event) => event.stopPropagation()}>
                          {collectionItems.map((item) => (
                            <a key={item.label} href={item.source} target="_blank" rel="noopener noreferrer" className="notebook-viewer-collection-item" aria-label={`${project.title} ${item.label} 원본 보기`}>
                              <span className="notebook-viewer-collection-image">
                                <Image src={item.source} alt={`${project.title} ${item.label} 화면`} fill sizes="(max-width: 639px) 75vw, 300px" className="object-contain" />
                              </span>
                              <span className="notebook-viewer-collection-label">{item.label} <span aria-hidden="true">↗</span></span>
                            </a>
                          ))}
                        </div>
                      ) : source ? (
                        activePage.mobileSource ? (
                          <>
                            <Image src={activePage.mobileSource} alt={`${project.title} 모바일 구조도`} width={600} height={1010} sizes="(max-width: 640px) 100vw, 600px" className="sm:hidden" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            <Image src={source} alt={`${project.title} 구조도`} width={1200} height={620} sizes="(max-width: 768px) 100vw, 1200px" className="hidden sm:block" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          </>
                        ) : (
                          <Image key={source} src={source} alt={`${project.title} ${labels[activeIndex]}`} fill sizes="(max-width: 768px) 100vw, 1200px" className="object-contain" />
                        )
                      ) : (
                        <div className="project-detail-media h-full"><ProjectImagePlaceholder label={labels[activeIndex]} number={imageNumber} guide={activeIndex === 0 ? project.capturePlan?.[0]?.description : undefined} /></div>
                      )}
                    </div>
                    <div className="notebook-viewer-page-footer">
                      <span className="hidden sm:inline">PORTFOLIO / {project.title}</span>
                      {source && !isCollection && <span className="ml-auto inline-flex gap-3">
                        {originalMobileSource && <a href={originalMobileSource} target="_blank" rel="noopener noreferrer" className={originalMobileSource === source ? "" : "sm:hidden"}>원본 보기 ↗</a>}
                        {originalMobileSource !== source && <a href={source} target="_blank" rel="noopener noreferrer" className="hidden sm:inline">원본 보기 ↗</a>}
                      </span>}
                      {isCollection && <span className="ml-auto"><span className="sm:hidden">옆으로 밀어 보기 →</span><span className="hidden sm:inline">사진을 눌러 원본 보기 ↗</span></span>}
                      <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button type="button" aria-label="다음 종이" onClick={() => move(1)} className="notebook-viewer-arrow"><UiIcon icon={ChevronRight} /></button>
            </div>

            <div aria-live="polite" aria-atomic="true" className="sr-only">{labels[activeIndex]}, 이미지 {activeIndex + 1} / {labels.length}</div>
            <div role="group" aria-label="프로젝트 이미지 선택" className="notebook-viewer-index" style={{ gridTemplateColumns: `repeat(${pages.length}, minmax(0, 1fr))` }}>
              {labels.map((label, index) => (
                <button key={label} type="button" onClick={() => selectPage(index)} aria-pressed={activeIndex === index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{label}
                </button>
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </GalleryContext.Provider>
  );
}
