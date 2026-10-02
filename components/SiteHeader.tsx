"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionNav from "@/components/SectionNav";

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
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0C0C0C]/95 text-[#D7E2EA] backdrop-blur-sm transition-[transform,opacity] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="mx-auto flex w-[min(1200px,calc(100%-40px))] flex-col gap-3 py-4 md:w-[min(1200px,calc(100%-96px))] md:flex-row md:items-center md:justify-between md:gap-8 md:py-5">
        <Link href="/" className="whitespace-nowrap text-sm font-bold tracking-tight">
          2kminn <span className="font-normal text-[#8DA0AD]">/ PORTFOLIO</span>
        </Link>
        <SectionNav />
      </div>
    </header>
  );
}
