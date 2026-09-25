import { Link } from "react-router-dom";
import { MapPin, Clock, ChevronRight, Leaf, Sun, Lock } from "lucide-react";
import { marketStatus, marketMood } from "../utils/marketUtils";
import { useNow } from "../hooks/useNow";
import { isSunny } from "./MoodIcon";

const ICONS = { Nearby: MapPin, "Currently Open": Clock };
const VARIANT = { Nearby: "nearby", "Currently Open": "live" };

export default function HighlightColumn({ title, markets, fallbackMarkets }) {
  const now = useNow();
  const variant = VARIANT[title] || "nearby";
  // "Currently Open" must never fall back to markets that aren't actually open,
  // otherwise closed markets show up mislabeled under this heading.
  const list = variant === "live" ? markets : markets.length ? markets : fallbackMarkets.slice(0, 2);
  const TitleIcon = ICONS[title] || MapPin;

  return (
    <div className={`highlight-card hl-${variant}`}>
      <span className={`hl-tag ${variant === "live" ? "solid" : "red"}`}>
        <TitleIcon size={18} /> {title}
      </span>
      <div className="hl-rows">
        {!list.length && variant === "live" ? (
          <p className="helper">No markets are currently open.</p>
        ) : null}
        {list.map((market) => {
          const status = marketStatus(market, now);
          const mood = marketMood(market);
          const sunny = isSunny(mood.kind);
          return (
            <Link key={market.id} className="highlight-row" to={`/markets/${market.id}`}>
              <span className="row-left">
                <span className={`icon-dot${sunny ? " sun" : ""}`}>{sunny ? <Sun size={24} /> : <Leaf size={22} />}</span>
                <span>
                  <strong>{market.name}</strong>
                  <small>
                    {mood.label} - {market.neighborhood}
                  </small>
                </span>
              </span>
              <span className="row-right">
                <span className={`pill ${status.className}`}>
                  {status.className === "closed" ? <Lock size={13} /> : <span className="dot" />}
                  {status.label === "Open Now" ? "Open" : status.label}
                </span>
                <ChevronRight size={18} />
              </span>
            </Link>
          );
        })}
      </div>
      {variant === "live" ? (
        <span className="support-note" aria-hidden="true">
          Support
          <br />
          Local &#10084;
        </span>
      ) : null}
    </div>
  );
}
