"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

export default function FadeIn({ children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
