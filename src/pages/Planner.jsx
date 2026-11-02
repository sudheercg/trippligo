import { useState } from "react";
import { Link } from "react-router-dom";
import { planTrip } from "../services/plannerApi";

export default function Planner() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!input.trim()) {
      setError("Please describe your travel plan.");
      return;
    }

    setLoading(true);
    try {
      const response = await planTrip(input);
      setResult(response);
    } catch (err) {
      setError("Unable to generate a plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Trippligo
        </Link>
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Planner Form */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-6">
          AI Travel Planner
        </h1>
        <p className="text-gray-600 mb-10">
          Describe your travel idea in simple words — budget, days, starting city,
          and interests. We’ll turn it into a practical plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={4}
            placeholder="Example: 3-day couple trip from Hyderabad, budget ₹10,000, likes beaches and food"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-white text-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Generating plan..." : "Generate Travel Plan"}
          </button>
        </form>
      </section>

      {/* Result */}
      {result && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-2xl shadow p-8 mb-8">
            <h2 className="text-2xl font-bold mb-2">Trip Summary</h2>
            <p className="text-gray-700">{result.summary}</p>
          </div>

          {result.sections?.itinerary && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Suggested Itinerary
              </h3>

              <div className="grid gap-6">
                {result.sections.itinerary.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow p-6"
                  >
                    <h4 className="text-xl font-semibold mb-2">
                      {item.day}
                    </h4>
                    <p className="text-gray-700">{item.plan}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-white py-8 text-center text-gray-500">
        © {new Date().getFullYear()} Trippligo. All rights reserved.
      </footer>
    </div>
  );
}
