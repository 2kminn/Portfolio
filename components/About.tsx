export default function About() {
  return (
    <section id="about" className="section-layout" aria-labelledby="about-title">
      <div>
        <h2 id="about-title" className="section-title">소개</h2>
        <p className="max-w-3xl text-[clamp(20px,2.2vw,27px)] leading-relaxed tracking-[-.045em]">사용자의 화면부터 서버의 구조까지, 서비스가 완성되는 과정을 폭넓게 이해하는 개발자입니다.</p>
        <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-600">개발 관점과 일하는 방식을 이곳에 작성해 주세요. 어떤 문제에 관심이 있고, 협업할 때 무엇을 중요하게 생각하는지 구체적으로 적으면 좋습니다.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="border-t border-neutral-300 pt-4"><small className="text-xs text-neutral-500">이름</small><p className="mt-2 text-[15px]">이경민</p></div>
          <div className="border-t border-neutral-300 pt-4"><small className="text-xs text-neutral-500">이메일</small><p className="mt-2 break-all text-[15px]"><a className="underline underline-offset-4 hover:text-neutral-500" href="mailto:dlrudals1589@naver.com">dlrudals1589@naver.com</a></p></div>
          <div className="border-t border-neutral-300 pt-4"><small className="text-xs text-neutral-500">깃허브</small><p className="mt-2 text-[15px]"><a className="underline underline-offset-4 hover:text-neutral-500" href="https://github.com/2kminn" target="_blank" rel="noopener noreferrer">github.com/2kminn ↗</a></p></div>
        </div>
      </div>
    </section>
  );
}
