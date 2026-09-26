import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, MapPin, Search, Sparkles, TrendingDown } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import priceComparisons from "../data/priceComparisons.json";
import FilterSelect from "../components/FilterSelect";

const money = new Intl.NumberFormat("en-PK");

export default function PriceComparison() {
  const navigate = useNavigate();
  const { markets, produce } = useAppData();
  const [query, setQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("tomato");

  const visibleProducts = useMemo(() => {
    const text = query.trim().toLowerCase();
    return produce.filter((item) => !text || `${item.name} ${item.category}`.toLowerCase().includes(text));
  }, [produce, query]);

  const selectedProduct = produce.find((item) => item.id === selectedProductId);
  const comparison = priceComparisons.find((item) => item.productId === selectedProductId);
  const rows = useMemo(() => {
    if (!comparison) return [];
    return comparison.prices
      .map((entry) => ({ ...entry, market: markets.find((market) => market.id === entry.marketId) }))
      .filter((entry) => entry.market)
      .sort((a, b) => a.price - b.price);
  }, [comparison, markets]);
  const lowestPrice = rows.length ? rows[0].price : null;

  const selectProduct = (id) => {
    setSelectedProductId(id);
    setQuery("");
  };

  const searchProduct = (value) => {
    setQuery(value);
    const text = value.trim().toLowerCase();
    if (!text) return;
    const match = produce.find((item) => `${item.name} ${item.id}`.toLowerCase().includes(text));
    if (match) setSelectedProductId(match.id);
  };

  return (
    <>
      <section className="page-hero compact price-ai-hero">
        <div className="price-ai-hero-copy">
          <span className="eyebrow-tag"><BrainCircuit size={18} /> Spatial AI Price Comparison</span>
          <h1>Compare fresh prices across local markets</h1>
          <p>Choose a product to see the same unit compared across FreshFind markets, with location and distance included where available.</p>
        </div>
        <div className="price-ai-orbit" aria-hidden="true"><Sparkles size={34} /><span>AI</span></div>
      </section>

      <section className="section price-ai-section">
        <div className="price-ai-panel">
          <div className="price-ai-controls">
            <label className="price-search-field">
              <Search size={20} />
              <span>
                <small>Search produce</small>
                <input value={query} onChange={(event) => searchProduct(event.target.value)} placeholder="Try tomato, milk, strawberry..." />
              </span>
            </label>
            <div className="price-select-field"><FilterSelect label="Select product" value={selectedProductId} options={visibleProducts.length ? visibleProducts.map((item) => ({ value: item.id, label: `${item.name} · ${item.category}` })) : [{ value: selectedProductId, label: "No matching produce" }]} onChange={selectProduct} /></div>
          </div>

          {selectedProduct ? (
            <div className="price-ai-heading">
              <div>
                <span className="eyebrow-tag"><TrendingDown size={16} /> Market snapshot</span>
                <h2>{selectedProduct.name} <span>&mdash; Price Comparison</span></h2>
                <p>{selectedProduct.category} Â· {comparison ? `same unit: 1 ${comparison.unit}` : "price data not available"}</p>
              </div>
              {lowestPrice !== null ? <strong className="price-ai-lowest">Best shown price<br /><b>Rs. {money.format(lowestPrice)}</b>/{comparison.unit}</strong> : null}
            </div>
          ) : null}

          {rows.length ? (
            <div className="price-comparison-list">
              {rows.map((row, index) => (
                <article className={`price-comparison-row${index === 0 ? " best-price" : ""}`} key={row.market.id}>
                  <div className="price-rank">{index + 1}</div>
                  <div className="price-market-copy">
                    <h3>{row.market.name}</h3>
                    <p><MapPin size={14} /> {row.market.neighborhood || row.market.address}</p>
                  </div>
                  <span className="price-distance">{Number.isFinite(row.market.distanceKm) ? `${row.market.distanceKm} km away` : "Distance unavailable"}</span>
                  <strong className="price-value">Rs. {money.format(row.price)}<small>/{comparison.unit}</small></strong>
                  {index === 0 ? <span className="price-best-actions"><span className="best-price-label">Best shown</span><button className="price-row-arrow" type="button" aria-label={`Explore ${row.market.name}`} onClick={() => navigate(`/markets/${row.market.id}`)}><ArrowRight size={18} /></button></span> : <button className="price-row-arrow" type="button" aria-label={`Explore ${row.market.name}`} onClick={() => navigate(`/markets/${row.market.id}`)}><ArrowRight size={18} /></button>}
                </article>
              ))}
            </div>
          ) : (
            <div className="price-empty-state">
              <Sparkles size={28} />
              <h3>No price data available yet</h3>
              <p>FreshFind does not have a verified demo price for {selectedProduct?.name || "this produce"}. No price has been guessed or generated.</p>
            </div>
          )}

          <p className="price-ai-note">Demo/sample prices only. Real market prices may vary by day, quality, season, and seller.</p>
        </div>
      </section>
    </>
  );
}

