// src/services/mockAI.js

// Helper data
const DESTINATIONS = {
  Beaches: [
    { name: "Goa", baseCost: 12000 },
    { name: "Gokarna", baseCost: 8000 },
    { name: "Varkala", baseCost: 9000 },
    { name: "Pondicherry", baseCost: 7000 },
  ],
  Nature: [
    { name: "Coorg", baseCost: 9000 },
    { name: "Wayanad", baseCost: 8500 },
    { name: "Munnar", baseCost: 9500 },
  ],
  Food: [
    { name: "Hyderabad", baseCost: 6000 },
    { name: "Lucknow", baseCost: 7000 },
    { name: "Delhi", baseCost: 8000 },
  ],
  Music: [
    { name: "Chennai", baseCost: 7500 },
    { name: "Kolkata", baseCost: 8000 },
  ],
}

function pickDestination(interests, budget) {
  for (const interest of interests) {
    const options = DESTINATIONS[interest]
    if (!options) continue

    const affordable = options.find(d => d.baseCost <= budget)
    if (affordable) return affordable.name
  }
  return "Nearby destination"
}

function buildDayPlan(days, destination) {
  const plan = []
  for (let i = 1; i <= days; i++) {
    plan.push({
      day: `Day ${i}`,
      title:
        i === 1
          ? `Arrival & local exploration in ${destination}`
          : i === days
          ? `Relaxation & return`
          : `Explore hidden spots around ${destination}`,
      description:
        i === 1
          ? "Arrive, check-in, evening walk, local food."
          : i === days
          ? "Slow morning, souvenirs, return journey."
          : "Sightseeing, cafes, cultural spots.",
    })
  }
  return plan
}

function budgetBreakdown(budget) {
  return [
    { label: "Stay", amount: Math.round(budget * 0.4) },
    { label: "Travel", amount: Math.round(budget * 0.3) },
    { label: "Food", amount: Math.round(budget * 0.2) },
    { label: "Local travel & misc", amount: Math.round(budget * 0.1) },
  ]
}

export function generateMockPlan(request) {
  const {
    fromCity = "your city",
    days = 3,
    budget = 10000,
    interests = [],
  } = request

  const destination = pickDestination(interests, budget)

  return {
    summary: `A ${days}-day trip from ${fromCity} to ${destination}, designed to match your budget and interests.`,
    
    whyThisTrip: [
      `Fits comfortably within a ₹${budget} budget`,
      `Ideal for a ${days}-day break`,
      interests.length
        ? `Aligned with your interest in ${interests.join(", ")}`
        : "Balanced mix of relaxation and exploration",
    ],

    itinerary: buildDayPlan(days, destination),

    budget: budgetBreakdown(budget),

    tips: [
      "Book stays slightly outside city centers to save money",
      "Use local transport where possible",
      "Avoid peak travel hours for better experiences",
    ],

    disclaimer:
      "This is a planning guide, not a booking service. Prices and availability may vary.",
  }
}
