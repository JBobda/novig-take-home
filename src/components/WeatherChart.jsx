import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { getHourIndex } from "../utils/weatherHelpers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const HOUR_START = 6;
const HOUR_END = 22; // inclusive

export default function WeatherChart({ day, timeRange }) {
  const hours = day.hours?.slice(HOUR_START, HOUR_END + 1) ?? [];
  if (hours.length === 0) return null;

  const selectedHour = getHourIndex(timeRange);
  const selectedIdx = selectedHour - HOUR_START;

  const labels = hours.map((_, i) => {
    const h = HOUR_START + i;
    if (h === 0) return "12am";
    if (h === 12) return "12pm";
    return h > 12 ? `${h - 12}pm` : `${h}am`;
  });

  const temps = hours.map((h) => Math.round(h.temp));
  const precipProbs = hours.map((h) => h.precipprob ?? 0);
  const humidities = hours.map((h) => Math.round(h.humidity ?? 0));

  // Point radii: highlight the selected time
  const pointRadius = hours.map((_, i) => (i === selectedIdx ? 5 : 2));
  const pointBorderWidth = hours.map((_, i) => (i === selectedIdx ? 2 : 1));

  const data = {
    labels,
    datasets: [
      {
        label: "Temp (°F)",
        data: temps,
        borderColor: "#4299e1",
        backgroundColor: "rgba(66,153,225,0.12)",
        fill: true,
        tension: 0.4,
        yAxisID: "yTemp",
        pointRadius,
        pointBorderWidth,
        pointBackgroundColor: hours.map((_, i) =>
          i === selectedIdx ? "#2b6cb0" : "#4299e1"
        ),
      },
      {
        label: "Rain %",
        data: precipProbs,
        borderColor: "#a0aec0",
        backgroundColor: "rgba(160,174,192,0.08)",
        fill: true,
        tension: 0.4,
        yAxisID: "yRain",
        borderDash: [4, 3],
        pointRadius: 0,
      },
      {
        label: "Humidity %",
        data: humidities,
        borderColor: "#68d391",
        backgroundColor: "rgba(104,211,145,0.08)",
        fill: true,
        tension: 0.4,
        yAxisID: "yRain",
        borderDash: [2, 4],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) => {
            if (ctx.datasetIndex === 0) return `${ctx.parsed.y}°F`;
            if (ctx.datasetIndex === 1) return `Rain: ${ctx.parsed.y}%`;
            return `Humidity: ${ctx.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10 },
          color: "#a0aec0",
          maxRotation: 0,
          // Only show every other label to avoid crowding
          callback: (_, i) => (i % 2 === 0 ? labels[i] : ""),
        },
        grid: { display: false },
      },
      yTemp: {
        type: "linear",
        position: "left",
        ticks: { font: { size: 10 }, color: "#4299e1" },
        grid: { color: "rgba(0,0,0,0.05)" },
        title: { display: true, text: "°F", color: "#4299e1", font: { size: 10 } },
      },
      yRain: {
        type: "linear",
        position: "right",
        min: 0,
        max: 100,
        ticks: { font: { size: 10 }, color: "#a0aec0" },
        grid: { drawOnChartArea: false },
        title: { display: true, text: "%", color: "#a0aec0", font: { size: 10 } },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
}
