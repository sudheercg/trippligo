const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function planTrip(userInput) {
  const response = await fetch(
    `${API_BASE_URL}/api/planner/plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userInput })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get plan");
  }

  return response.json();
}
