"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionNav from "@/components/SectionNav";
import { profile } from "@/data/profile";

export default function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".terminal-screen");
      const revealAt = (hero?.offsetHeight ?? window.innerHeight) - 80;
      setVisible(window.scrollY >= revealAt);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      id="site-header"
      aria-hidden={!visible}
      inert={!visible}
      className={`ui-surface-dark ui-divider fixed inset-x-0 top-0 z-50 border-b transition-[transform,opacity] duration-200 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="ui-container flex flex-col py-1">
        <Link href="/" className="ui-touch-link ui-label self-start">
          {profile.handle} <span className="ui-muted ml-2">/ 포트폴리오</span>
        </Link>
        <SectionNav />
      </div>
    </header>
  );
}
