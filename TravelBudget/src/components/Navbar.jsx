import { Link, NavLink } from "react-router-dom";
import { useUI } from "../context/UIContext.jsx";
import "../styles/Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/compare", label: "Compare" },
  { to: "/my-trips", label: "My Trips" },
  { to: "/budget", label: "Budget" },
  { to: "/expenses", label: "Expenses" },
  { to: "/favourites", label: "Favourites" },
];

export default function Navbar() {
  const { menuOpen, toggleMenu, closeMenu } = useUI();

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>✈️ TravelBudget</Link>

      {/* Hamburger button (only visible on small screens) */}
      <button className="menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
        <li>
          <Link to="/create-trip" className="btn btn-accent btn-small" onClick={closeMenu}>
            + Plan Trip
          </Link>
        </li>
      </ul>
    </nav>
  );
}