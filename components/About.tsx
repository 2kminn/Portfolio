export default function About() {
  return (
    <section id="about" className="section-layout" aria-labelledby="about-title">
      <div className="section-kicker"><span>01</span> ABOUT</div>
      <div>
        <h2 id="about-title" className="section-title">나에 대한 정보</h2>
        <p className="max-w-3xl text-[clamp(20px,2.2vw,27px)] leading-relaxed tracking-[-.045em] break-keep">사용자의 화면부터 서버의 구조까지, 서비스가 완성되는 과정을 폭넓게 이해하는 개발자입니다.</p>
        <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-600 break-keep">개발 관점과 일하는 방식을 이곳에 작성해 주세요. 어떤 문제에 관심이 있고, 협업할 때 무엇을 중요하게 생각하는지 구체적으로 적으면 좋습니다.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[["NAME", "이경민"], ["LOCATION", "[활동 지역]"], ["CONTACT", "[이메일 또는 연락처]"]].map(([label, value]) => <div key={label} className="border-t border-neutral-300 pt-4"><small className="font-mono text-xs text-neutral-500">{label}</small><p className="mt-2 text-[15px]">{value}</p></div>)}
        </div>
      </div>
    </section>
  );
}
