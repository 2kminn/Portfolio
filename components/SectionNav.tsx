"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "소개" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "experience", label: "경험" },
  { id: "certifications", label: "자격" },
  { id: "github", label: "연락처" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = (document.getElementById("site-header")?.getBoundingClientRect().bottom ?? 112) + 16;
        let current: string | null = null;
        for (const { id } of sections) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= offset) current = id;
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          current = sections[sections.length - 1].id;
        }
        setActive(current);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const alignActiveTab = () => {
      const nav = navRef.current;
      if (!nav || !window.matchMedia("(max-width: 767px)").matches || nav.scrollWidth <= nav.clientWidth) return;
      const link = nav.querySelector<HTMLAnchorElement>('[aria-current="location"]');
      if (!link) return;

      const navBounds = nav.getBoundingClientRect();
      const linkBounds = link.getBoundingClientRect();
      const target = nav.scrollLeft + linkBounds.left - navBounds.left - (nav.clientWidth - linkBounds.width) / 2;
      nav.scrollTo({
        left: Math.max(0, Math.min(target, nav.scrollWidth - nav.clientWidth)),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };

    alignActiveTab();
    window.addEventListener("resize", alignActiveTab);
    return () => window.removeEventListener("resize", alignActiveTab);
  }, [active]);

  return (
    <nav ref={navRef} aria-label="페이지 메뉴" className="section-nav flex gap-3 overflow-x-auto whitespace-nowrap">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setActive(id)}
          className="ui-nav-link shrink-0"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
