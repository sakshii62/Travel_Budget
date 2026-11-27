import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import DestinationCard from "../components/DestinationCard.jsx";
import { toggleFavourite } from "../features/trips/tripSlice.js";

export default function Favourites() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.trips.favourites);

  const saved = destinations.filter((d) => favourites.includes(d.id));

  return (
    <>
      <div className="page-header">
        <h2>My Favourites</h2>
        <p className="muted">Destinations you have saved</p>
      </div>

      {saved.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🤍</span>
          <p>You have not saved any destinations yet.</p>
          <Link to="/explore" className="btn">Explore Destinations</Link>
        </div>
      ) : (
        <div className="grid">
          {saved.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              isFavourite={true}
              onToggleFavourite={(id) => dispatch(toggleFavourite(id))}
            />
          ))}
        </div>
      )}
    </>
  );
}