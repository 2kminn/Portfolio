import FadeIn from "@/components/FadeIn";
import { Atom, Code2, Database, FileCode2, Palette, Server } from "lucide-react";

const groups = [
  {
    name: "Frontend",
    icon: Code2,
    skills: [
      { name: "TypeScript", icon: FileCode2, description: "프론트엔드에서 사용하는 언어입니다. 타입을 기준으로 화면과 데이터의 구조를 명확히 다룹니다." },
      { name: "React", icon: Atom, description: "컴포넌트 단위로 화면을 구성하고, 사용자와 상호작용하는 인터페이스를 만듭니다." },
      { name: "Tailwind CSS", icon: Palette, description: "반응형 레이아웃과 일관된 스타일을 빠르게 구현하는 데 사용합니다." },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      { name: "Backend", icon: Server, description: "사용한 언어와 프레임워크는 실제 프로젝트 경험에 맞춰 추가할 예정입니다." },
      { name: "Data & Infra", icon: Database, description: "데이터베이스와 인프라 도구는 작업 이력을 정리한 뒤 채울 예정입니다." },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative z-10 -mt-10 rounded-t-[40px] bg-white px-5 py-24 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-12 text-center sm:mb-16" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">02 / TECH STACK</p>
          <h2 id="skills-title" className="font-display text-[clamp(64px,12vw,160px)] leading-none font-black tracking-normal uppercase">Skills</h2>
        </FadeIn>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {groups.map(({ name, icon: GroupIcon, skills }) => (
            <div key={name} className="min-w-0">
              <FadeIn className="mb-2 flex items-center gap-3 border-b border-[#0C0C0C]/25 pb-5" y={20}>
                <GroupIcon aria-hidden="true" className="size-5 text-[#667A8A]" strokeWidth={1.5} />
                <h3 className="font-mono text-base font-medium tracking-[.08em]">/{name.toLowerCase()}</h3>
              </FadeIn>
              <ul>
                {skills.map(({ name: skillName, icon: Icon, description }, index) => (
                  <li key={skillName} className="border-b border-[#0C0C0C]/10">
                    <FadeIn className="flex gap-4 py-6" delay={index * 0.04} y={20}>
                      <Icon aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-[#667A8A]" strokeWidth={1.5} />
                      <div className="min-w-0">
                        <h4 className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">{skillName}</h4>
                        <p className="mt-2 text-base leading-7 text-neutral-600 break-keep">{description}</p>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
