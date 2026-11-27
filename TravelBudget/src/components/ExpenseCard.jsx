import { formatCurrency } from "../utils/formatCurrency.js";
import { formatDate } from "../utils/dateHelpers.js";
import "../styles/ExpenseTracker.css";

const icons = {
  Flights: "✈️",
  Transport: "🚕",
  Stay: "🏨",
  Food: "🍽️",
  Activities: "🎟️",
  Shopping: "🛍️",
  Other: "📦",
};

export default function ExpenseCard({ expense, onDelete }) {
  return (
    <div className="expense-card">
      <div className="expense-icon">{icons[expense.category] || "📦"}</div>

      <div className="expense-info">
        <strong>{expense.title}</strong>
        <span className="muted small">
          {expense.category} · {formatDate(expense.date)}
        </span>
      </div>

      <strong className="expense-amount">{formatCurrency(expense.amount)}</strong>

      <button className="icon-btn" onClick={() => onDelete(expense.id)} aria-label="Delete expense">
        ✕
      </button>
    </div>
  );
}