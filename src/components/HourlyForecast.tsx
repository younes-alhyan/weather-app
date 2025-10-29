import { useState } from "react";
import type { Weather } from "../layouts/Body";
import { getWeatherIcon } from "../TemperatureIcons";
import DropDownIcon from "../assets/icon-dropdown.svg";

interface HourlyForecastProps {
  isLoading: boolean;
  weather: Weather | undefined;
}

export default function HourlyForecast({
  isLoading,
  weather,
}: HourlyForecastProps) {
  const [day, setDay] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const start = day * 24;
  const end = start + 24;
  const hoursOfDay = weather?.current_weather.hourly_forcast.slice(start, end);

  return (
    <div className="w-full lg:w-2/5 flex flex-col bg-neutral-800 outline-1 outline-neutral-600 rounded-lg">
      <div className="w-full flex items-center justify-between p-4">
        <p className="text-white font-medium">Hourly forecast</p>
        <div
          className="relative flex items-center bg-neutral-700 hover:bg-neutral-600 px-3 py-1 gap-4 rounded-md cursor-pointer"
          onClick={toggleDropdown}
        >
          <p className="text-white">
            {!isLoading && weather?.current_weather.daily_forcast[day]?.time
              ? new Date(
                  weather.current_weather.daily_forcast[day].time
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                })
              : "-"}
          </p>
          <img src={DropDownIcon} alt="Drop Down" />
          {/*Drop Down*/}
          {!isLoading && isDropdownOpen && (
            <div className="absolute top-full right-0 w-64 bg-neutral-800 outline-1 outline-neutral-600 rounded-lg p-2 mt-2 z-10">
              {weather?.current_weather.daily_forcast.map((d, index) => (
                <p
                  key={d.time}
                  className="text-white hover:bg-neutral-700 rounded-lg p-2"
                  onClick={() => setDay(index)}
                >
                  {new Date(d.time).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 max-h-[580px] px-4 overflow-scroll">
        {isLoading
          ? Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-neutral-700 rounded-lg py-6 animate-pulse"
              ></div>
            ))
          : hoursOfDay?.map((h) => (
              <div
                key={h.time}
                className="flex items-center justify-between bg-neutral-700 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={getWeatherIcon(h.weathercode)}
                    alt="Temperature Icon"
                    className="h-8"
                  />
                  <p className="text-white">
                    {new Date(h.time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
                <p className="text-white">
                  {h.temperature.toFixed()}
                  {weather?.current_weather_units.temperature}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
