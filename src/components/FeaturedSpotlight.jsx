import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Lock, Calendar, Leaf, Salad } from "lucide-react";
import { marketStatus, marketMood, nextOpenDay } from "../utils/marketUtils";
import { useNow } from "../hooks/useNow";
import MoodIcon from "./MoodIcon";

export default function FeaturedSpotlight({ markets }) {
  const pool = markets.filter((m) => m.featured);
  const now = useNow();

  if (!pool.length) {
    return (
      <div className="feature-spot">
        <p className="helper">No featured markets yet.</p>
      </div>
    );
  }

  const market = pool[0];
  const status = marketStatus(market, now);
  const mood = marketMood(market);
  const marketDay = nextOpenDay(market, now).day;

  return (
    <article className="feature-spot">
      <div className="feature-spot-text">
        <span className="feature-spot-tag">
          <MoodIcon kind={mood.kind} size={16} /> {mood.label}
        </span>
        <h3>{market.name}</h3>
        <p className="feature-spot-address">
          <MapPin size={16} className="pin" /> {market.address}
        </p>

        <div className="feature-spot-facts">
          <span className="fact">
            <span className="fact-icon">
              <Calendar size={16} />
            </span>
            {marketDay} Market Day
          </span>
          <span className="fact">
            <span className="fact-icon">
              <Leaf size={16} />
            </span>
            Fresh Produce
            <small>Local &amp; Seasonal</small>
          </span>
          <span className="fact">
            <span className="fact-icon">
              <Salad size={16} />
            </span>
            Healthy Food
            <small>Farm Fresh</small>
          </span>
        </div>

        <p className="feature-spot-desc">{market.description}</p>

        <Link className="solid-btn feature-spot-btn" to={`/markets/${market.id}`}>
          View Details <ArrowRight size={17} />
        </Link>
      </div>

      <div className="feature-spot-media">
        <img src={`/${market.thumbnail}`} alt={`${market.name} market stalls`} style={{ objectPosition: market.imagePosition }} />
        <span className={`pill feature-spot-status ${status.className}`}>
          {status.className === "closed" ? <Lock size={13} /> : <span className="dot" />}
          {status.label}
        </span>
        <span className="feature-spot-chip">
          <Leaf size={13} /> Fresh &middot; Local
        </span>
      </div>
    </article>
  );
}
