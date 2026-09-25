import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Leaves from "./components/Leaves";
import PageIndex from "./components/PageIndex";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import MarketDetail from "./pages/MarketDetail";
import Produce from "./pages/Produce";
import Seasonal from "./pages/Seasonal";
import ProduceDetail from "./pages/ProduceDetail";
import Bookmarks from "./pages/Bookmarks";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AboutDetail from "./pages/AboutDetail";
import NotFound from "./pages/NotFound";
import Breadcrumbs from "./components/Breadcrumbs";

const TITLES = {
  "/": "FreshFind | Fresh All Along",
  "/markets": "Market Directory | FreshFind",
  "/produce": "Produce Guide | FreshFind",
  "/seasonal": "Seasonal Recommendations | FreshFind",
  "/bookmarks": "Bookmarked Products | FreshFind",
  "/contact": "Contact Us | FreshFind",
  "/about": "About Us | FreshFind"
};

function pageTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/markets/")) return "Market Detail | FreshFind";
  if (pathname.startsWith("/produce/")) return "Produce Detail | FreshFind";
  if (pathname.startsWith("/about/")) return "About Detail | FreshFind";
  return "FreshFind";
}

export default function App() {
  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    document.title = pageTitle(location.pathname);
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a className="skip-link" href="#app">
        Skip to content
      </a>
      <Leaves />
      <Header />
      <main id="app" tabIndex="-1" ref={mainRef}>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:id" element={<MarketDetail />} />
          <Route path="/produce" element={<Produce />} />
          <Route path="/seasonal" element={<Seasonal />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/produce/:id" element={<ProduceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:slug" element={<AboutDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PageIndex />
      <Footer />
      <Chatbot />
    </>
  );
}
