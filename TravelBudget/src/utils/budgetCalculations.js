// Categories used in the expense form
export const expenseCategories = ["Flights", "Transport", "Stay", "Food", "Activities", "Shopping", "Other"];

// Total of all expenses
export function totalSpent(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

// Percentage of budget used (0 - 100)
export function percentUsed(spent, budget) {
  if (!budget) return 0;
  return Math.min(100, Math.round((spent / budget) * 100));
}

// Group expenses by category -> [{ category, amount }]
export function groupByCategory(expenses) {
  const totals = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });
  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

// Estimated trip cost using travelCosts.json (one room shared by all travellers)
export function estimateTripCost(costs, days, travellers = 1) {
  if (!costs) return 0;
  const nights = Math.max(0, days - 1);
  const perPerson =
    costs.flight +
    (costs.foodPerDay + costs.transportPerDay + costs.activitiesPerDay) * days;
  return perPerson * travellers + costs.stayPerNight * nights;
}