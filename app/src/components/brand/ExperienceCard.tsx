import { Card } from "./Card";
import { Badge } from "./Badge";
import { GlowingEffect } from "../ui/glowing-effect";
import type { ExperienceEntry } from "../../lib/types";

function initials(place: string): string {
  const words = place.split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <Card padding="md" className="relative flex gap-3">
      <GlowingEffect proximity={64} spread={80} borderWidth={3} glow disabled={false} inactiveZone={0.01} />
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-soft bg-paper-sunken">
        {entry.logoUrl ? (
          <img src={entry.logoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-caption font-semibold text-ink-500">{initials(entry.place)}</span>
        )}
      </div>
      <div className="relative min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-display text-body font-semibold text-ink-900">{entry.place}</div>
            <div className="text-body-sm font-semibold text-signature-500">{entry.role}</div>
          </div>
          <div className="shrink-0 text-right">
            {entry.workType && <Badge tone="neutral">{entry.workType}</Badge>}
            {entry.duration && <div className="mt-1 text-caption text-ink-300">{entry.duration}</div>}
          </div>
        </div>
        {entry.description && (
          <p className="mt-1.5 text-body-sm leading-body text-ink-500">{entry.description}</p>
        )}
      </div>
    </Card>
  );
}
