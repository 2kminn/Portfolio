"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const heroHeight = document.getElementById("top")?.offsetHeight ?? window.innerHeight;
        setVisible(window.scrollY >= heroHeight);
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
    <a
      href="#top"
      aria-label="맨 위로 이동"
      title="맨 위로"
      aria-hidden={!visible}
      inert={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => document.getElementById("top")?.focus({ preventScroll: true })}
      className={`back-to-top fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex size-12 items-center justify-center rounded-full border border-[#A9BDC9]/60 bg-[#111316]/95 text-[#D7E2EA] shadow-[0_4px_20px_rgba(0,0,0,.18)] backdrop-blur-sm transition-[opacity,transform,background-color] duration-200 hover:bg-[#30495C] motion-reduce:transition-none md:right-8 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.7} />
    </a>
  );
}
