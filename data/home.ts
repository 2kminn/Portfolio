export type Experience = {
  date: string;
  category: string;
  company: string;
  roles: string[];
  description: string;
};

export type Certification = {
  name: string;
  date: string;
  issuer: string;
  detail?: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};

export const experiences: Experience[] = [
  {
    date: "2026.09 — 2026.12 예정",
    category: "인턴 · 진행 중",
    company: "토탈소프트뱅크",
    roles: ["소프트웨어 테스트 및 오류 분석", "기능 개선 및 PoC 개발"],
    description: "선박 탑재용 로딩컴퓨터 기능을 테스트하고 오류를 분석·보고했습니다. 탱크 배치 자동화 방안을 설계·제안하고 PoC를 구현했습니다.",
  },
  {
    date: "2026.07",
    category: "교육 · 해커톤",
    company: "부산권 대학연합 AI 기반 IT 직무 기술 전환교육 및 해커톤",
    roles: ["서비스 기획 및 설계", "프론트엔드 개발"],
    description: "MediaPipe와 MLP를 활용한 실시간 수어 인식 PWA 웹앱을 개발했습니다. 수어 학습·피드백·기록 기능과 사용자 중심 UI/UX를 구현해 우수상(총장상)을 받았습니다.",
  },
  {
    date: "2026.03 — 2026.06",
    category: "캡스톤디자인",
    company: "경성대학교 캡스톤디자인",
    roles: ["프론트엔드 개발", "백엔드 개발 보조"],
    description: "React·TypeScript 기반 미술관 관리자 CMS 프론트엔드를 개발했습니다. QR 기반 작품 관리와 방문자 통계 시각화 기능을 구현하고 백엔드 API 연동을 지원했습니다.",
  },
  {
    date: "2026.03 — 2026.06",
    category: "팀 프로젝트",
    company: "경성대학교 팀프로젝트",
    roles: ["서비스 기획 및 설계", "프론트엔드 개발 및 백엔드 개발 보조"],
    description: "헬스케어 서비스를 기획·설계하고 프론트엔드를 개발했습니다. 운동 루틴·출석·기록·통계 시각화 기능을 구현하고 사용자 인증과 서비스 전반의 백엔드 API 연동을 지원했습니다.",
  },
  {
    date: "2023.12.04 — 2024.02.29",
    category: "연구보조 근로",
    company: "국립식량과학원",
    roles: ["데이터 분석 및 시각화", "연구 샘플 채집 및 분석"],
    description: "연구용 샘플 데이터를 수집하고 분석 장비를 활용해 측정·분석했습니다. 결과 데이터의 정합성을 검증하고 Excel로 정리·시각화했습니다. 고용 형태는 일반근로자였습니다.",
  },
];

export const certifications: Certification[] = [
  { name: "네트워크관리사 2급", date: "2026.09.22", issuer: "한국정보통신자격협회", detail: "유효기간 2031.09.21까지" },
  { name: "정보처리기사", date: "2026.09.11", issuer: "한국산업인력공단" },
  { name: "ADsP · 데이터분석 준전문가", date: "2026.06.05", issuer: "한국데이터산업진흥원", detail: "유효기간 영구" },
  { name: "리눅스마스터 2급", date: "2026.04.03", issuer: "국가공인 정보통신기술자격" },
  { name: "SQLD · SQL 개발자", date: "2025.12.12", issuer: "한국데이터산업진흥원", detail: "유효기간 2027.12.12까지" },
  { name: "운전면허 1종 보통", date: "2021.01.04", issuer: "경찰청", detail: "발급일 기준" },
];

export const skillGroups: SkillGroup[] = [
  { name: "Language", skills: ["Java", "TypeScript", "JavaScript"] },
  { name: "Backend", skills: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "FastAPI", "REST API", "JWT Authentication"] },
  { name: "Frontend & Mobile", skills: ["React", "React Native", "Expo", "Vite", "Tailwind CSS", "PWA", "Android WebView"] },
  { name: "Database", skills: ["MySQL", "SQLite"] },
  { name: "Infrastructure & Deployment", skills: ["Vercel", "Git", "GitHub"] },
  { name: "AI & Computer Vision", skills: ["MediaPipe", "OpenCV"] },
];
