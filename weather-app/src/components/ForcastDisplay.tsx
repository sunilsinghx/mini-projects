import type React from "react";
import type { ForecastItem } from "../types/weather";

type Props = {
  forcast: ForecastItem[];
};

const ForcastDisplay: React.FC<Props> = ({ forcast }) => {
  return (
    <div className="border-t border-gray-300 mt-6 pt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        5-Day Forecast
      </h3>

      <div className="flex flex-wrap gap-4">
        {forcast.map((item, idx) => (
          <div
            key={idx}
            className="
            flex flex-col items-center 
            bg-white shadow-sm border border-gray-200 
            rounded-lg p-4 w-28
            hover:shadow-md hover:scale-105 transition-all duration-200
          "
          >
            <p className="text-sm font-medium text-gray-600 flex-1">
              {new Date(item.dt_txt).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Icon"
              aria-label={item.weather[0].main}
              title={item.weather[0].main}
              className="w-12 h-12"
            />

            <p className="text-lg font-semibold text-blue-600">
              {item.main.temp}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForcastDisplay;
