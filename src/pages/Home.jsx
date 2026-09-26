import { Link } from "react-router-dom";
import { Leaf, Search, MapPin, Clock, BookOpen, ArrowRight, BrainCircuit } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { useMarketFilters } from "../hooks/useMarketFilters";
import { distanceFor, marketStatus, todayName } from "../utils/marketUtils";
import MarketFilterPanel from "../components/MarketFilterPanel";
import MarketCard from "../components/MarketCard";
import SectionHeading from "../components/SectionHeading";
import FeaturedSpotlight from "../components/FeaturedSpotlight";
import HighlightColumn from "../components/HighlightColumn";
import ProduceCard from "../components/ProduceCard";
import StatusStrip from "../components/StatusStrip";

const FEATURES = [
  { icon: Leaf, tone: "green", title: "Fresh & Seasonal", text: "Only the best, always fresh.", to: "/seasonal" },
  { icon: MapPin, tone: "orange", title: "Local Markets", text: "Support local farmers." },
  { icon: Clock, tone: "red", title: "Market Timings", text: "Plan your visit easily." },
  { icon: BookOpen, tone: "green", title: "Helpful Guides", text: "Learn, explore, grow." }
];

export default function Home() {
  const { markets, produce, produceByMarket } = useAppData();
  const { filters, setFilters, results } = useMarketFilters(markets, produceByMarket, "", todayName());

  const seasonal = produce.filter((item) => /spring|summer|fall|winter/i.test(item.season)).slice(0, 6);
  const nearby = [...markets].sort((a, b) => distanceFor(a) - distanceFor(b)).slice(0, 3);
  const openNow = markets.filter((m) => marketStatus(m).className === "open").slice(0, 3);

  return (
    <>
      <section className="hero-v3">
        <div className="hero-photo" aria-hidden="true">
          <video
            src="/assets/video/watermark-removed-market-highlight (1).mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <p className="doodle hero-doodle-a">
            {"Good Food\nHealthy Life"} <span className="heart">&#9825;</span>
          </p>
        </div>

        <div className="hero-inner">
          <span className="hero-badge">
            <Leaf size={22} className="badge-leaf" />
            <span>100% Fresh</span>
            <i aria-hidden="true" />
            <span>Local Markets</span>
            <i aria-hidden="true" />
            <span>Better Living</span>
          </span>
          <h1 className="animate__animated animate__backInLeft">
            <span className="script-line">Fresh Fruits &amp; Vegetables</span>
            <span className="hero-title">
              Straight From <span className="underlined">Local Markets</span>
            </span>
          </h1>
          <p className="lede">Discover fresh, seasonal produce, local markets, opening hours, and helpful guides &mdash; all in one place.</p>
          <div className="hero-actions">
            <Link className="solid-btn hero-btn" to="/markets">
              <Search size={20} /> Find a Market Near You <ArrowRight size={19} />
            </Link>
            <Link className="outline-btn hero-btn" to="/produce">
              <Leaf size={20} /> Browse Produce
            </Link>
            <Link className="outline-btn hero-btn price-ai-hero-link" to="/price-comparison">
              <BrainCircuit size={20} /> Compare Prices
            </Link>
          </div>
          <StatusStrip />
        </div>

        <p className="doodle hero-doodle-b" aria-hidden="true">
          {"Fresh\nChoices\nEvery Day"} <span className="heart">&#9825;</span>
        </p>

        <div className="feature-strip">
          {FEATURES.map((feature) => (
            (() => {
              const FeatureTag = feature.to ? Link : "div";
              return <FeatureTag className={`feature-item${feature.to ? " feature-item-link" : ""}`} to={feature.to} key={feature.title}>
              <span className={`feature-icon ${feature.tone}`}>
                <feature.icon size={26} strokeWidth={1.8} />
              </span>
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
              </FeatureTag>;
            })()
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          variant="plain"
          eyebrow="Find Your Perfect Market"
          eyebrowIcon={Leaf}
          title="Explore Fresh Markets Near You"
          subtitle="Discover local markets, fresh produce, and seasonal delights all in one place."
          doodle={"Local Markets\nBetter Food\nHappier You"}
          art="/assets/art-crate.jpg"
        />
        <MarketFilterPanel filters={filters} onChange={setFilters} markets={markets} produce={produce} />
        <div className={`grid cards${results.length === 1 ? " single" : ""}`}>
          {results.length ? (
            results.map((market) => <MarketCard key={market.id} market={market} />)
          ) : (
            <div className="empty-state">
              <h3>No markets match those filters.</h3>
              <p>Try clearing one filter or searching another produce item.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Market Highlights"
          eyebrowIcon={Leaf}
          title="Featured, nearby, and open-now picks"
          subtitle="Fresh, local and seasonal produce — straight from farmers to your table."
          doodle={"Fresh\nChoices\nEvery Day"}
          art="/assets/art-basket.jpg"
        />
        <div className="highlight-stack">
          <FeaturedSpotlight markets={markets} />
          <div className="highlight-grid-v2">
            <HighlightColumn title="Nearby" markets={nearby} fallbackMarkets={markets} />
            <HighlightColumn title="Currently Open" markets={openNow} fallbackMarkets={markets} />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="This Week's Seasonal Picks"
          eyebrowIcon={Leaf}
          title="Produce connected to markets"
          subtitle="Fresh, local and seasonal produce — straight from farmers to your table."
          doodle={"Good Food\nBetter Choices"}
          art="/assets/art-basket.jpg"
        />
        <div className="grid produce-grid">
          {seasonal.map((item) => (
            <ProduceCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
