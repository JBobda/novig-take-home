export function getWeatherMessage(temp, humidity, wind) {
  if (temp >= 60 && temp <= 75 && wind < 10) {
    return "Great day for a meetup 🎉";
  }

  if (humidity > 70) {
    return "Chance of rain 🌧️";
  }

  if (wind > 20) {
    return "Windy conditions 🌬️";
  }

  return "Weather is okay 👍";
}

// Convert time range → hour index
export function getHourIndex(range) {
  if (range === "morning") return 9;
  if (range === "afternoon") return 15;
  if (range === "evening") return 19;
}