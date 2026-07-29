import { Badge } from "./Badge";
import type { TournamentResult } from "../../lib/types";

function placeTone(place: string): "warning" | "success" | "neutral" {
  if (place.startsWith("1")) return "warning";
  if (place.startsWith("2") || place.startsWith("3")) return "success";
  return "neutral";
}

function yearOf(date: string): string {
  return date.slice(0, 4) || "-";
}

/** Grouped-by-year tournament results table for a case study's competitive record. */
export function TournamentResultsTable({ results }: { results: TournamentResult[] }) {
  if (results.length === 0) return null;

  const years = Array.from(new Set(results.map((r) => yearOf(r.date))));

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-6 last:mb-0">
          <div className="mb-2 font-body text-caption font-semibold uppercase tracking-eyebrow text-ink-500">
            {year}
          </div>
          <div className="overflow-x-auto rounded-lg border border-line-soft">
            <table className="w-full min-w-[640px] font-body text-body-sm">
              <thead>
                <tr className="border-b border-line-soft bg-paper-sunken text-left text-caption font-semibold uppercase tracking-eyebrow text-ink-500">
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5">Place</th>
                  <th className="px-4 py-2.5">Tier</th>
                  <th className="px-4 py-2.5">Tournament</th>
                  <th className="px-4 py-2.5 text-right">Prize</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .filter((r) => yearOf(r.date) === year)
                  .map((r, i) => (
                    <tr key={i} className="border-b border-line-soft last:border-b-0">
                      <td className="whitespace-nowrap px-4 py-2.5 text-ink-500">{r.date}</td>
                      <td className="whitespace-nowrap px-4 py-2.5">
                        <Badge tone={placeTone(r.place)}>{r.place}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-ink-500">{r.tier}</td>
                      <td className="px-4 py-2.5 font-semibold text-ink-900">{r.tournament}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-ink-700">{r.prize || "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
