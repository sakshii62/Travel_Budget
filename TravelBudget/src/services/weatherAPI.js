// Convert Open-Meteo weather code -> [text, emoji]
function describe(code) {
  if (code === 0) return ["Clear sky", "☀️"];
  if (code <= 2) return ["Partly cloudy", "⛅"];
  if (code === 3) return ["Overcast", "☁️"];
  if (code <= 48) return ["Foggy", "🌫️"];
  if (code <= 57) return ["Drizzle", "🌦️"];
  if (code <= 67) return ["Rain", "🌧️"];
  if (code <= 77) return ["Snow", "❄️"];
  if (code <= 82) return ["Rain showers", "🌧️"];
  if (code <= 86) return ["Snow showers", "🌨️"];
  return ["Thunderstorm", "⛈️"];
}

export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather is not available right now");

  const data = await res.json();
  const w = data.current_weather;
  const [description, icon] = describe(w.weathercode);

  return {
    temperature: Math.round(w.temperature),
    windspeed: Math.round(w.windspeed),
    description,
    icon,
  };
}