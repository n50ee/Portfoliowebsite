import { Link } from "@tanstack/react-router";

export interface RevealItem {
  slug: string;
  client: string;
  imageUrl: string | null;
}

/**
 * Hover-reveal client wall, adapted from a classic Webflow portfolio
 * pattern: a row of columns, each showing a faint giant client name; on
 * hover the column reveals the project's photo full-bleed, the name turns
 * white, and a "View case study" link fades in. Pure CSS (group-hover), no
 * JS required.
 */
export function WorkRevealColumns({ items }: { items: RevealItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 divide-y divide-line-soft border border-line-soft sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.slug}
          to="/work/$slug"
          params={{ slug: item.slug }}
          className="group relative flex h-80 items-center justify-center overflow-hidden p-6 text-center no-underline sm:h-[560px]"
        >
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative font-display text-heading-md font-bold leading-tight text-ink-300 transition-colors duration-500 ease-out group-hover:text-paper sm:text-heading-lg">
            {item.client}
          </span>
          <span className="absolute bottom-6 left-6 font-body text-body-sm font-semibold text-paper opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
            View case study →
          </span>
        </Link>
      ))}
    </div>
  );
}
