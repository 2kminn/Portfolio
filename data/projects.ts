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
  learnings?: { title: string; description: string }[];
  coverImage?: string;
  screenImage?: string;
  structureImage?: string;
  structureMobileImage?: string;
  galleryExtras?: { label: string; image: string }[];
  galleryTabs?: { label: string; format?: "portrait"; images: { label: string; image: string }[] }[];
  galleryDisplay?: "portrait-group" | "sequence";
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
    summary: "경성대학교 종합설계프로젝트로 진행한 운동 서비스. 모바일과 백엔드를 연결하고 비콘 자동 출석과 헬스장 혼잡도 실시간 분석 기능을 구현했습니다.",
    role: "서비스 설계 · 프로젝트 전반 관리 · PWA 프론트엔드 개발 · 모바일·백엔드 연동",
    technologies: ["React", "Vite", "PWA", "Axios", "Android WebView", "Spring Boot API"],
    challenge: "운동 계획과 기록, 자세 분석, 헬스장 이용 정보가 분리되어 있어 사용자가 운동 전후로 여러 흐름을 오가야 했습니다. 웹 화면과 Android 앱, 백엔드가 함께 동작하는 구조를 정리하고 모바일에서도 일관된 사용 흐름을 만드는 것이 과제였습니다.",
    solution: "사용자·관리자 화면 흐름과 시스템 연동 구조를 설계하고 개발 진행을 관리했습니다. React PWA의 인증·운동·루틴·기록·통계·관리자 CMS 화면을 구현하고 모바일 앱과 백엔드 API를 연결했습니다. 비콘을 이용한 자동 출석과 헬스장 혼잡도 실시간 분석 기능도 구현했습니다.",
    result: "모바일 앱과 백엔드를 연결해 운동 기록과 관리 기능을 이어 주고, 비콘 자동 출석과 실시간 혼잡도 정보를 서비스에 반영했습니다. PWA 설치·업데이트, 계정별 로컬 데이터 분리, API 오류와 인증 만료 처리도 적용했습니다.",
    learnings: [
      {
        title: "WebView 연동에서는 실행 환경과 호출 규약을 함께 확인해야 했습니다",
        description: "웹의 운동 목록은 배열이지만 Android의 startWorkout은 쉼표로 구분한 문자열을 받으며, 일반 브라우저에는 해당 브리지 자체가 없습니다. 공통 브리지 함수에서 운동 ID를 문자열로 변환하고, 네이티브 메서드가 없거나 호출에 실패하면 웹 운동 화면으로 이어지도록 처리했습니다. 연동 기능은 호출 성공만 확인하는 것이 아니라, 양쪽의 데이터 형식과 기능을 사용할 수 없는 환경까지 함께 설계해야 한다는 점을 배웠습니다.",
      },
      {
        title: "인증과 오류 처리는 공통 API 계층에서 관리했습니다",
        description: "여러 화면이 API를 호출하는 구조에서는 토큰 첨부와 인증 만료 처리를 화면마다 작성할수록 중복과 누락이 생기기 쉽습니다. Axios 인터셉터에서 인증 헤더를 공통 적용하고, 401 응답에는 세션 정리와 로그인 이동을, 403·422 응답에는 상황에 맞는 오류 알림을 연결했습니다. 반복되는 통신 처리를 한곳에 모으면 개별 화면은 기능에 집중하고, 인증 정책도 일관되게 수정할 수 있다는 점을 배웠습니다.",
      },
      {
        title: "로컬 캐시에도 사용자 구분과 세션 전환 처리가 필요했습니다",
        description: "같은 기기에서 계정을 바꾸면 공통 저장 키에 남아 있는 루틴과 운동 기록이 다른 계정의 화면에 표시될 수 있습니다. 저장 키를 사용자 식별자 기준으로 분리하고, 로그아웃 시 해당 계정의 로컬 데이터와 Android 세션을 함께 정리하도록 구성했습니다. 운동 기록 요청은 시작 시점의 저장 키를 유지해 응답을 캐시하도록 했습니다. 캐시는 조회 속도와 오프라인 대응뿐 아니라 데이터의 소유자와 비동기 응답 시점까지 고려해야 한다는 점을 배웠습니다.",
      },
    ],
    coverImage: "/projects/moduflow/admin-cover.webp",
    screenImage: "/projects/moduflow/home.webp",
    structureImage: "/projects/moduflow/system-architecture.svg",
    structureMobileImage: "/projects/moduflow/system-architecture-mobile.svg",
    galleryExtras: [
      { label: "혼잡도", image: "/projects/moduflow/congestion.webp" },
      { label: "루틴 추가", image: "/projects/moduflow/exercise-detail.webp" },
    ],
    galleryDisplay: "portrait-group",
    galleryTabs: [
      { label: "운동 시작", format: "portrait", images: [
        { label: "홈", image: "/projects/moduflow/home.webp" },
        { label: "운동 목록", image: "/projects/moduflow/exercise-list.webp" },
        { label: "운동 상세", image: "/projects/moduflow/exercise-detail.webp" },
      ] },
      { label: "루틴·기록", format: "portrait", images: [
        { label: "루틴 관리", image: "/projects/moduflow/routines.webp" },
        { label: "운동 기록", image: "/projects/moduflow/stats-workout.webp" },
        { label: "운동존 상태", image: "/projects/moduflow/congestion.webp" },
      ] },
      { label: "관리자 CMS", images: [
        { label: "관리자 대시보드", image: "/projects/moduflow/admin-cms.webp" },
      ] },
      { label: "시스템 구성", images: [
        { label: "시스템 구성도", image: "/projects/moduflow/system-architecture.svg" },
      ] },
    ],
    structureCaption: "PWA, Android 앱, 백엔드, 자세 인식 서버의 연결 관계를 정리한 전체 시스템 구성도",
    contributions: [
      { title: "설계와 진행 관리", description: "화면 흐름, 전체 시스템 구성, 데이터 구조와 기능별 테스트 범위를 정리하고 개발 진행을 관리했습니다." },
      { title: "PWA 프론트엔드", description: "인증부터 운동·루틴·기록·통계·마이페이지, 관리자 CMS까지 화면과 공통 컴포넌트를 구현했습니다." },
      { title: "모바일·백엔드 연동", description: "Axios 공통 클라이언트와 WebView 브리지로 모바일 앱의 운동 실행·세션 정보와 백엔드 API를 연결했습니다." },
      { title: "비콘 출석·혼잡도", description: "비콘 신호를 이용한 자동 출석과 헬스장 혼잡도 실시간 분석 기능을 구현했습니다." },
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
    role: "관리자 CMS 프론트엔드 개발 · 백엔드 개발 및 API 연동 보조",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "FastAPI 연동", "QR 딥링크"],
    challenge: "초기에는 XR 스마트글라스로 시선만으로 작품 정보를 확인하는 방식을 구상했습니다. 그러나 기기 수급과 개발 환경의 제약으로 기간 내 안정적인 구현이 어려워졌습니다. 팀은 관람객에게 필요한 정보를 현장에서 쉽게 제공한다는 목표를 유지하면서 스마트폰과 작품별 QR을 활용하는 방향으로 전환했습니다.",
    solution: "방문 전 모바일 정보 탐색과 현장 QR 기반 작품 안내 흐름에 맞춰 관리자 CMS를 구성했습니다. React와 TypeScript로 장소·작품 등록 및 수정, 다국어 작품 정보, 작품별 QR 관리, 관리자 권한 흐름과 방문 통계 화면을 구현했습니다. 백엔드 개발과 관리자 CMS의 API 연동을 보조하며 데이터 형식과 오류를 팀원들과 함께 확인했습니다.",
    result: "XR 기기 제약 속에서도 스마트폰과 QR을 활용하는 방향으로 전환하고, 콘텐츠 등록부터 작품별 QR 관리와 방문 통계 확인까지 이어지는 관리자 CMS를 구현했습니다. 백엔드 연동을 보조하며 화면의 데이터 구조와 API 계약을 맞추고, 파일 업로드와 작품 저장을 단계별로 처리하는 방법을 익혔습니다.",
    learnings: [
      {
        title: "화면과 API의 데이터 구조를 변환 계층으로 연결했습니다",
        description: "다국어 작품 정보에서 화면은 일본어·중국어를 ja·zh로 관리하지만 API는 jp·cn을 사용했습니다. 이 차이를 그대로 두면 저장과 재조회 시 언어별 정보가 제대로 연결되지 않습니다. API 계층에 양방향 변환 함수를 두고, 응답의 노출 상태와 미디어 필드도 화면용 데이터로 정리했습니다. 화면마다 응답 형식에 맞추기보다 API 경계에서 한 번 변환하는 방식이 중복을 줄이고 변경 범위를 좁힌다는 점을 배웠습니다.",
      },
      {
        title: "이미지 업로드 오류는 요청 단계를 나눠 확인했습니다",
        description: "작품 이미지 저장은 업로드 URL 발급, 스토리지 전송, 작품 정보 저장으로 이어져 최종 저장 실패만으로는 원인을 파악하기 어렵습니다. 서명 URL을 발급받아 스토리지에 직접 PUT으로 파일을 보내고, 성공한 공개 URL을 작품 정보에 넣도록 구현했습니다. 전송 시 발급 응답의 Content-Type을 사용하고 URL 발급 실패와 스토리지 전송 실패를 구분해 안내했습니다. 파일 전송과 메타데이터 저장을 분리하면 실패 지점을 좁혀 확인할 수 있다는 점을 배웠습니다.",
      },
      {
        title: "QR 연결 주소는 백엔드 응답을 기준으로 관리했습니다",
        description: "CMS에서 QR 주소를 별도로 조합하면 모바일 앱이 기대하는 작품 식별값이나 경로와 어긋날 수 있습니다. 작품 저장 응답의 code와 qr_url을 화면 데이터에 반영하고, 같은 URL을 QR 미리보기·PNG 다운로드·인쇄에 사용하도록 구성했습니다. QR은 이미지를 생성하는 기능에 그치지 않고 실제 작품 정보로 연결되는 계약이므로, 식별값과 주소의 생성 기준을 한곳에서 관리하는 것이 중요하다는 점을 배웠습니다.",
      },
    ],
    coverImage: "/projects/artar-busan/dashboard.jpg",
    screenImage: "/projects/artar-busan/artworks.jpg",
    structureImage: "/projects/artar-busan/system-architecture.svg",
    structureMobileImage: "/projects/artar-busan/system-architecture-mobile.svg",
    structureCaption: "관리자 승인과 CMS 콘텐츠 등록, FastAPI 연동, 모바일 앱의 QR 관람과 통계 조회를 연결한 최종 구현 흐름",
    coverLabel: "방문 통계 대시보드",
    screenLabel: "작품 QR 관리",
    galleryExtras: [
      { label: "장소 관리", image: "/projects/artar-busan/places.jpg" },
      { label: "작품 편집", image: "/projects/artar-busan/artwork-editor.jpg" },
      { label: "미술관 등록", image: "/projects/artar-busan/museum-registration.jpg" },
      { label: "슈퍼유저 승인", image: "/projects/artar-busan/super-admin-approval.jpg" },
    ],
    galleryTabs: [
      { label: "등록·승인", images: [
        { label: "관리자 등록", image: "/projects/artar-busan/museum-registration.jpg" },
        { label: "슈퍼유저 승인", image: "/projects/artar-busan/super-admin-approval.jpg" },
      ] },
      { label: "방문 통계", images: [
        { label: "방문 통계 대시보드", image: "/projects/artar-busan/dashboard.jpg" },
      ] },
      { label: "장소 관리", images: [
        { label: "장소 등록", image: "/projects/artar-busan/place-registration.jpg" },
        { label: "장소 목록", image: "/projects/artar-busan/places.jpg" },
      ] },
      { label: "작품 관리", images: [
        { label: "작품 목록·QR 관리", image: "/projects/artar-busan/artworks.jpg" },
        { label: "작품 등록", image: "/projects/artar-busan/artwork-registration.jpg" },
        { label: "작품 수정", image: "/projects/artar-busan/artwork-editor.jpg" },
      ] },
    ],
    contributions: [
      { title: "관리자 CMS", description: "장소·작품 등록과 수정, 노출 상태 관리, 다국어 작품 입력 화면을 구현했습니다." },
      { title: "QR 중심 운영 흐름", description: "작품별 QR URL과 출력 화면을 관리하고, 현장 모바일 관람 흐름에 맞춰 콘텐츠 구조를 정리했습니다." },
      { title: "통계와 권한", description: "방문 추이와 언어 비율을 보여주는 대시보드, 관리자 권한 및 승인 화면을 구현했습니다." },
      { title: "백엔드 연동 보조", description: "백엔드 개발과 관리자 CMS의 API 연동을 보조하고, 데이터 형식과 오류를 함께 확인했습니다." },
    ],
    captureIntro: "관리자 CMS의 공개 데모에서 촬영했습니다. 서버 연결이 없어 샘플 데이터가 표시됩니다.",
    captureGroupDescriptions: {
      admin: "장소와 작품 정보를 관리하고, QR 기반 안내와 방문 통계를 확인하는 화면입니다.",
    },
    capturePlan: [
      { title: "미술관 등록 신청", description: "기관 정보 입력과 서버 없이 확인할 수 있는 임시 신청 흐름", format: "desktop", group: "admin", image: "/projects/artar-busan/museum-registration.jpg" },
      { title: "슈퍼유저 승인", description: "관리자 신청 목록 확인과 승인·거절 처리", format: "desktop", group: "admin", image: "/projects/artar-busan/super-admin-approval.jpg" },
      { title: "방문 통계 대시보드", description: "샘플 방문 추이와 언어별 비중 시각화", format: "desktop", group: "admin", image: "/projects/artar-busan/dashboard.jpg" },
      { title: "장소 등록", description: "모바일 앱에 표시할 장소 정보 입력", format: "desktop", group: "admin", image: "/projects/artar-busan/place-registration.jpg" },
      { title: "장소 목록", description: "등록한 미술관·문화공간 목록과 노출 상태 확인", format: "desktop", group: "admin", image: "/projects/artar-busan/places.jpg" },
      { title: "작품 목록·QR 관리", description: "작품별 정보, QR 생성 상태와 노출 여부를 확인", format: "desktop", group: "admin", image: "/projects/artar-busan/artworks.jpg" },
      { title: "작품 등록", description: "다국어 작품 정보, 미디어와 노출 상태 입력", format: "desktop", group: "admin", image: "/projects/artar-busan/artwork-registration.jpg" },
      { title: "작품 정보 수정", description: "등록된 작품의 다국어 정보와 미디어 수정", format: "desktop", group: "admin", image: "/projects/artar-busan/artwork-editor.jpg" },
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
