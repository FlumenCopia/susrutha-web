import { SiteShell } from "../components/common/SiteShell";
import { InnerPage } from "../components/inner/InnerPage";
import { basePages } from "../data/architecture";

export default function GalleryPage() {
  return (
    <SiteShell>
      <InnerPage content={basePages.gallery} />
    </SiteShell>
  );
}
