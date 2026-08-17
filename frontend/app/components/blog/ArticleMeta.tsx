export type Article = {
  author: string;
  date: string;
  readTime: string;
  title?: string;
  category?: string;
  excerpt?: string;
  image?: string;
  slug?: string;
};

type ArticleMetaProps = {
  article: Article;
};

export function ArticleMeta({ article }: ArticleMetaProps) {
  return (
    <div className="blog-premium-meta">
      <span>{article.author}</span>
      <span>{article.date}</span>
      <span>{article.readTime}</span>
    </div>
  );
}
