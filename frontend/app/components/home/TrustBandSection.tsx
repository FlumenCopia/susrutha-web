const careHighlights = [
  "Panchakarma hospital care",
  "Online consultation",
  "Home consultation within 30 km",
  "Lab services and sampling",
];

export function TrustBandSection() {
  return (
    <section className="trust-band" aria-label="Care highlights">
      {careHighlights.map((item) => (
        <div key={item}>
          <span />
          <p>{item}</p>
        </div>
      ))}
    </section>
  );
}
