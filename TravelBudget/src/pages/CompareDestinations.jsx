import { useState } from "react";
import destinations from "../data/destinations.json";
import travelCosts from "../data/travelCosts.json";
import { estimateTripCost } from "../utils/budgetCalculations.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import "../styles/Explore.css";

const DAYS = 4;

// Each row of the comparison table
const rows = [
  { label: "Category", get: (d) => d.category },
  { label: "Rating", get: (d) => d.rating, format: (v) => `⭐ ${v}`, best: "high" },
  { label: "Best season", get: (d) => d.bestSeason },
  { label: "Flight (per person)", get: (d, c) => c.flight, format: formatCurrency, best: "low" },
  { label: "Hotel per night", get: (d, c) => c.stayPerNight, format: formatCurrency, best: "low" },
  { label: "Food per day", get: (d, c) => c.foodPerDay, format: formatCurrency, best: "low" },
  {
    label: `Total for ${DAYS} days (1 person)`,
    get: (d, c) => estimateTripCost(c, DAYS, 1),
    format: formatCurrency,
    best: "low",
  },
];

export default function CompareDestinations() {
  const [firstId, setFirstId] = useState("goa");
  const [secondId, setSecondId] = useState("bali");

  const first = destinations.find((d) => d.id === firstId);
  const second = destinations.find((d) => d.id === secondId);
  const costs1 = travelCosts[firstId];
  const costs2 = travelCosts[secondId];

  // Is "mine" the better value compared to "other"?
  function isBest(row, mine, other) {
    if (!row.best || mine === other) return false;
    return row.best === "low" ? mine < other : mine > other;
  }

  return (
    <>
      <div className="page-header">
        <h2>Compare Destinations</h2>
        <p className="muted">Pick two places and see which one fits your budget</p>
      </div>

      <div className="compare-selects">
        <div className="form-group">
          <label>First destination</label>
          <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Second destination</label>
          <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="compare-table">
        <thead>
          <tr>
            <th></th>
            <th>{first.emoji} {first.name}</th>
            <th>{second.emoji} {second.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const v1 = row.get(first, costs1);
            const v2 = row.get(second, costs2);
            const show = row.format || ((v) => v);
            return (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td className={isBest(row, v1, v2) ? "best" : ""}>{show(v1)}</td>
                <td className={isBest(row, v2, v1) ? "best" : ""}>{show(v2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="muted small" style={{ marginTop: "10px" }}>
        Highlighted cells show the better value (cheaper price or higher rating).
      </p>
    </>
  );
}