const groups = [
  { label: "CLIENT", title: "Frontend", rows: [["TypeScript", "Language"], ["React", "UI development"], ["Tailwind CSS", "Styling"]] },
  { label: "SERVER", title: "Backend", rows: [["[Language]", "Add your language"], ["[Framework]", "Add your framework"], ["[Data & infrastructure]", "Add your tools"]] },
];

export default function Skills() {
  return (
    <section id="skills" className="section-layout" aria-labelledby="skills-title">
      <div>
        <h2 id="skills-title" className="section-title">Skills</h2>
        <div className="grid gap-10 sm:grid-cols-2">
          {groups.map((group) => <div key={group.title} className="border-t border-black pt-5">
            <h3 className="mb-6 text-xl font-semibold tracking-tight"><span className="mb-2 block font-mono text-xs font-normal text-neutral-500">{group.label}</span>{group.title}</h3>
            <ul>{group.rows.map(([name, example]) => <li key={name} className="flex justify-between gap-4 border-t border-neutral-300 py-4 text-base last:border-b"><span>{name}</span><em className="text-right text-[13px] not-italic text-neutral-500">{example}</em></li>)}</ul>
          </div>)}
        </div>
        <p className="mt-6 text-sm leading-7 text-neutral-500">Add backend tools you have used in real projects.</p>
      </div>
    </section>
  );
}
