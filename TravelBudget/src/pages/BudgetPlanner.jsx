import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import BudgetCard from "../components/BudgetCard.jsx";
import { updateBudget } from "../features/trips/tripSlice.js";
import { groupByCategory, totalSpent } from "../utils/budgetCalculations.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import "../styles/BudgetPlanner.css";

export default function BudgetPlanner() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const trips = useSelector((state) => state.trips.trips);
  const expenses = useSelector((state) => state.expenses.items);

  const [tripId, setTripId] = useState(params.get("trip") || trips[0]?.id || "");
  const [newBudget, setNewBudget] = useState("");

  if (trips.length === 0) {
    return (
      <div className="empty-state">
        <span className="emoji">💰</span>
        <p>Create a trip first to plan its budget.</p>
        <Link to="/create-trip" className="btn">Create a Trip</Link>
      </div>
    );
  }

  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const destination = destinations.find((d) => d.id === trip.destinationId);
  const tripExpenses = expenses.filter((e) => e.tripId === trip.id);
  const spent = totalSpent(tripExpenses);
  const breakdown = groupByCategory(tripExpenses);

  function handleUpdate(e) {
    e.preventDefault();
    if (Number(newBudget) > 0) {
      dispatch(updateBudget({ tripId: trip.id, budget: newBudget }));
      setNewBudget("");
    }
  }

  return (
    <>
      <div className="page-header">
        <h2>Budget Planner</h2>
        <p className="muted">See how much you have spent and where it went</p>
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
        <Link to={`/expenses?trip=${trip.id}`} className="btn btn-accent">+ Add expense</Link>
      </div>

      <div className="tracker-layout">
        <div className="stack">
          <BudgetCard trip={trip} destination={destination} spent={spent} />

          <div className="card">
            <h3>Change budget</h3>
            <form className="budget-edit" onSubmit={handleUpdate}>
              <input
                type="number"
                min="1"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder={formatCurrency(trip.budget)}
              />
              <button className="btn">Update</button>
            </form>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title">Spending by category</h3>
          {breakdown.length === 0 ? (
            <p className="muted">No expenses yet. Add some to see the breakdown.</p>
          ) : (
            breakdown.map((item) => {
              const pct = Math.round((item.amount / spent) * 100);
              return (
                <div key={item.category} className="breakdown-row">
                  <div className="row between">
                    <strong>{item.category}</strong>
                    <span className="muted small">
                      {formatCurrency(item.amount)} · {pct}%
                    </span>
                  </div>
                  <div className="bar">
                    <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}