import {
  getConditionEmoji,
  getWeatherMessage,
  getWeatherScore,
  getHourIndex,
  formatDate,
} from "../utils/weatherHelpers";
import WeatherChart from "./WeatherChart";

export default function WeatherCard({ day, timeRange }) {
  const hourIndex = getHourIndex(timeRange);
  const hourData = day.hours?.[hourIndex];

  if (!hourData) {
    return <div className="no-data">No hourly data available</div>;
  }

  const { temp, feelslike, humidity, windspeed, precipprob = 0, icon = "" } = hourData;
  const score = getWeatherScore(temp, humidity, windspeed, precipprob);
  const cardClass = score >= 70 ? "good" : score >= 45 ? "okay" : "bad";

  return (
    <div className={`weather-card ${cardClass}`}>
      <div className="card-header">
        <span className="card-date">{formatDate(day.datetime)}</span>
        <span className="card-icon">{getConditionEmoji(icon)}</span>
      </div>

      <div className="card-temp">
        <span className="temp-main">{Math.round(temp)}°F</span>
        <span className="temp-feels">feels like {Math.round(feelslike)}°</span>
      </div>

      <div className="card-message">
        {getWeatherMessage(temp, windspeed, precipprob)}
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Rain chance</span>
          <span className="detail-value">{Math.round(precipprob)}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(windspeed)} mph</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{Math.round(humidity)}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Conditions</span>
          <span className="detail-value" style={{ fontSize: "0.82rem" }}>
            {hourData.conditions || "—"}
          </span>
        </div>
      </div>

      <WeatherChart day={day} timeRange={timeRange} />
    </div>
  );
}
