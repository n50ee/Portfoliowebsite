import type { CSSProperties } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/n50e/";
const INSTAGRAM_URL = "https://www.instagram.com/n50e/";

const ICON_BASE = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

function itemStyle(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function iconStyle(slug: string): CSSProperties {
  const mask = `url(${ICON_BASE}/${slug}.svg)`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
  } as CSSProperties;
}

/**
 * Floating radial social menu, adapted from a Uiverse.io toggle. Fixed to
 * the bottom-right corner of every page; click the + to fan out real
 * Instagram/LinkedIn brand icons (via the Simple Icons CDN).
 */
export function SocialMenu() {
  return (
    <aside className="social-menu">
      <input type="checkbox" id="social-menu-toggle" className="social-menu-input" />
      <label htmlFor="social-menu-toggle" className="toggle" aria-label="Toggle social links">
        +
      </label>
      <div style={itemStyle(0)} className="circle-box">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="anchor anchor-linkedin"
          aria-label="LinkedIn"
        >
          <span className="anchor-icon" style={iconStyle("linkedin")} aria-hidden="true" />
        </a>
      </div>
      <div style={itemStyle(1)} className="circle-box">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="anchor anchor-instagram"
          aria-label="Instagram"
        >
          <span className="anchor-icon" style={iconStyle("instagram")} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
