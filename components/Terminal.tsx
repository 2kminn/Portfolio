export default function Terminal() {
  return (
    <section className="min-h-[500px] bg-[#101010] text-white md:min-h-[560px]" aria-labelledby="hero-title">
      <div className="mx-auto flex min-h-[500px] w-[min(1200px,calc(100%-40px))] flex-col py-7 md:min-h-[560px] md:w-[min(1200px,calc(100%-96px))] md:py-11">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-5 font-mono text-xs tracking-wide text-neutral-400">
          <span className="flex items-center gap-3"><span aria-hidden="true" className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-neutral-500" /><i className="h-2 w-2 rounded-full bg-neutral-500" /><i className="h-2 w-2 rounded-full bg-neutral-500" /></span>portfolio / terminal</span>
          <span className="hidden text-neutral-500 sm:block">01 — INTRODUCTION</span>
        </div>
        <div className="pt-15 md:pt-20">
          <p className="mb-7 font-mono text-sm text-neutral-400"><strong className="font-normal text-white">visitor@portfolio</strong> ~ % whoami</p>
          <h1 id="hero-title" className="text-[clamp(43px,6.4vw,88px)] leading-[1.12] font-bold tracking-[-.075em]">안녕하세요.<br /><span className="text-neutral-400">개발자 이경민입니다.</span></h1>
          <p className="mt-8 font-mono text-[13px] leading-8 text-neutral-300 md:text-[15px]"><span className="text-white">&gt;</span> 프론트엔드와 백엔드를 함께 다룹니다.<br /><span className="text-white">&gt;</span> 문제를 이해하고, 끝까지 구현합니다. _</p>
        </div>
        <div className="mt-auto flex items-end justify-between pt-10 font-mono text-xs text-neutral-500"><span>SCROLL TO EXPLORE<br />↓</span><a href="#about" className="border-b border-neutral-400 pb-1 text-neutral-200">ABOUT ME ↗</a></div>
      </div>
    </section>
  );
}
