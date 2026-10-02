"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export default function FadeIn({ children, className, delay = 0, x = 0, y = 30 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const edge = Math.min(0.28, 0.18 + delay * 0.2);
  const stops = [0, edge, 1 - edge, 1];
  const opacity = useTransform(scrollYProgress, stops, [0, 1, 1, 0]);
  const offsetX = useTransform(scrollYProgress, stops, [x, 0, 0, -x]);
  const offsetY = useTransform(scrollYProgress, stops, [y, 0, 0, -y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity, x: offsetX, y: offsetY }}
    >
      {children}
    </motion.div>
  );
}
