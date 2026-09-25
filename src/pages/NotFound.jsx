import { Link } from "react-router-dom";

export default function NotFound({ message = "Page not found" }) {
  return (
    <section className="section">
      <div className="empty-state">
        <h1 className="animate__animated animate__backInLeft">{message}</h1>
        <p>The requested FreshFind page could not be found.</p>
        <Link className="solid-btn" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
