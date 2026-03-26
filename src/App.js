import { useState, useEffect } from "react";
import LocationInput from "./components/LocationInput";
import { fetchWeather } from "./services/weatherApi";
import DaySelector from "./components/DaySelector";
import TimeRangeSelector from "./components/TimeRangeSelector";
import WeatherComparison from "./components/WeatherComparison";

export default function App() {
  const [location, setLocation] = useState("New York");
  const [selectedDay, setSelectedDay] = useState("Friday");
  const [timeRange, setTimeRange] = useState("afternoon");

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
      <h1>🌤️ Meetup Weather Planner</h1>

      <LocationInput onChange={setLocation} />

      <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
      <TimeRangeSelector selectedTime={timeRange} onChange={setTimeRange} />

      {loading && <p>Loading...</p>}

      {data && (
        <WeatherComparison
          thisWeek={thisWeek}
          nextWeek={nextWeek}
          selectedDay={selectedDay}
          timeRange={timeRange}
        />
      )}
    </div>
  );
}
