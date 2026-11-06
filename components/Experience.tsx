import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/home";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="cli-section">
      <div className="cli-container">
        <SectionHeading id="experience-title" title="경험" description="실무와 팀 작업에서 맡은 역할을 시간순으로 정리했습니다." command="git log --oneline --experience" />
        <ol className="cli-log">
          {experiences.map((item, index) => <li key={`${item.company}-${index}`} className="cli-log-entry">
            <div className="cli-log-meta"><span className="cli-log-index">{String(experiences.length - index).padStart(2, '0')}</span><time>{item.date}</time><span>{item.category}</span></div>
            <div className="cli-log-content"><h3>{item.company}</h3><p className="cli-log-roles">{item.roles.join(' / ')}</p><p className="cli-body">{item.description}</p></div>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
