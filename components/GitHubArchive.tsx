import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export default function GitHubArchive() {
  return (
    <section id="github" aria-labelledby="github-title" className="cli-section cli-contact-section">
      <div className="cli-container">
        <SectionHeading id="github-title" title="연락하기" command="open ./contact" />
        <p className="cli-contact-lead">함께 만들 이야기가 있다면 연락해 주세요.</p>
        <div className="cli-contact-links">
          <a href={`mailto:${profile.email}`}><span>email</span><strong>{profile.email}</strong><span aria-hidden="true">↗</span></a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><span>github</span><strong>{profile.githubUrl.replace(/^https?:\/\//, '')}</strong><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
