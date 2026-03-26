const API_KEY = "7T2BG6CFHDCA9ZZDW2SR6LMY8";

export async function fetchWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}