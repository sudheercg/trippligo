
import React, { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Planner from "./pages/Planner.jsx";
import DestinationIntelligence from "./pages/DestinationIntelligence.jsx";
import "./App.css";

const features = [
  {
    icon: "✦",
    title: "AI Travel Planner",
    description:
      "Turn your travel ideas into a practical, personalized itinerary.",
    path: "/planner",
    status: "Explore",
  },
  {
    icon: "◎",
    title: "Destination Intelligence",
    description:
      "Discover destinations that match your interests, budget, and travel style.",
    path: "/destination-intelligence",
    status: "Explore",
  },
  {
    icon: "◈",
    title: "Travel Reality Index",
    description:
      "Understand seasonal trade-offs, travel friction, and practical considerations.",
    status: "Coming soon",
  },
  {
    icon: "▤",
    title: "True Trip Cost",
    description:
      "Plan for the expenses that typical travel estimates can overlook.",
    status: "Coming soon",
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="tp-header">
      <div className="tp-container tp-nav">
        <Link to="/" className="tp-brand" onClick={closeMenu}>
          <span className="tp-brand-mark">✦</span>
          trippligo<span className="tp-brand-dot">.</span>
        </Link>

        <button
          className="tp-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="tp-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="tp-navigation"
          className={`tp-nav-links ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/planner" onClick={closeMenu}>
            Plan My Trip
          </NavLink>
          <NavLink
            to="/destination-intelligence"
            onClick={closeMenu}
          >
            Destinations
          </NavLink>
          <a href="/#features" onClick={closeMenu}>
            Features
          </a>
          <Link
            to="/planner"
            className="tp-nav-cta"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="tp-hero">
          <div className="tp-hero-overlay" />

          <div className="tp-container tp-hero-content">
            <div className="tp-eyebrow">
              <span className="tp-pulse" />
              INTELLIGENT TRAVEL EXPERIENCES
            </div>

            <h1>
              Travel Smarter.
              <span>Explore Further.</span>
            </h1>

            <p className="tp-hero-description">
              Discover inspiring destinations, create thoughtful
              itineraries, and make confident travel decisions
              with Trippligo.
            </p>

            <div className="tp-hero-actions">
              <Link to="/planner" className="tp-btn tp-btn-primary">
                Plan My Trip <span aria-hidden="true">↗</span>
              </Link>

              <Link
                to="/destination-intelligence"
                className="tp-btn tp-btn-outline"
              >
                Explore Destinations
              </Link>
            </div>

            <div className="tp-hero-benefits">
              <span>✦ Personalized planning</span>
              <span>◎ Smarter discovery</span>
              <span>◇ Practical insights</span>
            </div>
          </div>
        </section>

        <section id="features" className="tp-features">
          <div className="tp-container">
            <div className="tp-section-heading">
              <span className="tp-section-label">
                THE TRIPPLIGO PLATFORM
              </span>
              <h2>Intelligence for every journey.</h2>
              <p>
                Powerful travel tools designed to make planning
                feel refreshingly simple.
              </p>
            </div>

            <div className="tp-feature-grid">
              {features.map((feature) => {
                const content = (
                  <>
                    <div className="tp-feature-top">
                      <span className="tp-feature-icon">
                        {feature.icon}
                      </span>
                      <span
                        className={`tp-feature-status ${
                          feature.path ? "available" : ""
                        }`}
                      >
                        {feature.status}
                      </span>
                    </div>

                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>

                    {feature.path && (
                      <span className="tp-feature-link">
                        Explore feature ↗
                      </span>
                    )}
                  </>
                );

                return feature.path ? (
                  <Link
                    key={feature.title}
                    to={feature.path}
                    className="tp-feature-card tp-feature-clickable"
                  >
                    {content}
                  </Link>
                ) : (
                  <article
                    key={feature.title}
                    className="tp-feature-card"
                  >
                    {content}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="tp-how">
          <div className="tp-container tp-how-layout">
            <div>
              <span className="tp-section-label">
                SIMPLE BY DESIGN
              </span>
              <h2>Less planning. More exploring.</h2>
              <p>
                You don't need to understand complex technology
                to enjoy a better travel experience.
              </p>
              <Link to="/planner" className="tp-text-link">
                Start planning your journey ↗
              </Link>
            </div>

            <div className="tp-steps">
              <div>
                <span>01</span>
                <div>
                  <h3>Tell us your plans</h3>
                  <p>
                    Share your destination, preferences, and budget.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>
                <div>
                  <h3>Explore recommendations</h3>
                  <p>
                    Discover suggestions tailored to your trip.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>
                <div>
                  <h3>Travel with confidence</h3>
                  <p>
                    Use practical insights to make better decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tp-final-cta">
          <div className="tp-container">
            <span className="tp-section-label">
              YOUR NEXT JOURNEY AWAITS
            </span>
            <h2>Ready to explore somewhere new?</h2>
            <p>
              Your next great journey starts with a simple idea.
            </p>
            <Link to="/planner" className="tp-btn tp-btn-primary">
              Start Planning ↗
            </Link>
          </div>
        </section>
      </main>

      <footer className="tp-footer">
        <div className="tp-container tp-footer-content">
          <div>
            <div className="tp-footer-brand">trippligo.</div>
            <p>Smarter journeys begin here.</p>
          </div>

          <div className="tp-footer-links">
            <Link to="/">Home</Link>
            <Link to="/planner">Planner</Link>
            <Link to="/destination-intelligence">
              Destinations
            </Link>
          </div>
        </div>

        <div className="tp-container tp-copyright">
          © {new Date().getFullYear()} Trippligo.
          All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planner" element={<Planner />} />
      <Route
        path="/destination-intelligence"
        element={<DestinationIntelligence />}
      />
    </Routes>
  );
}
