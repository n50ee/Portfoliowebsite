import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 border-t border-line-soft py-8 font-body text-caption text-ink-500 sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Ameer Moavia. Built one case study at a time.</span>
      <div className="flex gap-5">
        <Link to="/contact" className="text-ink-500 no-underline hover:text-ink-900">
          Contact
        </Link>
        <Link to="/blog" className="text-ink-500 no-underline hover:text-ink-900">
          Writing
        </Link>
      </div>
    </footer>
  );
}
