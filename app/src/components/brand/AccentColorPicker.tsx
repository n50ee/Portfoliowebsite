import { useEffect, useState, type CSSProperties } from "react";

const COLORS = [
  "#e11d48",
  "#f472b6",
  "#fb923c",
  "#facc15",
  "#84cc16",
  "#10b981",
  "#0ea5e9",
  "#3b82f6",
  "#8b5cf6",
  "#a78bfa",
] as const;

export function applyAccentColor(hex: string) {
  const root = document.documentElement.style;
  root.setProperty("--color-signature-500", hex);
  root.setProperty("--color-signature-600", `color-mix(in srgb, ${hex} 82%, black)`);
  root.setProperty("--color-signature-100", `color-mix(in srgb, ${hex} 18%, white)`);
}

function itemStyle(hex: string): CSSProperties {
  return { "--color": hex } as CSSProperties;
}

/**
 * Accent color picker, adapted from a Uiverse.io swatch-hover effect.
 * Clicking a swatch re-themes the whole site's signature accent color
 * live (every button/link/badge reads --color-signature-500/600/100).
 */
export function AccentColorPicker() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setActive(localStorage.getItem("accent-color"));
  }, []);

  function pick(hex: string) {
    applyAccentColor(hex);
    localStorage.setItem("accent-color", hex);
    setActive(hex);
  }

  return (
    <div className="accent-picker-dock">
      <div className="accent-picker accent-picker--vertical" role="group" aria-label="Choose an accent color">
        {COLORS.map((hex) => (
          <button
            key={hex}
            type="button"
            className="accent-picker-item"
            style={itemStyle(hex)}
            data-color={hex}
            aria-label={`Set accent color to ${hex}`}
            aria-pressed={active === hex}
            onClick={() => pick(hex)}
          />
        ))}
      </div>
    </div>
  );
}
