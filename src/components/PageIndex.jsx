import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGES = [
  { to: "/", label: "Home" },
  { to: "/markets", label: "Markets" },
  { to: "/produce", label: "Produce Guide" },
  { to: "/seasonal", label: "Seasonal Picks" },
  { to: "/bookmarks", label: "Bookmarks" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" }
];

/** Numbers every main page (1, 2, 3...) and shows them at the very end of the page. */
export default function PageIndex() {
  const { pathname } = useLocation();
  const current = PAGES.findIndex((p) => (p.to === "/" ? pathname === "/" : pathname === p.to || pathname.startsWith(p.to + "/")));
  if (current === -1) return null;

  const prev = PAGES[current - 1];
  const next = PAGES[current + 1];

  return (
    <nav className="page-index" aria-label="Page index">
      <div className="page-index-row">
        {prev ? (
          <Link className="idx-arrow" to={prev.to} aria-label={`Previous: ${prev.label}`}>
            <ChevronLeft size={18} />
          </Link>
        ) : (
          <span className="idx-arrow off" aria-hidden="true">
            <ChevronLeft size={18} />
          </span>
        )}
        {PAGES.map((page, i) => (
          <Link
            key={page.to}
            to={page.to}
            className={i === current ? "current" : undefined}
            aria-current={i === current ? "page" : undefined}
            aria-label={`Page ${i + 1}: ${page.label}`}
            title={page.label}
          >
            {i + 1}
          </Link>
        ))}
        {next ? (
          <Link className="idx-arrow" to={next.to} aria-label={`Next: ${next.label}`}>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <span className="idx-arrow off" aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        )}
      </div>
      <p className="page-index-label">
        Page {current + 1} of {PAGES.length} &middot; {PAGES[current].label}
      </p>
    </nav>
  );
}
