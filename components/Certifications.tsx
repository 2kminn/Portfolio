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
    <section id="certifications" className="section-layout" aria-labelledby="certifications-title">
      <div>
        <h2 id="certifications-title" className="section-title">자격사항</h2>
        {certifications.map((certificate) => <div className="record" key={certificate.name}>
          <time className="record-label" dateTime={certificate.date.replaceAll(".", "-")}>{certificate.date}</time>
          <div><h3>{certificate.name}</h3><p>{certificate.issuer}{certificate.detail ? ` · ${certificate.detail}` : ""}</p></div>
        </div>)}
      </div>
    </section>
  );
}
