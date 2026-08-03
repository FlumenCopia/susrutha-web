import { InternationalPatientsIcon } from "./InternationalPatientsIcon";
import type { InternationalPatientsIconName } from "./InternationalPatientsIcon";

type InternationalStatCardProps = {
  icon: InternationalPatientsIconName;
  value: string;
  label: string;
};

export function InternationalStatCard({ icon, value, label }: InternationalStatCardProps) {
  return (
    <article className="international-stat-card">
      <InternationalPatientsIcon name={icon} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
