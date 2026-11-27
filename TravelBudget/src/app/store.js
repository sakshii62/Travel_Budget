import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trips/tripSlice.js";
import expenseReducer from "../features/expenses/expenseSlice.js";

const KEY = "travelBudgetState";

// Load saved data (if any) so trips survive a page refresh
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    expenses: expenseReducer,
  },
  preloadedState: loadState(),
});

// Save on every change
store.subscribe(() => {
  localStorage.setItem(KEY, JSON.stringify(store.getState()));
});