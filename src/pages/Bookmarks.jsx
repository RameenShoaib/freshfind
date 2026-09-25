import { Link } from "react-router-dom";
import { Bookmark, Leaf, Store } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import ProduceCard from "../components/ProduceCard";
import MarketCard from "../components/MarketCard";
import SectionHeading from "../components/SectionHeading";

export default function Bookmarks() {
  const {
    markets,
    produce,
    bookmarkedMarketIds,
    bookmarkedProductIds,
  } = useAppData();
  const bookmarkedMarkets = markets.filter((item) => bookmarkedMarketIds.includes(item.id));
  const bookmarkedProducts = produce.filter((item) => bookmarkedProductIds.includes(item.id));
  const hasBookmarks = bookmarkedMarkets.length > 0 || bookmarkedProducts.length > 0;

  return (
    <>
      <section className="page-hero compact">
        <SectionHeading
          eyebrow="Your Collection"
          eyebrowIcon={Bookmark}
          title="Bookmarked Products"
          subtitle="All the fresh products you have saved, together in one place."
          doodle={"Saved for\nLater"}
          art="/assets/art-basket.jpg"
          animate
        />
      </section>
      <section className="section">
        {hasBookmarks ? (
          <div className="bookmarks-collection">
            {bookmarkedMarkets.length ? (
              <section className="bookmark-group" aria-labelledby="saved-markets-heading">
                <div className="bookmark-group-heading">
                  <h2 id="saved-markets-heading"><Store size={22} /> Saved markets</h2>
                </div>
                <div className="grid cards">
                  {bookmarkedMarkets.map((market) => (
                    <div className="bookmark-entry" key={market.id}>
                      <MarketCard market={market} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {bookmarkedProducts.length ? (
              <section className="bookmark-group" aria-labelledby="saved-produce-heading">
                <div className="bookmark-group-heading">
                  <h2 id="saved-produce-heading"><Leaf size={22} /> Saved produce</h2>
                </div>
                <div className="grid produce-grid">
                  {bookmarkedProducts.map((item) => (
                    <div className="bookmark-entry" key={item.id}>
                      <ProduceCard item={item} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="empty-state bookmarks-empty">
            <Bookmark size={36} aria-hidden="true" />
            <h3>No bookmarks yet.</h3>
            <p>Save a market or produce guide entry to build your collection.</p>
            <div className="bookmarks-empty-actions">
              <Link className="solid-btn small" to="/markets"><Store size={16} /> Browse markets</Link>
              <Link className="ghost-btn small" to="/produce"><Leaf size={16} /> Browse produce</Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
