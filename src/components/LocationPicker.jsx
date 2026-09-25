import { useCallback, useEffect, useRef, useState } from "react";
import { Check, LocateFixed, LoaderCircle, MapPin, X } from "lucide-react";
import { reverseGeocode } from "../utils/locationUtils";
import "leaflet/dist/leaflet.css";

const DEFAULT_LOCATION = { latitude: 24.8607, longitude: 67.0011 };

export default function LocationPicker({ initialLocation, autoLocate, detectCurrentLocation, onClose, onConfirm }) {
  const dialogRef = useRef(null);
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const lookupIdRef = useRef(0);
  const debounceRef = useRef(null);
  const mountedRef = useRef(true);
  const skipMoveEndRef = useRef(false);
  const [draft, setDraft] = useState(initialLocation || DEFAULT_LOCATION);
  const [address, setAddress] = useState(initialLocation?.address || "");
  const [lookupState, setLookupState] = useState("");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const lookupAddress = useCallback(async (coordinates) => {
    const lookupId = ++lookupIdRef.current;
    setLookupState("Looking up address…");
    setError("");
    try {
      const result = await reverseGeocode(coordinates);
      if (mountedRef.current && lookupId === lookupIdRef.current) {
        setAddress(result);
        setLookupState("");
      }
    } catch {
      if (mountedRef.current && lookupId === lookupIdRef.current) {
        setAddress(`Near ${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`);
        setLookupState("");
        setError("We could not find a street address here. You can still confirm this map location.");
      }
    }
  }, []);

  const moveTo = useCallback((coordinates, zoom = 16) => {
    setDraft(coordinates);
    setAddress(coordinates.address || "");
    setError("");
    if (mapRef.current) {
      skipMoveEndRef.current = true;
      mapRef.current.setView([coordinates.latitude, coordinates.longitude], zoom, { animate: false });
      window.requestAnimationFrame(() => { skipMoveEndRef.current = false; });
    }
    if (coordinates.address) setLookupState("");
    else lookupAddress(coordinates);
  }, [lookupAddress]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();

    let cancelled = false;
    mountedRef.current = true;
    let map;
    let resizeTimer;
    let onMoveStart;
    let onMoveEnd;
    import("leaflet").then(({ default: L }) => {
      if (cancelled || !mountedRef.current || !mapElementRef.current) return;
      const start = initialLocation || DEFAULT_LOCATION;
      map = L.map(mapElementRef.current, { scrollWheelZoom: false }).setView([start.latitude, start.longitude], initialLocation ? 16 : 13);
      mapRef.current = map;
      L.tileLayer(import.meta.env.VITE_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>'
      }).addTo(map);

      onMoveStart = () => {
        if (skipMoveEndRef.current) return;
        lookupIdRef.current += 1;
        setAddress("");
        setLookupState("Move the map to choose a location.");
      };
      onMoveEnd = () => {
        if (skipMoveEndRef.current) return;
        const center = map.getCenter();
        const coordinates = { latitude: center.lat, longitude: center.lng };
        lookupIdRef.current += 1;
        setDraft(coordinates);
        setAddress("");
        setError("");
        setLookupState("Move the map to choose a location.");
        window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => lookupAddress(coordinates), 1100);
      };
      map.on("movestart", onMoveStart);
      map.on("moveend", onMoveEnd);
      resizeTimer = window.setTimeout(() => map.invalidateSize(), 100);

      if (initialLocation?.address) {
        setAddress(initialLocation.address);
      } else if (autoLocate) {
        setLocating(true);
        detectCurrentLocation()
          .then((coordinates) => { if (!cancelled && mountedRef.current) moveTo(coordinates); })
          .catch(() => { if (!cancelled && mountedRef.current) setError("Location access was unavailable. Drag the map to choose an address instead."); })
          .finally(() => { if (!cancelled && mountedRef.current) setLocating(false); });
      } else {
        lookupAddress(start);
      }
    });

    return () => {
      cancelled = true;
      mountedRef.current = false;
      window.clearTimeout(resizeTimer);
      window.clearTimeout(debounceRef.current);
      if (map) map.off("movestart", onMoveStart);
      if (map && onMoveEnd) map.off("moveend", onMoveEnd);
      map?.remove();
      mapRef.current = null;
    };
  }, [autoLocate, detectCurrentLocation, initialLocation, lookupAddress, moveTo]);

  const useCurrentLocation = async () => {
    setLocating(true);
    setError("");
    try {
      const coordinates = await detectCurrentLocation();
      moveTo(coordinates);
    } catch {
      setError("We could not access your location. Check browser permission or move the map manually.");
    } finally {
      setLocating(false);
    }
  };

  // Whatever confirmed location (if any) should be applied once the native
  // <dialog> actually finishes closing. Using the dialog's own close() method
  // (instead of just letting React unmount it) avoids a stuck full-screen
  // backdrop/blank-white-screen bug in some browsers.
  const pendingConfirmRef = useRef(null);

  const requestDialogClose = () => {
    dialogRef.current?.close();
  };

  const confirm = () => {
    if (!address || lookupState) return;
    pendingConfirmRef.current = { ...draft, address };
    requestDialogClose();
  };

  const handleDialogClose = () => {
    const confirmed = pendingConfirmRef.current;
    pendingConfirmRef.current = null;
    if (confirmed) onConfirm(confirmed);
    else onClose();
  };

  return (
    <dialog
      className="location-dialog"
      ref={dialogRef}
      aria-labelledby="location-dialog-title"
      onClose={handleDialogClose}
      onClick={(event) => { if (event.target === dialogRef.current) requestDialogClose(); }}
    >
      <div className="location-dialog-header">
        <div>
          <span className="location-eyebrow"><MapPin size={15} /> Delivery address</span>
          <h2 id="location-dialog-title">Choose your location</h2>
          <p>Drag the map until the pin is over your preferred address.</p>
        </div>
        <button className="location-close" type="button" aria-label="Close location selector" onClick={requestDialogClose}><X size={20} /></button>
      </div>

      <div className="location-map-wrap">
        <div className="location-map" ref={mapElementRef} aria-label="Interactive map. Drag to choose a location." />
        <div className="location-center-pin" aria-hidden="true"><MapPin size={40} fill="currentColor" /></div>
      </div>

      <div className="location-selection" aria-live="polite">
        <MapPin size={19} />
        <div>
          <strong>{address || (lookupState || "Finding address…")}</strong>
          {lookupState && address ? <small>{lookupState}</small> : null}
        </div>
      </div>
      {error ? <p className="location-error" role="status">{error}</p> : null}
      <div className="location-dialog-actions">
        <button className="ghost-btn location-current" type="button" onClick={useCurrentLocation} disabled={locating}>
          {locating ? <LoaderCircle className="location-spin" size={17} /> : <LocateFixed size={17} />}
          {locating ? "Finding you…" : "Use My Current Location"}
        </button>
        <button className="solid-btn location-confirm" type="button" onClick={confirm} disabled={!address || Boolean(lookupState)}>
          <Check size={17} /> Confirm Location
        </button>
      </div>
      <p className="location-attribution">Address lookup by <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noreferrer">OpenStreetMap Nominatim</a>. <a href="https://operations.osmfoundation.org/policies/nominatim/" target="_blank" rel="noreferrer">Usage policy</a>.</p>
    </dialog>
  );
}
