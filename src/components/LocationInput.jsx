export default function LocationInput({ onChange }) {
  return (
    <input
      placeholder="Enter location (e.g. New York)"
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", margin: "10px" }}
    />
  );
}