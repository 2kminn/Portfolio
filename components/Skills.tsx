const groups = [
  { label: "01 / CLIENT", title: "Frontend", rows: [["TypeScript", "언어"], ["React", "UI 개발"], ["Tailwind CSS", "스타일링"]] },
  { label: "02 / SERVER", title: "Backend", rows: [["[언어]", "예: Java · Python"], ["[프레임워크]", "예: Spring Boot · FastAPI"], ["[데이터 · 인프라]", "예: MySQL · Docker"]] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-layout" aria-labelledby="skills-title">
      <div className="section-kicker"><span>04</span> TECH STACK</div>
      <div>
        <h2 id="skills-title" className="section-title">기술 스택</h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {groups.map((group) => <div key={group.title} className="border-t border-black pt-5">
            <h3 className="mb-6 text-xl font-semibold tracking-tight"><span className="mb-2 block font-mono text-xs font-normal text-neutral-500">{group.label}</span>{group.title}</h3>
            <ul>{group.rows.map(([name, example]) => <li key={name} className="flex justify-between gap-4 border-t border-neutral-300 py-4 text-base last:border-b"><span>{name}</span><em className="text-right text-[13px] not-italic text-neutral-500">{example}</em></li>)}</ul>
          </div>)}
        </div>
        <p className="mt-6 text-sm leading-7 text-neutral-500">백엔드 기술은 실제 사용 경험에 맞춰 입력해 주세요.</p>
      </div>
    </section>
  );
}
