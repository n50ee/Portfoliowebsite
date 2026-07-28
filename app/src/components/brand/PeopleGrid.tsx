import { cn } from "../../lib/utils";
import type { PersonEntry } from "../../lib/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PLACEHOLDER_TINTS = ["bg-signature-100 text-signature-600", "bg-paper-sunken text-ink-700"];

/** Grid of circular avatars + names. Falls back to an initials tile when a person has no photo yet. */
export function PeopleGrid({ people }: { people: PersonEntry[] }) {
  if (people.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
      {people.map((person, i) => (
        <div key={person.name + i} className="flex flex-col items-center gap-2 text-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border border-line-soft">
            {person.photoUrl ? (
              <img src={person.photoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center font-display text-heading-sm font-semibold",
                  PLACEHOLDER_TINTS[i % PLACEHOLDER_TINTS.length],
                )}
              >
                {initials(person.name)}
              </div>
            )}
          </div>
          <div>
            <span className="block font-body text-body-sm font-semibold text-signature-500">{person.name}</span>
            {person.role && <span className="block font-body text-caption text-ink-500">{person.role}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
