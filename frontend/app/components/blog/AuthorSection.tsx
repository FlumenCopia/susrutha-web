import Image from "next/image";
import { BlogSectionHeader } from "./BlogSectionHeader";
import { blogAuthors } from "./blogData";

export function AuthorSection() {
  return (
    <section className="blog-premium-authors" aria-labelledby="authors-title">
      <BlogSectionHeader eyebrow="Editorial Voices" title="Insights from physicians, researchers, and care guides." titleId="authors-title" />
      <div className="blog-premium-author-grid">
        {blogAuthors.map((author) => (
          <article className="blog-premium-author-card" key={author.name}>
            <Image src={author.image} alt={author.name} width={220} height={260} />
            <div>
              <h3>{author.name}</h3>
              <p>{author.role}</p>
              <span>
                <a href="#" aria-label={`${author.name} on LinkedIn`}>in</a>
                <a href="#" aria-label={`${author.name} articles`}>ar</a>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
