import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import destinations from "../data/destinations.json";
import SearchBar from "../components/SearchBar.jsx";
import FilterBar from "../components/FilterBar.jsx";
import DestinationCard from "../components/DestinationCard.jsx";
import { toggleFavourite } from "../features/trips/tripSlice.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import "../styles/Explore.css";

// ["All", "Beach", "Mountain", "Heritage", "Nature", "City"]
const categories = ["All", ...new Set(destinations.map((d) => d.category))];

export default function Explore() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.trips.favourites);

  const [search, setSearch] = useState("");
  // The selected chip is remembered even after a refresh
  const [category, setCategory] = useLocalStorage("exploreCategory", "All");

  // Keep only destinations that match the search text AND the selected category
  const filtered = destinations.filter((d) => {
    const text = `${d.name} ${d.country}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = category === "All" || d.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="page-header">
        <h2>Explore Destinations</h2>
        <p className="muted">Search and filter to find your next trip</p>
      </div>

      <div className="explore-controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar categories={categories} selected={category} onSelect={setCategory} />
      </div>

      <p className="muted results-count">{filtered.length} destination(s) found</p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🧭</span>
          <p>No destinations match your search.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((d) => (
            <DestinationCard
              key={d.id}
              destination={d}
              isFavourite={favourites.includes(d.id)}
              onToggleFavourite={(id) => dispatch(toggleFavourite(id))}
            />
          ))}
        </div>
      )}
    </>
  );
}