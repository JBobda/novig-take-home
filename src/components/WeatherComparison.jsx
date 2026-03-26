import WeatherCard from "./WeatherCard";
import { getWeatherScore, getHourIndex } from "../utils/weatherHelpers";

function findDayByName(days, selectedDay) {
  return days?.find((d) => {
    // Parse without timezone issues by constructing date from parts
    const [year, month, day] = d.datetime.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", { weekday: "long" }) === selectedDay;
  });
}

function getRecommendation(thisDay, nextDay, timeRange) {
  if (!thisDay || !nextDay) return null;

  const hourIndex = getHourIndex(timeRange);
  const thisHour = thisDay.hours?.[hourIndex];
  const nextHour = nextDay.hours?.[hourIndex];

  if (!thisHour || !nextHour) return null;

  const thisScore = getWeatherScore(
    thisHour.temp, thisHour.humidity, thisHour.windspeed, thisHour.precipprob ?? 0
  );
  const nextScore = getWeatherScore(
    nextHour.temp, nextHour.humidity, nextHour.windspeed, nextHour.precipprob ?? 0
  );

  const diff = thisScore - nextScore;

  if (Math.abs(diff) < 8) {
    return { cls: "similar", text: "Both weeks look similar — either works ≈" };
  }
  if (diff > 0) {
    return { cls: "better-this", text: `This week looks better (score ${Math.round(thisScore)} vs ${Math.round(nextScore)}) ✓` };
  }
  return { cls: "better-next", text: `Next week looks better (score ${Math.round(nextScore)} vs ${Math.round(thisScore)}) ✓` };
}

export default function WeatherComparison({ thisWeek, nextWeek, selectedDay, timeRange }) {
  const thisWeekDay = findDayByName(thisWeek, selectedDay);
  const nextWeekDay = findDayByName(nextWeek, selectedDay);
  const recommendation = getRecommendation(thisWeekDay, nextWeekDay, timeRange);

  return (
    <div>
      <div className="comparison">
        {recommendation && (
          <div className={`recommendation ${recommendation.cls}`}>
            {recommendation.text}
          </div>
        )}

        <div className="week-column">
          <h3>This week</h3>
          {thisWeekDay
            ? <WeatherCard day={thisWeekDay} timeRange={timeRange} />
            : <div className="no-data">No data for {selectedDay} this week</div>
          }
        </div>

        <div className="week-column">
          <h3>Next week</h3>
          {nextWeekDay
            ? <WeatherCard day={nextWeekDay} timeRange={timeRange} />
            : <div className="no-data">No data for {selectedDay} next week</div>
          }
        </div>
      </div>
    </div>
  );
}
