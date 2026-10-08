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
        <FadeIn className="mb-14 text-center sm:mb-20" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">04 / CAREER & ACTIVITIES</p>
          <h2 id="experience-title" className="font-display text-[clamp(56px,10vw,140px)] leading-none font-black tracking-normal uppercase">Experience</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-600">실무 경험과 교내 프로젝트, 해커톤 활동</p>
        </FadeIn>
        <div className="relative">
          <div aria-hidden="true" className="absolute top-2 bottom-0 left-1 w-px bg-[#0C0C0C]/15 md:left-[224px]" />
          <ol>
            {experience.map((item, index) => (
              <li key={`${item.company}-${index}`} className="pb-10 last:pb-0 sm:pb-12">
                <FadeIn className="relative grid gap-3 pl-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-x-6 md:pl-0" delay={Math.min(index, 3) * 0.04} y={20}>
                  <span aria-hidden="true" className="absolute top-2 left-0 size-[9px] rounded-full border-2 border-[#667A8A] bg-white md:left-[220px]" />
                  <div className="min-w-0">
                    <p className="font-mono text-sm leading-7 font-medium text-[#304657]">{item.date}</p>
                    <p className="mt-1 text-sm text-neutral-500">{item.category}</p>
                  </div>
                  <article className="min-w-0 border-b border-black/10 pb-10 md:pl-8">
                    <h3 className="text-[clamp(23px,2.6vw,34px)] leading-snug font-semibold tracking-[-.04em] break-keep">{item.company}</h3>
                    <p className="mt-3 text-base font-medium leading-7 text-[#333]">{item.roles.join(" · ")}</p>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-neutral-600 break-keep">{item.description}</p>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
