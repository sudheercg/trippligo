const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function getDestinationRecommendations(payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/destination-intelligence/recommend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}