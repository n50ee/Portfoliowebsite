import { Link } from "@tanstack/react-router";

/** Animated "hire me" CTA, adapted from a Uiverse.io payment-card component. */
export function HireMeCard() {
  return (
    <Link to="/contact" className="hire-me-container" aria-label="Hire me: get in touch">
      <div className="hire-me-left-side">
        <div className="hire-me-card">
          <div className="hire-me-card-line" />
          <div className="hire-me-buttons" />
        </div>
        <div className="hire-me-post">
          <div className="hire-me-post-line" />
          <div className="hire-me-screen">
            <div className="hire-me-dollar">$</div>
          </div>
          <div className="hire-me-numbers" />
          <div className="hire-me-numbers-line2" />
        </div>
      </div>
      <div className="hire-me-right-side">
        <div className="hire-me-new">HIRE ME</div>
        <svg
          viewBox="0 0 451.846 451.847"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          className="hire-me-arrow"
        >
          <path
            fill="#cfcfcf"
            d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
          />
        </svg>
      </div>
    </Link>
  );
}
