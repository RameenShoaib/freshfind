import { useParams } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import { useNow } from "../hooks/useNow";
import { DAYS, formatTime, marketStatus, todayName } from "../utils/marketUtils";
import MapFrame from "../components/MapFrame";
import ProduceCard from "../components/ProduceCard";
import NotFound from "./NotFound";

export default function MarketDetail() {
  const { id } = useParams();
  const { markets, produceByMarket, locationStatus, requestLocation } = useAppData();
  const now = useNow();

  const market = markets.find((item) => item.id === id);
  if (!market) return <NotFound message="Market not found" />;

  const status = marketStatus(market, now);
  const products = produceByMarket(market);
  const locationMessage = {
    idle: "Location has not been requested yet.",
    loading: "Checking browser location permission...",
    granted: "Location permission granted. Nearby sorting can use your approximate position.",
    selected: "Your selected delivery address is available for nearby sorting.",
    denied: "Location permission was denied or timed out. Sample distances remain available.",
    unavailable: "Geolocation is unavailable in this browser."
  }[locationStatus] || "";

  return (
    <>
      <section className="page-hero compact">
        <div className="detail-title">
          <div>
            <h1 className="animate__animated animate__backInLeft">{market.name}</h1>
            <p>{market.description}</p>
          </div>
          <span className={`pill ${status.className}`}>{status.label}</span>
        </div>
      </section>
      <section className="section detail-layout">
        <article className="panel">
          <h2>Location</h2>
          <p>
            <strong>{market.address}</strong>
            <br />
            {market.neighborhood}
          </p>
          <MapFrame lat={market.latitude} lng={market.longitude} label={market.name} />
          <button className="ghost-btn" type="button" onClick={requestLocation}>
            Use my location
          </button>
          <p className="helper">{locationMessage}</p>
        </article>
        <article className="panel">
          <h2>Weekly schedule</h2>
          <table className="schedule-table">
            <caption>Operating days and hours for {market.name}</caption>
            <thead>
              <tr>
                <th>Day</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => {
                const slot = market.schedule.find((item) => item.day === day);
                const isToday = day === todayName();
                return (
                  <tr key={day} className={isToday ? "today" : undefined}>
                    <td>{day}</td>
                    <td>{slot ? `${formatTime(slot.open)} to ${formatTime(slot.close)}` : "Closed"}</td>
                    <td>{isToday ? status.label : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
        <article className="panel wide">
          <div className="section-heading">
            <div>
              <h2>Products usually available</h2>
              <p>Produce relationships are loaded dynamically from JSON.</p>
            </div>
          </div>
          <div className="grid produce-grid">
            {products.map((item) => (
              <ProduceCard key={item.id} item={item} backTo="/markets" />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
