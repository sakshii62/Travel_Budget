import { Routes, Route } from "react-router-dom";

// ---------- Components ----------
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// ---------- Pages ----------
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import CompareDestinations from "./pages/CompareDestinations.jsx";
import CreateTrip from "./pages/CreateTrip.jsx";
import MyTrips from "./pages/MyTrips.jsx";
import BudgetPlanner from "./pages/BudgetPlanner.jsx";
import ItineraryPlanner from "./pages/ItineraryPlanner.jsx";
import ExpenseTracker from "./pages/ExpenseTracker.jsx";
import Favourites from "./pages/Favourites.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/compare" element={<CompareDestinations />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/budget" element={<BudgetPlanner />} />
          <Route path="/itinerary" element={<ItineraryPlanner />} />
          <Route path="/expenses" element={<ExpenseTracker />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}