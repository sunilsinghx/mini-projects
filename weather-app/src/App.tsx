import { useEffect, useState } from "react";
import type { ForecastItem, WeatherData } from "./types/weather";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForcastDisplay from "./components/ForcastDisplay";
import { fetchForcast, fetchWeather } from "./utils/api";
import "./App.css";
import { getDailyForecasts } from "./utils/helper";

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forcast, setForcast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCity, setLastCity] = useState(
    () => localStorage.getItem("lastCity") || ""
  );

  useEffect(() => {
    searchCity(lastCity);
  }, []);

  const searchCity = async (city: string) => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const weatherData = await fetchWeather(city);
      const forcastRes = await fetchForcast(city);

      const forecastData = getDailyForecasts(forcastRes?.list);

      setWeather(weatherData);
      setForcast(forecastData);

      setLastCity(city);
      localStorage.setItem("lastCity", city);
    } catch (error) {
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Weather
      </h1>

      <SearchBar onSearch={searchCity} defaultCity={lastCity} />

      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

      {error && (
        <p className="text-center text-red-600 mt-4 font-medium">{error}</p>
      )}

      {weather && (
        <div className="mt-12">
          <WeatherDisplay data={weather} />
        </div>
      )}

      {forcast.length > 0 && (
        <div className="mt-6">
          <ForcastDisplay forcast={forcast} />
        </div>
      )}
    </div>
  );
};

export default App;
