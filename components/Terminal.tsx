export default function Terminal() {
  return (
    <section className="min-h-[500px] bg-[#101010] text-white md:min-h-[560px]" aria-labelledby="hero-title">
      <div className="mx-auto flex min-h-[500px] w-[min(1200px,calc(100%-40px))] flex-col py-7 md:min-h-[560px] md:w-[min(1200px,calc(100%-96px))] md:py-11">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-5 font-mono text-xs tracking-wide text-neutral-400">
          <span className="flex items-center gap-3"><span aria-hidden="true" className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>포트폴리오 / 터미널</span>
          <span className="hidden text-neutral-500 sm:block">01 — 소개</span>
        </div>
        <div className="grid flex-1 gap-12 py-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(290px,.8fr)] lg:items-center lg:gap-16 lg:py-8">
          <div>
            <p className="mb-7 font-mono text-sm text-neutral-400"><strong className="font-normal text-white">visitor@portfolio</strong> ~ % whoami</p>
            <h1 id="hero-title" className="text-[clamp(43px,5.3vw,68px)] leading-[1.12] font-bold tracking-[-.075em]">안녕하세요.<br /><span className="text-neutral-400">개발자 이경민입니다.</span></h1>
            <p className="mt-8 font-mono text-[13px] leading-8 text-neutral-300 md:text-[15px]"><span className="text-white">&gt;</span> 프론트엔드와 백엔드를 함께 다룹니다.<br /><span className="text-white">&gt;</span> 문제를 이해하고 끝까지 구현합니다. _</p>
          </div>
          <div className="border-t border-neutral-700 pt-7 font-mono text-[13px] leading-7 lg:border-t-0 lg:border-l lg:py-2 lg:pl-9">
            <p className="text-neutral-400"><span className="text-white">visitor@portfolio</span> ~ % cat profile.txt</p>
            <dl className="mt-6 space-y-3">
              <div className="grid grid-cols-[4.5rem_1fr] gap-4"><dt className="text-neutral-500">이름</dt><dd>이경민</dd></div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-4"><dt className="text-neutral-500">학교</dt><dd>경성대학교</dd></div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-4"><dt className="text-neutral-500">분야</dt><dd>프론트엔드 · 백엔드</dd></div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-4"><dt className="text-neutral-500">GitHub</dt><dd><a className="underline decoration-neutral-600 underline-offset-4 hover:text-white" href="https://github.com/2kminn" target="_blank" rel="noopener noreferrer">github.com/2kminn ↗</a></dd></div>
              <div className="grid grid-cols-[4.5rem_1fr] gap-4"><dt className="text-neutral-500">이메일</dt><dd><a className="break-all underline decoration-neutral-600 underline-offset-4 hover:text-white" href="mailto:dlrudals1589@naver.com">dlrudals1589@naver.com</a></dd></div>
            </dl>
            <p className="mt-7 text-neutral-600">~ % <span className="text-white">_</span></p>
          </div>
        </div>
        <div className="flex items-end justify-between pt-4 font-mono text-xs text-neutral-500"><span>아래로 스크롤<br />↓</span><a href="#about" className="border-b border-neutral-400 pb-1 text-neutral-200">소개 보기 ↗</a></div>
      </div>
    </section>
  );
}
