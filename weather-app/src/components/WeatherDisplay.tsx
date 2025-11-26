import type React from "react";
import type { WeatherData } from "../types/weather";

type Props = {
  data: WeatherData;
};

const WeatherDisplay: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 w-full max-w-sm mx-auto mt-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h2>

      <p className="text-lg text-gray-700">
        Temperature: <b className="text-blue-600">{data.main.temp}°C</b>
      </p>

      <p className="text-gray-600 capitalize">
        Condition: {data.weather[0].description}
      </p>

      <p className="text-gray-600">Humidity: {data.main.humidity}%</p>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather icon"
        className="w-20 h-20 mx-auto mt-4 drop-shadow-md"
      />
    </div>
  );
};

export default WeatherDisplay;
