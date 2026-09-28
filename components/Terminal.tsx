export default function Terminal() {
  return (
    <section className="bg-[#101010] text-white" aria-labelledby="hero-title">
      <div className="mx-auto flex min-h-[410px] w-[min(1200px,calc(100%-40px))] flex-col py-7 md:min-h-[460px] md:w-[min(1200px,calc(100%-96px))] md:py-10">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-5 font-mono text-xs tracking-wide text-neutral-400">
          <span className="flex items-center gap-3"><span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>포트폴리오 / 터미널</span>
          <span className="hidden text-neutral-500 sm:block">2kminn / portfolio</span>
        </div>
        <div className="flex flex-1 flex-col justify-center py-12 md:py-10">
          <p className="mb-7 font-mono text-sm text-neutral-400"><strong className="font-normal text-white">visitor@2kminn</strong> ~ % whoami</p>
          <h1 id="hero-title" className="text-[clamp(43px,6vw,78px)] leading-[1.12] font-bold tracking-[-.075em]">안녕하세요.<br /><span className="text-neutral-400">개발자 이경민입니다.</span></h1>
        </div>
        <div className="flex items-end justify-between pt-4 font-mono text-xs text-neutral-500"><span>아래로 스크롤<br />↓</span><a href="#about" className="border-b border-neutral-400 pb-1 text-neutral-200">소개 보기 ↗</a></div>
      </div>
    </section>
  );
}
