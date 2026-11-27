import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trips: [],        // { id, name, destinationId, startDate, endDate, travellers, budget, itinerary: [] }
  favourites: [],   // list of destination ids
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip(state, action) {
      state.trips.push({
        id: Date.now().toString(),
        itinerary: [],
        ...action.payload,
      });
    },
    deleteTrip(state, action) {
      state.trips = state.trips.filter((t) => t.id !== action.payload);
    },
    updateBudget(state, action) {
      const { tripId, budget } = action.payload;
      const trip = state.trips.find((t) => t.id === tripId);
      if (trip) trip.budget = Number(budget);
    },
    addItineraryItem(state, action) {
      const { tripId, item } = action.payload;
      const trip = state.trips.find((t) => t.id === tripId);
      if (trip) trip.itinerary.push({ id: Date.now().toString(), ...item });
    },
    removeItineraryItem(state, action) {
      const { tripId, itemId } = action.payload;
      const trip = state.trips.find((t) => t.id === tripId);
      if (trip) trip.itinerary = trip.itinerary.filter((i) => i.id !== itemId);
    },
    toggleFavourite(state, action) {
      const id = action.payload;
      state.favourites = state.favourites.includes(id)
        ? state.favourites.filter((f) => f !== id)
        : [...state.favourites, id];
    },
  },
});

export const {
  addTrip,
  deleteTrip,
  updateBudget,
  addItineraryItem,
  removeItineraryItem,
  toggleFavourite,
} = tripSlice.actions;

export default tripSlice.reducer;