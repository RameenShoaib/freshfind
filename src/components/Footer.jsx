import { Link } from "react-router-dom";
import { ArrowRight, Leaf, MapPin, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/markets", label: "Explore Markets" },
  { to: "/produce", label: "Produce Guide" },
  { to: "/seasonal", label: "Seasonal Picks" },
  { to: "/about", label: "About FreshFind" },
  { to: "/contact", label: "Contact" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link className="footer-brand" to="/" aria-label="FreshFind home">
              <span className="footer-brand-icon"><Leaf size={23} /></span>
              <span><strong>FreshFind</strong><small>Fresh All Along</small></span>
            </Link>
            <p>Discover the good stuff growing close to home. Find fresh produce, local markets, and a little more joy in every meal.</p>
            <Link className="footer-cta" to="/markets">Find your local market <ArrowRight size={17} /></Link>
          </div>

          <div className="footer-links-block">
            <h2>Explore</h2>
            <ul>{FOOTER_LINKS.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}</ul>
          </div>

          <div className="footer-note-block">
            <h2>Good food starts nearby</h2>
            <p>Meet the markets and growers bringing fresh, seasonal choices to your community.</p>
            <div className="footer-contact"><MapPin size={17} /><span>Karachi's local markets, closer to you</span></div>
            <Link className="footer-contact footer-contact-link" to="/contact"><Mail size={17} /><span>Get in touch</span></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FreshFind. Fresh all along.</span>
          <span className="footer-bottom-note"><Leaf size={15} /> Eat fresh. Feel good.</span>
        </div>
      </div>
    </footer>
  );
}
