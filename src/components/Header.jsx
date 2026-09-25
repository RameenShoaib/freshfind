import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home as HomeIcon, Store, Leaf, Mail, Info, Menu, Bookmark, MapPin, ChevronDown, LogIn, UserPlus, Sparkles } from "lucide-react";
import HeaderClock from "./HeaderClock";
import LocationPicker from "./LocationPicker";
import AuthModal from "./AuthModal";
import { useAppData } from "../context/AppDataContext";
import { useToast } from "../context/ToastContext";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true, icon: HomeIcon },
  { to: "/markets", label: "Markets", icon: Store },
  { to: "/produce", label: "Produce Guide", icon: Leaf },
  { to: "/seasonal", label: "Seasonal Picks", icon: Sparkles },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/about", label: "About", icon: Info }
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { selectedLocation, detectCurrentLocation, saveSelectedLocation } = useAppData();
  const [locationPickerOpen, setLocationPickerOpen] = useState(!selectedLocation);
  const [autoLocate, setAutoLocate] = useState(!selectedLocation);
  const [authMode, setAuthMode] = useState(null);
  const showToast = useToast();

  const closeLocationPicker = () => {
    setLocationPickerOpen(false);
    setAutoLocate(false);
  };

  const confirmLocation = (location) => {
    saveSelectedLocation(location);
    closeLocationPicker();
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setNavOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <NavLink className="brand" to="/" aria-label="FreshFind home">
          <img src="/assets/brand-logo.jpeg" alt="" width="42" height="42" />
          <span>
            <strong>FreshFind</strong>
            <small>Fresh All Along</small>
          </span>
        </NavLink>
        <div className={`nav-links${navOpen ? " show" : ""}`} id="primary-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setNavOpen(false)}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <item.icon size={16} strokeWidth={2.2} />
              {item.label}
            </NavLink>
          ))}
          <div className="nav-auth-mobile">
            <button className="auth-btn auth-login" type="button" onClick={() => openAuth("login")}>
              <LogIn size={16} /> Login
            </button>
            <button className="auth-btn auth-signup" type="button" onClick={() => openAuth("signup")}>
              <UserPlus size={16} /> Sign Up
            </button>
          </div>
        </div>
        <div className="header-actions">
          <button className="delivery-location" type="button" onClick={() => { setAutoLocate(false); setLocationPickerOpen(true); }} aria-label={`Deliver to ${selectedLocation?.address || "Choose your address"}`}>
            <MapPin size={18} />
            <span><small>Deliver to</small><strong>{selectedLocation?.address || "Choose address"}</strong></span>
            <ChevronDown size={15} />
          </button>
          <HeaderClock />
          <div className="auth-actions">
            <button className="auth-btn auth-login" type="button" onClick={() => openAuth("login")}>
              <LogIn size={16} /> Login
            </button>
            <button className="auth-btn auth-signup" type="button" onClick={() => openAuth("signup")}>
              <UserPlus size={16} /> Sign Up
            </button>
          </div>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <Menu size={20} />
          </button>
        </div>
      </nav>
      {locationPickerOpen ? (
        <LocationPicker
          initialLocation={selectedLocation}
          autoLocate={autoLocate}
          detectCurrentLocation={detectCurrentLocation}
          onClose={closeLocationPicker}
          onConfirm={confirmLocation}
        />
      ) : null}
      {authMode ? (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={setAuthMode}
          onSubmit={(mode) => {
            showToast(mode === "login" ? "Demo login successful." : "Demo account created successfully.");
            setAuthMode(null);
          }}
        />
      ) : null}
    </header>
  );
}
