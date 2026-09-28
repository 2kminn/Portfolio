const groups = [
  { label: "클라이언트", title: "프론트엔드", rows: [["TypeScript", "언어"], ["React", "화면 개발"], ["Tailwind CSS", "스타일링"]] },
  { label: "서버", title: "백엔드", rows: [["[언어]", "사용한 언어 입력"], ["[프레임워크]", "사용한 프레임워크 입력"], ["[데이터 · 인프라]", "사용한 도구 입력"]] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-layout" aria-labelledby="skills-title">
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
