import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";

const SECTION_LABELS = {
  markets: "Markets",
  produce: "Produce Guide",
  seasonal: "Seasonal Recommendations",
  bookmarks: "Bookmarks",
  contact: "Contact",
  about: "About"
};

function readableLabel(value) {
  return value.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const { markets, produce } = useAppData();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", to: "/", icon: Home }];

  if (segments.length) {
    const section = segments[0];
    crumbs.push({ label: SECTION_LABELS[section] || "Page", to: `/${section}` });
    if (segments[1]) {
      const item = section === "markets"
        ? markets.find((entry) => entry.id === segments[1])
        : section === "produce"
          ? produce.find((entry) => entry.id === segments[1])
          : null;
      crumbs.push({ label: item?.name || readableLabel(segments[1]) });
    }
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const Icon = crumb.icon;
          const current = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`}>
              {current ? (
                <span className="breadcrumb-current" aria-current="page">{Icon ? <Icon size={15} /> : null}{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.to}>{Icon ? <Icon size={15} /> : null}{crumb.label}</Link>
                  <ChevronRight className="breadcrumb-separator" size={14} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
