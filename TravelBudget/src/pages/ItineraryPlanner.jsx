import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ItineraryCard from "../components/ItineraryCard.jsx";
import { addItineraryItem, removeItineraryItem } from "../features/trips/tripSlice.js";
import { daysBetween } from "../utils/dateHelpers.js";
import "../styles/ItineraryPlanner.css";

const emptyForm = { day: 1, title: "", time: "", cost: "" };

export default function ItineraryPlanner() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const trips = useSelector((state) => state.trips.trips);

  const [tripId, setTripId] = useState(params.get("trip") || trips[0]?.id || "");
  const [form, setForm] = useState(emptyForm);

  if (trips.length === 0) {
    return (
      <div className="empty-state">
        <span className="emoji">🗺️</span>
        <p>Create a trip first to plan its itinerary.</p>
        <Link to="/create-trip" className="btn">Create a Trip</Link>
      </div>
    );
  }

  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const totalDays = daysBetween(trip.startDate, trip.endDate);

  // Group activities by day: { 1: [..], 2: [..] }
  const grouped = {};
  trip.itinerary.forEach((item) => {
    if (!grouped[item.day]) grouped[item.day] = [];
    grouped[item.day].push(item);
  });
  const dayKeys = Object.keys(grouped).sort((a, b) => a - b);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    dispatch(
      addItineraryItem({
        tripId: trip.id,
        item: {
          day: Number(form.day),
          title: form.title.trim(),
          time: form.time,
          cost: Number(form.cost) || 0,
        },
      })
    );
    setForm({ ...emptyForm, day: form.day });
  }

  return (
    <>
      <div className="page-header">
        <h2>Itinerary Planner</h2>
        <p className="muted">Plan what you will do each day</p>
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

      <div className="itinerary-layout">
        <form className="card form" onSubmit={handleSubmit}>
          <h3>Add activity</h3>

          <div className="form-group">
            <label>Day</label>
            <select value={form.day} onChange={set("day")}>
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>Day {d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Activity</label>
            <input value={form.title} onChange={set("title")} placeholder="e.g. Visit Baga Beach" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Time</label>
              <input type="time" value={form.time} onChange={set("time")} />
            </div>
            <div className="form-group">
              <label>Cost (₹)</label>
              <input type="number" min="0" value={form.cost} onChange={set("cost")} placeholder="0" />
            </div>
          </div>

          <button className="btn btn-accent">Add to itinerary</button>
        </form>

        <div>
          {dayKeys.length === 0 ? (
            <div className="empty-state">
              <span className="emoji">📝</span>
              <p>No activities yet. Add your first one!</p>
            </div>
          ) : (
            dayKeys.map((day) => (
              <div key={day} className="day-group">
                <h3>Day {day}</h3>
                <div className="itinerary-list">
                  {grouped[day].map((item) => (
                    <ItineraryCard
                      key={item.id}
                      item={item}
                      onDelete={(itemId) =>
                        dispatch(removeItineraryItem({ tripId: trip.id, itemId }))
                      }
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}