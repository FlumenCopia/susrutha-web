export function TestimonialStripSection() {
  return (
    <section className="testimonial-strip-section" aria-label="Patient testimonial">
      <div className="testimonial-quote-mark" aria-hidden="true">
        &ldquo;
      </div>

      <div className="testimonial-strip-copy">
        <p>
          My experience at Susrutha Ayurveda was truly life-changing.
          <br />
          The doctors are compassionate and the treatments are authentic.
          <br />
          I feel healthier and more balanced than I have in years.
        </p>
        <strong>- Anita Menon, Kochi</strong>
        <div className="testimonial-strip-dots" aria-label="Testimonials">
          <button type="button" aria-label="Show testimonial 1" aria-current="true" />
          <button type="button" aria-label="Show testimonial 2" />
          <button type="button" aria-label="Show testimonial 3" />
          <button type="button" aria-label="Show testimonial 4" />
        </div>
      </div>
    </section>
  );
}
