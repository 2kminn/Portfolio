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
  galleryExtras?: { label: string; image: string }[];
  coverLabel?: string;
  screenLabel?: string;
  repositoryUrl?: string;
  liveUrl?: string;
  contributions?: { title: string; description: string }[];
  capturePlan?: { title: string; description: string; format: "mobile" | "desktop"; group: "user" | "admin"; image?: string }[];
  captureIntro?: string;
  captureGroupDescriptions?: Partial<Record<"user" | "admin", string>>;
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
    coverImage: "/projects/moduflow/admin-cover.webp",
    screenImage: "/projects/moduflow/home.webp",
    structureImage: "/projects/moduflow/system-architecture.svg",
    structureMobileImage: "/projects/moduflow/system-architecture-mobile.svg",
    galleryExtras: [
      { label: "혼잡도", image: "/projects/moduflow/congestion.webp" },
      { label: "루틴 추가", image: "/projects/moduflow/exercise-detail.webp" },
    ],
    structureCaption: "PWA, Android 앱, 백엔드, 자세 인식 서버의 연결 관계를 정리한 전체 시스템 구성도",
    contributions: [
      { title: "설계와 진행 관리", description: "화면 흐름, 전체 시스템 구성, 데이터 구조와 기능별 테스트 범위를 정리하고 개발 진행을 관리했습니다." },
      { title: "PWA 프론트엔드", description: "인증부터 운동·루틴·기록·통계·마이페이지, 관리자 CMS까지 화면과 공통 컴포넌트를 구현했습니다." },
      { title: "서비스 연동", description: "Axios 공통 클라이언트로 API와 인증 오류를 처리하고, WebView 브리지로 Android 운동 실행 및 세션 정보를 연결했습니다." },
      { title: "백엔드 개발 보조", description: "인증·루틴·운동 기록 API의 데이터 흐름을 화면 요구사항과 맞추고 연동 과정의 수정 작업을 보조했습니다." },
      { title: "모바일 안정성", description: "서비스 워커 갱신, 계정별 로컬 캐시 분리, 오류 Toast와 로그인 만료 흐름을 적용했습니다." },
    ],
    capturePlan: [
      { title: "홈 · 오늘의 운동", description: "등록한 일요일 루틴과 운동 시작 버튼", format: "mobile", group: "user", image: "/projects/moduflow/home.webp" },
      { title: "운동 목록", description: "카테고리와 검색으로 운동을 찾는 화면", format: "mobile", group: "user", image: "/projects/moduflow/exercise-list.webp" },
      { title: "운동 상세 · 자극 부위", description: "스쿼트 동작과 자극 근육을 확인하고 루틴에 추가", format: "mobile", group: "user", image: "/projects/moduflow/exercise-detail.webp" },
      { title: "루틴 관리", description: "스쿼트와 푸시업을 추가한 요일별 루틴", format: "mobile", group: "user", image: "/projects/moduflow/routines.webp" },
      { title: "운동 기록", description: "완료한 운동이 반영된 월간 기록", format: "mobile", group: "user", image: "/projects/moduflow/stats-workout.webp" },
      { title: "운동존 상태", description: "비콘 신호를 받기 전 혼잡도 표시 상태", format: "mobile", group: "user", image: "/projects/moduflow/congestion.webp" },
      { title: "관리자 대시보드", description: "샘플 출결 지표와 구역별 혼잡도·비콘 설정", format: "desktop", group: "admin", image: "/projects/moduflow/admin-cms.webp" },
    ],
  },
  {
    status: "published",
    slug: "artar-busan",
    title: "ArtAR Busan",
    period: "2026.03 – 2026.06 · 캡스톤디자인 팀 프로젝트 (5인)",
    summary: "방문 전에는 모바일에서 미술관과 작품을 살펴보고, 현장에서는 작품별 QR로 상세 정보를 확인하는 관람 서비스입니다. 저는 콘텐츠와 운영 데이터를 관리하는 CMS를 개발했습니다.",
    role: "관리자 CMS 프론트엔드 개발 · 백엔드 및 API 연동 보조 · 모바일 앱 연동",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "FastAPI 연동", "QR 딥링크"],
    challenge: "초기에는 XR 스마트글라스로 시선만으로 작품 정보를 확인하는 방식을 구상했습니다. 그러나 기기 수급과 개발 환경의 제약으로 기간 내 안정적인 구현이 어려워졌습니다. 팀은 관람객에게 필요한 정보를 현장에서 쉽게 제공한다는 목표를 유지하면서 스마트폰과 작품별 QR을 활용하는 방향으로 전환했습니다.",
    solution: "방문 전 모바일 정보 탐색과 현장 QR 기반 작품 안내 흐름에 맞춰 관리자 CMS를 구성했습니다. React와 TypeScript로 장소·작품 등록 및 수정, 다국어 작품 정보, 작품별 QR 관리, 관리자 권한 흐름과 방문 통계 화면을 구현했습니다. 백엔드 API 연동과 모바일 앱에 전달할 데이터 형식을 팀원들과 함께 확인하고 수정했습니다.",
    result: "XR 기기 제약 속에서도 스마트폰과 QR로 관람 흐름을 완성할 수 있는 방향을 찾았습니다. 담당자별 진행 상황과 연동 문제를 공유하며 CMS와 모바일 서비스의 연결을 맞췄고, 공동의 목표를 기준으로 구현 방식을 조정하는 협업의 중요성을 배웠습니다. 현재 공개 데모는 서버 연결이 없어 샘플 데이터로 화면을 확인할 수 있습니다.",
    coverImage: "/projects/artar-busan/dashboard.jpg",
    screenImage: "/projects/artar-busan/artworks.jpg",
    coverLabel: "방문 통계 대시보드",
    screenLabel: "작품 QR 관리",
    galleryExtras: [
      { label: "장소 관리", image: "/projects/artar-busan/places.jpg" },
      { label: "작품 편집", image: "/projects/artar-busan/artwork-editor.jpg" },
    ],
    repositoryUrl: "https://github.com/2kminn/museum-admin-cms",
    liveUrl: "https://museum-admin-cms.vercel.app",
    contributions: [
      { title: "관리자 CMS", description: "장소·작품 등록과 수정, 노출 상태 관리, 다국어 작품 입력 화면을 구현했습니다." },
      { title: "QR 중심 운영 흐름", description: "작품별 QR URL과 출력 화면을 관리하고, 현장 모바일 관람 흐름에 맞춰 콘텐츠 구조를 정리했습니다." },
      { title: "통계와 권한", description: "방문 추이와 언어 비율을 보여주는 대시보드, 관리자 권한 및 승인 화면을 구현했습니다." },
      { title: "서비스 연동", description: "백엔드 개발과 API 연동을 보조하고, 모바일 앱 담당자와 데이터 형식 및 연결 문제를 함께 확인했습니다." },
    ],
    captureIntro: "관리자 CMS의 공개 데모에서 촬영했습니다. 서버 연결이 없어 샘플 데이터가 표시됩니다.",
    captureGroupDescriptions: {
      admin: "장소와 작품 정보를 관리하고, QR 기반 안내와 방문 통계를 확인하는 화면입니다.",
    },
    capturePlan: [
      { title: "방문 통계 대시보드", description: "샘플 방문 추이와 언어별 비중 시각화", format: "desktop", group: "admin", image: "/projects/artar-busan/dashboard.jpg" },
      { title: "작품 QR 관리", description: "작품별 정보, QR 생성 상태와 노출 여부를 확인", format: "desktop", group: "admin", image: "/projects/artar-busan/artworks.jpg" },
      { title: "작품 정보 편집", description: "다국어 작품 정보와 QR URL, 미디어 입력 영역", format: "desktop", group: "admin", image: "/projects/artar-busan/artwork-editor.jpg" },
      { title: "장소 관리", description: "모바일 앱에 표시할 미술관·문화공간 목록", format: "desktop", group: "admin", image: "/projects/artar-busan/places.jpg" },
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
