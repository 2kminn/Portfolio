export default function StickyNotePaper({ id }: { id: string }) {
  const surfaces = [
    {
      className: "cli-skill-bend",
      outline: "M0 0H320V184C320 211 322 234 328 250H1C0 234 0 211 0 184Z",
      shadow: "M2 241C78 246 234 245 320 242L316 258C239 262 71 261 -6 257Z",
      edge: "M1 249.5H327.8",
    },
    {
      className: "cli-skill-straight",
      outline: "M0 0H320V250H0Z",
      shadow: "M4 241C80 246 240 246 316 241V258C240 262 80 262 4 258Z",
      edge: "M0 249.5H320",
    },
  ];

  return (
    <svg className="cli-skill-sheet" viewBox="0 0 320 250" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id + "-adhesive"} x1="0" y1="0" x2="0" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#473c23" stopOpacity=".045" />
          <stop offset="1" stopColor="#473c23" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id + "-light"} x1="0" y1="140" x2="0" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".035" />
          <stop offset=".75" stopColor="#fff" stopOpacity=".2" />
          <stop offset="1" stopColor="#fff" stopOpacity=".36" />
        </linearGradient>
        <filter id={id + "-shadow"} filterUnits="userSpaceOnUse" x="-24" y="218" width="374" height="66" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {surfaces.map((surface) => (
        <g key={surface.className} className={surface.className}>
          <path d={surface.shadow} fill="#30291c" fillOpacity=".23" filter={"url(#" + id + "-shadow)"} />
          <path d={surface.outline} fill="var(--note-paper)" />
          <path d={surface.outline} fill={"url(#" + id + "-adhesive)"} />
          <path d={surface.outline} fill={"url(#" + id + "-light)"} />
          <path d={surface.edge} fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth=".8" />
        </g>
      ))}
    </svg>
  );
}
