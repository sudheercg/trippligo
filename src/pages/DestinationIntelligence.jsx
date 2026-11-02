import { useState } from "react";
import { Link } from "react-router-dom";
import { getDestinationRecommendations } from "../services/destinationApi";

export default function DestinationIntelligence() {
  const [form, setForm] = useState({
    fromCity: "Hyderabad",
    days: 3,
    budget: 12000,
    travelers: "Couple",
    interests: ["beaches", "food"],
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const interestOptions = ["beaches", "food", "nature", "hills", "relaxation", "culture"];

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
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await getDestinationRecommendations(form);
      setResult(data);
    } catch (err) {
      setError("Unable to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Trippligo
          </Link>
          <Link to="/" className="text-blue-600 text-sm hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="mb-10">
          <p className="text-blue-600 font-semibold mb-2">
            Destination Intelligence
          </p>
          <h1 className="text-4xl font-extrabold mb-4">
            Make a better first travel decision
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg">
            Enter a few basic preferences. Trippligo will suggest practical
            destinations with simple reasoning — not random lists.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border p-6 space-y-5 lg:col-span-1"
          >
            <div>
              <label className="block text-sm font-semibold mb-2">
                Starting city
              </label>
              <input
                className="w-full border rounded-xl p-3"
                value={form.fromCity}
                onChange={(e) =>
                  setForm({ ...form, fromCity: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Number of days
              </label>
              <input
                type="number"
                className="w-full border rounded-xl p-3"
                value={form.days}
                onChange={(e) =>
                  setForm({ ...form, days: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Total budget
              </label>
              <input
                type="number"
                className="w-full border rounded-xl p-3"
                value={form.budget}
                onChange={(e) =>
                  setForm({ ...form, budget: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Travelers
              </label>
              <select
                className="w-full border rounded-xl p-3"
                value={form.travelers}
                onChange={(e) =>
                  setForm({ ...form, travelers: e.target.value })
                }
              >
                <option>Solo</option>
                <option>Couple</option>
                <option>Family</option>
                <option>Friends</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-full text-sm border ${
                      form.interests.includes(interest)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Get Suggestions"}
            </button>
          </form>

          <section className="lg:col-span-2">
            {!result && (
              <div className="bg-white rounded-2xl border shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-3">
                  What you will get
                </h2>
                <p className="text-slate-600 mb-6">
                  Trippligo will not just list destinations. It will explain why
                  a destination may fit your time, budget, and travel style.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-1">Fit Score</h3>
                    <p className="text-sm text-slate-600">
                      A simple score showing how suitable the destination is.
                    </p>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-1">Why it fits</h3>
                    <p className="text-sm text-slate-600">
                      Clear reasons instead of generic travel text.
                    </p>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-1">Travel effort</h3>
                    <p className="text-sm text-slate-600">
                      Helps you avoid tiring trips for short holidays.
                    </p>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-1">Caution</h3>
                    <p className="text-sm text-slate-600">
                      Small warnings that help better planning.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div>
                <h2 className="text-2xl font-bold mb-6">{result.title}</h2>

                <div className="space-y-5">
                  {result.recommendations.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">
                            {item.destination}
                          </h3>
                          <p className="text-slate-600 mt-1">
                            {item.summary}
                          </p>
                        </div>

                        <div className="text-center bg-blue-50 rounded-xl px-4 py-3">
                          <div className="text-2xl font-bold text-blue-700">
                            {item.fitScore}
                          </div>
                          <div className="text-xs text-blue-700">
                            Fit Score
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Why it fits</h4>
                          <ul className="list-disc pl-5 text-slate-700 space-y-1">
                            {item.whyItFits.map((reason, i) => (
                              <li key={i}>{reason}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">Budget:</span>{" "}
                            {item.budgetLevel}
                          </p>
                          <p>
                            <span className="font-semibold">Travel effort:</span>{" "}
                            {item.travelEffort}
                          </p>
                          <p>
                            <span className="font-semibold">Caution:</span>{" "}
                            {item.caution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-500 mt-6">{result.note}</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}