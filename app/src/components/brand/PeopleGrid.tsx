import { cn } from "../../lib/utils";
import type { PersonEntry } from "../../lib/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PLACEHOLDER_TINTS = ["bg-signature-100 text-signature-600", "bg-paper-sunken text-ink-700"];

/** Horizontal scrollable row of photo cards, one per person. Falls back to an initials tile when a person has no photo yet. */
export function PeopleGrid({ people }: { people: PersonEntry[] }) {
  if (people.length === 0) return null;

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {people.map((person, i) => (
        <div key={person.name + i} className="w-[190px] shrink-0 snap-start sm:w-[220px]">
          <div className="mb-3 aspect-[4/5] overflow-hidden rounded-xl border border-line-soft">
            {person.photoUrl ? (
              <img src={person.photoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center font-display text-heading-md font-semibold",
                  PLACEHOLDER_TINTS[i % PLACEHOLDER_TINTS.length],
                )}
              >
                {initials(person.name)}
              </div>
            )}
          </div>
          <span className="block font-body text-body-sm font-semibold text-ink-900">{person.name}</span>
          {person.role && <span className="block font-body text-caption text-signature-500">{person.role}</span>}
        </div>
      ))}
    </div>
  );
}
