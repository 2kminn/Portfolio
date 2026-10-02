"use client";

import { useEffect, useState } from "react";

const command = "whoami";
const introduction = "안녕하세요.\n개발자 이경민입니다.";

export default function Terminal() {
  const [status, setStatus] = useState<"command" | "introduction" | "done">("command");
  const [typedCommand, setTypedCommand] = useState("");
  const [typedIntroduction, setTypedIntroduction] = useState("");

  useEffect(() => {
    const target = status === "command" ? command : introduction;
    const current = status === "command" ? typedCommand : typedIntroduction;
    const update = status === "command" ? setTypedCommand : setTypedIntroduction;
    const delay = status === "command" ? 85 : 66;

    if (current.length < target.length) {
      const timer = window.setTimeout(() => update(target.slice(0, current.length + 1)), delay);
      return () => window.clearTimeout(timer);
    }

    if (status === "done") return;
    const timer = window.setTimeout(() => {
      setStatus((currentStatus) => currentStatus === "command" ? "introduction" : "done");
    }, 180);
    return () => window.clearTimeout(timer);
  }, [status, typedCommand, typedIntroduction]);

  useEffect(() => {
    if (status !== "done") return;

    const timer = window.setTimeout(() => {
      setTypedCommand("");
      setTypedIntroduction("");
      setStatus("command");
    }, 10_000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const [firstLine, secondLine = ""] = typedIntroduction.split("\n");
  const beforeName = secondLine.slice(0, 4);
  const name = secondLine.slice(4, 7);
  const afterName = secondLine.slice(7);

  return (
    <section className="terminal-screen bg-[#0C0C0C] px-4 py-4 text-white sm:px-6 sm:py-6" aria-label="개발자 포트폴리오 터미널">
      <div className="relative mx-auto flex min-h-[calc(100svh-32px)] max-w-[1300px] flex-col overflow-hidden rounded-[32px] border border-[#D7E2EA]/35 bg-[#111316] px-5 py-5 shadow-[0_24px_90px_rgba(0,0,0,.35)] sm:min-h-[calc(100svh-48px)] sm:rounded-[48px] sm:px-10 sm:py-8 md:px-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_58%,rgba(154,178,204,.18),transparent_48%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[18%] h-[52%] w-px bg-gradient-to-b from-transparent via-[#BBCCD7]/50 to-transparent" />

        <div className="relative z-10 flex items-center border-b border-[#D7E2EA]/25 pb-5">
          <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center py-16 sm:py-20">
          <p aria-live="polite" className="mb-7 font-mono text-sm text-[#A5B5C1]"><strong className="font-normal text-white">visitor@2kminn</strong> ~ % {typedCommand}{status === "command" && <span aria-hidden="true" className="terminal-caret ml-1 inline-block text-white">_</span>}</p>
          <div className="min-h-[clamp(140px,18vw,240px)]">
            <h1 id="hero-title" className={typedIntroduction ? "font-display max-w-[1100px] text-[clamp(42px,6.5vw,96px)] leading-[1.1] font-black tracking-[-.075em] break-keep" : "sr-only"}>
              {typedIntroduction ? <>{firstLine}{typedIntroduction.includes("\n") && <br />}<span className="hero-heading">{beforeName}</span><span className="text-[#F5FAFD]">{name}</span><span className="hero-heading">{afterName}</span>{status !== "command" && <span aria-hidden="true" className="terminal-caret ml-1 inline-block text-white">_</span>}</> : "이경민 개발자 포트폴리오"}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
