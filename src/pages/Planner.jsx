import { useState } from "react"
import { getTravelPlan } from "../services/aiService"
import { Link } from "react-router-dom"

export default function Planner() {
  const [form, setForm] = useState({
    fromCity: "",
    days: "",
    budget: "",
    interests: "",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setResult(null)

    if (!form.fromCity || !form.days || !form.budget) {
      setError("Please fill all required fields.")
      return
    }

    setLoading(true)

    try {
      const response = await getTravelPlan({
        fromCity: form.fromCity,
        days: Number(form.days),
        budget: Number(form.budget),
        interests: form.interests
          ? form.interests.split(",").map(i => i.trim())
          : [],
      })
      setResult(response)
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-12">
      
      {/* Top Navigation */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Trippligo Planner</h1>
        <Link to="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Planner Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10 mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Plan your next trip
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            name="fromCity"
            placeholder="Starting city (e.g., Hyderabad)"
            className="border rounded-xl px-4 py-3"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="days"
              type="number"
              placeholder="Days"
              className="border rounded-xl px-4 py-3"
              onChange={handleChange}
            />
            <input
              name="budget"
              type="number"
              placeholder="Budget (₹)"
              className="border rounded-xl px-4 py-3"
              onChange={handleChange}
            />
          </div>

          <input
            name="interests"
            placeholder="Interests (Beaches, Food, Nature)"
            className="border rounded-xl px-4 py-3"
            onChange={handleChange}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700"
          >
            Generate Travel Plan
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg text-gray-600">
          Generating your plan...
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Summary */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
            <p className="text-gray-700 text-lg">{result.summary}</p>
          </div>

          {/* Why this trip */}
          <div className="grid md:grid-cols-3 gap-6">
            {result.whyThisTrip.map((item, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-2xl p-6 text-center"
              >
                <p className="font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Day-wise Itinerary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {result.itinerary.map((day, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow"
                >
                  <h4 className="font-semibold mb-2">{day.day}</h4>
                  <p className="text-gray-800 mb-1">{day.title}</p>
                  <p className="text-gray-600 text-sm">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Budget Breakdown</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {result.budget.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow text-center"
                >
                  <p className="text-gray-500">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{item.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-3xl p-8 shadow">
            <h3 className="text-2xl font-semibold mb-4">Travel Tips</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {result.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <p className="text-center text-gray-500 text-sm">
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  )
}
