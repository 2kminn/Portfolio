"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import usePrefersReducedMotion, { setAnimationsEnabled } from "@/hooks/usePrefersReducedMotion";

export default function AnimationToggle() {
  const pathname = usePathname();
  const animationsEnabled = !usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.animations = animationsEnabled ? "on" : "off";
  }, [animationsEnabled]);

  if (pathname.startsWith("/projects/")) return null;

  return (
    <button
      type="button"
      className="animation-toggle"
      aria-label="애니메이션"
      aria-pressed={animationsEnabled}
      onClick={() => setAnimationsEnabled(!animationsEnabled)}
    >
      <span className="animation-toggle-dot" aria-hidden="true" />
      애니메이션 {animationsEnabled ? "켜짐" : "꺼짐"}
    </button>
  );
}
