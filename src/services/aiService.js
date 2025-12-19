import { generateMockPlan } from "./mockAI"

export async function getTravelPlan(prompt) {
  // simulate network + AI thinking delay
  await new Promise((res) => setTimeout(res, 800))

  // basic validation
  if (prompt.length < 10) {
    return {
      type: "error",
      message: "Please provide a bit more detail for better suggestions."
    }
  }

  return generateMockPlan(prompt)
}
