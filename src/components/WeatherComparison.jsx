export default function WeatherComparison({ thisWeek, nextWeek }) {
  return (
    <div style={{ display: "flex", gap: "20px", overflowX: "scroll" }}>
      <div>
        <h3>This Week</h3>
        {thisWeek.map((day) => (
          <div key={day.datetime}>
            {day.datetime}: {day.temp}
          </div>
        ))}
      </div>

      <div>
        <h3>Next Week</h3>
        {nextWeek.map((day) => (
          <div key={day.datetime}>
            {day.datetime}: {day.temp}
          </div>
        ))}
      </div>
    </div>
  );
}