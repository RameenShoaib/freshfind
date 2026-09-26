import { Link } from "react-router-dom";
import { CalendarDays, Lightbulb, MapPin, Search, Sprout, Target } from "lucide-react";
import StatusStrip from "../components/StatusStrip";

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero compact about-hero">

        <div className="about-hero-content">

          <h1 className="animate__animated animate__backInLeft">
            About FreshFind
          </h1>

          <p>
            Discover fresh food, local markets, seasonal products, and
            trusted information all in one simple place.
          </p>

          <StatusStrip showClock={false} />

        </div>
      </section>


      {/* INTRO */}
      <section className="section about-section">

        <div className="about-grid">

          {/* BOX 1 */}
          <Link
            to="/about/what-is-freshfind"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Search size={28} />
              </div>

              <h3>What is FreshFind?</h3>

              <p>
                FreshFind is a responsive platform that helps users explore
                local markets, fresh products, seasonal food, and location
                information through one easy-to-use application.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          {/* BOX 2 */}
          <Link
            to="/about/our-purpose"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Target size={28} />
              </div>

              <h3>Our Purpose</h3>

              <p>
                Our goal is to connect people with fresh and locally available
                food while making market discovery faster, simpler, and more
                convenient.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          {/* BOX 3 */}
          <Link
            to="/about/our-mission"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Sprout size={28} />
              </div>

              <h3>Our Mission</h3>

              <p>
                We want to make local food discovery simple by connecting
                people with useful market, product, and seasonal information.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>

          <Link
            to="/about/local-discovery"
            className="about-card-link"
          >
            <article className="panel about-card">
              <div className="about-card-icon">
                <MapPin size={28} />
              </div>
              <h3>Local Discovery</h3>
              <p>
                Explore local markets and useful location-based information
                in one convenient place.
              </p>
              <span className="about-read-more">
                Read More
              </span>
            </article>
          </Link>

        </div>
      </section>


      {/* PROBLEM & SOLUTION */}
      <section className="section about-section">

        <div className="about-heading">

          <span>OUR MISSION</span>

          <h2>The Problem We Solve</h2>

          <p>
            Finding the right market or fresh product can sometimes be
            difficult. FreshFind brings the important information together
            in one place.
          </p>

        </div>

        <div className="about-grid">

          <Link
            to="/about/finding-local-markets"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Search size={28} />
              </div>

              <h3>Finding Local Markets</h3>

              <p>
                Users may not always know which markets are nearby or what
                they offer. FreshFind makes local discovery easier.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          <Link
            to="/about/finding-fresh-products"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Sprout size={28} />
              </div>

              <h3>Finding Fresh Products</h3>

              <p>
                FreshFind helps users explore available fresh and seasonal
                food information without searching through multiple sources.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          <Link
            to="/about/understanding-seasons"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <CalendarDays size={28} />
              </div>

              <h3>Understanding Seasons</h3>

              <p>
                Seasonal information helps users understand which products
                are commonly available during different times of the year.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>

          <Link
            to="/about/our-purpose"
            className="about-card-link"
          >
            <article className="panel about-card">
              <div className="about-card-icon">
                <Lightbulb size={28} />
              </div>
              <h3>Simple Discovery</h3>
              <p>
                Find useful market and product information without searching
                through different sources.
              </p>
              <span className="about-read-more">
                Read More
              </span>
            </article>
          </Link>

        </div>
      </section>


      {/* FEATURES */}
      <section className="section about-section">

        <div className="about-heading">

          <span>WHY FRESHFIND</span>

          <h2>Everything in One Place</h2>

          <p>
            FreshFind combines useful features into a simple experience
            for discovering local food and markets.
          </p>

        </div>

        <div className="about-grid">

          <Link
            to="/about/local-discovery"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <MapPin size={28} />
              </div>

              <h3>Local Discovery</h3>

              <p>
                Explore local markets and location-based information in a
                convenient way.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          <Link
            to="/about/fresh-food"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Sprout size={28} />
              </div>

              <h3>Fresh Food</h3>

              <p>
                Discover information about fresh products and locally
                available food.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>


          <Link
            to="/about/seasonal-products"
            className="about-card-link"
          >
            <article className="panel about-card">

              <div className="about-card-icon">
                <Sprout size={28} />
              </div>

              <h3>Seasonal Products</h3>

              <p>
                Learn about seasonal food and discover products at the right
                time of year.
              </p>

              <span className="about-read-more">
                Read More
              </span>

            </article>
          </Link>

          <Link
            to="/about/understanding-seasons"
            className="about-card-link"
          >
            <article className="panel about-card">
              <div className="about-card-icon">
                <CalendarDays size={28} />
              </div>
              <h3>Seasonal Knowledge</h3>
              <p>
                Understand when different fresh products are commonly
                available throughout the year.
              </p>
              <span className="about-read-more">
                Read More
              </span>
            </article>
          </Link>

        </div>
      </section>


      {/* TEAM */}
      <section className="section about-section">

        <div className="about-heading">
          <span>OUR TEAM</span>
          <h2>People Behind FreshFind</h2>
          <p>
            FreshFind is built by a team combining leadership, design,
            documentation, and development skills.
          </p>
        </div>

        <div className="about-grid">
          <article className="panel about-card team-card">
            <img className="team-avatar" src="/assets/WhatsApp%20Image%202026-09-25%20at%2012.52.53%20PM.jpeg" alt="Rameen Shoaib" />
            <h3>Rameen Shoaib</h3>
            <p className="team-role">Team Lead</p>
            <p>Coordinates the team, guides the project, and works on website functionality.</p>
          </article>

          <article className="panel about-card team-card">
            <img className="team-avatar" src="/assets/WhatsApp%20Image%202026-09-25%20at%2012.51.26%20PM.jpeg" alt="Manahil" />
            <h3>Manahil</h3>
            <p className="team-role">Documentation</p>
            <p>Prepares and maintains the documentation for the website.</p>
          </article>

          <article className="panel about-card team-card">
            <img className="team-avatar team-avatar-hasnain" src="/assets/WhatsApp%20Image%202026-09-25%20at%2012.54.51%20PM.jpeg" alt="Hasnain" />
            <h3>Hasnain</h3>
            <p className="team-role">Designer</p>
            <p>Shapes the visual design and user experience of the website.</p>
          </article>

          <article className="panel about-card team-card">
            <img className="team-avatar" src="/assets/WhatsApp%20Image%202026-09-25%20at%2012.53.48%20PM.jpeg" alt="Wania Nadeem" />
            <h3>Wania Nadeem</h3>
            <p className="team-role">Developer</p>
            <p>Works on the website functionality and implementation.</p>
          </article>
        </div>
      </section>


      {/* CTA */}
      <section className="section">

        <article className="panel about-cta">

          <span>FRESHFIND</span>

          <h2>Start Exploring FreshFind</h2>

          <p>
            Discover local markets, fresh products, and useful seasonal
            information in one place.
          </p>

          <Link to="/markets" className="btn">
            Explore FreshFind
          </Link>

        </article>

      </section>
    </>
  );
}
