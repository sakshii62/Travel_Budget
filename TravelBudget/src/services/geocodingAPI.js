// Find coordinates of any city, handy if you add "custom destinations" later
export async function searchCity(name) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City search failed");

  const data = await res.json();
  return (data.results || []).map((r) => ({
    name: r.name,
    country: r.country,
    lat: r.latitude,
    lon: r.longitude,
  }));
}