export function generatePlan(input) {
  const {
    fromCity,
    days,
    budget,
    interests = [],
    travelers
  } = input;

  const results = [];

  // RULE 1: Short trips, low budget → nearby destinations
  if (fromCity === "Hyderabad" && days <= 3 && budget <= 12000) {
    results.push({
      destination: "Gokarna",
      summary: `
Gokarna works well for a short ${days}-day trip from Hyderabad if you’re on a tight budget.

Overnight buses save both time and hotel cost. The town is calm, beaches are walkable, and food is affordable.
This trip suits travelers who prefer slow mornings, simple stays, and fewer crowds.
      `
    });

    results.push({
      destination: "Visakhapatnam",
      summary: `
Vizag is a practical option if you want beaches with better city comfort.

Trains are economical, food options are diverse, and the beach road makes evenings pleasant.
Best if you want balance — sightseeing plus relaxation.
      `
    });
  }

  // RULE 2: Food + culture focus
  if (interests.includes("food")) {
    results.push({
      destination: "Pondicherry",
      summary: `
Pondicherry stands out for travelers who enjoy food and relaxed walks.

French-influenced cafés, calm streets, and seaside evenings make it ideal for couples.
Costs are manageable if travel is planned in advance.
      `
    });
  }

  // RULE 3: Hills & calm
  if (interests.includes("nature") || interests.includes("music")) {
    results.push({
      destination: "Coorg",
      summary: `
Coorg fits travelers looking for greenery, quiet stays, and unhurried days.

Best suited if you’re okay with longer road travel and fewer sightseeing spots.
This trip is about slowing down, not packing activities.
      `
    });
  }

  // Fallback
  if (results.length === 0) {
    results.push({
      destination: "Flexible planning",
      summary: `
Based on your inputs, a highly customized plan would work better.

Consider adjusting budget or travel days to unlock better destination options.
      `
    });
  }

  return {
    title: `Trip ideas from ${fromCity}`,
    recommendations: results.slice(0, 2), // keep it focused
    disclaimer:
      "These suggestions are based on common travel patterns and practical constraints. Always plan bookings independently."
  };
}
