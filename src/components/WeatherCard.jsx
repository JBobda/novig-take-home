import { getWeatherMessage } from "../utils/weatherHelpers";

export default function WeatherCard({ day, timeRange }) {
  const hourIndex =
    timeRange === "morning" ? 9 :
    timeRange === "afternoon" ? 15 : 19;

  const hourData = day.hours?.[hourIndex];

  if (!hourData) return null;

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "5px",
      minWidth: "150px"
    }}>
      <p><strong>{day.datetime}</strong></p>
      <p>{hourData.temp}°F</p>
      <p>{getWeatherMessage(hourData.temp, hourData.humidity, hourData.windspeed)}</p>
    </div>
  );
}