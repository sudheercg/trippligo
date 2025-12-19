import { useState } from "react"
import { Link } from "react-router-dom"
import { getTravelPlan } from "../services/aiService"

export default function Planner() {
  const [prompt, setPrompt] = useState("")
  const [plan, setPlan] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setMessage("Please describe your travel idea to get meaningful suggestions.")
      setPlan(null)
      return
    }

    setLoading(true)
    setMessage("")
    setPlan(null)

    try {
      const result = await getTravelPlan(prompt)

      if (result?.type !== "success") {
        setMessage(result?.message || "Unable to generate plan.")
      } else {
        setPlan(result)
      }
    } catch {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Travel Planner
        </h1>
        <p className="text-gray-600 mb-8">
          Tell us what you’re thinking. We’ll shape it into a travel plan.
        </p>

        {/* Input */}
        <textarea
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="3 days trip from Hyderabad, couple, budget 10000, beaches and food"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Analyzing your request..." : "Generate Travel Plan"}
        </button>

        {/* Error / Info Message */}
        {message && (
          <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl">
            {message}
          </div>
        )}

        {/* Result */}
        {plan && (
          <div className="mt-10 space-y-6">

            <Section title="🧭 Trip Overview">
              {plan.overview || "Overview not available."}
            </Section>

            <Section title="📍 Suggested Destinations">
              {Array.isArray(plan.destinations) ? (
                <ul className="list-disc pl-6 space-y-1">
                  {plan.destinations.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              ) : (
                <p>No destination suggestions available.</p>
              )}
            </Section>

            <Section title="🗓 Sample Itinerary">
              {Array.isArray(plan.itinerary) ? (
                <ul className="space-y-2">
                  {plan.itinerary.map((day, i) => (
                    <li key={i}>• {day}</li>
                  ))}
                </ul>
              ) : (
                <p>No itinerary details available.</p>
              )}
            </Section>

            <Section title="💰 Budget Insight">
              {plan.budget || "Budget estimate not available."}
            </Section>

            <Section title="⚠️ Practical Tips">
              {plan.tips || "No additional tips available."}
            </Section>

          </div>
        )}
      </div>
    </div>
  )
}

/* Reusable Section Card */
function Section({ title, children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
