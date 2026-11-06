import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/data/home";

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="cli-section">
      <div className="cli-container">
        <SectionHeading id="certifications-title" title="자격" command="ls ./certifications" />
        <ul className="cli-cert-list">
          {certifications.map(certificate => <li key={certificate.name}>
            <span className="cli-cert-icon" aria-hidden="true">▣</span>
            <div><h3>{certificate.name}</h3><p>{certificate.issuer}{certificate.detail ? ` / ${certificate.detail}` : ''}</p></div>
            <time dateTime={certificate.date.replaceAll('.', '-')}>{certificate.date}</time>
          </li>)}
        </ul>
      </div>
    </section>
  );
}
