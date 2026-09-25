import { useParams } from "react-router-dom";
import { BookOpen, CalendarDays, Tag } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import MarketCard from "../components/MarketCard";
import NotFound from "./NotFound";

export default function ProduceDetail() {
  const { id } = useParams();
  const { produce, markets } = useAppData();

  const item = produce.find((entry) => entry.id === id);
  if (!item) return <NotFound message="Produce not found" />;

  const relatedMarkets = markets.filter((market) => item.markets.includes(market.id));

  return (
    <>
      <section className="page-hero compact">
        <h1 className="animate__animated animate__backInLeft">{item.name}</h1>
        <p>{item.description}</p>
      </section>
      <section className="section detail-layout">
        <article className="panel wide produce-fact-panel">
          <h2>Season and Category</h2>
          <div className="fact-row">
            <div className="fact-item">
              <span className="fact-icon">
                <CalendarDays size={20} />
              </span>
              <div>
                <small>Season</small>
                <strong>{item.season}</strong>
              </div>
            </div>
            <div className="fact-item">
              <span className="fact-icon">
                <Tag size={20} />
              </span>
              <div>
                <small>Category</small>
                <strong>{item.category}</strong>
              </div>
            </div>
          </div>
          {item.id === "spinach" ? (
            <a className="solid-btn small produce-reference-link" href="/assets/spainsh.htm" target="_blank" rel="noreferrer">
              <BookOpen size={16} /> Read spinach reference
            </a>
          ) : null}
        </article>
        <article className="panel wide">
          <h2>Markets carrying {item.name}</h2>
          <div className="grid cards">
            {relatedMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
