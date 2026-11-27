import { createSlice } from "@reduxjs/toolkit";
import { deleteTrip } from "../trips/tripSlice.js";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { items: [] }, // { id, tripId, title, category, amount, date }
  reducers: {
    addExpense(state, action) {
      state.items.push({
        id: Date.now().toString(),
        ...action.payload,
        amount: Number(action.payload.amount),
      });
    },
    deleteExpense(state, action) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
  },
  // When a trip is deleted, remove its expenses too
  extraReducers: (builder) => {
    builder.addCase(deleteTrip, (state, action) => {
      state.items = state.items.filter((e) => e.tripId !== action.payload);
    });
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;