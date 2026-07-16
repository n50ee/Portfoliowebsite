interface CategoryTile {
  label: string;
  bg: string;
  text: string;
  badge?: "check" | "plus";
  badgeColor?: string;
  colStart: number;
  rowStart: number;
  rowSpan: number;
  imageUrl?: string;
}

const tiles: CategoryTile[] = [
  { label: "Meta Partnerships", bg: "#E8E7E7", text: "#1A1A1A", colStart: 1, rowStart: 1, rowSpan: 1 },
  {
    label: "Media Support Systems",
    bg: "#F01E5A",
    text: "#FFFFFF",
    colStart: 1,
    rowStart: 2,
    rowSpan: 3,
  },
  {
    label: "Brand & Marketing",
    bg: "#F15A24",
    text: "#FFFFFF",
    badge: "check",
    badgeColor: "#2F80ED",
    colStart: 2,
    rowStart: 1,
    rowSpan: 2,
  },
  {
    label: "Media Operations",
    bg: "#E8E7E7",
    text: "#1A1A1A",
    badge: "plus",
    badgeColor: "#F01E5A",
    colStart: 2,
    rowStart: 3,
    rowSpan: 2,
  },
  {
    label: "Events",
    bg: "#E8E7E7",
    text: "#1A1A1A",
    badge: "plus",
    badgeColor: "#8B2FE0",
    colStart: 3,
    rowStart: 1,
    rowSpan: 2,
  },
  {
    label: "Learning & Development Community",
    bg: "#8B2FE0",
    text: "#FFFFFF",
    badge: "plus",
    badgeColor: "#FFFFFF",
    colStart: 3,
    rowStart: 3,
    rowSpan: 2,
  },
  {
    label: "PR News Articles",
    bg: "#F01E5A",
    text: "#FFFFFF",
    badge: "plus",
    badgeColor: "#FFFFFF",
    colStart: 4,
    rowStart: 1,
    rowSpan: 1,
  },
  {
    label: "People Directory",
    bg: "#2A2A2A",
    text: "#FFFFFF",
    badge: "plus",
    badgeColor: "#F15A24",
    colStart: 4,
    rowStart: 2,
    rowSpan: 3,
  },
];

function Badge({ type, color }: { type: "check" | "plus"; color: string }) {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      {type === "check" ? (
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
          <path d="M4 10.5l4 4 8-9" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
          <path d="M10 4v12M4 10h12" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

/** Static category grid from the "Government Media Operations" case study on the old site. */
export function CategoryGrid() {
  return (
    <div className="rounded-2xl bg-neutral-950 p-4">
      <div
        className="grid h-[560px] grid-cols-4 gap-4"
        style={{ gridTemplateRows: "repeat(4, 1fr)" }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="relative flex flex-col justify-end overflow-hidden rounded-xl p-5"
            style={{
              backgroundColor: tile.imageUrl ? undefined : tile.bg,
              gridColumnStart: tile.colStart,
              gridRowStart: tile.rowStart,
              gridRowEnd: `span ${tile.rowSpan}`,
            }}
          >
            {tile.imageUrl && (
              <>
                <img src={tile.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
              </>
            )}
            {tile.badge && (
              <div className="absolute right-4 top-4">
                <Badge type={tile.badge} color={tile.badgeColor ?? "#000"} />
              </div>
            )}
            <span
              className="relative font-display text-heading-sm font-semibold leading-tight"
              style={{ color: tile.text }}
            >
              {tile.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
