const API_KEY = process.env.REACT_APP_WEATHER_KEY;

export async function fetchWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}