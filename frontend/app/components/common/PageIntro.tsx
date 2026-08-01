type PageIntroProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function PageIntro({ eyebrow, title, copy }: PageIntroProps) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}
