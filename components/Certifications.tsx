import FadeIn from "@/components/FadeIn";

type Certification = { name: string; date: string; issuer: string; detail?: string };

const certifications: Certification[] = [
  { name: "네트워크관리사 2급", date: "2026.09.22", issuer: "한국정보통신자격협회", detail: "유효기간 2031.09.21까지" },
  { name: "정보처리기사", date: "2026.09.11", issuer: "한국산업인력공단" },
  { name: "ADsP · 데이터분석 준전문가", date: "2026.06.05", issuer: "한국데이터산업진흥원", detail: "유효기간 영구" },
  { name: "리눅스마스터 2급", date: "2026.04.03", issuer: "국가공인 정보통신기술자격" },
  { name: "SQLD · SQL 개발자", date: "2025.12.12", issuer: "한국데이터산업진흥원", detail: "유효기간 2027.12.12까지" },
];

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="min-h-[100svh] bg-[#F1F3F4] px-5 py-24 text-[#0C0C0C] sm:px-8 sm:py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center sm:mb-24" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">05 / QUALIFICATIONS</p>
          <h2 id="certifications-title" className="font-display text-[clamp(45px,8vw,116px)] leading-none font-black tracking-normal uppercase">Certifications</h2>
        </FadeIn>
        {certifications.map((certificate, index) => (
          <FadeIn key={certificate.name} className="grid gap-4 border-t border-black/15 py-6 sm:grid-cols-[minmax(110px,.22fr)_minmax(0,1fr)] sm:gap-8 sm:py-8" delay={Math.min(index, 3) * 0.08} y={24}>
            <span className="font-display text-[clamp(44px,6vw,76px)] leading-none font-black tracking-normal">{String(index + 1).padStart(2, "0")}</span>
            <div><time className="font-mono text-xs tracking-[.1em] text-neutral-500" dateTime={certificate.date.replaceAll(".", "-")}>{certificate.date}</time><h3 className="mt-2 text-[clamp(21px,2.6vw,32px)] font-semibold tracking-[-.04em]">{certificate.name}</h3><p className="mt-2 text-sm leading-7 text-neutral-600">{certificate.issuer}{certificate.detail ? ` · ${certificate.detail}` : ""}</p></div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
