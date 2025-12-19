export function generateMockPlan(prompt) {
  const text = prompt.toLowerCase()

  let destinations = []
  let itinerary = []
  let budget = ""
  let tips = ""

  if (text.includes("beach")) {
    destinations = [
      "Goa – Vibrant beaches, nightlife, food",
      "Gokarna – Peaceful beaches and sunsets"
    ]

    itinerary = [
      "Day 1: Travel, beach walk, seafood dinner",
      "Day 2: Beach hopping, cafes, sunset view",
      "Day 3: Leisure morning and return"
    ]

    budget = "₹9,000–₹12,000 per couple using train or bus travel."
    tips = "Avoid peak weekends. South Goa and Gokarna are calmer."
  } 
  else if (text.includes("hill") || text.includes("mountain")) {
    destinations = [
      "Coorg – Coffee plantations and waterfalls",
      "Ooty – Cool climate and scenic views"
    ]

    itinerary = [
      "Day 1: Travel and local exploration",
      "Day 2: Nature walks, viewpoints, relaxed evening",
      "Day 3: Leisure breakfast and return"
    ]

    budget = "₹8,000–₹11,000 per couple depending on stay choice."
    tips = "Pack warm clothing and book stays close to town."
  } 
  else {
    destinations = [
      "Hampi – History, culture, and landscapes",
      "Pondicherry – Cafes, heritage streets, beaches"
    ]

    itinerary = [
      "Day 1: Travel and local sightseeing",
      "Day 2: Explore culture, food, and streets",
      "Day 3: Relaxed morning and return"
    ]

    budget = "₹7,000–₹10,000 for a comfortable short trip."
    tips = "Walkable towns save transport cost and time."
  }

  return {
    type: "success",
    overview:
      "This plan is designed based on your interests, time, and budget, focusing on comfort and meaningful experiences.",
    destinations,
    itinerary,
    budget,
    tips
  }
}
