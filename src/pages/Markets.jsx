import { useSearchParams } from "react-router-dom";
import { Store } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { useMarketFilters } from "../hooks/useMarketFilters";
import MarketFilterPanel from "../components/MarketFilterPanel";
import MarketCard from "../components/MarketCard";
import SectionHeading from "../components/SectionHeading";

export default function Markets() {
  const { markets, produce, produceByMarket } = useAppData();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") === "open" ? "open" : "";
  const { filters, setFilters, results } = useMarketFilters(markets, produceByMarket, initialStatus);

  return (
    <>
      <section className="page-hero compact">
        <SectionHeading
          eyebrow="Market Directory"
          eyebrowIcon={Store}
          title="Find Your Perfect Market"
          subtitle="Search, filter, sort, and compare local market cards to find the best fit near you."
          doodle={"Local Markets\nBetter Food\nHappier You"}
          art="/assets/art-crate.jpg"
          animate
        />
      </section>
      <section className="section">
        <MarketFilterPanel filters={filters} onChange={setFilters} markets={markets} produce={produce} />
        <div className="grid cards">
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
    </>
  );
}
