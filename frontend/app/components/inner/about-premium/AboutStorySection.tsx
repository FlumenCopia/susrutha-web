import Image from "next/image";

type StoryPillar = {
  title: string;
  copy: string;
  image: string;
};

const storyPillars: StoryPillar[] = [
  {
    title: "Rooted in Ayurveda",
    copy: "Our treatments are based on classical texts and time-tested practices.",
    image: "/images/about_pillar_ayurveda.jpg",
  },
  {
    title: "Personalized Care",
    copy: "Every individual is unique. So is our approach.",
    image: "/images/opt_panchakarma.jpg",
  },
  {
    title: "Holistic Healing",
    copy: "We treat the root cause, not just the symptoms.",
    image: "/images/opt_spine_joint.jpg",
  },
];

export function AboutStorySection() {
  return (
    <section className="about-story-section" id="story">
      <div className="about-story-image-wrap">
        <div className="about-story-image">
          <Image
            src="/images/about-story-lotus-courtyard.webp"
            alt="Ayurvedic hospital courtyard with lotus emblem and healing plants"
            width={900}
            height={1200}
            sizes="(max-width: 900px) 100vw, 47vw"
          />
        </div>
      </div>

      <div className="about-story-copy">
        <span>Our Story</span>
        <h2>
          Healing traditions,
          <br />
          built on <em>trust.</em>
        </h2>

        <p>
          For over five decades, Susrutha Ayurvedic Hospital has been a trusted name in authentic Ayurvedic care. Our
          journey began with a simple vision - to bring the wisdom of Ayurveda to every home and help people heal
          naturally.
        </p>

        <div className="about-story-pillars">
          {storyPillars.map((pillar) => (
            <article key={pillar.title}>
              <div className="about-story-pillar-thumb">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  width={80}
                  height={80}
                  className="about-story-pillar-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              </div>
              <section>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </section>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
