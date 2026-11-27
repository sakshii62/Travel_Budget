import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import travelCosts from "../data/travelCosts.json";
import { getAttractions } from "../services/attractionsAPI.js";
import { useWeather } from "../hooks/useWeather.js";
import { estimateTripCost } from "../utils/budgetCalculations.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { toggleFavourite } from "../features/trips/tripSlice.js";

import WeatherCard from "../components/WeatherCard.jsx";
import Loader from "../components/Loader.jsx";
import "../styles/DestinationDetails.css";

export default function DestinationDetails() {
  const { id } = useParams(); // the :id from the URL
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.trips.favourites);

  const destination = destinations.find((d) => d.id === id);
  const costs = travelCosts[id];

  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [travellers, setTravellers] = useState(1);

  const { weather, loading: weatherLoading, error } = useWeather(
    destination?.lat,
    destination?.lon
  );

  useEffect(() => {
    setLoading(true);
    getAttractions(id).then((data) => {
      setAttractions(data);
      setLoading(false);
    });
  }, [id]);

  if (!destination) {
    return (
      <div className="empty-state">
        <span className="emoji">🧭</span>
        <p>Destination not found.</p>
        <Link to="/explore" className="btn">Back to Explore</Link>
      </div>
    );
  }

  const days = destination.suggestedDays;
  const nights = days - 1;
  const isFav = favourites.includes(id);
  const total = estimateTripCost(costs, days, travellers);

  return (
    <>
      {/* Banner */}
      <div
        className="details-hero"
        style={{
          background: `linear-gradient(135deg, ${destination.colors[0]}, ${destination.colors[1]})`,
        }}
      >
        <span className="details-emoji">{destination.emoji}</span>
        <div>
          <h1>
            {destination.name}, {destination.country}
          </h1>
          <p>{destination.description}</p>
        </div>
      </div>

      <div className="details-layout">
        {/* Left column */}
        <div className="stack">
          <div className="card">
            <div className="info-grid">
              <div className="info-box">
                <span>Rating</span>
                <strong>⭐ {destination.rating}</strong>
              </div>
              <div className="info-box">
                <span>Best season</span>
                <strong>{destination.bestSeason}</strong>
              </div>
              <div className="info-box">
                <span>Suggested stay</span>
                <strong>{days} days</strong>
              </div>
            </div>

            <h3>Top attractions</h3>
            {loading ? (
              <Loader message="Loading attractions..." />
            ) : (
              <div className="attraction-list">
                {attractions.map((a) => (
                  <div key={a.name} className="attraction-item">
                    <div>
                      <strong>{a.name}</strong>
                      <p className="muted small">{a.type}</p>
                    </div>
                    <span className="badge">
                      {a.price === 0 ? "Free" : formatCurrency(a.price)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="stack">
          {weatherLoading ? (
            <Loader message="Fetching weather..." />
          ) : error ? (
            <div className="card">
              <p className="muted small">{error}</p>
            </div>
          ) : (
            <WeatherCard city={destination.name} weather={weather} />
          )}

          <div className="card">
            <h3>Estimated cost</h3>
            <p className="muted small">
              {days} days / {nights} nights
            </p>

            <div className="form-group" style={{ margin: "12px 0" }}>
              <label>Travellers</label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="cost-line">
              <span>Flights</span>
              <span>{formatCurrency(costs.flight * travellers)}</span>
            </div>
            <div className="cost-line">
              <span>Stay</span>
              <span>{formatCurrency(costs.stayPerNight * nights)}</span>
            </div>
            <div className="cost-line">
              <span>Food</span>
              <span>{formatCurrency(costs.foodPerDay * days * travellers)}</span>
            </div>
            <div className="cost-line">
              <span>Transport</span>
              <span>{formatCurrency(costs.transportPerDay * days * travellers)}</span>
            </div>
            <div className="cost-line">
              <span>Activities</span>
              <span>{formatCurrency(costs.activitiesPerDay * days * travellers)}</span>
            </div>
            <div className="cost-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Link to={`/create-trip?destination=${id}`} className="btn btn-accent full">
            Plan this trip
          </Link>
          <button className="btn btn-outline full" onClick={() => dispatch(toggleFavourite(id))}>
            {isFav ? "❤️ Remove from favourites" : "🤍 Add to favourites"}
          </button>
        </div>
      </div>
    </>
  );
}