import "../styles/Explore.css";

export default function FilterBar({ categories, selected, onSelect }) {
  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "chip active" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}