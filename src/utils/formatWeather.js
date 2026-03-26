export function getWeatherMessage(temp, humidity) {
  if (temp >= 60 && temp <= 75) return "Nice day ☀️";
  if (humidity >= 25 && humidity <= 75) return "Chance of rain 🌧️";
  return "Weather may vary 🌥️";
}