import { personPhotoStyle } from "../../lib/person-photo";
import type { PersonEntry } from "../../lib/types";

type Adjustments = Pick<PersonEntry, "photoUrl" | "photoX" | "photoY" | "photoZoom" | "photoFit">;

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-center justify-between text-caption text-ink-500">
        <span>{label}</span>
        <span className="tabular-nums">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-signature-500"
      />
    </label>
  );
}

/**
 * Live crop control for a person's card photo: drag the sliders and the
 * preview shows the exact framing the homepage will render.
 */
export function PhotoAdjustField({
  value,
  onChange,
}: {
  value: Adjustments;
  onChange: (patch: Partial<Adjustments>) => void;
}) {
  if (!value.photoUrl) return null;

  const x = value.photoX ?? 50;
  const y = value.photoY ?? 50;
  const zoom = value.photoZoom ?? 100;
  const fit = value.photoFit ?? "cover";

  return (
    <div className="flex gap-3 rounded-md border border-line-soft p-2.5">
      <div className="w-[86px] shrink-0">
        <div className="aspect-[4/5] overflow-hidden rounded-lg border border-line-soft">
          <img src={value.photoUrl} alt="" className="h-full w-full" style={personPhotoStyle(value)} />
        </div>
        <div className="mt-1 text-center text-caption text-ink-500">Preview</div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Slider label="Horizontal" value={x} min={0} max={100} suffix="%" onChange={(v) => onChange({ photoX: v })} />
        <Slider label="Vertical" value={y} min={0} max={100} suffix="%" onChange={(v) => onChange({ photoY: v })} />
        <Slider label="Zoom" value={zoom} min={100} max={300} suffix="%" onChange={(v) => onChange({ photoZoom: v })} />
        <div className="flex items-center gap-2">
          <select
            value={fit}
            onChange={(e) => onChange({ photoFit: e.target.value as "cover" | "contain" })}
            className="rounded-md border border-line bg-paper px-2 py-1 text-caption text-ink-900"
          >
            <option value="cover">Fill box (crop)</option>
            <option value="contain">Fit whole photo</option>
          </select>
          <button
            type="button"
            onClick={() => onChange({ photoX: 50, photoY: 50, photoZoom: 100, photoFit: "cover" })}
            className="text-caption font-semibold text-ink-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
