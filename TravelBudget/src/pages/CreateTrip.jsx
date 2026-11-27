import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import destinations from "../data/destinations.json";
import travelCosts from "../data/travelCosts.json";
import { addTrip } from "../features/trips/tripSlice.js";
import { estimateTripCost } from "../utils/budgetCalculations.js";
import { daysBetween } from "../utils/dateHelpers.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import "../styles/CreateTrip.css";

// Today + n days as "YYYY-MM-DD"
function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export default function CreateTrip() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    destinationId: params.get("destination") || destinations[0].id,
    startDate: addDays(0),
    endDate: addDays(3),
    travellers: 1,
    budget: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const destination = destinations.find((d) => d.id === form.destinationId);
  const costs = travelCosts[form.destinationId];
  const travellers = Number(form.travellers) || 1;
  const days = daysBetween(form.startDate, form.endDate);
  const nights = Math.max(0, days - 1);
  const total = estimateTripCost(costs, days, travellers);
  const invalidDates = form.endDate < form.startDate;

  function handleSubmit(e) {
    e.preventDefault();
    if (invalidDates) return;

    dispatch(
      addTrip({
        name: form.name.trim() || `${destination.name} Trip`,
        destinationId: form.destinationId,
        startDate: form.startDate,
        endDate: form.endDate,
        travellers,
        budget: Number(form.budget) || total,
      })
    );
    navigate("/my-trips");
  }

  return (
    <>
      <div className="page-header">
        <h2>Create a Trip</h2>
        <p className="muted">Fill in the details and we will estimate the cost for you</p>
      </div>

      <div className="create-layout">
        <form className="card form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Trip name</label>
            <input
              value={form.name}
              onChange={set("name")}
              placeholder={`${destination.name} Trip`}
            />
          </div>

          <div className="form-group">
            <label>Destination</label>
            <select value={form.destinationId} onChange={set("destinationId")}>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.emoji} {d.name}, {d.country}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start date</label>
              <input type="date" value={form.startDate} onChange={set("startDate")} required />
            </div>
            <div className="form-group">
              <label>End date</label>
              <input type="date" value={form.endDate} onChange={set("endDate")} required />
            </div>
          </div>
          {invalidDates && (
            <p className="text-danger small">End date must be after the start date.</p>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Travellers</label>
              <select value={form.travellers} onChange={set("travellers")}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Your budget (₹)</label>
              <input
                type="number"
                min="1"
                value={form.budget}
                onChange={set("budget")}
                placeholder={`Estimated: ${formatCurrency(total)}`}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setForm({ ...form, budget: total })}
          >
            Use estimate as my budget
          </button>
          <button className="btn btn-accent">Create Trip</button>
        </form>

        {/* Live estimate */}
        <div className="card estimate-box">
          <h3>
            {destination.emoji} {destination.name} estimate
          </h3>
          <div className="estimate-row">
            <span>Duration</span>
            <span>{days} days / {nights} nights</span>
          </div>
          <div className="estimate-row">
            <span>Flights</span>
            <span>{formatCurrency(costs.flight * travellers)}</span>
          </div>
          <div className="estimate-row">
            <span>Stay</span>
            <span>{formatCurrency(costs.stayPerNight * nights)}</span>
          </div>
          <div className="estimate-row">
            <span>Food</span>
            <span>{formatCurrency(costs.foodPerDay * days * travellers)}</span>
          </div>
          <div className="estimate-row">
            <span>Transport</span>
            <span>{formatCurrency(costs.transportPerDay * days * travellers)}</span>
          </div>
          <div className="estimate-row">
            <span>Activities</span>
            <span>{formatCurrency(costs.activitiesPerDay * days * travellers)}</span>
          </div>
          <div className="estimate-total">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="estimate-hint">
            One room is shared by all travellers. Leave the budget empty to use this estimate.
          </p>
        </div>
      </div>
    </>
  );
}