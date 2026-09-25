import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Cherry, Flower2, Leaf, MapPin, Snowflake, Sparkles, Sun } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { useNow } from "../hooks/useNow";
import ProduceCard from "../components/ProduceCard";
import SectionHeading from "../components/SectionHeading";

function currentSeason(date) {
  const month = date.getMonth();
  return month === 11 || month <= 1 ? "winter" : month <= 4 ? "spring" : month <= 7 ? "summer" : "fall";
}

function isInSeason(item, season) {
  const details = String(item.season || "").toLowerCase();
  return details.includes("year round") || details.includes(season);
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const SEASON_OPTIONS = [
  { id: "winter", label: "Winter", detail: "Crisp & comforting", icon: Snowflake },
  { id: "spring", label: "Spring", detail: "Bright & blooming", icon: Flower2 },
  { id: "summer", label: "Summer", detail: "Sunny & juicy", icon: Sun },
  { id: "fall", label: "Fall", detail: "Warm & harvest-rich", icon: Leaf }
];

const SEASON_MESSAGES = {
  winter: "Winter is here — enjoy the coziest seasonal picks.",
  spring: "Spring is here — discover bright, fresh produce in bloom.",
  summer: "Summer is here — fill your basket with sunny, juicy finds.",
  fall: "Fall is here — enjoy the best of the harvest season."
};

export default function Seasonal() {
  const { produce } = useAppData();
  const now = useNow();
  const currentCalendarSeason = currentSeason(now);
  const [selectedSeason, setSelectedSeason] = useState(currentCalendarSeason);
  const seasonalProduce = produce.filter((item) => isInSeason(item, selectedSeason));
  const freshCategories = [...new Set(seasonalProduce.map((item) => item.category))].join(" and ");
  const marketCount = new Set(seasonalProduce.flatMap((item) => item.markets)).size;

  return (
    <>
      <section className="page-hero compact">
        <SectionHeading
          eyebrow="Seasonal Recommendations"
          eyebrowIcon={Sparkles}
          title="Fresh picks for right now"
          subtitle="Discover what is in season today, then find the local markets that usually carry it."
          doodle={`Eat with the\nseasons`}
          art="/assets/art-basket.jpg"
          animate
        />
      </section>
      <section className="seasonal-intro section" aria-labelledby="seasonal-heading">
        <div className="seasonal-season-card">
          <div className="seasonal-season-icon" aria-hidden="true"><Leaf size={30} /></div>
          <div>
            <span className="seasonal-label">
              {selectedSeason === currentCalendarSeason
                ? `Current season · ${titleCase(currentCalendarSeason)} is here`
                : `Browsing · ${titleCase(selectedSeason)}`}
            </span>
            <h1 id="seasonal-heading">{titleCase(selectedSeason)}</h1>
            <p>{SEASON_MESSAGES[selectedSeason]} Recommendations refresh as the calendar changes.</p>
          </div>
          <div className="seasonal-stats" aria-label="Seasonal recommendation summary">
            <span><strong>{seasonalProduce.length}</strong> fresh picks</span>
            <span><strong>{marketCount}</strong> local markets</span>
          </div>
        </div>
        <div className="seasonal-options" aria-label="The four seasons">
          {SEASON_OPTIONS.map(({ id, label, detail, icon: SeasonIcon }, index) => {
            const isCurrent = id === currentCalendarSeason;
            return (
              <button
                className={`seasonal-option${isCurrent ? " is-current" : ""}${selectedSeason === id ? " is-selected" : ""}`}
                style={{ "--seasonal-option-delay": `${index * 90}ms` }}
                key={id}
                type="button"
                aria-pressed={selectedSeason === id}
                onClick={() => setSelectedSeason(id)}
              >
                <span className="seasonal-option-icon"><SeasonIcon size={18} /></span>
                <span className="seasonal-option-copy">
                  <strong>{label}</strong>
                  <small>{isCurrent ? "Happening now" : detail}</small>
                </span>
                {isCurrent ? <span className="seasonal-current-badge">Now</span> : selectedSeason === id ? <span className="seasonal-current-badge seasonal-selected-badge">Selected</span> : null}
              </button>
            );
          })}
        </div>
      </section>
      <section className="section seasonal-results" aria-labelledby="recommendations-heading">
        <div className="seasonal-section-heading">
          <div>
            <span className="eyebrow-tag plain"><CalendarDays size={18} /> In season now</span>
            <h2 id="recommendations-heading">Your seasonal recommendations</h2>
            <p>Explore {freshCategories.toLowerCase()} selected from the FreshFind guide.</p>
          </div>
          <Link className="ghost-btn small" to="/produce">View all produce <ArrowRight size={16} /></Link>
        </div>
        {seasonalProduce.length ? (
          <div className="grid produce-grid seasonal-grid">
            {seasonalProduce.map((item, index) => (
              <div className="seasonal-entry" style={{ "--seasonal-delay": `${index * 70}ms` }} key={item.id}>
                <ProduceCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Cherry size={34} aria-hidden="true" />
            <h3>No seasonal picks are listed for {selectedSeason} yet.</h3>
            <p>Browse the full produce guide for year-round and other seasonal options.</p>
            <Link className="solid-btn small" to="/produce">Browse produce <ArrowRight size={16} /></Link>
          </div>
        )}
      </section>
      <section className="section seasonal-tip-section">
        <div className="seasonal-tip">
          <div className="seasonal-tip-icon"><MapPin size={24} /></div>
          <div>
            <h2>Take your list to a local market</h2>
            <p>Each recommendation includes the markets where it is usually available, so your next fresh find is close by.</p>
          </div>
          <Link className="solid-btn small" to="/markets">Explore markets <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
