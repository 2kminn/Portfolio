export default function About() {
  return (
    <section id="about" className="section-layout" aria-labelledby="about-title">
      <div>
        <h2 id="about-title" className="section-title">About</h2>
        <p className="max-w-3xl text-[clamp(20px,2.2vw,27px)] leading-relaxed tracking-[-.045em]">I work across the interface and the server to understand how a product comes together.</p>
        <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-600">Add two or three sentences about how you work, the problems you enjoy solving, and what you value in a team.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[["NAME", "Gyeongmin Lee"], ["LOCATION", "[Your location]"], ["CONTACT", "[Email or contact link]"]].map(([label, value]) => <div key={label} className="border-t border-neutral-300 pt-4"><small className="font-mono text-xs text-neutral-500">{label}</small><p className="mt-2 text-[15px]">{value}</p></div>)}
        </div>
      </div>
    </section>
  );
}
