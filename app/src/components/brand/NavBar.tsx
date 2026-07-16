import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Writing" },
  { to: "/contact", label: "Contact" },
] as const;

/** Site header. Wordmark left, links center-right, active-link underline. */
export function NavBar() {
  return (
    <header className="flex items-center justify-between border-b border-line-soft py-[18px] font-body">
      <Link to="/" className="font-display text-lg font-semibold text-ink-900 no-underline">
        Ameer Moavia
      </Link>
      <nav className="flex items-center gap-7">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            className="border-b-2 border-transparent pb-1 text-body-sm font-semibold text-ink-500 no-underline transition-colors duration-150 ease-out hover:text-ink-900"
            activeProps={{ className: "!border-signature-500 !text-ink-900" }}
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
