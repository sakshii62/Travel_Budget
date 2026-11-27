import "../styles/DestinationDetails.css";

export default function WeatherCard({ city, weather }) {
  if (!weather) return null;

  return (
    <div className="card weather-card">
      <p className="muted small">Weather in {city}</p>
      <div className="row between">
        <h2>{weather.temperature}°C</h2>
        <span className="weather-icon">{weather.icon}</span>
      </div>
      <p>{weather.description}</p>
      <p className="muted small">💨 Wind: {weather.windspeed} km/h</p>
    </div>
  );
}