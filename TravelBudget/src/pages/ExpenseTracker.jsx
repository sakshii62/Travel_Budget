import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ExpenseCard from "../components/ExpenseCard.jsx";
import { addExpense, deleteExpense } from "../features/expenses/expenseSlice.js";
import { expenseCategories, totalSpent } from "../utils/budgetCalculations.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import "../styles/ExpenseTracker.css";

const today = () => new Date().toISOString().slice(0, 10);
const emptyForm = () => ({ title: "", amount: "", category: expenseCategories[0], date: today() });

export default function ExpenseTracker() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const trips = useSelector((state) => state.trips.trips);
  const expenses = useSelector((state) => state.expenses.items);

  const [tripId, setTripId] = useState(params.get("trip") || trips[0]?.id || "");
  const [form, setForm] = useState(emptyForm());

  if (trips.length === 0) {
    return (
      <div className="empty-state">
        <span className="emoji">🧾</span>
        <p>Create a trip first to track its expenses.</p>
        <Link to="/create-trip" className="btn">Create a Trip</Link>
      </div>
    );
  }

  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const tripExpenses = expenses
    .filter((e) => e.tripId === trip.id)
    .sort((a, b) => b.date.localeCompare(a.date));
  const spent = totalSpent(tripExpenses);
  const remaining = trip.budget - spent;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || Number(form.amount) <= 0) return;

    dispatch(addExpense({ tripId: trip.id, ...form, title: form.title.trim() }));
    setForm(emptyForm());
  }

  return (
    <>
      <div className="page-header">
        <h2>Expense Tracker</h2>
        <p className="muted">Log every expense and stay within budget</p>
      </div>

      <div className="planner-top">
        <div className="form-group">
          <label>Select trip</label>
          <select value={trip.id} onChange={(e) => setTripId(e.target.value)}>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tracker-layout">
        <div>
          <div className="total-box">
            <span>Total spent</span>
            <strong>{formatCurrency(spent)}</strong>
            <span>
              {remaining >= 0
                ? `${formatCurrency(remaining)} left of ${formatCurrency(trip.budget)}`
                : `Over budget by ${formatCurrency(-remaining)}`}
            </span>
          </div>

          <form className="card form" onSubmit={handleSubmit}>
            <h3>Add expense</h3>

            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={set("title")} placeholder="e.g. Lunch at beach shack" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Amount (₹)</label>
                <input type="number" min="1" value={form.amount} onChange={set("amount")} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={set("date")} required />
              </div>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={set("category")}>
                {expenseCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-accent">Add expense</button>
          </form>
        </div>

        <div className="expense-list">
          {tripExpenses.length === 0 ? (
            <div className="empty-state">
              <span className="emoji">🧾</span>
              <p>No expenses yet for this trip.</p>
            </div>
          ) : (
            tripExpenses.map((e) => (
              <ExpenseCard key={e.id} expense={e} onDelete={(id) => dispatch(deleteExpense(id))} />
            ))
          )}
        </div>
      </div>
    </>
  );
}