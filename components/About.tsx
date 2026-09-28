import { Award, CalendarDays, GraduationCap, Mail, Phone, UserRound } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-layout" aria-labelledby="about-title">
      <div>
        <h2 id="about-title" className="section-title">소개</h2>
        <p className="max-w-3xl text-[clamp(20px,2.2vw,27px)] leading-relaxed tracking-[-.045em]">사용자의 화면부터 서버의 구조까지, 서비스가 완성되는 과정을 폭넓게 이해하는 개발자입니다.</p>
        <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-600">개발 관점과 일하는 방식을 이곳에 작성해 주세요. 어떤 문제에 관심이 있고, 협업할 때 무엇을 중요하게 생각하는지 구체적으로 적으면 좋습니다.</p>
        <div className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <UserRound aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">이름</p><p className="mt-2 text-base text-neutral-600">이경민</p></div>
          </div>
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <CalendarDays aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">생년월일</p><p className="mt-2 text-base text-neutral-600">2002.03.24</p></div>
          </div>
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <GraduationCap aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">학교</p><p className="mt-2 text-base text-neutral-600">경성대학교<br /><span className="text-sm text-neutral-500">2027년 2월 졸업 예정</span></p></div>
          </div>
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <Award aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">학점</p><p className="mt-2 text-base text-neutral-600">4.04 / 4.5</p></div>
          </div>
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <Phone aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">연락처</p><a className="mt-2 inline-block text-base text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-black" href="tel:***REMOVED***">***REMOVED***</a></div>
          </div>
          <div className="flex gap-5 border-t border-neutral-300 py-5">
            <Mail aria-hidden="true" className="mt-1 size-6 shrink-0" strokeWidth={1.7} />
            <div><p className="text-sm font-semibold">이메일</p><a className="mt-2 inline-block break-all text-base text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-black" href="mailto:dlrudals1589@naver.com">dlrudals1589@naver.com</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
