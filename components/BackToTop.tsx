"use client";

import { useEffect, useState } from "react";
import UiIcon from "@/components/UiIcon";
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
      className={`ui-icon-button ui-surface-dark fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <UiIcon icon={ArrowUp} />
    </a>
  );
}
