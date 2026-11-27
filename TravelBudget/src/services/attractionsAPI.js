import attractions from "../data/attractions.json";


export function getAttractions(destinationId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(attractions[destinationId] || []), 500);
  });
}