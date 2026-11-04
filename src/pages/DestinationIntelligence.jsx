
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDestinationRecommendations } from "../services/destinationApi";

const interests = [
  "beaches",
  "food",
  "nature",
  "hills",
  "relaxation",
  "culture",
];

const travelerTypes = ["Solo", "Couple", "Family", "Friends"];

const initialForm = {
  fromCity: "Hyderabad",
  days: 3,
  budget: 12000,
  travelers: "Couple",
  interests: ["beaches", "food"],
};

const fieldStyle =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function DestinationIntelligence() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !form.fromCity.trim() ||
      !Number.isInteger(Number(form.days)) ||
      Number(form.days) < 1 ||
      !Number.isInteger(Number(form.budget)) ||
      Number(form.budget) < 1 ||
      form.interests.length === 0
    ) {
      setError("Please complete all fields and select an interest.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await getDestinationRecommendations({
        ...form,
        fromCity: form.fromCity.trim(),
        days: Number(form.days),
        budget: Number(form.budget),
      });
      setResult(data);
    } catch (err) {
      console.error("Destination API error:", err);
      setError("Unable to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const recommendations = Array.isArray(result?.recommendations)
    ? result.recommendations
    : [];

  return (
    <div className="min-h-screen bg-[#f5f8f9] text-slate-900">
      {/* Navigation */}
      <header className="border-b border-white/10 bg-[#071e29]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-white"
          >
            trippligo<span className="text-teal-400">.</span>
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071e29]">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-24 md:pt-20">
          <span className="inline-flex rounded-full border border-teal-400/25 bg-teal-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            ✦ Destination Intelligence
          </span>

          <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Discover where you
            <span className="block text-teal-400">
              should travel next.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Not just popular destinations. Explore places that
            better match your budget, available time, interests,
            and travel style.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            {["Personalized suggestions", "Practical reasoning", "Travel considerations"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 px-4 py-2"
                >
                  ✓ {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Workspace */}
      <main className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="-mt-8 grid items-start gap-8 lg:grid-cols-12">
          {/* Preferences */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8 lg:col-span-4"
          >
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                Your travel preferences
              </p>
              <h2 className="mt-3 text-2xl font-extrabold">
                Find your perfect fit.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tell us what matters most to you.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="di-city"
                  className="mb-2 block text-sm font-semibold"
                >
                  Starting city
                </label>
                <input
                  id="di-city"
                  className={fieldStyle}
                  value={form.fromCity}
                  onChange={(e) =>
                    updateField("fromCity", e.target.value)
                  }
                  placeholder="e.g. Hyderabad"
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="di-days"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Duration
                  </label>
                  <input
                    id="di-days"
                    type="number"
                    min="1"
                    step="1"
                    className={fieldStyle}
                    value={form.days}
                    onChange={(e) =>
                      updateField("days", e.target.value)
                    }
                    required
                    disabled={loading}
                  />
                  <p className="mt-1 text-xs text-slate-400">Days</p>
                </div>

                <div>
                  <label
                    htmlFor="di-budget"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Budget (₹)
                  </label>
                  <input
                    id="di-budget"
                    type="number"
                    min="1"
                    step="1"
                    className={fieldStyle}
                    value={form.budget}
                    onChange={(e) =>
                      updateField("budget", e.target.value)
                    }
                    required
                    disabled={loading}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Total trip budget
                  </p>
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold">
                  Who's traveling?
                </legend>

                <div className="grid grid-cols-2 gap-2">
                  {travelerTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      disabled={loading}
                      aria-pressed={form.travelers === type}
                      onClick={() => updateField("travelers", type)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        form.travelers === type
                          ? "border-teal-500 bg-teal-50 text-teal-800"
                          : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-2 text-sm font-semibold">
                  Your interests
                </legend>
                <p className="mb-3 text-xs text-slate-500">
                  Choose one or more.
                </p>

                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => {
                    const selected = form.interests.includes(interest);

                    return (
                      <button
                        key={interest}
                        type="button"
                        disabled={loading}
                        aria-pressed={selected}
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition ${
                          selected
                            ? "border-teal-500 bg-teal-500 text-[#071e29]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-[#0d766e] px-5 py-4 font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#095d58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Finding destinations..." : "Explore Destinations ↗"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Suggestions are indicative. Verify costs and
              travel conditions before booking.
            </p>
          </form>

          {/* Recommendations */}
          <section className="pt-8 lg:col-span-8 lg:pt-12">
            {!result && !loading && (
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                  How it works
                </span>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                  Better destinations.
                  <span className="block text-slate-500">
                    Better decisions.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl leading-7 text-slate-600">
                  Trippligo considers your travel preferences
                  and explains why a destination might suit you.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Feature
                    icon="✦"
                    title="Destination Fit Score"
                    description="Compare how closely each recommendation matches your preferences."
                  />
                  <Feature
                    icon="◎"
                    title="Why It Fits"
                    description="Understand the reasons behind each suggested destination."
                  />
                  <Feature
                    icon="↗"
                    title="Travel Effort"
                    description="Consider the effort involved before choosing a short getaway."
                  />
                  <Feature
                    icon="◈"
                    title="Things to Consider"
                    description="See practical cautions that may affect your decision."
                  />
                </div>

                <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50/70 p-6">
                  <p className="text-sm font-semibold text-teal-900">
                    ✦ Travel intelligence, not just inspiration.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-teal-800">
                    Our goal is to help travelers evaluate
                    destinations before committing time and money.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div
                role="status"
                className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-teal-50 text-3xl text-teal-700">
                  ✦
                </div>
                <h2 className="text-2xl font-bold">
                  Finding your destination matches
                </h2>
                <p className="mt-3 text-slate-500">
                  We're preparing your recommendations.
                </p>
              </div>
            )}

            {result && (
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                  Your destination shortlist
                </span>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                  {result.title || "Recommended destinations"}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  {recommendations.length} destination matches
                </p>

                <div className="mt-8 space-y-5">
                  {recommendations.map((item, index) => {
                    const reasons = Array.isArray(item.whyItFits)
                      ? item.whyItFits
                      : [];

                    return (
                      <article
                        key={`${item.destination}-${index}`}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
                      >
                        <div className="p-6 md:p-8">
                          <div className="flex flex-wrap items-start justify-between gap-5">
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                                Destination {String(index + 1).padStart(2, "0")}
                              </span>

                              <h3 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">
                                {item.destination}
                              </h3>

                              <p className="mt-3 leading-7 text-slate-600">
                                {item.summary}
                              </p>
                            </div>

                            <div className="rounded-2xl border border-teal-100 bg-teal-50 px-5 py-4 text-center">
                              <div className="text-3xl font-extrabold text-teal-800">
                                {item.fitScore ?? "—"}
                              </div>
                              <div className="mt-1 text-xs font-semibold text-teal-700">
                                Fit Score
                              </div>
                            </div>
                          </div>

                          <div className="my-6 h-px bg-slate-100" />

                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="mb-3 font-bold text-slate-900">
                                ✓ Why this destination fits
                              </h4>

                              {reasons.length > 0 ? (
                                <ul className="space-y-3">
                                  {reasons.map((reason, i) => (
                                    <li
                                      key={i}
                                      className="flex gap-3 text-sm leading-6 text-slate-600"
                                    >
                                      <span className="text-teal-600">✓</span>
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-slate-500">
                                  No detailed reasons provided.
                                </p>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                  Budget suitability
                                </p>
                                <p className="mt-1 font-semibold">
                                  {item.budgetLevel || "Not specified"}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                  Travel effort
                                </p>
                                <p className="mt-1 font-semibold">
                                  {item.travelEffort || "Not specified"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {item.caution && (
                            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                              <p className="text-sm font-semibold text-amber-900">
                                Things to consider
                              </p>
                              <p className="mt-2 text-sm leading-6 text-amber-800">
                                {item.caution}
                              </p>
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {recommendations.length === 0 && (
                  <div className="rounded-2xl border bg-white p-8 text-slate-600">
                    No destinations were returned for these preferences.
                    Try adjusting your budget, duration, or interests.
                  </div>
                )}

                {result.note && (
                  <p className="mt-6 text-sm leading-6 text-slate-500">
                    {result.note}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="rounded-xl bg-[#071e29] px-6 py-3 font-semibold text-white transition hover:bg-[#123846]"
                  >
                    Explore Again ↗
                  </button>

                  <Link
                    to="/planner"
                    className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-teal-500"
                  >
                    Open Trip Planner
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-7 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Trippligo.
        Travel smarter. Decide better.
      </footer>
    </div>
  );
}
