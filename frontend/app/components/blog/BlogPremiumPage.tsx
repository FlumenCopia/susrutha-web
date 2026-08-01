import Image from "next/image";
import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

type Author = {
  name: string;
  role: string;
  image: string;
};

const categories = ["All", "Technology", "Design", "Business", "Innovation", "Insights"];

const articles: Article[] = [
  {
    slug: "panchakarma-preparation-guide",
    title: "A Clear, Calm Guide to Preparing for Panchakarma",
    excerpt: "How consultation, diet, rest, and therapy timing come together before a classical cleansing journey.",
    category: "Insights",
    author: "Dr. Krishnakumar K.",
    date: "Aug 01, 2026",
    readTime: "7 min read",
    image: "/images/treatment-panchakarma.webp",
  },
  {
    slug: "ayurveda-for-back-pain",
    title: "Rethinking Back Pain Through Ayurveda and Recovery Design",
    excerpt: "An expert-led look at pain, posture, mobility, oil therapies, and strengthening routines.",
    category: "Design",
    author: "Dr. Rajesh R.",
    date: "Jul 26, 2026",
    readTime: "6 min read",
    image: "/images/treatment-kati-vasti.webp",
  },
  {
    slug: "seasonal-wellness-ayurveda",
    title: "Seasonal Wellness Systems for Better Energy",
    excerpt: "Practical routines for digestion, immunity, sleep, and preventive health through seasonal shifts.",
    category: "Innovation",
    author: "Dr. Anju S.",
    date: "Jul 18, 2026",
    readTime: "5 min read",
    image: "/images/about-purpose-still-life.webp",
  },
  {
    slug: "panchakarma-preparation-guide",
    title: "Inside a Modern Ayurveda Hospital Care Journey",
    excerpt: "What a patient experiences from first consultation to inpatient rhythm and physician review.",
    category: "Business",
    author: "Care Team",
    date: "Jul 09, 2026",
    readTime: "8 min read",
    image: "/images/ayurveda-hospital-garden.webp",
  },
  {
    slug: "ayurveda-for-back-pain",
    title: "The Future of Integrative Pain Care",
    excerpt: "How clinical planning, traditional therapy, and lifestyle intelligence can support long-term comfort.",
    category: "Technology",
    author: "Research Desk",
    date: "Jun 30, 2026",
    readTime: "9 min read",
    image: "/images/doctors-ayurveda-mortar-hero.webp",
  },
  {
    slug: "seasonal-wellness-ayurveda",
    title: "Daily Rituals That Make Preventive Care Feel Effortless",
    excerpt: "A refined editorial guide to food timing, rest, movement, and practical self-observation.",
    category: "Insights",
    author: "Wellness Team",
    date: "Jun 21, 2026",
    readTime: "4 min read",
    image: "/images/faq-ayurveda-still-life.webp",
  },
];

const authors: Author[] = [
  { name: "Dr. Krishnakumar K.", role: "Senior Ayurveda Physician", image: "/images/doctor-portrait.webp" },
  { name: "Dr. Priyanka R.", role: "Women's Health Specialist", image: "/images/doctor-meera-das.webp" },
  { name: "Research Desk", role: "Clinical Insights Team", image: "/images/founder-arjun-das.webp" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4c3 11 9 17 20 20-11 3-17 9-20 20-3-11-9-17-20-20 11-3 17-9 20-20Z" />
      <path d="M24 14c1.5 5.5 4.5 8.5 10 10-5.5 1.5-8.5 4.5-10 10-1.5-5.5-4.5-8.5-10-10 5.5-1.5 8.5-4.5 10-10Z" />
    </svg>
  );
}

function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="blog-premium-meta">
      <span>{article.author}</span>
      <span>{article.date}</span>
      <span>{article.readTime}</span>
    </div>
  );
}

function BlogHero() {
  const article = articles[0];

  return (
    <section className="blog-premium-hero" aria-labelledby="blog-premium-title">
      <div className="blog-premium-hero-bg" aria-hidden="true">
        <Image src="/images/about-hero-ayurveda-still-life.webp" alt="" fill priority sizes="100vw" />
      </div>
      <div className="blog-premium-orbit" aria-hidden="true" />
      <div className="blog-premium-hero-copy">
        <span className="blog-premium-kicker">
          <SparkIcon />
          Susrutha Journal
        </span>
        <h1 id="blog-premium-title">Ideas for a more balanced way to live, heal, and think.</h1>
        <p>
          A premium editorial space for Ayurveda, preventive care, clinical insight, hospital journeys, and modern wellness intelligence.
        </p>
        <div className="blog-premium-hero-actions">
          <Link href={`/blogs/${article.slug}`}>
            Read the feature
            <ArrowIcon />
          </Link>
          <a href="#blog-grid">Explore articles</a>
        </div>
      </div>

      <article className="blog-premium-hero-feature">
        <span>{article.category}</span>
        <h2>{article.title}</h2>
        <ArticleMeta article={article} />
        <Link href={`/blogs/${article.slug}`} aria-label={`Read ${article.title}`}>
          Open article
          <ArrowIcon />
        </Link>
      </article>
    </section>
  );
}

