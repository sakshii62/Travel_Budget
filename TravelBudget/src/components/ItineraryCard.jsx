import { formatCurrency } from "../utils/formatCurrency.js";
import "../styles/ItineraryPlanner.css";

export default function ItineraryCard({ item, onDelete }) {
  return (
    <div className="itinerary-card">
      <div className="day-badge">Day {item.day}</div>

      <div className="itinerary-info">
        <strong>{item.title}</strong>
        <span className="muted small">
          🕒 {item.time || "Anytime"} · {formatCurrency(item.cost)}
        </span>
      </div>

      <button className="icon-btn" onClick={() => onDelete(item.id)} aria-label="Remove activity">
        ✕
      </button>
    </div>
  );
}