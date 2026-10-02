import FadeIn from "@/components/FadeIn";

const skills = [
  { name: "TypeScript", group: "FRONTEND / LANGUAGE", description: "프론트엔드에서 사용하는 언어입니다. 타입을 기준으로 화면과 데이터의 구조를 명확히 다룹니다." },
  { name: "React", group: "FRONTEND / UI", description: "컴포넌트 단위로 화면을 구성하고, 사용자와 상호작용하는 인터페이스를 만듭니다." },
  { name: "Tailwind CSS", group: "FRONTEND / STYLE", description: "반응형 레이아웃과 일관된 스타일을 빠르게 구현하는 데 사용합니다." },
  { name: "Backend", group: "BACKEND / SERVER", description: "사용한 언어와 프레임워크는 실제 프로젝트 경험에 맞춰 추가할 예정입니다." },
  { name: "Data & Infra", group: "BACKEND / SYSTEM", description: "데이터베이스와 인프라 도구는 작업 이력을 정리한 뒤 채울 예정입니다." },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 py-24 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center sm:mb-20 md:mb-28" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">02 / TECH STACK</p>
          <h2 id="skills-title" className="font-display text-[clamp(64px,12vw,160px)] leading-none font-black tracking-normal uppercase">Skills</h2>
        </FadeIn>
        <div>
          {skills.map((skill, index) => (
            <FadeIn key={skill.name} className="grid gap-4 border-t border-[#0C0C0C]/15 py-8 sm:grid-cols-[minmax(160px,.4fr)_minmax(0,1fr)] sm:gap-8 sm:py-10 md:py-12" delay={Math.min(index, 3) * 0.1} y={30}>
              <span className="font-display text-[clamp(64px,9vw,136px)] leading-none font-black tracking-normal">{String(index + 1).padStart(2, "0")}</span>
              <div className="flex flex-col justify-center">
                <p className="mb-3 font-mono text-[11px] tracking-[.18em] text-neutral-500">{skill.group}</p>
                <h3 className="font-display text-[clamp(24px,3.3vw,46px)] leading-tight font-semibold uppercase">{skill.name}</h3>
                <p className="mt-4 max-w-2xl text-[clamp(15px,1.5vw,19px)] leading-relaxed text-neutral-600 break-keep">{skill.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
