import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/data/profile";
import Image from "next/image";

const facts = [
  { key: "name", label: "이름", value: profile.name },
  { key: "education", label: "학력", value: profile.education },
  { key: "gpa", label: "학점", value: profile.gpa },
  { key: "birth", label: "생년월일", value: profile.birthDate },
  { key: "email", label: "이메일", value: profile.email, href: `mailto:${profile.email}` },
  { key: "phone", label: "연락처", value: profile.phone.label, href: `tel:${profile.phone.tel}` },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="cli-section">
      <div className="cli-container">
        <SectionHeading id="about-title" title="소개" command="cat about.md" />
        <div className="cli-about-grid">
          <div className="cli-lead-block">
            <span className="cli-line-no" aria-hidden="true">01—04</span>
            <p className="cli-lead">사용자의 화면부터 서버의 구조까지, 서비스가 완성되는 과정을 폭넓게 이해하는 개발자입니다.</p>
            <p className="cli-body">프론트엔드와 백엔드를 함께 살피며 더 나은 경험을 만드는 데 관심이 있습니다.</p>
          </div>
          <div className="cli-about-side">
            <figure className="cli-portrait">
              <div className="cli-portrait-frame">
                {profile.photoUrl ? (
                  <Image src={profile.photoUrl} alt={`${profile.name} 프로필 사진`} fill sizes="(max-width: 640px) 75vw, 260px" className="cli-portrait-image" />
                ) : (
                  <div className="cli-portrait-placeholder" aria-label="프로필 사진 자리">
                    <span className="cli-portrait-cross" aria-hidden="true">+</span>
                    <span className="cli-portrait-initial" aria-hidden="true">KM</span>
                    <span className="cli-portrait-status">사진 준비 중</span>
                  </div>
                )}
              </div>
              <figcaption>profile.jpg <span>01 / identity</span></figcaption>
            </figure>
            <dl className="cli-facts">
              {facts.map(({ key, label, value, href }) => <div className="cli-fact" key={key}>
                <dt>{label}</dt>
                <dd>{href ? <a href={href}>{value}</a> : value}</dd>
              </div>)}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
