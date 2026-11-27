
import { Link } from "react-router-dom";
import "../styles/Explore.css";

export default function DestinationCard({ destination, isFavourite, onToggleFavourite }) {
  const { id, name, country, category, emoji, image, rating, bestSeason, description } = destination;

  return (
    <div className="card destination-card">
      <img
        src={image}
        alt={name}
        className="destination-image"
      />

      <div className="destination-body">
        <div className="row between">
          <h3>{emoji} {name}</h3>
          <span className="rating">⭐ {rating}</span>
        </div>
        <p className="muted">{country}</p>
        <p className="destination-desc">{description}</p>

        <div className="row between">
          <span className="badge">{category}</span>
          <span className="muted small">Best: {bestSeason}</span>
        </div>

        <Link to={`/destination/${id}`} className="btn btn-small full">
          View Details
        </Link>
      </div>

      <button
        className="heart"
        onClick={() => onToggleFavourite(id)}
        aria-label="Toggle favourite"
      >
        {isFavourite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
