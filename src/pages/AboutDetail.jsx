import { Link, useParams } from "react-router-dom";
import { Accessibility, CalendarDays, CheckCircle2, CircleHelp, Compass, Cpu, Heart, Lightbulb, Map, MapPin, Palette, PencilRuler, Search, Settings, Smartphone, Sprout, Store, Target, Users, Wheat } from "lucide-react";

const DETAIL_ICONS = {
  "🔎": Search, "📍": MapPin, "🥬": Sprout, "🌱": Sprout, "⚡": CheckCircle2, "🎯": Target,
  "🤝": Users, "🌍": Compass, "📱": Smartphone, "💡": Lightbulb, "❤️": Heart, "🏪": Store,
  "🗺️": Map, "🍎": Wheat, "🥕": Wheat, "📅": CalendarDays, "👨‍💻": Cpu, "⚛️": Cpu,
  "🎨": Palette, "🧩": PencilRuler, "♿": Accessibility, "💻": Cpu, "⚙️": Settings, "🛠️": Settings
};

function DetailIcon({ name, size = 28 }) {
  const Icon = DETAIL_ICONS[name] || CircleHelp;
  return <Icon size={size} />;
}

const ABOUT_DETAILS = {
  "what-is-freshfind": {
    icon: "🔎",
    title: "What is FreshFind?",
    category: "ABOUT FRESHFIND",
    description:
      "FreshFind is a modern platform designed to help people discover local markets, fresh products, seasonal food, and useful food-related information in one simple place.",
    heading: "About FreshFind",
    paragraphs: [
      "FreshFind is a digital platform created to make local food discovery easier, faster, and more convenient.",
      "Instead of searching through different sources, users can explore useful information about local markets, fresh products, seasonal food, and nearby opportunities from one place.",
      "The platform focuses on simplicity. Users should be able to understand the information quickly and move through the website without confusion.",
      "FreshFind is also designed with responsive layouts so that users can comfortably explore the platform on desktop computers, tablets, and mobile phones.",
    ],
    features: [
      {
        icon: "📍",
        title: "Local Markets",
        text: "Discover useful information about local markets and places.",
      },
      {
        icon: "🥬",
        title: "Fresh Products",
        text: "Explore fresh and locally available food products.",
      },
      {
        icon: "🌱",
        title: "Seasonal Food",
        text: "Understand products that are commonly available in different seasons.",
      },
      {
        icon: "⚡",
        title: "Easy Discovery",
        text: "Find useful information through a simple and friendly interface.",
      },
    ],
  },

  "our-purpose": {
    icon: "🎯",
    title: "Our Purpose",
    category: "OUR PURPOSE",
    description:
      "Our purpose is to connect people with fresh and locally available food while making market discovery simple and convenient.",
    heading: "Why FreshFind Exists",
    paragraphs: [
      "Finding local food should not be complicated. People often need to search through different websites or sources before finding useful information.",
      "FreshFind brings important information together so users can explore local markets and products more easily.",
      "The platform is focused on creating a clear and accessible experience for people who want to discover fresh food.",
      "Our purpose is to reduce unnecessary searching and provide users with useful information in a simple format.",
    ],
    features: [
      {
        icon: "🎯",
        title: "Simple Goal",
        text: "Make local food discovery easier for everyone.",
      },
      {
        icon: "🤝",
        title: "Connect People",
        text: "Help people discover local food opportunities.",
      },
      {
        icon: "🔎",
        title: "Easy Search",
        text: "Bring useful information together in one place.",
      },
      {
        icon: "🌍",
        title: "Local Focus",
        text: "Highlight local markets and available products.",
      },
    ],
  },

  "our-mission": {
    icon: "🌱",
    title: "Our Mission",
    category: "OUR MISSION",
    description:
      "Our mission is to make local food discovery simple by connecting people with useful market, product, and seasonal information.",
    heading: "Our Mission",
    paragraphs: [
      "FreshFind focuses on making fresh food discovery easier for everyone.",
      "We want users to have access to useful information without having to navigate complicated interfaces.",
      "Our mission includes improving the way users discover markets, products, and seasonal food.",
      "We aim to create a clean, responsive, and accessible experience that works across different devices.",
    ],
    features: [
      {
        icon: "🌱",
        title: "Fresh Discovery",
        text: "Make discovering fresh food more convenient.",
      },
      {
        icon: "📱",
        title: "Responsive",
        text: "Create an experience that works on every screen.",
      },
      {
        icon: "💡",
        title: "Useful Information",
        text: "Present important information clearly.",
      },
      {
        icon: "❤️",
        title: "User Friendly",
        text: "Keep the experience simple and comfortable.",
      },
    ],
  },

  "finding-local-markets": {
    icon: "🔎",
    title: "Finding Local Markets",
    category: "OUR MISSION",
    description:
      "Discover local markets and understand what they offer.",
    heading: "Finding Local Markets",
    paragraphs: [
      "Users may not always know which markets are nearby or what products those markets offer.",
      "FreshFind helps organize useful market information so users can explore local options more easily.",
      "The goal is to make local discovery convenient and reduce the time users spend looking for information.",
      "By keeping market information in an organized experience, FreshFind makes the discovery process easier.",
    ],
    features: [
      {
        icon: "📍",
        title: "Nearby Markets",
        text: "Explore information about local market locations.",
      },
      {
        icon: "🏪",
        title: "Market Information",
        text: "Understand what different markets can offer.",
      },
      {
        icon: "🗺️",
        title: "Local Discovery",
        text: "Explore useful location-based information.",
      },
      {
        icon: "⚡",
        title: "Quick Access",
        text: "Find market information without unnecessary steps.",
      },
    ],
  },

  "finding-fresh-products": {
    icon: "🥬",
    title: "Finding Fresh Products",
    category: "OUR MISSION",
    description:
      "Explore information about fresh and locally available products.",
    heading: "Finding Fresh Products",
    paragraphs: [
      "Fresh products can sometimes be difficult to find, especially when users do not know which local markets provide them.",
      "FreshFind helps users explore information about fresh and locally available food.",
      "The platform brings product information together in an easy-to-use experience.",
      "Users can explore different food categories and learn more about products that may be available locally.",
    ],
    features: [
      {
        icon: "🥬",
        title: "Fresh Food",
        text: "Explore information about fresh food products.",
      },
      {
        icon: "🍎",
        title: "Product Variety",
        text: "Discover different types of locally available products.",
      },
      {
        icon: "🏪",
        title: "Market Connection",
        text: "Connect product discovery with local markets.",
      },
      {
        icon: "🔎",
        title: "Easy Exploration",
        text: "Browse product information through a simple interface.",
      },
    ],
  },

  "understanding-seasons": {
    icon: "📅",
    title: "Understanding Seasons",
    category: "OUR MISSION",
    description:
      "Learn about seasonal food and understand when products are commonly available.",
    heading: "Understanding Seasons",
    paragraphs: [
      "Different products are commonly available during different seasons.",
      "Understanding seasonal availability can help users know more about the food they are looking for.",
      "FreshFind provides seasonal information to help users understand food availability throughout the year.",
      "This makes it easier to discover products during the time of year when they are commonly available.",
    ],
    features: [
      {
        icon: "🌱",
        title: "Seasonal Food",
        text: "Learn about food available during different seasons.",
      },
      {
        icon: "📅",
        title: "Time Based",
        text: "Understand how food availability changes throughout the year.",
      },
      {
        icon: "🥕",
        title: "Fresh Products",
        text: "Discover products commonly associated with each season.",
      },
      {
        icon: "💡",
        title: "Useful Knowledge",
        text: "Get simple information about seasonal availability.",
      },
    ],
  },

  "local-discovery": {
    icon: "📍",
    title: "Local Discovery",
    category: "WHY FRESHFIND",
    description:
      "Explore local markets and location-based information.",
    heading: "Local Discovery",
    paragraphs: [
      "FreshFind makes local discovery easier by bringing useful market and food information together.",
      "Users can explore local opportunities and discover information that may be relevant to their area.",
      "The experience is designed to keep local discovery simple and easy to understand.",
      "FreshFind focuses on helping users find useful information without unnecessary complexity.",
    ],
    features: [
      {
        icon: "📍",
        title: "Location",
        text: "Explore useful location-based information.",
      },
      {
        icon: "🏪",
        title: "Markets",
        text: "Discover local markets and food resources.",
      },
      {
        icon: "🧭",
        title: "Explore",
        text: "Move through local information easily.",
      },
      {
        icon: "⚡",
        title: "Fast",
        text: "Find useful information quickly.",
      },
    ],
  },

  "fresh-food": {
    icon: "🥕",
    title: "Fresh Food",
    category: "WHY FRESHFIND",
    description:
      "Discover information about fresh products and locally available food.",
    heading: "Fresh Food",
    paragraphs: [
      "Fresh food is an important part of a local food experience.",
      "FreshFind helps users discover information about fresh products in a simple and organized way.",
      "Users can explore useful information and learn more about different food options.",
      "The platform is designed to make fresh food discovery easier for everyday users.",
    ],
    features: [
      {
        icon: "🥕",
        title: "Fresh Products",
        text: "Explore fresh food information.",
      },
      {
        icon: "🍎",
        title: "Food Choices",
        text: "Discover different food options.",
      },
      {
        icon: "🌱",
        title: "Local Food",
        text: "Explore locally available food.",
      },
      {
        icon: "❤️",
        title: "Better Discovery",
        text: "Enjoy a simple food discovery experience.",
      },
    ],
  },

  "seasonal-products": {
    icon: "🌱",
    title: "Seasonal Products",
    category: "WHY FRESHFIND",
    description:
      "Learn about seasonal products and discover food at the right time of year.",
    heading: "Seasonal Products",
    paragraphs: [
      "Seasonal products can change throughout the year.",
      "Different fruits, vegetables, and other food products may become more commonly available during specific seasons.",
      "FreshFind helps users understand seasonal availability through simple information.",
      "This can make it easier to discover products during their relevant season.",
    ],
    features: [
      {
        icon: "🌱",
        title: "Seasonal",
        text: "Learn which products belong to different seasons.",
      },
      {
        icon: "📅",
        title: "Year Round",
        text: "Understand changes in food availability.",
      },
      {
        icon: "🥬",
        title: "Fresh Choices",
        text: "Discover seasonal fresh products.",
      },
      {
        icon: "💡",
        title: "Information",
        text: "Get useful seasonal food knowledge.",
      },
    ],
  },

  "hasnain": {
    icon: "👨‍💻",
    title: "Hasnain",
    category: "OUR TEAM",
    description:
      "Frontend Developer working on the FreshFind interface.",
    heading: "Hasnain — Frontend Developer",
    paragraphs: [
      "Hasnain works on the FreshFind user interface and frontend experience.",
      "His work includes responsive layouts, reusable components, navigation, animations, and interactive features.",
      "The focus is on creating a modern interface that is simple and accessible for FreshFind users.",
      "Frontend development also includes making sure the application works smoothly across different screen sizes.",
    ],
    features: [
      {
        icon: "⚛️",
        title: "React",
        text: "Builds interactive interfaces using React.",
      },
      {
        icon: "🎨",
        title: "UI",
        text: "Creates clean and modern user interfaces.",
      },
      {
        icon: "📱",
        title: "Responsive",
        text: "Works on desktop, tablet, and mobile layouts.",
      },
      {
        icon: "⚡",
        title: "Interactive",
        text: "Adds useful interactions and animations.",
      },
    ],
  },

  "ui-ux-designer": {
    icon: "🎨",
    title: "UI/UX Designer",
    category: "OUR TEAM",
    description:
      "Designs a clean and easy-to-use FreshFind experience.",
    heading: "UI/UX Designer",
    paragraphs: [
      "The UI/UX role focuses on the visual experience of FreshFind.",
      "The goal is to create clean layouts that are easy to understand and navigate.",
      "Good spacing, typography, colors, accessibility, and usability are important parts of the design.",
      "The design process focuses on creating an enjoyable and understandable experience for users.",
    ],
    features: [
      {
        icon: "🎨",
        title: "Visual Design",
        text: "Create attractive and modern layouts.",
      },
      {
        icon: "🧩",
        title: "User Experience",
        text: "Keep navigation simple and understandable.",
      },
      {
        icon: "📱",
        title: "Responsive",
        text: "Design interfaces for different screen sizes.",
      },
      {
        icon: "♿",
        title: "Accessibility",
        text: "Keep usability and accessibility in mind.",
      },
    ],
  },

  "project-developer": {
    icon: "💻",
    title: "Project Developer",
    category: "OUR TEAM",
    description:
      "Works on application functionality and reliability.",
    heading: "Project Developer",
    paragraphs: [
      "The project developer works on the functionality of the FreshFind application.",
      "This includes helping different parts of the platform work together correctly.",
      "The developer also focuses on maintaining reliable functionality across different devices.",
      "The overall goal is to keep the application organized, functional, and easy to maintain.",
    ],
    features: [
      {
        icon: "💻",
        title: "Development",
        text: "Works on application functionality.",
      },
      {
        icon: "⚙️",
        title: "Functionality",
        text: "Helps different application features work together.",
      },
      {
        icon: "📱",
        title: "Devices",
        text: "Supports different screen sizes and devices.",
      },
      {
        icon: "🛠️",
        title: "Maintenance",
        text: "Helps keep the application organized and reliable.",
      },
    ],
  },
};

