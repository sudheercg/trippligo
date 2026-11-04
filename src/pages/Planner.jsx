
import { useState } from "react";
import { Link } from "react-router-dom";
import { planTrip } from "../services/plannerApi";
import "./Planner.css";

const initialForm = {
  fromCity: "",
  days: 3,
  budget: 15000,
  travelers: "Family",
  interests: [],
};

const interestOptions = [
  "nature",
  "food",
  "beaches",
  "hills",
  "culture",
  "relaxation",
  "adventure",
  "history",
];

const travelerOptions = [
  "Solo",
  "Couple",
  "Family",
  "Friends",
];

export default function Planner() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setForm((previous) => ({
      ...previous,
      interests: previous.interests.includes(interest)
        ? previous.interests.filter((item) => item !== interest)
        : [...previous.interests, interest],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setError("");
    setResult(null);
    setCopied(false);

    const days = Number(form.days);
    const budget = Number(form.budget);

    if (!form.fromCity.trim()) {
      setError("Please enter your starting city.");
      return;
    }

    if (!Number.isInteger(days) || days < 1) {
      setError("Please enter a valid number of days.");
      return;
    }

    if (!Number.isInteger(budget) || budget < 1) {
      setError("Please enter a valid total budget.");
      return;
    }

    if (form.interests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }

    const payload = {
      fromCity: form.fromCity.trim(),
      days,
      budget,
      travelers: form.travelers,
      interests: form.interests,
    };

    setLoading(true);

    try {
      const response = await planTrip(payload);
      setResult(response);
    } catch (err) {
      console.error("Planner request failed:", err);
      setError(
        "We couldn't generate your itinerary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const itinerary = Array.isArray(result?.sections?.itinerary)
    ? result.sections.itinerary
    : [];

  const copyItinerary = async () => {
    const content = [
      result?.summary || "",
      ...itinerary.map(
        (item) => `${item.day}\n${item.plan}`
      ),
    ].join("\n\n");

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch {
      setError("Unable to copy. Please select the text manually.");
    }
  };

  const resetPlanner = () => {
    setForm({ ...initialForm, interests: [] });
    setResult(null);
    setError("");
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="planner-page">
      <header className="planner-header">
        <div className="planner-container planner-header-inner">
          <Link to="/" className="planner-brand">
            <span className="planner-brand-icon">✦</span>
            trippligo<span className="planner-brand-dot">.</span>
          </Link>

          <Link to="/" className="planner-back">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main>
        <section className="planner-intro">
          <div className="planner-container">
            <div className="planner-intro-content">
              <span className="planner-eyebrow">
                ✦ YOUR PERSONAL TRAVEL WORKSPACE
              </span>

              <h1>
                Every great journey
                <span> starts with a plan.</span>
              </h1>

              <p>
                Tell us a little about your journey.
                We'll help you explore a practical itinerary
                suited to your travel preferences.
              </p>
            </div>
          </div>
        </section>

        <section className="planner-workspace">
          <div className="planner-container">
            <div className="planner-form-card">
              <div className="planner-card-heading">
                <div>
                  <span className="planner-card-label">
                    PLAN YOUR JOURNEY
                  </span>
                  <h2>Let's plan your next trip.</h2>
                  <p>
                    Just a few details to get started.
                  </p>
                </div>
                <span
                  className="planner-card-decoration"
                  aria-hidden="true"
                >
                  ✧
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div>
                    <label
                      htmlFor="fromCity"
                      className="planner-label"
                    >
                      Where are you starting from?
                    </label>

                    <input
                      id="fromCity"
                      type="text"
                      placeholder="e.g. Hyderabad"
                      value={form.fromCity}
                      onChange={(e) =>
                        updateField("fromCity", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-base text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="days"
                        className="planner-label"
                      >
                        How many days?
                      </label>

                      <input
                        id="days"
                        type="number"
                        min="1"
                        step="1"
                        value={form.days}
                        onChange={(e) =>
                          updateField("days", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-base focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="planner-label"
                      >
                        Total budget (₹)
                      </label>

                      <input
                        id="budget"
                        type="number"
                        min="1"
                        step="1"
                        value={form.budget}
                        onChange={(e) =>
                          updateField("budget", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-base focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="planner-label">
                      Who's traveling?
                    </legend>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {travelerOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          disabled={loading}
                          aria-pressed={form.travelers === option}
                          onClick={() =>
                            updateField("travelers", option)
                          }
                          className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                            form.travelers === option
                              ? "border-teal-500 bg-teal-50 text-teal-800"
                              : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="planner-label">
                      What do you enjoy?
                    </legend>

                    <p className="mb-4 text-sm text-slate-500">
                      Select one or more interests.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map((interest) => {
                        const selected =
                          form.interests.includes(interest);

                        return (
                          <button
                            key={interest}
                            type="button"
                            disabled={loading}
                            aria-pressed={selected}
                            onClick={() =>
                              toggleInterest(interest)
                            }
                            className={`rounded-full border px-5 py-3 text-sm font-medium capitalize transition ${
                              selected
                                ? "border-teal-500 bg-teal-500 text-slate-950"
                                : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                {error && (
                  <div className="planner-error" role="alert">
                    <span aria-hidden="true">!</span>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="planner-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="planner-spinner"
                        aria-hidden="true"
                      />
                      Creating your itinerary...
                    </>
                  ) : (
                    <>
                      Generate My Travel Plan
                      <span aria-hidden="true">↗</span>
                    </>
                  )}
                </button>

                <p className="planner-form-note">
                  Suggested itineraries are illustrative.
                  Confirm travel times, availability and prices
                  before making bookings.
                </p>
              </form>
            </div>

            {loading && (
              <div
                className="planner-loading-card"
                role="status"
                aria-live="polite"
              >
                <span
                  className="planner-loading-icon"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <h3>Putting your journey together</h3>
                <p>
                  We're preparing your itinerary.
                  The service may take a little longer to respond
                  when waking up.
                </p>

                <div className="planner-loading-bar">
                  <span />
                </div>
              </div>
            )}

            {result && (
              <section
                className="planner-results"
                aria-live="polite"
              >
                <div className="planner-results-heading">
                  <span className="planner-card-label">
                    YOUR TRAVEL BLUEPRINT
                  </span>
                  <h2>Your journey, thoughtfully planned.</h2>
                  <p>
                    Explore your suggested itinerary below.
                  </p>
                </div>

                <div className="planner-summary-card">
                  <div
                    className="planner-summary-icon"
                    aria-hidden="true"
                  >
                    ✦
                  </div>

                  <div>
                    <h3>Trip Overview</h3>
                    <p>{result.summary}</p>
                  </div>
                </div>

                {itinerary.length > 0 && (
                  <div className="planner-itinerary">
                    <div className="planner-itinerary-heading">
                      <h3>Suggested Itinerary</h3>
                      <span>
                        {itinerary.length}{" "}
                        {itinerary.length === 1
                          ? "day"
                          : "days"}
                      </span>
                    </div>

                    <div className="planner-timeline">
                      {itinerary.map((item, index) => (
                        <article
                          key={index}
                          className="planner-day"
                        >
                          <div className="planner-day-marker">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="planner-day-content">
                            <span className="planner-day-label">
                              YOUR JOURNEY
                            </span>

                            <h4>
                              {item.day || `Day ${index + 1}`}
                            </h4>

                            <p>{item.plan}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                <div className="planner-result-actions">
                  <button
                    type="button"
                    className="planner-copy"
                    onClick={copyItinerary}
                  >
                    {copied
                      ? "Copied!"
                      : "Copy Itinerary"}
                  </button>

                  <button
                    type="button"
                    className="planner-new"
                    onClick={resetPlanner}
                  >
                    Plan Another Trip ↗
                  </button>
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      <footer className="planner-footer">
        <div className="planner-container">
          © {new Date().getFullYear()} Trippligo.
          Smarter journeys begin here.
        </div>
      </footer>
    </div>
  );
}
