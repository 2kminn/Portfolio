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
  structureMobileImage?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  contributions?: { title: string; description: string }[];
  capturePlan?: { title: string; description: string; format: "mobile" | "desktop"; image?: string }[];
  structureCaption?: string;
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
    status: "published",
    slug: "moduflow",
    title: "ModuFlow",
    period: "2026.03 – 2026.06 · 경성대학교 종합설계프로젝트",
    summary: "경성대학교 종합설계프로젝트로 진행한 운동 서비스. 루틴, 자세 분석, 운동 기록과 헬스장 혼잡도·출석 정보를 모바일에서 연결했습니다.",
    role: "서비스 설계 · 프로젝트 전반 관리 · PWA 프론트엔드 개발 · 백엔드 개발 보조",
    technologies: ["React", "Vite", "PWA", "Axios", "Android WebView", "Spring Boot API"],
    challenge: "운동 계획과 기록, 자세 분석, 헬스장 이용 정보가 분리되어 있어 사용자가 운동 전후로 여러 흐름을 오가야 했습니다. 웹 화면과 Android 앱, 백엔드가 함께 동작하는 구조를 정리하고 모바일에서도 일관된 사용 흐름을 만드는 것이 과제였습니다.",
    solution: "사용자·관리자 화면 흐름과 시스템 연동 구조를 설계하고 개발 진행을 관리했습니다. React PWA의 공통 레이아웃과 인증·홈·운동·루틴·통계·마이페이지·관리자 CMS 화면을 구현했습니다. Axios 클라이언트로 인증, 루틴, 운동 기록, 사용자 설정 API를 연결하고, Android WebView 브리지에서 운동 시작·토큰 전달·기기 ID 조회를 처리했습니다. 백엔드 영역은 API 연동과 기능 구현을 보조했습니다.",
    result: "PWA 설치·업데이트 처리, 계정별 로컬 데이터 분리, 공통 API 오류 Toast와 인증 만료 처리를 적용했습니다. 앱과 웹을 오가는 운동 흐름 및 관리 기능을 하나의 프론트엔드 경험으로 구성했으며, 주요 기능과 예외 상황을 테스트 항목으로 정리했습니다.",
    structureImage: "/projects/moduflow/system-architecture.svg",
    structureMobileImage: "/projects/moduflow/system-architecture-mobile.svg",
    structureCaption: "PWA, Android 앱, 백엔드, 자세 인식 서버의 연결 관계를 정리한 전체 시스템 구성도",
    contributions: [
      { title: "설계와 진행 관리", description: "화면 흐름, 전체 시스템 구성, 데이터 구조와 기능별 테스트 범위를 정리하고 개발 진행을 관리했습니다." },
      { title: "PWA 프론트엔드", description: "인증부터 운동·루틴·기록·통계·마이페이지, 관리자 CMS까지 화면과 공통 컴포넌트를 구현했습니다." },
      { title: "서비스 연동", description: "Axios 공통 클라이언트로 API와 인증 오류를 처리하고, WebView 브리지로 Android 운동 실행 및 세션 정보를 연결했습니다." },
      { title: "백엔드 개발 보조", description: "인증·루틴·운동 기록 API의 데이터 흐름을 화면 요구사항과 맞추고 연동 과정의 수정 작업을 보조했습니다." },
      { title: "모바일 안정성", description: "서비스 워커 갱신, 계정별 로컬 캐시 분리, 오류 Toast와 로그인 만료 흐름을 적용했습니다." },
    ],
    // 캡처를 추가할 때 public/projects/moduflow/에 저장하고 각 항목의 image에 공개 경로를 지정합니다.
    capturePlan: [
      { title: "홈 · 오늘의 운동", description: "로그인 후 홈 화면에서 오늘의 루틴과 운동 시작 버튼이 함께 보이도록 촬영", format: "mobile" },
      { title: "운동 목록", description: "운동 검색과 운동별 상세 화면이 드러나도록 촬영", format: "mobile" },
      { title: "루틴 관리", description: "요일별 운동과 휴식일 편집 화면을 촬영", format: "mobile" },
      { title: "운동 기록 · 통계", description: "운동 완료 기록과 주간 통계가 보이는 화면을 촬영", format: "mobile" },
      { title: "관리자 CMS", description: "운동·비콘 구역·사용자 관리 중 주요 기능이 드러나는 데스크톱 화면을 촬영", format: "desktop" },
    ],
  },
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
