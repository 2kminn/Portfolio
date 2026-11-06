import ProjectStack from "@/components/ProjectStack";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="cli-section">
      <div className="cli-container">
        <SectionHeading id="projects-title" title="프로젝트" description="직접 만든 서비스의 문제와 구현 과정을 기록합니다." command="ls ./projects" />
        {projects.length > 0 ? <ProjectStack projects={projects} /> : <div className="cli-empty" role="status">
          <span className="cli-empty-mark" aria-hidden="true">$</span>
          <div><p className="cli-empty-title">공개된 프로젝트가 아직 없습니다.</p><p>작업 내용을 정리한 뒤 이곳에 추가하겠습니다. 지금은 아래 경험에서 진행한 일을 확인할 수 있습니다.</p><Link href="/projects/mockup" className="mr-6">상세 페이지 목업 보기 <span aria-hidden="true">↗</span></Link><a href="#experience">경험 보기 <span aria-hidden="true">↗</span></a></div>
        </div>}
      </div>
    </section>
  );
}
