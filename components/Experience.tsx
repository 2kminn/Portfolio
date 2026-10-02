import FadeIn from "@/components/FadeIn";

const experience = [
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

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative z-30 -mt-10 min-h-[100svh] rounded-t-[40px] bg-white px-5 py-24 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center sm:mb-24" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">04 / CAREER & ACTIVITIES</p>
          <h2 id="experience-title" className="font-display text-[clamp(56px,10vw,140px)] leading-none font-black tracking-normal uppercase">Experience</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-600">실무 경험과 교내 프로젝트, 해커톤 활동</p>
        </FadeIn>
        {experience.map((item, index) => (
          <FadeIn key={`${item.company}-${index}`} className="grid gap-5 border-t border-black/15 py-9 sm:grid-cols-[minmax(110px,.25fr)_minmax(0,1fr)] sm:gap-8 sm:py-12" delay={Math.min(index, 3) * 0.08}>
            <span className="font-display text-[clamp(62px,9vw,130px)] leading-none font-black tracking-normal">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex min-w-0 flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs tracking-[.1em] text-neutral-500"><span>{item.date}</span><span>{item.category}</span></div>
              <h3 className="mt-3 text-[clamp(24px,3vw,42px)] leading-tight font-semibold tracking-[-.05em] break-keep">{item.company}</h3>
              <p className="mt-4 text-sm font-medium leading-6 text-[#333] sm:text-base">{item.roles.join(" · ")}</p>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-neutral-600 break-keep sm:text-base sm:leading-8">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
