import "../styles/Explore.css";

export default function SearchBar({ value, onChange, placeholder = "Search destinations..." }) {
  return (
    <div className="search-bar">
      <span>🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}