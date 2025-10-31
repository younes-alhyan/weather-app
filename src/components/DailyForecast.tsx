import type { Weather } from "../layouts/Body";
import { getWeatherIcon } from "../TemperatureIcons";

interface DailyForecastProps {
  isLoading: boolean;
  weather: Weather | undefined;
}

export default function DailyForecast({
  isLoading,
  weather,
}: DailyForecastProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-medium">Daily Forecast</p>
      <div className="grid grid-cols-3 grid-rows-3 lg:grid-cols-7 lg:grid-rows-1 gap-4">
        {isLoading
          ? Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-32 flex flex-col items-center justify-center bg-neutral-800 outline-1 outline-neutral-600 rounded-lg p-2 gap-2 animate-pulse"
              ></div>
            ))
          : weather?.current_weather.daily_forcast.map((w) => (
              <div
                key={w.time}
                className="flex flex-col items-center justify-center bg-neutral-800 outline-1 outline-neutral-600 rounded-lg p-2 gap-2"
              >
                <p className="text-white">
                  {new Date(w.time).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={getWeatherIcon(w.weathercode)}
                  alt="Weather icon"
                  className="h-12"
                />
                <div className="w-full flex items-center justify-between">
                  <p className="text-white">
                    {w.temperature.toFixed()}
                    {weather.current_weather_units.temperature}
                  </p>
                  <p className="text-white">
                    {w.apparent_temperature.toFixed()}
                    {weather.current_weather_units.temperature}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
