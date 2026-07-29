import type { CSSProperties } from "react";
import type { PersonEntry } from "./types";

/**
 * How a person's photo sits inside its card. Shared by the public grid and
 * the admin preview so what you adjust is exactly what ships.
 */
export function personPhotoStyle(person: Partial<PersonEntry>): CSSProperties {
  const zoom = person.photoZoom ?? 100;
  return {
    objectFit: person.photoFit ?? "cover",
    objectPosition: `${person.photoX ?? 50}% ${person.photoY ?? 50}%`,
    transform: zoom === 100 ? undefined : `scale(${zoom / 100})`,
  };
}
