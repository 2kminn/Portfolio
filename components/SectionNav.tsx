"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "/about" },
  { id: "skills", label: "/skills" },
  { id: "projects", label: "/projects" },
  { id: "experience", label: "/experience" },
  { id: "certifications", label: "/certifications" },
  { id: "github", label: "/github" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = 145;
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
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    };

    alignActiveTab();
    window.addEventListener("resize", alignActiveTab);
    return () => window.removeEventListener("resize", alignActiveTab);
  }, [active]);

  return (
    <nav ref={navRef} aria-label="페이지 메뉴" className="section-nav flex gap-5 overflow-x-auto font-mono text-[13px] font-medium whitespace-nowrap md:gap-8">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setActive(id)}
          className={`relative shrink-0 py-1.5 transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[#D7E2EA] after:transition-transform ${active === id ? "text-[#D7E2EA] after:scale-x-100" : "text-[#8DA0AD] hover:text-[#D7E2EA] after:scale-x-0"}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
