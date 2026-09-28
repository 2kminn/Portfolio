"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

const files = [
  { name: "about.md", id: "about", preview: "소개와 기본 정보" },
  { name: "skills.md", id: "skills", preview: "프론트엔드와 백엔드 기술 스택" },
  { name: "projects.md", id: "projects", preview: "프로젝트 목록" },
  { name: "experience.md", id: "experience", preview: "경력" },
  { name: "certifications.md", id: "certifications", preview: "자격사항 5개" },
  { name: "github.url", id: "github", preview: "github.com/2kminn" },
] as const;

type FileEntry = (typeof files)[number];
type Output =
  | { command: string; kind: "help" | "ls" | "whoami" }
  | { command: string; kind: "cat"; file: FileEntry }
  | { command: string; kind: "message"; text: string };

export default function Terminal() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [outputs]);

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;

    setHistory((previous) => [...previous, command].slice(-30));
    setHistoryIndex(-1);
    setInput("");

    const [verb, ...arguments_] = command.toLowerCase().split(/\s+/);
    const argument = arguments_.join(" ").replace(/^\.\//, "").replace(/^\//, "");
    let result: Output;

    if (verb === "clear" && !argument) {
      setOutputs([]);
      return;
    }
    if (verb === "help" && !argument) {
      result = { command, kind: "help" };
    } else if (verb === "ls" && !argument) {
      result = { command, kind: "ls" };
    } else if (verb === "whoami" && !argument) {
      result = { command, kind: "whoami" };
    } else if (verb === "cat") {
      const file = files.find((item) => item.name === argument);
      result = file
        ? { command, kind: "cat", file }
        : { command, kind: "message", text: argument ? `파일을 찾을 수 없습니다: ${argument}` : "사용법: cat <파일명>" };
    } else if (verb === "open") {
      const file = files.find((item) => item.id === argument || item.name === argument);
      if (file && document.getElementById(file.id)) {
        window.history.replaceState(null, "", `#${file.id}`);
        document.getElementById(file.id)?.scrollIntoView({ behavior: "smooth" });
        result = { command, kind: "message", text: `/${file.id} 섹션으로 이동합니다.` };
      } else {
        result = { command, kind: "message", text: argument ? `경로를 찾을 수 없습니다: ${argument}` : "사용법: open /섹션명" };
      }
    } else {
      result = { command, kind: "message", text: "알 수 없는 명령어입니다. help를 입력해 보세요." };
    }

    setOutputs((previous) => [...previous, result].slice(-12));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next < history.length ? next : -1);
      setInput(next < history.length ? history[next] : "");
    }
  }

  return (
    <section className="bg-[#101010] text-white" aria-labelledby="hero-title">
      <div className="mx-auto flex min-h-[510px] w-[min(1200px,calc(100%-40px))] flex-col py-7 md:min-h-[540px] md:w-[min(1200px,calc(100%-96px))] md:py-10">
        <div className="flex items-center border-b border-neutral-700 pb-5">
          <span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <p className="mb-6 font-mono text-sm text-neutral-400"><strong className="font-normal text-white">visitor@2kminn</strong> ~ % whoami</p>
          <h1 id="hero-title" className="text-[clamp(43px,6vw,78px)] leading-[1.12] font-bold tracking-[-.075em]">안녕하세요.<br /><span className="text-neutral-400">개발자 이경민입니다.</span></h1>

          <div className="mt-9 max-w-3xl border-t border-neutral-700 pt-5 font-mono text-[13px] leading-6 text-neutral-300">
            {outputs.length > 0 && (
              <div ref={outputRef} tabIndex={0} aria-label="터미널 출력" aria-live="polite" className="mb-5 max-h-40 space-y-4 overflow-y-auto pr-2">
                {outputs.map((output, index) => (
                  <div key={`${output.command}-${index}`}>
                    <p className="text-neutral-500">~ % {output.command}</p>
                    {output.kind === "help" && <p className="whitespace-pre-line">{"ls  파일 목록 보기\ncat <파일명>  파일 미리보기\nopen /섹션명  해당 섹션으로 이동\nwhoami  이름 보기\nclear  화면 지우기"}</p>}
                    {output.kind === "ls" && <div className="mt-1 grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3">{files.map((file) => <button key={file.name} type="button" onClick={() => runCommand(`cat ${file.name}`)} className="w-fit text-left text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{file.name}</button>)}</div>}
                    {output.kind === "whoami" && <p>이경민 · 개발자</p>}
                    {output.kind === "cat" && <div><p>{output.file.preview}</p><button type="button" onClick={() => runCommand(`open /${output.file.id}`)} className="text-neutral-400 underline decoration-neutral-600 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">open /{output.file.id} ↗</button></div>}
                    {output.kind === "message" && <p>{output.text}</p>}
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-transparent pb-1 focus-within:border-neutral-500">
              <label htmlFor="terminal-command" className="shrink-0 text-neutral-400"><span className="text-white">visitor@2kminn</span> ~ %</label>
              <input id="terminal-command" type="text" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="터미널 명령어" placeholder="ls 또는 help 입력 후 Enter" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-neutral-400" />
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
