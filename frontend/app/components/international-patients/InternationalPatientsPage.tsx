import { InternationalCarePromise } from "./InternationalCarePromise";
import { InternationalEnquiry } from "./InternationalEnquiry";
import { InternationalHero } from "./InternationalHero";
import { InternationalPrograms } from "./InternationalPrograms";
import { InternationalTrustFaq } from "./InternationalTrustFaq";

export function InternationalPatientsPage() {
  return (
    <div className="international-page">
      <InternationalHero />
      <InternationalPrograms />
      <InternationalCarePromise />
      <InternationalTrustFaq />
      <InternationalEnquiry />
    </div>
  );
}
