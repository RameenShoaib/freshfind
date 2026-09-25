import { Link } from "react-router-dom";
import { Leaf, MapPin, ArrowRight, Lock, Sun, Bookmark, Share2 } from "lucide-react";
import { marketStatus, marketMood } from "../utils/marketUtils";
import { useNow } from "../hooks/useNow";
import { useShare } from "../hooks/useShare";
import { useAppData } from "../context/AppDataContext";
import MoodIcon, { isSunny } from "./MoodIcon";

export default function MarketCard({ market }) {
  const { bookmarkedMarketIds, toggleMarketBookmark } = useAppData();
  const shareText = useShare();
  const now = useNow();
  const status = marketStatus(market, now);
  const mood = marketMood(market);
  const sunny = isSunny(mood.kind);
  const bookmarked = bookmarkedMarketIds.includes(market.id);

  return (
    <article className={`market-card-v2 mood-${mood.kind}`}>
      <div className="banner">
        <img src={`/${market.thumbnail}`} alt={`${market.name} market stalls`} style={{ objectPosition: market.imagePosition }} />
        <span className="mood-badge">
          <MoodIcon kind={mood.kind} size={20} /> {mood.label}
        </span>
        <span className={`pill status-badge ${status.className}`}>
          {status.className === "closed" ? <Lock size={14} /> : <span className="dot" />}
          {status.label}
        </span>
      </div>
      <div className="card-body-v2">
        <div className="card-title-row">
          <span className={`icon-dot${sunny ? " sun" : ""}`}>{sunny ? <Sun size={22} /> : <Leaf size={22} />}</span>
          <h3>
            <Link to={`/markets/${market.id}`}>{market.name}</Link>
          </h3>
          <Link className="view-btn" to={`/markets/${market.id}`}>
            View Details <ArrowRight size={16} />
          </Link>
        </div>
        <span className="meta-row mood-line">
          <MoodIcon kind={mood.kind} size={19} /> {mood.label}
        </span>
        <span className="meta-row">
          <MapPin size={17} className="pin" /> {market.address}
        </span>
        <p className="desc">{market.description}</p>
        <div className="card-actions-v2">
          <button
            className={`ghost-btn small market-bookmark${bookmarked ? " saved" : ""}`}
            type="button"
            onClick={() => toggleMarketBookmark(market.id)}
            aria-label={`${bookmarked ? "Remove" : "Add"} ${market.name} ${bookmarked ? "from" : "to"} bookmarks`}
            aria-pressed={bookmarked}
          >
            <Bookmark size={15} fill={bookmarked ? "currentColor" : "none"} />
            {bookmarked ? "Saved" : "Save"}
          </button>
          <button
            className="ghost-btn small"
            type="button"
            onClick={() => shareText(`FreshFind market: ${market.name}`, `/markets/${market.id}`)}
          >
            <Share2 size={15} /> Share
          </button>
        </div>
      </div>
    </article>
  );
}
