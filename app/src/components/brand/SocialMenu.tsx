import type { CSSProperties } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/n50e/";
// TODO: replace with the real Instagram profile URL.
const INSTAGRAM_URL = "#";

function itemStyle(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
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
          <img src="https://cdn.simpleicons.org/linkedin/ffffff" alt="" className="h-6 w-6" />
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
          <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" className="h-6 w-6" />
        </a>
      </div>
    </aside>
  );
}
