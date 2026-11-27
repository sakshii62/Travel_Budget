import { formatCurrency } from "../utils/formatCurrency.js";
import { formatDate } from "../utils/dateHelpers.js";
import { percentUsed } from "../utils/budgetCalculations.js";
import "../styles/BudgetPlanner.css";

export default function BudgetCard({ trip, destination, spent, onDelete }) {
  const remaining = trip.budget - spent;
  const pct = percentUsed(spent, trip.budget);
  const barClass = remaining < 0 ? "over" : pct > 80 ? "warn" : "";

  return (
    <div className="card budget-card">
      <div className="row between">
        <h3>
          {destination?.emoji} {trip.name}
        </h3>
        {onDelete && (
          <button className="btn btn-danger btn-small" onClick={() => onDelete(trip.id)}>
            Delete
          </button>
        )}
      </div>

      <p className="muted small">
        {destination?.name} · {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
      </p>

      <div className="budget-numbers">
        <div>
          <span className="muted small">Budget</span>
          <strong>{formatCurrency(trip.budget)}</strong>
        </div>
        <div>
          <span className="muted small">Spent</span>
          <strong>{formatCurrency(spent)}</strong>
        </div>
        <div>
          <span className="muted small">{remaining < 0 ? "Over by" : "Left"}</span>
          <strong className={remaining < 0 ? "text-danger" : "text-success"}>
            {formatCurrency(Math.abs(remaining))}
          </strong>
        </div>
      </div>

      <div className="bar">
        <div className={`bar-fill ${barClass}`} style={{ width: `${pct}%` }}></div>
      </div>
      <p className="muted small">{pct}% of budget used</p>
    </div>
  );
}