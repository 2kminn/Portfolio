"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Award, BriefcaseBusiness, Code2, FolderOpen, GitBranch, Menu, UserRound, X } from "lucide-react";
import styles from "./HomeNavigation.module.css";

const sections = [
  { id: "about", label: "소개", icon: UserRound },
  { id: "projects", label: "프로젝트", icon: FolderOpen },
  { id: "experience", label: "경험", icon: BriefcaseBusiness },
  { id: "skills", label: "기술", icon: Code2 },
  { id: "certifications", label: "자격", icon: Award },
] as const;

type Props = { name: string; handle: string; githubUrl: string };

export default function HomeNavigation({ name, handle, githubUrl }: Props) {
  const [active, setActive] = useState<string>("about");
  const headerRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const toggleRef = useRef<HTMLElement>(null);
  const panelId = useId();

  function closeMenu(restoreFocus = false) {
    const details = detailsRef.current;
    if (!details?.open) return;
    details.open = false;
    toggleRef.current?.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string = "about";
      let closestTop = Number.NEGATIVE_INFINITY;
      const activationTop = (headerRef.current?.getBoundingClientRect().bottom ?? 64) + 32;

      for (const { id } of sections) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= activationTop && top > closestTop) {
          current = id;
          closestTop = top;
        }
      }

      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight > window.innerHeight + 2 && window.scrollY + window.innerHeight >= pageHeight - 2) current = "certifications";
      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    toggleRef.current?.setAttribute("aria-expanded", String(detailsRef.current?.open ?? false));

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !detailsRef.current?.open) return;
      event.preventDefault();
      detailsRef.current.open = false;
      toggleRef.current?.setAttribute("aria-expanded", "false");
      toggleRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const links = sections.map(({ id, label, icon: Icon }) => (
    <a
      key={id}
      href={`#${id}`}
      className={styles.sectionLink}
      aria-current={active === id ? "location" : undefined}
      onClick={() => {
        setActive(id);
        closeMenu(true);
      }}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
      <span>{label}</span>
    </a>
  ));

  const githubLink = (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.githubLink} onClick={() => closeMenu(true)}>
      <GitBranch aria-hidden="true" size={18} strokeWidth={1.7} />
      <span>GitHub <span className={styles.handle}>@{handle}</span></span>
      <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.7} className={styles.externalIcon} />
      <span className={styles.srOnly}>새 탭에서 열기</span>
    </a>
  );

  return (
      <header ref={headerRef} className={styles.mobileBar}>
        <a href="#about" className={styles.mobileBrand} onClick={() => closeMenu()}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>포트폴리오</span>
        </a>
        <details
          ref={detailsRef}
          className={styles.disclosure}
          onToggle={(event) => toggleRef.current?.setAttribute("aria-expanded", String(event.currentTarget.open))}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}
        >
          <summary ref={toggleRef} className={styles.menuToggle} aria-controls={panelId}>
            <Menu aria-hidden="true" size={18} strokeWidth={1.7} className={styles.menuIcon} />
            <X aria-hidden="true" size={18} strokeWidth={1.7} className={styles.closeIcon} />
            <span>목차</span>
          </summary>
          <div id={panelId} className={styles.mobilePanel}>
            <nav aria-label="페이지 목차">{links}</nav>
            <div className={styles.mobileFooter}>{githubLink}</div>
          </div>
        </details>
      </header>
  );
}
