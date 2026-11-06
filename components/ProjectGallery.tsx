"use client";

import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import UiIcon from "@/components/UiIcon";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { profile } from "@/data/profile";

const labels = ["대표 화면", "화면 캡처", "구조도"];
const GalleryContext = createContext<((index: number) => void) | null>(null);

export function ProjectImagePlaceholder({ label, number, compact = false }: {
  label: string;
  number: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative flex h-full min-h-[inherit] w-full flex-col justify-between ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10"}`}>
      <div className="ui-caption ui-muted flex items-center justify-between gap-4">
        <span>{profile.handle} / 포트폴리오</span><span>{number}</span>
      </div>
      <span aria-hidden="true" className={`self-center font-display leading-[.85] font-black tracking-[-.04em] text-black/10 ${compact ? "text-[clamp(90px,14vw,180px)]" : "text-[clamp(100px,23vw,300px)]"}`}>{number}</span>
      <div className="flex items-end justify-between gap-4 border-t pt-5 pr-12 ui-divider">
        <span className="ui-label">{label}</span>
        <span className="ui-caption ui-muted">이미지 준비 중</span>
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
  const selectImage = useContext(GalleryContext);
  if (!selectImage) throw new Error("ProjectImageTrigger requires ProjectGallery");

  return (
    <Dialog.Trigger
      onClick={() => selectImage(index)}
      aria-label={`${labels[index]} 확대 보기`}
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const sources = [project.coverImage, project.screenImage, project.structureImage];
  const source = sources[activeIndex];
  const imageNumber = activeIndex === 0 ? number : `${number}.${activeIndex}`;
  const move = (direction: number) => setActiveIndex((current) => (current + direction + labels.length) % labels.length);
  const controlClass = "ui-icon-button shrink-0";

  return (
    <GalleryContext.Provider value={setActiveIndex}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {children}
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none" />
          <Dialog.Popup
            style={style}
            initialFocus={closeRef}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            className="fixed top-1/2 left-1/2 z-[101] flex w-[calc(100%-24px)] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[24px] border shadow-2xl outline-none transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 sm:w-[calc(100%-64px)] sm:rounded-[32px] motion-reduce:transition-none ui-muted ui-gallery ui-surface-dark ui-divider"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="ui-caption ui-muted break-words">{project.title}</p>
                <Dialog.Title className="mt-1 ui-title">{labels[activeIndex]}</Dialog.Title>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span aria-hidden="true" className="ui-caption ui-muted ui-numeric">{activeIndex + 1} / {labels.length}</span>
                <Dialog.Close ref={closeRef} aria-label="이미지 확대 닫기" className={controlClass}><UiIcon icon={X} /></Dialog.Close>
              </div>
            </div>
            <Dialog.Description className="sr-only">좌우 방향키 또는 화면의 이전·다음 버튼으로 이미지를 넘길 수 있습니다. Escape 키로 닫습니다.</Dialog.Description>

            <div
              className="ui-gallery-media ui-divider relative shrink-0 border-y bg-[var(--ui-panel)]"
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
              {source ? (
                <Image key={source} src={source} alt={`${project.title} ${labels[activeIndex]}`} fill sizes="(max-width: 768px) 100vw, 1200px" className="object-contain" />
              ) : (
                <div className="project-detail-media h-full"><ProjectImagePlaceholder label={labels[activeIndex]} number={imageNumber} /></div>
              )}
              <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-5">
                <button type="button" aria-label="이전 이미지" onClick={() => move(-1)} className={`${controlClass} pointer-events-auto shadow-lg`}><UiIcon icon={ChevronLeft} /></button>
                <button type="button" aria-label="다음 이미지" onClick={() => move(1)} className={`${controlClass} pointer-events-auto shadow-lg`}><UiIcon icon={ChevronRight} /></button>
              </div>
            </div>

            <div aria-live="polite" aria-atomic="true" className="sr-only">{labels[activeIndex]}, 이미지 {activeIndex + 1} / {labels.length}</div>
            <div role="group" aria-label="프로젝트 이미지 선택" className="ui-gallery-tabs shrink-0">
              {labels.map((label, index) => (
                <button key={label} type="button" onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className="ui-button">
                  {label}
                </button>
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </GalleryContext.Provider>
  );
}
