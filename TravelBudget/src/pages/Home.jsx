
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import DestinationCard from "../components/DestinationCard.jsx";
import { toggleFavourite } from "../features/trips/tripSlice.js";
import "../styles/Home.css";

const budgetCategories = [
  {
    icon: "🎒",
    title: "Budget Travel",
    range: "Under ₹10,000",
    description: "Explore amazing places without spending too much.",
  },
  {
    icon: "🌍",
    title: "Mid-Range Travel",
    range: "₹10,000 – ₹30,000",
    description: "Enjoy comfortable stays and memorable experiences.",
  },
  {
    icon: "✈️",
    title: "Luxury Travel",
    range: "Above ₹30,000",
    description: "Experience beautiful destinations in style.",
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.trips.favourites);

  // First 3 destinations are shown as "popular"
  const featured = destinations.slice(0, 3);

  // Get favourite destinations
  const favouriteDestinations = destinations.filter((d) =>
    favourites.includes(d.id)
  );

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Plan your dream trip without breaking the bank</h1>
          <p>
            Discover destinations, estimate costs, build itineraries and track every
            rupee in one simple place.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-accent">Explore Destinations</Link>
            <Link to="/create-trip" className="btn btn-outline">Plan a Trip</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-row">
        <div className="card stat-box">
          <strong>{destinations.length}+</strong>
          <span className="muted">Destinations</span>
        </div>
        <div className="card stat-box">
          <strong>100%</strong>
          <span className="muted">Free to use</span>
        </div>
        <div className="card stat-box">
          <strong>₹0</strong>
          <span className="muted">Hidden costs</span>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="section-block">
        <div className="section-head">
          <div>
            <h2>Popular Destinations</h2>
            <p className="muted">Hand-picked places travellers love</p>
          </div>
          <Link to="/explore" className="btn btn-outline btn-small">View all</Link>
        </div>

        <div className="grid">
          {featured.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              isFavourite={favourites.includes(d.id)}
              onToggleFavourite={(id) => dispatch(toggleFavourite(id))}
            />
          ))}
        </div>
      </section>

      {/* Travel by Budget */}
      <section className="section-block">
        <div className="section-head">
          <div>
            <h2>Travel by Budget</h2>
            <p className="muted">
              Every budget deserves a beautiful journey.
            </p>
          </div>
        </div>

        <div className="grid">
          {budgetCategories.map((category) => (
            <div className="card feature-card" key={category.title}>
              <div className="feature-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <strong>{category.range}</strong>
              <p className="muted">{category.description}</p>
              <Link to="/explore" className="btn btn-outline btn-small">
                Explore Places
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Your Travel Bucket List */}
      <section className="section-block">
        <div className="section-head">
          <div>
            <h2>Your Travel Bucket List ❤️</h2>
            <p className="muted">
              Your favourite destinations, all in one place.
            </p>
          </div>
          <Link to="/explore" className="btn btn-outline btn-small">
            Explore More
          </Link>
        </div>

        {favouriteDestinations.length > 0 ? (
          <div className="grid">
            {favouriteDestinations.slice(0, 3).map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                isFavourite={true}
                onToggleFavourite={(id) => dispatch(toggleFavourite(id))}
              />
            ))}
          </div>
        ) : (
          <div className="card feature-card">
            <div className="feature-icon">❤️</div>
            <h3>No favourites yet!</h3>
            <p className="muted">
              Save the destinations you love and they will appear here.
            </p>
            <Link to="/explore" className="btn btn-accent btn-small">
              Find Your Favourite Place
            </Link>
          </div>
        )}
      </section>

      {/* Plan Your Next Adventure */}
      <section className="cta-banner">
        <h2>Your next adventure is waiting!</h2>
        <p>
          Choose your destination, set your budget and create memories.
        </p>
        <Link to="/create-trip" className="btn btn-light">
          Plan My Trip
        </Link>
      </section>
    </>
  );
}
