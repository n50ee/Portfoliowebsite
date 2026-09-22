import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import { personPhotoStyle } from "../../lib/person-photo";
import type { PersonEntry } from "../../lib/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PLACEHOLDER_TINTS = ["bg-signature-100 text-signature-600", "bg-paper-sunken text-ink-700"];

/**
 * Seconds each card spends crossing the viewport. Higher = slower drift.
 * The total loop duration is this times the number of people.
 */
const SECONDS_PER_CARD = 3.2;

/**
 * Row of photo cards, one per person, that drifts slowly and continuously on
 * its own via a CSS marquee. The list is rendered twice and the track is
 * translated by exactly -50%, so the loop is seamless: the second set sits
 * where the first began. Hovering the strip pauses the drift, and hovering a
 * card lifts and enlarges it. Falls back to an initials tile when a person has
 * no photo yet. Respects prefers-reduced-motion (see styles.css).
 */
export function PeopleGrid({ people }: { people: PersonEntry[] }) {
  if (people.length === 0) return null;

  const looping = people.length > 1;
  const loop = looping ? [...people, ...people] : people;
  const duration = Math.max(30, Math.round(people.length * SECONDS_PER_CARD));

  return (
    <div className="people-scroll">
      <div
        className={cn("people-track", looping && "is-marquee")}
        style={{ "--people-duration": `${duration}s` } as CSSProperties}
      >
        {loop.map((person, i) => (
          <div
            key={person.name + i}
            data-person-card
            aria-hidden={looping && i >= people.length ? true : undefined}
            className="people-card group w-[190px] shrink-0 sm:w-[220px]"
          >
            <div className="mb-3 aspect-[4/5] overflow-hidden rounded-xl border border-line-soft">
              {person.photoUrl ? (
                <img
                  src={person.photoUrl}
                  alt=""
                  draggable={false}
                  className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-110"
                  style={personPhotoStyle(person)}
                />
              ) : (
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center font-display text-heading-md font-semibold transition-transform duration-300 ease-out group-hover:scale-110",
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
    </div>
  );
}
