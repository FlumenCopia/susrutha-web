import { SiteShell } from "./components/common/SiteShell";
import { HomePage } from "./components/home/HomePage";
import { generateMedicalClinicSchema } from "./utils/jsonLd";

export default function Home() {
  const clinicSchema = generateMedicalClinicSchema();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <HomePage />
    </SiteShell>
  );
}
