type BlogSectionHeaderProps = {
  eyebrow: string;
  title: string;
  titleId: string;
};

export function BlogSectionHeader({ eyebrow, title, titleId }: BlogSectionHeaderProps) {
  return (
    <div className="blog-premium-section-head">
      <span>{eyebrow}</span>
      <h2 id={titleId}>{title}</h2>
    </div>
  );
}
