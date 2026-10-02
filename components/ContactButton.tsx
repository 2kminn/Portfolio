import { ArrowUpRight } from "lucide-react";

export default function ContactButton() {
  return (
    <a href="mailto:dlrudals1589@naver.com" className="contact-button inline-flex items-center gap-3 rounded-full px-8 py-3 text-xs font-semibold tracking-[.16em] text-white uppercase sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4">
      Contact Me <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
    </a>
  );
}
