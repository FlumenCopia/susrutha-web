type BlogSectionHeaderProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
};

export function BlogSectionHeader({ eyebrow, title, titleId, description }: BlogSectionHeaderProps) {
  return (
    <div className="blog-premium-section-head">
      <span className="blog-premium-eyebrow">{eyebrow}</span>
      <h2 id={titleId}>{title}</h2>
      {description ? <p className="blog-premium-section-desc">{description}</p> : null}
    </div>
  );
}
