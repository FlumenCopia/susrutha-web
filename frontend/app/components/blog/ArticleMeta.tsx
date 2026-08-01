import type { Article } from "./blogData";

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
