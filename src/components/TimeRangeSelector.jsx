export default function TimeRangeSelector({ selectedTime, onChange }) {
  const ranges = ["morning", "afternoon", "evening"];

  return (
    <div>
      <p>Select Time:</p>
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          style={{
            margin: "5px",
            background: selectedTime === range ? "#28a745" : "#eee",
            padding: "5px 10px"
          }}
        >
          {range}
        </button>
      ))}
    </div>
  );
}