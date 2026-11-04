
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function planTrip(payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/planner/plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Planner API failed (${response.status}): ${details}`
    );
  }

  return response.json();
}
