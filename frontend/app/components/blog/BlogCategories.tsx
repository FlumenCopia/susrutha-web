const blogCategories = ["All", "Panchakarma", "Clinical Studies", "Nutrition", "Lifestyle Care", "Research"];

export function BlogCategories() {
  return (
    <nav className="blog-premium-categories" aria-label="Blog categories">
      {blogCategories.map((category) => (
        <a href="#blog-grid" className={category === "All" ? "is-active" : undefined} key={category}>
          {category}
        </a>
      ))}
    </nav>
  );
}
