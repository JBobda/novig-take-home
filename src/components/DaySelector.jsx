export default function DaySelector({ selectedDay, onChange }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="control-group">
      <span className="control-label">Day of week</span>
      <div className="pill-group">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onChange(day)}
            className={`pill ${selectedDay === day ? "active-day" : ""}`}
            aria-pressed={selectedDay === day}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}