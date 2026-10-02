import FadeIn from "@/components/FadeIn";

const experience = [
  { date: "2026.09 — 현재", company: "토탈소프트뱅크", role: "인턴" },
  { date: "2023.12.04 — 2024.02.29", company: "국립식량과학원", role: "연구보조 아르바이트 · 일반근로자" },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative z-30 -mt-10 min-h-[100svh] rounded-t-[40px] bg-white px-5 py-24 text-[#0C0C0C] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-28 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center sm:mb-24" y={40}>
          <p className="mb-5 font-mono text-xs tracking-[.35em] text-neutral-500">04 / CAREER</p>
          <h2 id="experience-title" className="font-display text-[clamp(56px,10vw,140px)] leading-none font-black tracking-normal uppercase">Experience</h2>
        </FadeIn>
        {experience.map((item, index) => (
          <FadeIn key={item.company} className="grid gap-5 border-t border-black/15 py-9 sm:grid-cols-[minmax(110px,.25fr)_minmax(0,1fr)] sm:gap-8 sm:py-12" delay={index * 0.1}>
            <span className="font-display text-[clamp(62px,9vw,130px)] leading-none font-black tracking-normal">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex flex-col justify-center"><time className="font-mono text-xs tracking-[.12em] text-neutral-500">{item.date}</time><h3 className="mt-3 text-[clamp(24px,3vw,42px)] font-semibold tracking-[-.05em]">{item.company}</h3><p className="mt-4 text-base text-neutral-600">{item.role}</p></div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
