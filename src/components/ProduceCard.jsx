import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Cherry, Milk, Carrot, CircleDot, CalendarDays, MapPin, Share2, ArrowRight, ArrowLeft, Bookmark } from "lucide-react";
import { categorySlug } from "../utils/marketUtils";
import { useAppData } from "../context/AppDataContext";
import { useShare } from "../hooks/useShare";

const CATEGORY_ICON = { fruits: Cherry, dairy: Milk };
const PRODUCT_ICON = { leaf: Leaf, berry: Cherry, dairy: Milk, fruit: Cherry, root: Carrot, round: CircleDot };

export default function ProduceCard({ item, backTo }) {
  const { marketNames, bookmarkedProductIds, toggleProductBookmark } = useAppData();
  const bookmarked = bookmarkedProductIds.includes(item.id);
  const shareText = useShare();
  const cat = categorySlug(item.category);
  const CatIcon = CATEGORY_ICON[cat] || Leaf;
  const ProductIcon = PRODUCT_ICON[item.icon] || CatIcon;
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (!backTo) return;
    if (backTo === location.pathname) {
      // Already on that market's page (the card lives on it) — a same-route
      // Link click is a no-op in the router, so jump back up to the market info.
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(backTo);
    }
  };

  return (
    <article className="produce-card-v2" data-cat={cat}>
      <div className={`produce-banner${item.image?.endsWith(".svg") ? " has-illustration" : ""}`}>
        {item.image ? <img src={`/${item.image}`} alt="" /> : <span className="produce-emoji"><ProductIcon size={52} /></span>}
        <button className={`product-bookmark${bookmarked ? " saved" : ""}`} type="button" aria-label={`${bookmarked ? "Remove" : "Add"} ${item.name} ${bookmarked ? "from" : "to"} bookmarks`} aria-pressed={bookmarked} onClick={() => toggleProductBookmark(item.id)}>
          <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
        </button>
        <span className="cat-badge">
          <CatIcon size={15} /> {item.category}
        </span>
      </div>
      <div className="card-body-v2">
        <div className="card-title-row">
          <span className="icon-dot">
            <CatIcon size={22} />
          </span>
          <h3>
            <Link to={`/produce/${item.id}`}>{item.name}</Link>
          </h3>
        </div>
        <p className="desc">{item.description}</p>
        <div className="meta-list">
          <span className="meta-line">
            <CalendarDays size={18} />
            <span className="meta-label">Season</span>
            <span className="meta-value">{item.season}</span>
          </span>
          <span className="meta-line">
            <MapPin size={18} />
            <span className="meta-label">Markets</span>
            <span className="meta-value">{marketNames(item.markets)}</span>
          </span>
        </div>
        <div className="card-actions-v2">
          {backTo ? (
            <button className="solid-btn small" type="button" onClick={handleBack}>
              <ArrowLeft size={15} /> Back
            </button>
          ) : (
            <Link className="solid-btn small" to={`/produce/${item.id}`}>
              Details <ArrowRight size={15} />
            </Link>
          )}
          <button
            className="ghost-btn small"
            type="button"
            onClick={() => shareText(`FreshFind recommendation: ${item.name}`, `/produce/${item.id}`)}
          >
            <Share2 size={15} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
