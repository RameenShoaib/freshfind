import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import marketsData from "../data/markets.json";
import produceData from "../data/produce.json";
import chatbotData from "../data/chatbot.json";
import { haversine } from "../utils/marketUtils";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [markets, setMarkets] = useState(marketsData);
  const [produce] = useState(produceData);
  const [chatbot] = useState(chatbotData);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("freshfind-selected-location") || "null");
      return saved && Number.isFinite(saved.latitude) && Number.isFinite(saved.longitude) && typeof saved.address === "string" ? saved : null;
    } catch {
      return null;
    }
  });
  const [bookmarkedProductIds, setBookmarkedProductIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("freshfind-product-bookmarks") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [bookmarkedMarketIds, setBookmarkedMarketIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("freshfind-market-bookmarks") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const toggleProductBookmark = useCallback((id) => {
    setBookmarkedProductIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try {
        localStorage.setItem("freshfind-product-bookmarks", JSON.stringify(next));
      } catch {
        // Keep bookmarks usable for this session if storage is unavailable.
      }
      return next;
    });
  }, []);

  const toggleMarketBookmark = useCallback((id) => {
    setBookmarkedMarketIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try {
        localStorage.setItem("freshfind-market-bookmarks", JSON.stringify(next));
      } catch {
        // Keep bookmarks usable for this session if storage is unavailable.
      }
      return next;
    });
  }, []);

  const applyDistances = useCallback((location) => {
    setMarkets((prev) =>
      prev.map((market) => ({
        ...market,
        distanceKm: haversine(location.latitude, location.longitude, market.latitude, market.longitude)
      }))
    );
  }, []);

  // Reapply the saved location after refresh so Nearby always reflects the
  // user's selected coordinates, not the default distances from markets.json.
  useEffect(() => {
    if (selectedLocation) applyDistances(selectedLocation);
  }, [selectedLocation, applyDistances]);

  const detectCurrentLocation = useCallback(() => new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      reject(new Error("Geolocation is unavailable in this browser."));
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        setUserLocation(location);
        setLocationStatus("granted");
        applyDistances(location);
        resolve(location);
      },
      (error) => {
        setLocationStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable");
        reject(error);
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
  }), [applyDistances]);

  const saveSelectedLocation = useCallback((location) => {
    const selected = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address
    };
    setSelectedLocation(selected);
    setUserLocation({ latitude: selected.latitude, longitude: selected.longitude });
    setLocationStatus("selected");
    applyDistances(selected);
    try {
      localStorage.setItem("freshfind-selected-location", JSON.stringify(selected));
    } catch {
      // Keep the confirmed location available for this session if storage is unavailable.
    }
  }, [applyDistances]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        setUserLocation(location);
        setLocationStatus("granted");
        applyDistances(location);
      },
      () => setLocationStatus("denied"),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  }, [applyDistances]);

  const produceByMarket = useCallback(
    (market) => produce.filter((item) => market.products.includes(item.id)),
    [produce]
  );

  const marketNames = useCallback(
    (ids) => ids.map((id) => markets.find((market) => market.id === id)?.name).filter(Boolean).join(", "),
    [markets]
  );

  const value = useMemo(
    () => ({
      markets,
      produce,
      bookmarkedProductIds,
      toggleProductBookmark,
      bookmarkedMarketIds,
      toggleMarketBookmark,
      chatbot,
      userLocation,
      locationStatus,
      requestLocation,
      selectedLocation,
      detectCurrentLocation,
      saveSelectedLocation,
      produceByMarket,
      marketNames
    }),
    [markets, produce, chatbot, userLocation, locationStatus, requestLocation, selectedLocation, detectCurrentLocation, saveSelectedLocation, produceByMarket, marketNames, bookmarkedProductIds, toggleProductBookmark, bookmarkedMarketIds, toggleMarketBookmark]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
