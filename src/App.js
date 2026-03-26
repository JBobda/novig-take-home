import { useState, useEffect } from "react";
import LocationInput from "./components/LocationInput";
import { fetchWeather } from "./services/weatherApi";
import { getWeatherMessage } from "./utils/formatWeather";
import WeatherComparison from "./components/WeatherComparison";

export default function App() {
  const [location, setLocation] = useState("New York");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchWeather(location);
        setData(result);
      } catch (error) {
        setError("Failed to load weather data.")
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [location]);

  // Split weeks
  const thisWeek = data?.days?.slice(0, 7);
  const nextWeek = data?.days?.slice(7, 14);


  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🌤️ Weather App</h1>

      <LocationInput onChange={setLocation} />

      <p>
        <strong>Selected Location:</strong> {location}
      </p>

      {/* Loading + Error */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Weather Data */}
      {data && (
        <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "10px" }}>
          <h2>Today</h2>
          <p>Temperature: {data.days[0].temp}°F</p>
          <p>
            {
              getWeatherMessage(data.days[0].temp, data.days[0].humidity)
            }
          </p>
        </div>
      )}

      {/* Comparison */}
      {data && thisWeek && nextWeek && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weekly Comparison</h2>
          <WeatherComparison thisWeek={thisWeek} nextWeek={nextWeek} />
        </div>
      )}

      <p>
        {nextWeek?.[0]?.temp > thisWeek?.[0]?.temp
          ? "Next week looks warmer ☀️"
          : "This week might be better 🌤️"}
      </p>
    </div>
  );
}
