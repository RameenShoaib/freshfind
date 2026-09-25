const addressCache = new Map();
let requestQueue = Promise.resolve();
let lastRequestAt = 0;

function readableAddress(result) {
  const parts = result.address || {};
  const locality = parts.neighbourhood || parts.suburb || parts.city_district || parts.quarter;
  const city = parts.city || parts.town || parts.village || parts.municipality || parts.county;
  const details = [
    parts.house_number && parts.road ? `${parts.house_number} ${parts.road}` : parts.road,
    locality,
    city,
    parts.state,
    parts.country
  ].filter(Boolean);
  return [...new Set(details)].join(", ") || result.display_name || "Address unavailable";
}

export function reverseGeocode({ latitude, longitude }) {
  const key = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  if (addressCache.has(key)) return Promise.resolve(addressCache.get(key));

  const lookup = requestQueue.then(async () => {
    if (addressCache.has(key)) return addressCache.get(key);
    const waitMs = Math.max(0, 1100 - (Date.now() - lastRequestAt));
    if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
    lastRequestAt = Date.now();

    const query = new URLSearchParams({
      format: "jsonv2",
      lat: String(latitude),
      lon: String(longitude),
      zoom: "18",
      addressdetails: "1"
    });
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${query}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("Address lookup failed.");
    const result = await response.json();
    if (!result.address && !result.display_name) throw new Error("No address was found for this location.");
    const address = readableAddress(result);
    addressCache.set(key, address);
    return address;
  });

  requestQueue = lookup.catch(() => {});
  return lookup;
}
