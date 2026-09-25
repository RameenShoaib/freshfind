import { useMemo, useState } from "react";
import { distanceFor, nextOpenDay, marketStatus } from "../utils/marketUtils";

export function useMarketFilters(markets, produceByMarket, initialStatus = "", initialDay = "") {
  const [filters, setFilters] = useState({ search: "", area: "", day: initialDay, produce: "", sort: "alpha", status: initialStatus });

  const results = useMemo(() => {
    const search = filters.search.toLowerCase().trim();
    let list = markets.filter((market) => {
      const products = produceByMarket(market);
      const text = `${market.name} ${market.neighborhood} ${market.description} ${products.map((p) => p.name).join(" ")}`.toLowerCase();
      const statusMatch = filters.status === "open" ? marketStatus(market).className === "open" : true;
      return (
        (!search || text.includes(search)) &&
        (!filters.area || market.neighborhood === filters.area) &&
        (!filters.day || market.schedule.some((slot) => slot.day === filters.day)) &&
        (!filters.produce || market.products.includes(filters.produce)) &&
        statusMatch
      );
    });
    if (filters.sort === "proximity") list = [...list].sort((a, b) => distanceFor(a) - distanceFor(b));
    if (filters.sort === "next")
      list = [...list].sort((a, b) => nextOpenDay(a).offset - nextOpenDay(b).offset || nextOpenDay(a).time.localeCompare(nextOpenDay(b).time));
    if (filters.sort === "alpha") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [markets, produceByMarket, filters]);

  return { filters, setFilters, results };
}
