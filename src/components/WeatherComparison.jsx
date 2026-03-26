import WeatherCard from "./WeatherCard";

export default function WeatherComparison({
  thisWeek,
  nextWeek,
  selectedDay,
  timeRange
}) {
  function filterByDay(days) {
    return days.find((d) => {
      const date = new Date(d.datetime);
      return date.toLocaleDateString("en-US", { weekday: "long" }) === selectedDay;
    });
  }

  const thisWeekDay = filterByDay(thisWeek);
  const nextWeekDay = filterByDay(nextWeek);

  return (
    <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
      <div>
        <h3>This Week</h3>
        {thisWeekDay && <WeatherCard day={thisWeekDay} timeRange={timeRange} />}
      </div>

      <div>
        <h3>Next Week</h3>
        {nextWeekDay && <WeatherCard day={nextWeekDay} timeRange={timeRange} />}
      </div>
    </div>
  );
}