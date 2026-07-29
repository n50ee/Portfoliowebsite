import { useState } from "react";
import { Textarea } from "../brand/Field";
import type { TournamentResult } from "../../lib/types";

/**
 * Bulk editor for tournament results: paste rows in
 * "date | place | tier | tournament | prize" format, one per line, to add
 * many at once (mirrors GalleryField's paste-links pattern).
 */
export function ResultsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: TournamentResult[];
  onChange: (rows: TournamentResult[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addRows() {
    const rows = draft
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [date, place, tier, tournament, prize] = line.split("|").map((p) => p.trim());
        return { date: date ?? "", place: place ?? "", tier: tier ?? "", tournament: tournament ?? "", prize: prize ?? "" };
      })
      .filter((row) => row.tournament);
    if (rows.length === 0) return;
    onChange([...value, ...rows]);
    setDraft("");
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="mb-2 text-body-sm font-semibold text-ink-900">{label}</div>
      {value.length > 0 && (
        <div className="mb-3 max-h-64 overflow-y-auto rounded-md border border-line-soft">
          <table className="w-full text-caption">
            <tbody>
              {value.map((row, i) => (
                <tr key={i} className="border-b border-line-soft last:border-b-0">
                  <td className="whitespace-nowrap px-2 py-1.5 text-ink-500">{row.date}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 font-semibold text-ink-900">{row.place}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-ink-500">{row.tier}</td>
                  <td className="px-2 py-1.5 text-ink-900">{row.tournament}</td>
                  <td className="whitespace-nowrap px-2 py-1.5 text-ink-500">{row.prize}</td>
                  <td className="px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-ink-900/10 text-xs font-semibold text-ink-900"
                      aria-label="Remove result"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-col items-start gap-2">
        <Textarea
          label="Paste rows (one per line: date | place | tier | tournament | prize)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="2020-03-08 | 1st | B-Tier | PUBG Mobile Club Open - 2020 Spring Split: Pakistan | $2,600"
          rows={3}
          className="w-full"
        />
        <button
          type="button"
          onClick={addRows}
          className="shrink-0 rounded-md border border-line px-3 py-1.5 text-caption font-semibold text-ink-900"
        >
          Add
        </button>
      </div>
    </div>
  );
}
