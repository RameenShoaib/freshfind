import { useMemo, useState } from "react";
import { Leaf, Search, SlidersHorizontal } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import ProduceCard from "../components/ProduceCard";
import SectionHeading from "../components/SectionHeading";
import FilterSelect from "../components/FilterSelect";

export default function Produce() {
  const { produce, marketNames } = useAppData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = useMemo(() => [...new Set(produce.map((item) => item.category))].sort(), [produce]);

  const results = useMemo(() => {
    const lower = search.toLowerCase();
    return produce.filter((item) => {
      const text = `${item.name} ${item.description} ${item.season} ${marketNames(item.markets)}`.toLowerCase();
      return (!lower || text.includes(lower)) && (!category || item.category === category);
    });
  }, [produce, search, category, marketNames]);

  return (
    <>
      <section className="page-hero compact">
        <SectionHeading
          eyebrow="Produce Guide"
          eyebrowIcon={Leaf}
          title="Browse Produce by Season"
          subtitle="Find produce by category, season, and the markets that usually carry it."
          doodle={"Good Food\nBetter Choices"}
          art="/assets/art-basket.jpg"
          animate
        />
      </section>
      <section className="section">
        <form className="filter-bar" role="search" onSubmit={(event) => event.preventDefault()}>
          <div className="filter-field search">
            <Search size={24} />
            <label>
              <span className="field-label">Search</span>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, season, market" />
            </label>
          </div>
          <div className={`filter-field${category ? " active" : ""}`}>
            <Leaf size={22} />
            <FilterSelect label="Category" value={category} options={[{ value: "", label: "All categories" }, ...categories.map((cat) => ({ value: cat, label: cat }))]} onChange={setCategory} />
          </div>
          <button
            className="clear-btn"
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
          >
            <SlidersHorizontal size={19} /> Clear filters
          </button>
        </form>
        <div className="grid produce-grid">
          {results.length ? (
            results.map((item) => <ProduceCard key={item.id} item={item} />)
          ) : (
            <div className="empty-state">
              <h3>No produce found.</h3>
              <p>Try another category or search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
