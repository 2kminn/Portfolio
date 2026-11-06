"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { Download } from "lucide-react";

const command = "whoami";
const rolePrefix = "개발자 ";
const introduction = `안녕하세요.\n${rolePrefix}${profile.name}입니다.`;

export default function Terminal() {
  const terminalRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const [status, setStatus] = useState<"command" | "introduction" | "done">("command");
  const [typedCommand, setTypedCommand] = useState("");
  const [typedIntroduction, setTypedIntroduction] = useState("");

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal || reduceMotion) return;
    if (!window.IntersectionObserver) {
      const frame = window.requestAnimationFrame(() => setIsInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setIsInView(false);
        return;
      }

      setTypedCommand("");
      setTypedIntroduction("");
      setStatus("command");
      setIsInView(true);
    });
    observer.observe(terminal);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !isInView || status === "done") return;

    const target = status === "command" ? command : introduction;
    const current = status === "command" ? typedCommand : typedIntroduction;
    const update = status === "command" ? setTypedCommand : setTypedIntroduction;
    const delay = status === "command" ? 85 : 66;

    if (current.length < target.length) {
      const timer = window.setTimeout(() => update(target.slice(0, current.length + 1)), delay);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setStatus((currentStatus) => currentStatus === "command" ? "introduction" : "done");
    }, 180);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, isInView, status, typedCommand, typedIntroduction]);

  const displayedIntroduction = reduceMotion ? introduction : typedIntroduction;
  const [firstLine, secondLine = ""] = displayedIntroduction.split("\n");
  const beforeName = secondLine.slice(0, rolePrefix.length);
  const name = secondLine.slice(rolePrefix.length, rolePrefix.length + profile.name.length);
  const afterName = secondLine.slice(rolePrefix.length + profile.name.length);
  const showCommandCaret = !reduceMotion && status === "command";
  const showIntroductionCaret = !reduceMotion && status !== "command";

  return (
    <section ref={terminalRef} id="top" tabIndex={-1} className="terminal-screen px-5 py-4 outline-none ui-surface-dark" aria-label="개발자 포트폴리오 터미널">
      <div className="relative mx-auto flex min-h-[clamp(340px,50svh,480px)] max-w-[1100px] flex-col rounded-[10px] border px-8 py-5 sm:px-10 sm:py-8 md:px-14 ui-card ui-container ui-divider">

        <div className="relative z-10 flex items-center justify-between gap-4 border-b pb-5 ui-divider">
          <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
          <a href={profile.resumeUrl} download={profile.name + "_이력서.pdf"} className="terminal-resume" aria-label={profile.name + " 이력서 PDF 다운로드"}>
            <Download size={15} aria-hidden="true" />
            <span>이력서 다운로드</span>
            <small>PDF</small>
          </a>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
          <p aria-hidden="true" className="ui-label ui-muted mb-6 font-mono"><strong>visitor@{profile.handle}</strong> ~ % {reduceMotion ? command : typedCommand}{showCommandCaret && <span className="terminal-caret ml-1 inline-block">_</span>}</p>
          <div className="min-h-[clamp(120px,17vw,190px)]">
            <h1 id="hero-title" className="max-w-[1100px] break-keep ui-display">
              <span className="sr-only">{introduction}</span>
              <span aria-hidden="true">{firstLine}{displayedIntroduction.includes("\n") && <br />}{beforeName}{name}{afterName}{showIntroductionCaret && <span className="terminal-caret ml-1 inline-block">_</span>}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
