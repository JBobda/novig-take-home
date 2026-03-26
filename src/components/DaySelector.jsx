export default function DaySelector({ selectedDay, onChange }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      <p>Select Day:</p>
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onChange(day)}
          style={{
            margin: "5px",
            background: selectedDay === day ? "#007bff" : "#eee",
            color: selectedDay === day ? "white" : "black",
            padding: "5px 10px"
          }}
        >
          {day}
        </button>
      ))}
    </div>
  );
}