function BlogCategories() {
  return (
    <nav className="blog-premium-categories" aria-label="Blog categories">
      {categories.map((category) => (
        <a href="#blog-grid" className={category === "All" ? "is-active" : undefined} key={category}>
          {category}
        </a>
      ))}
    </nav>
  );
}

function FeaturedBlog() {
  const [primary, secondary, tertiary] = articles;

  return (
    <section className="blog-premium-featured" aria-labelledby="featured-articles-title">
      <div className="blog-premium-section-head">
        <span>Featured Articles</span>
        <h2 id="featured-articles-title">Magazine-style stories with clinical depth.</h2>
      </div>
      <div className="blog-premium-featured-layout">
        <article className="blog-premium-featured-card blog-premium-featured-card-large">
          <Image src={primary.image} alt="" fill sizes="(max-width: 900px) 100vw, 58vw" />
          <div>
            <span>{primary.category}</span>
            <h3>{primary.title}</h3>
            <p>{primary.excerpt}</p>
            <ArticleMeta article={primary} />
          </div>
          <Link href={`/blogs/${primary.slug}`} aria-label={`Read ${primary.title}`}>
            <ArrowIcon />
          </Link>
        </article>

        {[secondary, tertiary].map((article) => (
          <article className="blog-premium-featured-card" key={`${article.slug}-${article.category}`}>
            <Image src={article.image} alt="" fill sizes="(max-width: 900px) 100vw, 30vw" />
            <div>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <ArticleMeta article={article} />
            </div>
            <Link href={`/blogs/${article.slug}`} aria-label={`Read ${article.title}`}>
              <ArrowIcon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="blog-premium-grid-section" id="blog-grid" aria-labelledby="blog-grid-title">
      <div className="blog-premium-section-head">
        <span>Latest Thinking</span>
        <h2 id="blog-grid-title">Asymmetric reads, built for discovery.</h2>
      </div>
      <div className="blog-premium-grid">
        {articles.map((article, index) => (
          <article className="blog-premium-card" data-size={index % 5 === 0 ? "wide" : index % 3 === 0 ? "tall" : "standard"} key={`${article.title}-${index}`}>
            <Link href={`/blogs/${article.slug}`}>
              <span className="blog-premium-card-image">
                <Image src={article.image} alt="" fill sizes="(max-width: 900px) 100vw, 32vw" />
              </span>
              <span className="blog-premium-card-body">
                <span className="blog-premium-tag">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <ArticleMeta article={article} />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrendingArticles() {
  return (
    <section className="blog-premium-trending" aria-labelledby="trending-title">
      <div className="blog-premium-section-head">
        <span>Trending Now</span>
        <h2 id="trending-title">Swipeable insights for curious readers.</h2>
      </div>
      <div className="blog-premium-trend-track" tabIndex={0} aria-label="Trending articles carousel">
        {articles.concat(articles.slice(0, 2)).map((article, index) => (
          <Link className="blog-premium-trend-card" href={`/blogs/${article.slug}`} key={`${article.title}-trend-${index}`}>
            <Image src={article.image} alt="" fill sizes="320px" />
            <span>{article.category}</span>
            <h3>{article.title}</h3>
            <small>{article.readTime}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewsletterCta() {
  return (
    <section className="blog-premium-newsletter" aria-labelledby="newsletter-title">
      <div>
        <span>Private Notes</span>
        <h2 id="newsletter-title">Receive refined wellness ideas before everyone else.</h2>
        <p>Monthly clinical insight, seasonal routines, and thoughtful guides from the Susrutha team.</p>
      </div>
      <form>
        <input type="email" placeholder="Email address" aria-label="Email address" />
        <button type="button">
          Subscribe
          <ArrowIcon />
        </button>
      </form>
    </section>
  );
}

function AuthorSection() {
  return (
    <section className="blog-premium-authors" aria-labelledby="authors-title">
      <div className="blog-premium-section-head">
        <span>Editorial Voices</span>
        <h2 id="authors-title">Insights from physicians, researchers, and care guides.</h2>
      </div>
      <div className="blog-premium-author-grid">
        {authors.map((author) => (
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

function FooterCta() {
  return (
    <section className="blog-premium-footer-cta" aria-labelledby="blog-footer-cta-title">
      <span>Need a personal care answer?</span>
      <h2 id="blog-footer-cta-title">Move from reading to a physician-guided consultation.</h2>
      <Link href="/appointment">
        Book an appointment
        <ArrowIcon />
      </Link>
    </section>
  );
}

export function BlogPremiumPage() {
  return (
    <div className="blog-premium-page">
      <BlogHero />
      <BlogCategories />
      <FeaturedBlog />
      <BlogGrid />
      <TrendingArticles />
      <NewsletterCta />
      <AuthorSection />
      <FooterCta />
    </div>
  );
}
