"use client";

import { createContext, useContext, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/data/projects";

const labels = ["대표 화면", "화면 캡처", "구조도"];
const GalleryContext = createContext<((index: number) => void) | null>(null);

export function ProjectImagePlaceholder({ label, number, compact = false }: {
  label: string;
  number: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative flex h-full min-h-[inherit] w-full flex-col justify-between ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10"}`}>
      <div className="flex items-center justify-between gap-4 font-mono text-xs tracking-[.16em] text-white/70">
        <span>2KMINN / PORTFOLIO</span><span>{number}</span>
      </div>
      <span aria-hidden="true" className={`self-center font-display leading-[.85] font-black tracking-[-.04em] text-white/15 ${compact ? "text-[clamp(90px,14vw,180px)]" : "text-[clamp(100px,23vw,300px)]"}`}>{number}</span>
      <div className="flex items-end justify-between gap-4 border-t border-white/40 pt-5 pr-12">
        <span className="text-base font-semibold text-white sm:text-xl">{label}</span>
        <span className="font-mono text-xs text-white/65">이미지 준비 중</span>
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
      className={`group relative cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] ${className ?? ""}`}
    >
      {children}
      <span aria-hidden="true" className="absolute right-3 bottom-3 z-20 flex size-10 items-center justify-center rounded-full border border-white/25 bg-[#0C0C0C]/70 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#111] sm:right-4 sm:bottom-4">
        <Maximize2 className="size-4" />
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
  const controlClass = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#151A20] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA] hover:text-[#111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

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
            className="fixed top-1/2 left-1/2 z-[101] flex w-[calc(100%-24px)] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[24px] border border-white/20 bg-[#0C0C0C] text-[#D7E2EA] shadow-2xl outline-none transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 sm:w-[calc(100%-64px)] sm:rounded-[32px] motion-reduce:transition-none"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="truncate text-xs text-[#8DA0AD] sm:text-sm">{project.title}</p>
                <Dialog.Title className="mt-1 text-base font-semibold sm:text-lg">{labels[activeIndex]}</Dialog.Title>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span aria-hidden="true" className="font-mono text-sm text-[#8DA0AD]">{String(activeIndex + 1).padStart(2, "0")} / 03</span>
                <Dialog.Close ref={closeRef} aria-label="이미지 확대 닫기" className={controlClass}><X className="size-5" /></Dialog.Close>
              </div>
            </div>
            <Dialog.Description className="sr-only">좌우 방향키 또는 화면의 이전·다음 버튼으로 이미지를 넘길 수 있습니다. Escape 키로 닫습니다.</Dialog.Description>

            <div
              className="relative h-[min(600px,60dvh)] border-y border-white/15 bg-[#090B0D]"
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
                <button type="button" aria-label="이전 이미지" onClick={() => move(-1)} className={`${controlClass} pointer-events-auto shadow-lg`}><ChevronLeft className="size-5" /></button>
                <button type="button" aria-label="다음 이미지" onClick={() => move(1)} className={`${controlClass} pointer-events-auto shadow-lg`}><ChevronRight className="size-5" /></button>
              </div>
            </div>

            <div aria-live="polite" aria-atomic="true" className="sr-only">{labels[activeIndex]}, 이미지 {activeIndex + 1} / {labels.length}</div>
            <div role="group" aria-label="프로젝트 이미지 선택" className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-5">
              {labels.map((label, index) => (
                <button key={label} type="button" onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className={`min-h-11 rounded-xl border px-2 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 ${activeIndex === index ? "border-[#D7E2EA] bg-[#D7E2EA] text-[#111]" : "border-white/15 text-[#8DA0AD] hover:border-white/40 hover:text-white"}`}>
                  <span className="mr-2 hidden font-mono sm:inline">0{index + 1}</span>{label}
                </button>
              ))}
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </GalleryContext.Provider>
  );
}
