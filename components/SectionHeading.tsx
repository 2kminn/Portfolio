"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function SectionHeading({ id, title, description, command }: {
  id: string;
  title: string;
  description?: string;
  command?: string;
}) {
  const fullCommand = command ?? `cat ${id.replace('-title', '')}.md`;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [displayedCommand, setDisplayedCommand] = useState(fullCommand);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const section = headingRef.current?.closest(".cli-section");
    if (!section || !window.IntersectionObserver || reduceMotion) {
      section?.removeAttribute("data-cli-reveal");
      return;
    }

    let timer: number | undefined;
    let finishTimer: number | undefined;
    let wasInView = false;
    const clearTimers = () => {
      window.clearInterval(timer);
      window.clearTimeout(finishTimer);
    };
    const observer = new IntersectionObserver(([entry]) => {
      const isInView = entry.isIntersecting && entry.intersectionRatio >= .1;
      if (isInView === wasInView) return;
      wasInView = isInView;
      clearTimers();

      if (!isInView) {
        setDisplayedCommand(fullCommand);
        setIsTyping(false);
        section.removeAttribute("data-cli-reveal");
        return;
      }

      section.setAttribute("data-cli-reveal", "typing");
      setDisplayedCommand("");
      setIsTyping(true);

      let length = 0;
      timer = window.setInterval(() => {
        length += 1;
        setDisplayedCommand(fullCommand.slice(0, length));
        if (length < fullCommand.length) return;
        window.clearInterval(timer);
        finishTimer = window.setTimeout(() => {
          setIsTyping(false);
          section.setAttribute("data-cli-reveal", "done");
        }, 90);
      }, 22);
    }, { threshold: .1, rootMargin: "0px 0px -12% 0px" });

    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [fullCommand, reduceMotion]);

  return (
    <header className="cli-section-heading">
      <h2 ref={headingRef} id={id} aria-label={title} className="cli-command-heading">
        <span className="cli-command-measure" aria-hidden="true">visitor@portfolio ~ % {fullCommand}</span>
        <span className="cli-command-render" aria-hidden="true"><span className="cli-prompt">visitor@portfolio</span> ~ % <span className="cli-command-text">{reduceMotion ? fullCommand : displayedCommand}</span>{!reduceMotion && isTyping && <span className="cli-typing-caret">_</span>}</span>
      </h2>
      {description && <p className="cli-section-description">{description}</p>}
    </header>
  );
}
