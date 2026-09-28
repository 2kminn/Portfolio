type Certification = { name: string; date: string; issuer: string; detail?: string };

const certifications: Certification[] = [
  { name: "Network Administrator Level 2", date: "2026.09.22", issuer: "ICQA", detail: "Valid through 2031.09.21" },
  { name: "Engineer Information Processing", date: "2026.09.11", issuer: "HRD Korea" },
  { name: "ADsP · Advanced Data Analytics Semi-Professional", date: "2026.06.05", issuer: "KDATA", detail: "No expiration" },
  { name: "Linux Master Level 2", date: "2026.04.03", issuer: "Nationally accredited ICT qualification" },
  { name: "SQLD · SQL Developer", date: "2025.12.12", issuer: "KDATA", detail: "Valid through 2027.12.12" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-layout" aria-labelledby="certifications-title">
      <div>
        <h2 id="certifications-title" className="section-title">Certifications</h2>
        {certifications.map((certificate) => <div className="record" key={certificate.name}>
          <time className="record-label" dateTime={certificate.date.replaceAll(".", "-")}>{certificate.date}</time>
          <div><h3>{certificate.name}</h3><p>{certificate.issuer}{certificate.detail ? ` · ${certificate.detail}` : ""}</p></div>
        </div>)}
      </div>
    </section>
  );
}
