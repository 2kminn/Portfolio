export type Project = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  role: string;
  technologies: string[];
  challenge: string;
  solution: string;
  result: string;
};

// 실제 프로젝트 정보를 받기 전까지 사용하는 초안 데이터입니다.
export const projects: Project[] = [
  {
    slug: "project-01",
    title: "[프로젝트 01 이름]",
    period: "[진행 기간]",
    summary: "해결한 문제와 서비스의 핵심 기능을 한두 문장으로 작성해 주세요.",
    role: "[담당 역할]",
    technologies: ["[사용 기술]"],
    challenge: "사용자가 겪던 문제 또는 개발 과정의 기술적 과제를 작성해 주세요.",
    solution: "문제를 해결하기 위해 선택한 설계와 구현 방식을 작성해 주세요.",
    result: "성과와 배운 점을 실제 수치나 사례 중심으로 작성해 주세요.",
  },
  {
    slug: "project-02",
    title: "[프로젝트 02 이름]",
    period: "[진행 기간]",
    summary: "프로젝트의 목적과 본인이 기여한 부분을 간단히 소개해 주세요.",
    role: "[담당 역할]",
    technologies: ["[사용 기술]"],
    challenge: "프로젝트를 시작하게 된 배경과 해결하려던 문제를 작성해 주세요.",
    solution: "구현 과정에서 중요했던 판단과 기술적 선택을 작성해 주세요.",
    result: "배포 결과, 개선 효과 또는 학습한 내용을 작성해 주세요.",
  },
  {
    slug: "project-03",
    title: "[프로젝트 03 이름]",
    period: "[진행 기간]",
    summary: "프로젝트의 핵심 기능과 본인이 맡은 역할을 작성해 주세요.",
    role: "[담당 역할]",
    technologies: ["[사용 기술]"],
    challenge: "해결하고자 한 문제와 프로젝트의 배경을 작성해 주세요.",
    solution: "주요 설계와 구현 방법을 작성해 주세요.",
    result: "완성한 결과와 배운 점을 작성해 주세요.",
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
