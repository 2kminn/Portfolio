import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/data/home";
import StickyNotePaper from "@/components/StickyNotePaper";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="cli-section">
      <div className="cli-container">
        <SectionHeading id="skills-title" title="기술 스택" command="ls -la ./skills" />
        <div className="cli-skill-grid">
          {skillGroups.map((group, index) => <article key={group.name} className="cli-skill-group">
            <StickyNotePaper id={"skill-note-" + index} />
            <h3>{group.name}</h3>
            <ul className="cli-tags">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </section>
  );
}