export default function AboutDetail() {
  const { slug } = useParams();

  const page = ABOUT_DETAILS[slug];

  // =========================================
  // PAGE NOT FOUND
  // =========================================

  if (!page) {
    return (
      <section className="section about-not-found">
        <article className="panel about-cta">

          <div className="not-found-icon">
            <DetailIcon name="🔎" />
          </div>

          <span className="ad-badge">
            404
          </span>

          <h1>
            Page Not Found
          </h1>

          <p>
            Sorry, this About page does not exist.
          </p>

          <Link
            to="/about"
            className="btn"
          >
            ← Back to About
          </Link>

        </article>
      </section>
    );
  }

  return (
    <>
      {/* =========================================
          HERO
      ========================================= */}

      <section className="page-hero compact about-hero about-detail-hero">

        <div className="about-hero-content detail-hero-content">

          {/* TOP ICON */}

          <div className="detail-floating-icon">
            <DetailIcon name={page.icon} />
          </div>


          {/* CATEGORY */}

          <span className="ad-badge detail-badge">
            {page.category}
          </span>


          {/* MAIN HEADING */}

          <h1 className="animate__animated animate__backInLeft">
            {page.title}
          </h1>


          {/* DESCRIPTION */}

          <p>
            {page.description}
          </p>


          {/* BUTTONS */}

          <div className="detail-hero-buttons">

            <Link
              to="/about"
              className="btn secondary-detail-btn"
            >
              ← About FreshFind
            </Link>

            <Link
              to="/markets"
              className="btn"
            >
              Explore Markets →
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="section about-section about-detail-section">

        <div className="about-detail-layout">

          {/* MAIN CONTENT */}

          <article className="panel about-detail-card">

            <span className="detail-small-title">
              {page.category}
            </span>

            <h2>
              {page.heading}
            </h2>

            <div className="detail-heading-line"></div>

            <div className="detail-paragraphs">

              {page.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}

            </div>

          </article>


          {/* SIDE CARD */}

          <aside className="panel about-detail-side">

            <div className="side-icon">
              {page.icon}
            </div>

            <span>
              FRESHFIND
            </span>

            <h3>
              Discover Freshness
            </h3>

            <p>
              Discover local markets, fresh products, and seasonal
              information in one simple place.
            </p>

            <Link
              to="/markets"
              className="btn side-btn"
            >
              Explore Markets →
            </Link>

          </aside>

        </div>

      </section>


      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="section about-section detail-features-section">

        <div className="about-heading detail-section-heading">

          <span>
            FRESHFIND FEATURES
          </span>

          <h2>
            Everything Made Simple
          </h2>

          <p>
            FreshFind combines useful information with a simple and
            user-friendly experience.
          </p>

        </div>


        <div className="detail-feature-grid">

          {page.features.map((feature, index) => (
            <article
              className="panel detail-feature-card"
              key={index}
            >

              <div className="feature-number">
                0{index + 1}
              </div>

              <div className="feature-icon">
                <DetailIcon name={feature.icon} size={26} />
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>

            </article>
          ))}

        </div>

      </section>


      {/* =========================================
          INFORMATION SECTION
      ========================================= */}

      <section className="section about-section">

        <div className="detail-info-box">

          <div className="detail-info-icon">
            <Lightbulb size={30} />
          </div>

          <div>

            <span>
              FRESHFIND
            </span>

            <h2>
              Simple. Fresh. Local.
            </h2>

            <p>
              Our goal is to make discovering local food information
              simple, useful, and enjoyable for everyone.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="section">

        <article className="panel about-cta detail-bottom-cta">

          <div className="cta-icon">
            <DetailIcon name={page.icon} size={32} />
          </div>

          <span>
            FRESHFIND
          </span>

          <h2>
            Ready to Explore?
          </h2>

          <p>
            Discover local markets, fresh products, and useful
            seasonal information in one place.
          </p>

          <div className="cta-buttons">

            <Link
              to="/about"
              className="btn secondary-detail-btn"
            >
              ← Back to About
            </Link>

            <Link
              to="/markets"
              className="btn"
            >
              Explore FreshFind →
            </Link>

          </div>

        </article>

      </section>

    </>
  );
}