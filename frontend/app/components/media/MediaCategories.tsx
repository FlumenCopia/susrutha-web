import { mediaCategories } from "./mediaData";

export function MediaCategories() {
  return (
    <nav className="media-categories" aria-label="Media categories">
      {mediaCategories.map((category) => (
        <a className={category === "All" ? "is-active" : undefined} href="#media-gallery" key={category}>
          {category}
        </a>
      ))}
    </nav>
  );
}
