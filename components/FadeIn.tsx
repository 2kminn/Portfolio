"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export default function FadeIn({ children, className, delay = 0, x = 0, y = 30 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  return (
    <div
      ref={ref}
      className={`${className ?? ""}${isInView ? " fade-in-visible" : ""}`}
      style={{ "--reveal-x": `${x}px`, "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
