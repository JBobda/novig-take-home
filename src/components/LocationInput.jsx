import { useState, useEffect } from "react";

export default function LocationInput({ onChange }) {
  const [value, setValue] = useState("New York");

  // Debounce API calls — wait 600ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed) onChange(trimmed);
    }, 600);
    return () => clearTimeout(timer);
  }, [value, onChange]);

  return (
    <div className="control-group">
      <span className="control-label">Location</span>
      <div className="location-input-wrapper">
        <input
          className="location-input"
          value={value}
          placeholder="City or address (e.g. New York)"
          onChange={(e) => setValue(e.target.value)}
          aria-label="Event location"
        />
      </div>
    </div>
  );
}