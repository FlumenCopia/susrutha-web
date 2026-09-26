import { SiteShell } from "../components/common/SiteShell";
import { TestimonialsView } from "./TestimonialsView";

export const metadata = {
  title: "Patient Stories & Video Reviews | Susrutha Ayurveda Hospital",
  description:
    "Read authentic healing experiences, recovery stories, and watch video reviews from patients who underwent Panchakarma and Ayurvedic care at Susrutha Hospital.",
};

export default function TestimonialsPage() {
  return (
    <SiteShell>
      <TestimonialsView />
    </SiteShell>
  );
}
