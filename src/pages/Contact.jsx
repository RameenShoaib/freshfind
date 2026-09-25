import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import MapFrame from "../components/MapFrame";
import contactData from "../data/contact.json";

export default function Contact() {
  const {
    userLocation,
    selectedLocation,
    locationStatus,
    requestLocation,
  } = useAppData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  /* =========================================
     VALIDATION
  ========================================= */

  // Letters (any language), spaces, apostrophes, hyphens and dots only.
  const NAME_ALLOWED = /^[\p{L}\p{M}\s'’.-]+$/u;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validateField = (name, rawValue) => {
    const value = rawValue.trim();

    switch (name) {
      case "name":
        if (!value) return "Full name is required.";
        if (/\d/.test(value)) return "Name cannot contain numbers.";
        if (!NAME_ALLOWED.test(value))
          return "Name can only contain letters and spaces.";
        if (value.length < 2) return "Name must be at least 2 letters.";
        return "";

      case "email":
        if (!value) return "Email address is required.";
        if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
        return "";

      case "subject":
        if (!value) return "Subject is required.";
        return "";

      case "message":
        if (!value) return "Message is required.";
        return "";

      default:
        return "";
    }
  };


  /* =========================================
     LOCATION MESSAGE
  ========================================= */

  const locationMessage = {
    idle: "Location has not been requested yet.",

    loading: "Checking browser location permission...",

    granted:
      "Location detected successfully. Your approximate position is now available.",

    selected:
      "Your selected delivery address is saved and available across the website.",

    denied:
      "Location permission was denied or timed out. You can still use the map.",

    unavailable:
      "Geolocation is unavailable in this browser.",
  }[locationStatus] || "";


  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    let error = "";

    // Full Name: block digits and symbols while typing
    if (name === "name") {
      const cleaned = value.replace(/[^\p{L}\p{M}\s'’.-]/gu, "");
      if (cleaned !== value) {
        error = /\d/.test(value)
          ? "Name cannot contain numbers."
          : "Name can only contain letters and spaces.";
        value = cleaned;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error once the field becomes valid, keep a blocked-character hint otherwise
    setErrors((prev) => ({
      ...prev,
      [name]: error || (prev[name] ? validateField(name, value) : ""),
    }));

    setSubmitted(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };


  /* =========================================
     FORM SUBMIT
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) newErrors[field] = message;
    });

    setErrors(newErrors);

    // Stop here if anything is empty or invalid
    if (Object.keys(newErrors).length > 0) {
      setSubmitted(false);
      document.getElementById(Object.keys(newErrors)[0])?.focus();
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };


  return (
    <>
      {/* =========================================
          HERO
      ========================================= */}

      <section className="page-hero compact contact-hero">

       <h1 className="animate__animated animate__backInLeft">
            Contact FreshFind
          </h1>
        <div className="contact-hero-content">

          <span className="hero-label">
            GET IN TOUCH
          </span>
      
          

          <p>
            Have a question, suggestion, or need help?
            Send us a message and our team will be happy
            to hear from you.
          </p>

        </div>

      </section>


      {/* =========================================
          CONTACT FORM + INFORMATION
      ========================================= */}

      <section className="section contact-section">

        <div className="contact-main-grid">


          {/* =====================================
              CONTACT FORM
          ===================================== */}

          <article className="panel contact-form-card">

            <div className="form-heading">

              <span className="card-label">
                SEND A MESSAGE
              </span>

              <h2>
                Let's Talk
              </h2>

              <p>
                Fill out the form below and share your
                question, suggestion, or feedback with us.
              </p>

            </div>


            <form onSubmit={handleSubmit} noValidate>

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Enter your name"
                  autoComplete="name"
                  inputMode="text"
                  required
                />

                {errors.name && (
                  <p className="field-error" id="name-error" role="alert">
                    {errors.name}
                  </p>
                )}

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="Enter your email"
                  required
                />

                {errors.email && (
                  <p className="field-error" id="email-error" role="alert">
                    {errors.email}
                  </p>
                )}

              </div>


              {/* SUBJECT */}

              <div className="form-group">

                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  placeholder="What would you like to discuss?"
                  required
                />

                {errors.subject && (
                  <p className="field-error" id="subject-error" role="alert">
                    {errors.subject}
                  </p>
                )}

              </div>


              {/* MESSAGE */}

              <div className="form-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                />

                {errors.message && (
                  <p className="field-error" id="message-error" role="alert">
                    {errors.message}
                  </p>
                )}

              </div>


              {/* BUTTON */}

              <button
                className="solid-btn contact-submit"
                type="submit"
              >
                <span>
                  Send Message
                </span>

                <strong>
                  →
                </strong>
              </button>


              {/* SUCCESS */}

              {submitted && (
                <div
                  className="form-success"
                  role="status"
                  aria-live="polite"
                >
                  ✓ Thank you! Your message has been received.
                </div>
              )}

            </form>

          </article>


          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}

          <article className="panel contact-info-card">

            <span className="card-label">
              CONTACT INFORMATION
            </span>

            <h2>
              We're Here to Help
            </h2>

            <p className="contact-intro">
              Whether you have a question, feedback, or
              need help discovering local markets, you can
              reach us through the information below.
            </p>


            {/* CONTACT DETAILS */}

            <div className="contact-details">


              {/* EMAIL */}

              <div className="contact-item">

                <span className="contact-item-icon">
                  <Mail size={22} />
                </span>

                <div>

                  <small>
                    Email
                  </small>

                  <a href="mailto:hello@freshfind.local">
                    {contactData.email}
                  </a>

                </div>

              </div>


              {/* PHONE */}

              <div className="contact-item">

                <span className="contact-item-icon">
                  <Phone size={22} />
                </span>

                <div>

                  <small>
                    Phone
                  </small>

                  <a href={contactData.phoneHref}>
                    {contactData.phone}
                  </a>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="contact-item">

                <span className="contact-item-icon">
                  <MapPin size={22} />
                </span>

                <div>

                  <small>
                    Address
                  </small>

                  <p>
                    {contactData.address.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>

                </div>

              </div>

            </div>


            {/* =================================
                LOCATION
            ================================= */}

            <div className="location-box">

              <div className="location-top">

                <span className="location-icon">
                  <MapPin size={22} />
                </span>

                <div>

                  <h3>
                    Find Your Location
                  </h3>

                  <p>
                    Allow location access to show your
                    approximate position on the map.
                  </p>

                </div>

              </div>


              <button
                className="solid-btn location-btn"
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === "loading"}
                aria-busy={locationStatus === "loading"}
              >

                {locationStatus === "loading"
                  ? "Checking Location..."
                  : "Use My Live Location"}

              </button>


              <p
                className={`helper location-status ${locationStatus}`}
                role="status"
                aria-live="polite"
              >
                {locationMessage}
              </p>

            </div>

          </article>

        </div>

      </section>


      {/* =========================================
          MAP
      ========================================= */}

      <section className="section contact-section">

        <div className="contact-section-heading">

          <span>
            OUR LOCATION
          </span>

          <h2>
            Find FreshFind
          </h2>

          <p>
            View our location on the map or allow
            browser location access to see your
            approximate position.
          </p>

        </div>


        <article className="panel map-card">

          <div className="map-header">

            <div>

              <span className="card-label">
                MAP
              </span>

              <h3>
                {userLocation
                  ? "Your Current Location"
                  : selectedLocation?.address || "FreshFind Contact Point"}
              </h3>

            </div>


            <span className="map-status">

              {userLocation ? "● Live Location" : selectedLocation ? "● Selected Address" : "● Default Location"}

            </span>

          </div>


          <div className="map-wrapper">

            {userLocation ? (
              <MapFrame
                lat={userLocation.latitude}
                lng={userLocation.longitude}
                label="Your current location"
              />

            ) : selectedLocation ? (
              <MapFrame
                lat={selectedLocation.latitude}
                lng={selectedLocation.longitude}
                label={selectedLocation.address}
              />

            ) : (

              <MapFrame
                lat={24.8607}
                lng={67.0011}
                label="FreshFind contact point"
              />

            )}

          </div>


          <p className="map-note">

            {userLocation
              ? "Your approximate browser location is currently displayed."
              : selectedLocation
              ? `Map showing your selected delivery location: ${selectedLocation.address}.`
              : "Allow location permission to display your current position."}

          </p>

        </article>

      </section>


    </>
  );
}
