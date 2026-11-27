import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import BudgetCard from "../components/BudgetCard.jsx";
import { deleteTrip } from "../features/trips/tripSlice.js";
import { totalSpent } from "../utils/budgetCalculations.js";

export default function MyTrips() {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);
  const expenses = useSelector((state) => state.expenses.items);

  function handleDelete(id) {
    if (window.confirm("Delete this trip?")) dispatch(deleteTrip(id));
  }

  return (
    <>
      <div className="page-header row between">
        <div>
          <h2>My Trips</h2>
          <p className="muted">All your planned trips in one place</p>
        </div>
        <Link to="/create-trip" className="btn btn-accent">+ New Trip</Link>
      </div>

      {trips.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🧳</span>
          <p>You have not planned any trips yet.</p>
          <Link to="/create-trip" className="btn">Create your first trip</Link>
        </div>
      ) : (
        <div className="grid">
          {trips.map((trip) => {
            const destination = destinations.find((d) => d.id === trip.destinationId);
            const spent = totalSpent(expenses.filter((e) => e.tripId === trip.id));

            return (
              <div key={trip.id} className="stack">
                <BudgetCard
                  trip={trip}
                  destination={destination}
                  spent={spent}
                  onDelete={handleDelete}
                />
                <div className="row" style={{ flexWrap: "wrap" }}>
                  <Link to={`/budget?trip=${trip.id}`} className="btn btn-outline btn-small">Budget</Link>
                  <Link to={`/itinerary?trip=${trip.id}`} className="btn btn-outline btn-small">Itinerary</Link>
                  <Link to={`/expenses?trip=${trip.id}`} className="btn btn-outline btn-small">Expenses</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}