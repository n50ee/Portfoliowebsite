import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import type { Project } from "../../lib/types";

interface ProjectTileProps {
  project: Project;
  /** True when a sibling tile is hovered and this one should recede. */
  dimmed?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

/**
 * Homepage grid card. `themeAccent`/`themeTint` recolor the accent rule and
 * eyebrow to the client's single brand hue — a thin wayfinding tint only,
 * never a logo or UI recreation. Hovering one tile in a grid focuses it and
 * recedes its siblings (dim + blur + scale down slightly).
 */
export function ProjectTile({ project, dimmed, onHoverChange }: ProjectTileProps) {
  const accent = project.themeAccent || "var(--color-signature-500)";
  const tint = project.themeTint || "var(--color-paper-sunken)";

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={cn(
        "block font-body text-inherit no-underline transition-all duration-300 ease-out",
        dimmed && "scale-[0.97] opacity-50 blur-[1px]",
      )}
    >
      <div
        className="relative mb-4 aspect-thumb overflow-hidden rounded-lg border border-line-soft bg-paper-sunken"
        style={{ background: project.imageUrl ? undefined : tint } as CSSProperties}
      >
        {project.imageUrl ? (
          <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-y-0 left-0 w-1" style={{ background: accent }} />
      </div>
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="text-caption font-semibold uppercase tracking-eyebrow"
          style={{ color: accent }}
        >
          {project.client}
        </span>
      </div>
      <h3 className="mb-1.5 font-display text-heading-sm font-semibold text-ink-900">{project.title}</h3>
      <p className="mb-2.5 text-body-sm text-ink-500">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-pill border border-line px-2.5 py-[3px] text-caption text-ink-500">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
