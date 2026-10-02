import { Award, CalendarDays, GraduationCap, Mail, Phone, UserRound } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import FadeIn from "@/components/FadeIn";

const introduction = "사용자의 화면부터 서버의 구조까지, 서비스가 완성되는 과정을 폭넓게 이해하는 개발자입니다. 프론트엔드와 백엔드를 함께 살피며 더 나은 경험을 만드는 데 관심이 있습니다.";

const facts = [
  { label: "이름", value: "이경민", icon: UserRound },
  { label: "생년월일", value: "2002.03.24", icon: CalendarDays },
  { label: "학교", value: "경성대학교 · 2027년 2월 졸업 예정", icon: GraduationCap },
  { label: "학점", value: "4.04 / 4.5", icon: Award },
  { label: "연락처", value: "***REMOVED***", href: "tel:***REMOVED***", icon: Phone },
  { label: "이메일", value: "dlrudals1589@naver.com", href: "mailto:dlrudals1589@naver.com", icon: Mail },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-section relative isolate min-h-[100svh] overflow-hidden bg-[#0C0C0C] px-5 py-24 text-[#D7E2EA] sm:px-8 md:px-10 md:py-32">
      <div aria-hidden="true" className="about-orb absolute top-[6%] left-[4%] size-28 sm:size-40 md:size-52" />
      <div aria-hidden="true" className="about-wire absolute right-[4%] top-[5%] size-28 sm:size-40 md:size-52" />
      <div aria-hidden="true" className="about-cube absolute bottom-[20%] left-[5%] size-20 sm:size-32 md:size-44" />
      <div aria-hidden="true" className="about-ring absolute right-[7%] bottom-[18%] size-24 sm:size-36 md:size-48" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <FadeIn className="w-full text-center" y={40}>
          <p className="mb-6 font-mono text-xs tracking-[.35em] text-[#93A4B0]">01 / PROFILE</p>
          <h2 id="about-title" className="hero-heading font-display text-[clamp(64px,12vw,160px)] leading-none font-black tracking-normal uppercase">About Me</h2>
        </FadeIn>

        <div className="mt-16 sm:mt-20 md:mt-24"><AnimatedText text={introduction} /></div>
        <div className="mt-16 grid w-full gap-x-10 gap-y-0 border-t border-white/15 pt-5 sm:mt-20 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
          {facts.map(({ label, value, href, icon: Icon }, index) => (
            <FadeIn key={label} className="flex gap-4 border-b border-white/15 py-6" delay={Math.min(index, 3) * 0.08} y={20}>
              <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-[#AFC1CC]" strokeWidth={1.5} />
              <div className="min-w-0"><p className="mb-2 font-mono text-[11px] tracking-[.16em] text-[#85939C] uppercase">{label}</p>
                {href ? <a className="break-all text-sm text-[#E7EEF3] underline decoration-white/30 underline-offset-4 hover:decoration-white" href={href}>{value}</a> : <p className="text-sm text-[#E7EEF3]">{value}</p>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
