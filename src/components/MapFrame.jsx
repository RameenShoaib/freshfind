export default function MapFrame({ lat, lng, label }) {
  const query = encodeURIComponent(`${lat},${lng} ${label}`);
  return (
    <iframe
      className="map-frame"
      title={`Map showing ${label}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${query}&output=embed`}
    ></iframe>
  );
}
