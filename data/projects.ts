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
  coverImage?: string;
  screenImage?: string;
  structureImage?: string;
  repositoryUrl?: string;
  liveUrl?: string;
};

export type ProjectRecord = Project & {
  status: "draft" | "published";
};

const requiredTextFields = ["title", "period", "summary", "role", "challenge", "solution", "result"] as const;
const placeholderPattern = /^\[[^\]]+\]$|(?:작성|소개)해\s*주세요/;

function validateText(value: string, field: string, slug: string) {
  if (typeof value !== "string" || !value.trim() || placeholderPattern.test(value.trim())) {
    throw new Error(`Project "${slug}": ${field} must contain completed project information.`);
  }
}

export function getPublishedProjects(records: readonly ProjectRecord[]): Project[] {
  const slugs = new Set<string>();

  return records.filter((project) => {
    if (project.status === "draft") return false;
    if (project.status !== "published") {
      throw new Error(`Project "${project.slug}": status must be draft or published.`);
    }
    if (typeof project.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) {
      throw new Error(`Project "${project.slug}": slug must be unique and use lowercase letters, numbers, and single hyphens.`);
    }
    slugs.add(project.slug);

    for (const field of requiredTextFields) {
      validateText(project[field], field, project.slug);
    }
    if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
      throw new Error(`Project "${project.slug}": at least one technology is required.`);
    }
    for (const technology of project.technologies) {
      validateText(technology, "technologies", project.slug);
    }
    for (const field of ["repositoryUrl", "liveUrl"] as const) {
      const value = project[field];
      if (value === undefined) continue;

      let url: URL;
      try {
        url = new URL(value);
      } catch {
        throw new Error(`Project "${project.slug}": ${field} must be an absolute HTTP(S) URL.`);
      }
      if (!/^https?:\/\//i.test(value) || !["http:", "https:"].includes(url.protocol)) {
        throw new Error(`Project "${project.slug}": ${field} must be an absolute HTTP(S) URL.`);
      }
    }

    return true;
  });
}

// 내용을 완성한 뒤 status를 published로 바꾸면 검증 후 목록과 상세 페이지에 공개됩니다.
const projectRecords: ProjectRecord[] = [
  {
    status: "draft",
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
    status: "draft",
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
    status: "draft",
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

export const projects = getPublishedProjects(projectRecords);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
