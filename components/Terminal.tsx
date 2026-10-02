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

  return (
    <section className="terminal-screen bg-[#101010] text-white" aria-label="개발자 포트폴리오 터미널">
      <div className="mx-auto flex min-h-[100svh] w-[min(1200px,calc(100%-40px))] flex-col py-7 md:w-[min(1200px,calc(100%-96px))] md:py-10">
        <div className="flex items-center border-b border-neutral-700 pb-5">
          <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <p aria-live="polite" className="mb-6 font-mono text-sm text-neutral-400"><strong className="font-normal text-white">visitor@2kminn</strong> ~ % {typedCommand}{status === "command" && <span aria-hidden="true" className="terminal-caret ml-1 inline-block text-white">_</span>}</p>
          <div className="min-h-[clamp(112px,16vw,190px)]">
            <h1 id="hero-title" className={typedIntroduction ? "text-[clamp(43px,6vw,78px)] leading-[1.12] font-bold tracking-[-.075em]" : "sr-only"}>
              {typedIntroduction ? <>{firstLine}{typedIntroduction.includes("\n") && <br />}<span className="text-neutral-400">{secondLine}</span>{status !== "command" && <span aria-hidden="true" className="terminal-caret ml-1 inline-block text-white">_</span>}</> : "이경민 개발자 포트폴리오"}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
