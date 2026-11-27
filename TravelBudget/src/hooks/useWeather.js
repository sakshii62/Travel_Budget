import { useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherAPI.js";

export function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lat === undefined || lon === undefined) return;
    setLoading(true);
    setError("");

    fetchWeather(lat, lon)
      .then(setWeather)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  return { weather, loading, error };
}