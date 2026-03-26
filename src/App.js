import { useState, useEffect, useCallback } from "react";
import LocationInput from "./components/LocationInput";
import { fetchWeather } from "./services/weatherApi";
import DaySelector from "./components/DaySelector";
import TimeRangeSelector from "./components/TimeRangeSelector";
import WeatherComparison from "./components/WeatherComparison";
import "./styles.css";

export default function App() {
  const [location, setLocation] = useState("New York");
  const [selectedDay, setSelectedDay] = useState("Friday");
  const [timeRange, setTimeRange] = useState("afternoon");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback so LocationInput's debounce effect doesn't re-fire on every render
  const handleLocationChange = useCallback((loc) => setLocation(loc), []);

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchWeather(location);
        setData(result);
      } catch {
        setError(`Could not find weather data for "${location}". Try a different city or address.`);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [location]);

  const thisWeek = data?.days?.slice(0, 7);
  const nextWeek = data?.days?.slice(7, 14);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Meetup Weather Planner</h1>
        <p>Compare this week vs. next week for your recurring outdoor event</p>
      </div>

      <div className="controls">
        <LocationInput onChange={handleLocationChange} />
        <DaySelector selectedDay={selectedDay} onChange={setSelectedDay} />
        <TimeRangeSelector selectedTime={timeRange} onChange={setTimeRange} />
      </div>

      {loading && <div className="status-bar loading">Fetching weather for {location}…</div>}

      {error && <div className="status-bar error">{error}</div>}

      {!loading && data && (
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
