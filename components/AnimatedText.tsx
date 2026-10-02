"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Character({ character, index, total, progress }: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.2, 1]);
  return character === " " ? " " : <motion.span style={{ opacity }}>{character}</motion.span>;
}

export default function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });
  const characters = Array.from(text);

  return (
    <p ref={ref} aria-label={text} className="mx-auto max-w-[660px] text-center text-[clamp(18px,2vw,25px)] leading-[1.75] font-medium text-[#D7E2EA] break-keep">
      <span aria-hidden="true">
        {reduceMotion
          ? text
          : characters.map((character, index) => (
            <Character key={index} character={character} index={index} total={characters.length} progress={scrollYProgress} />
          ))}
      </span>
    </p>
  );
}
