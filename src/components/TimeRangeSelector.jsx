const TIME_RANGES = [
  { id: "morning", label: "Morning", sub: "9 AM" },
  { id: "afternoon", label: "Afternoon", sub: "3 PM" },
  { id: "evening", label: "Evening", sub: "7 PM" },
];

export default function TimeRangeSelector({ selectedTime, onChange }) {
  return (
    <div className="control-group">
      <span className="control-label">Time of day</span>
      <div className="pill-group">
        {TIME_RANGES.map(({ id, label, sub }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`pill ${selectedTime === id ? "active-time" : ""}`}
            aria-pressed={selectedTime === id}
          >
            {label} <span style={{ opacity: 0.65, fontSize: "0.8em" }}>{sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}