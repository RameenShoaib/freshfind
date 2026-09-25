import { Search, MapPin, CalendarDays, Leaf, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { DAYS } from "../utils/marketUtils";
import FilterSelect from "./FilterSelect";

export default function MarketFilterPanel({ filters, onChange, markets, produce }) {
  const neighborhoods = [...new Set(markets.map((market) => market.neighborhood))].sort();

  const update = (field) => (event) => onChange({ ...filters, [field]: event.target.value });

  const handleReset = () => {
    onChange({ search: "", area: "", day: "", produce: "", sort: "alpha", status: "" });
  };

  const tint = (value) => (value ? " active" : "");

  return (
    <form className="filter-bar" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="filter-field search">
        <Search size={24} />
        <label>
          <span className="field-label">Search</span>
          <input type="search" value={filters.search} onChange={update("search")} placeholder="Market, area, or product..." />
        </label>
      </div>
      <div className={`filter-field${tint(filters.area)}`}>
        <MapPin size={22} />
        <FilterSelect label="Area" value={filters.area} options={[{ value: "", label: "All areas" }, ...neighborhoods.map((area) => ({ value: area, label: area }))]} onChange={(value) => onChange({ ...filters, area: value })} />
      </div>
      <div className={`filter-field${tint(filters.day)}`}>
        <CalendarDays size={22} />
        <FilterSelect label="Day" value={filters.day} options={[{ value: "", label: "Any day" }, ...DAYS.map((day) => ({ value: day, label: day }))]} onChange={(value) => onChange({ ...filters, day: value })} />
      </div>
      <div className={`filter-field${tint(filters.produce)}`}>
        <Leaf size={22} />
        <FilterSelect label="Produce" value={filters.produce} options={[{ value: "", label: "Any produce" }, ...produce.map((item) => ({ value: item.id, label: item.name }))]} onChange={(value) => onChange({ ...filters, produce: value })} />
      </div>
      <div className="filter-field">
        <ArrowUpDown size={22} />
        <FilterSelect label="Sort" value={filters.sort} options={[{ value: "alpha", label: "Alphabetical" }, { value: "proximity", label: "Proximity" }, { value: "next", label: "Next open day" }]} onChange={(value) => onChange({ ...filters, sort: value })} />
      </div>
      <button className="clear-btn" type="button" onClick={handleReset}>
        <SlidersHorizontal size={19} /> Clear filters
      </button>
    </form>
  );
}
