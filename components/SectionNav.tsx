"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "/about" },
  { id: "skills", label: "/skills" },
  { id: "projects", label: "/projects" },
  { id: "experience", label: "/experience" },
  { id: "certifications", label: "/certifications" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = window.innerWidth < 768 ? 145 : 105;
        let current: string | null = null;
        for (const { id } of sections) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= offset) current = id;
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

  return (
    <nav aria-label="페이지 메뉴" className="flex gap-5 overflow-x-auto font-mono text-[13px] font-medium whitespace-nowrap md:gap-8">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setActive(id)}
          className={`relative shrink-0 py-1.5 transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-black after:transition-transform ${active === id ? "text-black after:scale-x-100" : "text-neutral-500 hover:text-black after:scale-x-0"}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
