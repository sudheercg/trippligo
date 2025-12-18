import { useState } from "react";
import { generatePlan } from "../engine/plannerEngine";

export default function Planner() {
  const [form, setForm] = useState({
    fromCity: "Hyderabad",
    days: 3,
    budget: 10000,
    travelers: "couple",
    interests: []
  });

  const [plan, setPlan] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function toggleInterest(interest) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPlan(generatePlan(form));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold mb-4">
            AI-Assisted Travel Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your preferences and get realistic trip ideas —
            no bookings, no pressure, just clarity.
          </p>
        </div>

        {/* Planner Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-16">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="block text-sm font-medium mb-2">
                Starting city
              </label>
              <input
                name="fromCity"
                value={form.fromCity}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Days
                </label>
                <input
                  type="number"
                  name="days"
                  value={form.days}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Travelers
                </label>
                <select
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="solo">Solo</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">
                Interests
              </label>
              <div className="flex flex-wrap gap-3">
                {["beaches", "food", "music", "nature"].map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleInterest(item)}
                    className={`px-5 py-2 rounded-full border text-sm capitalize transition ${
                      form.interests.includes(item)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
            >
              Generate Trip Ideas
            </button>
          </form>
        </div>

        {/* Results */}
        {plan && (
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-center">
              Suggested Trips
            </h2>

            {plan.recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-8"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {item.destination}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.summary.trim()}
                </p>
              </div>
            ))}

            <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto">
              {plan.disclaimer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
