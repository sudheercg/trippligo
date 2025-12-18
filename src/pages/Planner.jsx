import { useState } from "react";

export default function Planner() {
  const [form, setForm] = useState({
    startingCity: "",
    destination: "",
    days: "",
    budget: "",
    interests: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Simulated AI response
    setTimeout(() => {
      setLoading(false);
      setResult({
        title: "Your Travel Plan",
        summary: `A ${form.days || 3}-day trip starting from ${
          form.startingCity || "Hyderabad"
        } with a budget of ₹${form.budget || 10000}.`,
        itinerary: [
          "Day 1: Local exploration, food walks, relaxed sightseeing",
          "Day 2: Beach visit, cultural spots, evening music scene",
          "Day 3: Shopping, cafes, return journey",
        ],
        tips: [
          "Prefer local transport",
          "Book stays early for better prices",
          "Avoid peak-hour travel",
        ],
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Travel Planner
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Tell us your preferences. We’ll suggest a simple plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="startingCity"
            placeholder="Starting City"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="destination"
            placeholder="Destination (or Anywhere)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="days"
            placeholder="Number of Days"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="budget"
            placeholder="Budget (₹)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="interests"
            placeholder="Interests (beaches, food, music)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Get Travel Suggestions
          </button>
        </form>

        {loading && (
          <p className="text-center text-gray-500 mt-6">
            Generating your plan…
          </p>
        )}

        {result && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-3">
              {result.title}
            </h2>

            <p className="text-gray-700 mb-4">
              {result.summary}
            </p>

            <h3 className="font-semibold mb-2">Suggested Itinerary</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {result.itinerary.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold mb-2">Tips</h3>
            <ul className="list-disc list-inside text-gray-700">
              {result.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}