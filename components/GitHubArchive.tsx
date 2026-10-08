import { ArrowUpRight } from "lucide-react";
import ContactButton from "@/components/ContactButton";
import FadeIn from "@/components/FadeIn";

export default function GitHubArchive() {
  return (
    <section id="github" aria-labelledby="github-title" className="bg-[#0C0C0C] px-5 pt-20 pb-12 text-[#D7E2EA] sm:px-8 sm:pt-24 sm:pb-16 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-16">
        <FadeIn>
          <p className="mb-5 font-mono text-xs tracking-[.3em] text-[#8DA0AD]">06 / CONTACT</p>
          <h2 id="github-title" className="hero-heading font-display text-[clamp(56px,7vw,96px)] leading-none font-black tracking-normal uppercase">Let&apos;s<br />Connect</h2>
          <p className="mt-7 max-w-md text-base leading-8 text-[#A8BAC6]">프로젝트의 소스 코드와 작업 기록을 확인하거나, 이메일로 연락할 수 있습니다.</p>
          <div className="mt-7"><ContactButton /></div>
        </FadeIn>
        <FadeIn delay={0.08} y={24}><a href="https://github.com/2kminn" target="_blank" rel="noopener noreferrer" className="group flex min-h-56 flex-col justify-between rounded-[28px] border border-[#D7E2EA]/40 bg-[#15191D] p-7 text-[#D7E2EA] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 sm:rounded-[36px] sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-4"><svg aria-hidden="true" className="size-11 sm:size-14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 018 4.73c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg><span className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-.06em]">GitHub</span></div>
            <ArrowUpRight aria-hidden="true" className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.6} />
          </div>
          <div><span className="text-lg font-medium underline decoration-white/30 underline-offset-5">github.com/2kminn</span><p className="mt-3 text-sm text-[#8DA0AD]">소스 코드 저장소</p></div>
        </a></FadeIn>
      </div>
    </section>
  );
}
