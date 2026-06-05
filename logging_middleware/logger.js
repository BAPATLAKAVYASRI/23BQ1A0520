import { LOG_API, TOKEN } from "./constants";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message
      })
    });

    return await response.json();
  } catch (error) {
    console.error("Logging Error:", error);
  }
}