import { facilityCards } from "./facilitiesData";
import { FacilityCard } from "./FacilityCard";
import { FacilitiesIcon } from "./FacilitiesIcon";

export function FacilitiesGrid() {
  return (
    <section className="facilities-grid-section">
      <div className="facilities-section-head facilities-section-head-row">
        <div>
          <span className="facilities-eyebrow">Facilities That Support Classical Care</span>
          <h2>Care spaces planned around the patient journey</h2>
        </div>
        <div className="facilities-controls" aria-hidden="true">
          <button type="button" disabled>
            <FacilitiesIcon name="arrow" />
          </button>
          <button type="button" disabled>
            <FacilitiesIcon name="arrow" />
          </button>
        </div>
      </div>
      <div className="facilities-card-row">
        {facilityCards.map((facility) => (
          <FacilityCard facility={facility} key={facility.title} />
        ))}
      </div>
    </section>
  );
}
