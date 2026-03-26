// Map Visual Crossing icon names to emoji
export function getConditionEmoji(icon = "") {
  if (icon.includes("thunder")) return "⛈️";
  if (icon.includes("snow")) return "❄️";
  if (icon.includes("sleet") || icon.includes("hail")) return "🌨️";
  if (icon.includes("rain") || icon.includes("shower")) return "🌧️";
  if (icon.includes("fog")) return "🌫️";
  if (icon.includes("wind")) return "🌬️";
  if (icon.includes("cloudy")) return "☁️";
  if (icon.includes("partly-cloudy-night")) return "🌙";
  if (icon.includes("partly-cloudy")) return "⛅";
  if (icon.includes("clear-night")) return "🌙";
  if (icon.includes("clear")) return "☀️";
  return "🌤️";
}

// Human-friendly message using precipitation probability (more accurate than humidity alone)
export function getWeatherMessage(temp, wind, precipProb = 0) {
  if (precipProb > 70) return "Rain likely — consider rescheduling ☔";
  if (precipProb > 40) return "Possible showers — plan accordingly 🌦️";
  if (temp < 32) return "Freezing — probably too cold ❄️";
  if (temp < 45) return "Cold — bundle up 🧥";
  if (temp > 95) return "Dangerously hot — avoid outdoor activity 🥵";
  if (temp > 85) return "Hot — stay hydrated and find shade 🌞";
  if (wind > 25) return "Very windy — outdoor events may be disrupted 🌬️";
  if (wind > 15) return "Breezy — might feel cooler than it looks 💨";
  if (temp >= 62 && temp <= 82 && wind < 12 && precipProb < 20) return "Great conditions for a meetup! 🎉";
  return "Weather looks okay 👍";
}

// Score 0–100: higher = better for outdoor events
export function getWeatherScore(temp, humidity, wind, precipProb = 0) {
  let score = 100;

  // Temperature comfort (ideal 65–78°F)
  if (temp < 32) score -= 60;
  else if (temp < 45) score -= 35;
  else if (temp < 55) score -= 15;
  else if (temp >= 65 && temp <= 78) score += 5;
  else if (temp > 95) score -= 40;
  else if (temp > 85) score -= 18;

  // Rain probability (0–100 → subtract up to 60)
  score -= precipProb * 0.6;

  // Wind
  if (wind > 25) score -= 20;
  else if (wind > 15) score -= 8;

  // Humidity
  if (humidity > 85) score -= 8;

  return Math.max(0, Math.min(100, score));
}

// Convert time range → hour index
export function getHourIndex(range) {
  if (range === "morning") return 9;
  if (range === "afternoon") return 15;
  if (range === "evening") return 19;
  return 12;
}

// Format a "YYYY-MM-DD" string into a friendly label like "Fri, Mar 28"
export function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
