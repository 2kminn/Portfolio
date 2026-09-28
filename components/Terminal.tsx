"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

const sections = [
  { id: "about", alias: "about.md", preview: "소개와 기본 정보" },
  { id: "skills", alias: "skills.md", preview: "프론트엔드와 백엔드 기술 스택" },
  { id: "projects", alias: "projects.md", preview: "프로젝트 목록" },
  { id: "experience", alias: "experience.md", preview: "경력" },
  { id: "certifications", alias: "certifications.md", preview: "자격사항 5개" },
  { id: "github", alias: "github.url", preview: "github.com/2kminn" },
] as const;

const commands = ["help", "ls", "cd", "pwd", "cat", "open", "tree", "whoami", "clear"];

type Section = (typeof sections)[number];
type Node = { path: string; name: string; kind: "directory" | "file"; section?: Section };
type Output = { command: string; at: string } & (
  | { kind: "help" | "empty" }
  | { kind: "ls"; entries: Node[] }
  | { kind: "cat"; node: Node }
  | { kind: "message"; text: string }
  | { kind: "suggestions"; options: string[] }
);

function resolvePath(value: string, cwd: string) {
  const path = value === "~" ? "/" : value.startsWith("~/") ? value.slice(1) : value;
  const parts = path.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  for (const part of path.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return `/${parts.join("/")}`;
}

function getNode(path: string): Node | null {
  if (path === "/") return { path, name: "/", kind: "directory" };
  if (path === "/README.md") return { path, name: "README.md", kind: "file" };
  for (const section of sections) {
    if (path === `/${section.id}`) return { path, name: section.id, kind: "directory", section };
    if (path === `/${section.id}/README.md`) return { path, name: "README.md", kind: "file", section };
    if (path === `/${section.alias}`) return { path, name: section.alias, kind: "file", section };
  }
  return null;
}

function listDirectory(path: string): Node[] {
  if (path === "/") {
    return [
      ...sections.map((section): Node => ({ path: `/${section.id}`, name: section.id, kind: "directory", section })),
      { path: "/README.md", name: "README.md", kind: "file" },
    ];
  }
  const section = sections.find((item) => path === `/${item.id}`);
  return section ? [{ path: `/${section.id}/README.md`, name: "README.md", kind: "file", section }] : [];
}

function sharedPrefix(values: string[]) {
  return values.reduce((prefix, value) => {
    let length = 0;
    while (length < prefix.length && prefix[length] === value[length]) length++;
    return prefix.slice(0, length);
  });
}

export default function Terminal() {
  const [cwd, setCwd] = useState("/");
  const [previousCwd, setPreviousCwd] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draftRef = useRef("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [outputs]);

  function append(output: Output) {
    setOutputs((previous) => [...previous, output].slice(-16));
  }

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;

    setHistory((previous) => [...previous, command].slice(-30));
    setHistoryIndex(-1);
    setInput("");
    draftRef.current = "";

    const [verb, ...args] = command.split(/\s+/);
    const action = verb.toLowerCase();
    const argument = args[0];
    const at = cwd;
    const message = (text: string): Output => ({ command, at, kind: "message", text });

    if (action === "clear" && args.length === 0) {
      setOutputs([]);
      return;
    }
    if (action === "help" && args.length === 0) {
      append({ command, at, kind: "help" });
      return;
    }
    if (action === "whoami" && args.length === 0) {
      append(message("이경민 · 개발자"));
      return;
    }
    if (action === "pwd" && args.length === 0) {
      append(message(cwd));
      return;
    }
    if (action === "cd") {
      if (args.length > 1) return append(message("사용법: cd [경로]"));
      if (argument === "-") {
        if (!previousCwd) return append(message("이전 경로가 없습니다."));
        setPreviousCwd(cwd);
        setCwd(previousCwd);
        append(message(previousCwd));
        return;
      }
      const path = resolvePath(argument ?? "~", cwd);
      const node = getNode(path);
      if (!node) return append(message(`경로를 찾을 수 없습니다: ${argument}`));
      if (node.kind !== "directory") return append(message(`디렉터리가 아닙니다: ${argument}`));
      if (path !== cwd) setPreviousCwd(cwd);
      setCwd(path);
      append({ command, at, kind: "empty" });
      return;
    }
    if (action === "ls") {
      if (args.length > 1) return append(message("사용법: ls [경로]"));
      const node = getNode(resolvePath(argument ?? ".", cwd));
      if (!node) return append(message(`경로를 찾을 수 없습니다: ${argument}`));
      append({ command, at, kind: "ls", entries: node.kind === "file" ? [node] : listDirectory(node.path) });
      return;
    }
    if (action === "cat") {
      if (args.length !== 1) return append(message("사용법: cat <파일명>"));
      const node = getNode(resolvePath(argument, cwd));
      if (!node) return append(message(`파일을 찾을 수 없습니다: ${argument}`));
      if (node.kind !== "file") return append(message(`디렉터리입니다: ${argument}`));
      append({ command, at, kind: "cat", node });
      return;
    }
    if (action === "open") {
      if (args.length !== 1) return append(message("사용법: open <경로>"));
      const node = getNode(resolvePath(argument, cwd));
      if (!node) return append(message(`경로를 찾을 수 없습니다: ${argument}`));
      if (!node.section) return append(message("이 경로에는 연결된 섹션이 없습니다."));
      const target = document.getElementById(node.section.id);
      if (!target) return append(message("섹션을 찾을 수 없습니다."));
      window.history.replaceState(null, "", `#${node.section.id}`);
      target.scrollIntoView({ behavior: "smooth" });
      append(message(`/${node.section.id} 섹션으로 이동합니다.`));
      return;
    }
    if (action === "tree") {
      if (args.length > 1) return append(message("사용법: tree [경로]"));
      const node = getNode(resolvePath(argument ?? ".", cwd));
      if (!node) return append(message(`경로를 찾을 수 없습니다: ${argument}`));
      const text = node.kind === "file"
        ? node.name
        : node.path === "/"
          ? `/\n├── README.md\n${sections.map((section, index) => `${index === sections.length - 1 ? "└" : "├"}── ${section.id}/\n${index === sections.length - 1 ? " " : "│"}   └── README.md`).join("\n")}`
          : `${node.path}/\n└── README.md`;
      append(message(text));
      return;
    }
    append(message("알 수 없는 명령어입니다. help를 입력해 보세요."));
  }

  function completeInput() {
    const typed = input.trimStart();
    const space = typed.search(/\s/);
    if (space === -1) {
      const matches = commands.filter((command) => command.startsWith(typed.toLowerCase()));
      if (matches.length === 1) setInput(`${matches[0]} `);
      else if (matches.length > 1) {
        const prefix = sharedPrefix(matches);
        if (prefix.length > typed.length) setInput(prefix);
        else append({ command: input || "Tab", at: cwd, kind: "suggestions", options: matches });
      }
      return;
    }

    const action = typed.slice(0, space).toLowerCase();
    if (!["cd", "ls", "cat", "open", "tree"].includes(action)) return;
    const argument = typed.slice(space).trimStart();
    if (/\s/.test(argument)) return;
    const slash = argument.lastIndexOf("/");
    const parent = slash >= 0 ? argument.slice(0, slash + 1) : "";
    const partial = argument.slice(slash + 1);
    const parentNode = getNode(resolvePath(parent || ".", cwd));
    if (parentNode?.kind !== "directory") return;
    const matches = listDirectory(parentNode.path)
      .filter((node) => (action !== "cd" || node.kind === "directory") && node.name.startsWith(partial))
      .map((node) => `${parent}${node.name}${node.kind === "directory" ? "/" : ""}`);
    const beforeArgument = input.slice(0, input.length - argument.length);
    if (matches.length === 1) setInput(`${beforeArgument}${matches[0]}`);
    else if (matches.length > 1) {
      const prefix = sharedPrefix(matches);
      if (prefix.length > argument.length) setInput(`${beforeArgument}${prefix}`);
      else {
        const last = outputs.at(-1);
        if (last?.kind !== "suggestions" || last.command !== input) {
          append({ command: input, at: cwd, kind: "suggestions", options: matches });
        }
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      completeInput();
    } else if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      if (historyIndex < 0) draftRef.current = input;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next < history.length ? next : -1);
      setInput(next < history.length ? history[next] : draftRef.current);
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
              <div ref={outputRef} tabIndex={0} aria-label="터미널 출력" aria-live="polite" className="mb-5 max-h-44 space-y-4 overflow-y-auto pr-2">
                {outputs.map((output, index) => (
                  <div key={`${output.command}-${index}`}>
                    <p className="text-neutral-500">{output.at === "/" ? "~" : `~${output.at}`} % {output.command}</p>
                    {output.kind === "help" && <p className="whitespace-pre-line">{"ls [경로]  목록 보기\ncd [경로]  디렉터리 이동 (.. · ~ · -)\npwd  현재 경로\ncat <파일>  파일 읽기\nopen <경로>  해당 섹션 열기\ntree [경로]  구조 보기\nwhoami · clear\nTab  자동완성 · ↑↓  명령 기록"}</p>}
                    {output.kind === "ls" && <div className="mt-1 grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-3">{output.entries.map((node) => <button key={node.path} type="button" onClick={() => { runCommand(`${node.kind === "directory" ? "cd" : "cat"} ${node.path}`); inputRef.current?.focus(); }} className="w-fit text-left text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{node.name}{node.kind === "directory" ? "/" : ""}</button>)}</div>}
                    {output.kind === "cat" && <div><p>{output.node.section?.preview ?? "폴더를 선택해 README.md를 읽거나 open으로 섹션을 열어 보세요."}</p>{output.node.section && <button type="button" onClick={() => runCommand(`open ${output.node.path}`)} className="text-neutral-400 underline decoration-neutral-600 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">open /{output.node.section.id} ↗</button>}</div>}
                    {output.kind === "message" && <p className="whitespace-pre-line">{output.text}</p>}
                    {output.kind === "suggestions" && <div className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">{output.options.map((option) => <span key={option}>{option}</span>)}</div>}
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-transparent pb-1 focus-within:border-neutral-500">
              <label htmlFor="terminal-command" className="shrink-0 text-neutral-400"><span className="text-white">visitor@2kminn</span> {cwd === "/" ? "~" : `~${cwd}`} %</label>
              <input ref={inputRef} id="terminal-command" type="text" value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); }} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="터미널 명령어" placeholder="ls 입력 · Tab 자동완성" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-neutral-400" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
