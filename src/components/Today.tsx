import type { Weather } from "../layouts/Body";
import { useViewport } from "../hooks/useViewport";
import { getWeatherIcon } from "../TemperatureIcons";
import TodayBgLarge from "../assets/bg-today-large.svg";
import TodayBgSmall from "../assets/bg-today-small.svg";

interface TodayProps {
  isLoading: boolean;
  weather: Weather | undefined;
}

export default function Today({ isLoading, weather }: TodayProps) {
  const viewport = useViewport();
  const weatherIcon = getWeatherIcon(
    weather?.current_weather.weathercode as number
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex items-center justify-center">
        <img
          src={viewport === "desktop" ? TodayBgLarge : TodayBgSmall}
          alt="Background"
        />

        {isLoading ? (
          <div className="absolute w-full h-full flex items-center justify-center bg-neutral-800 rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <span
                  className="h-3 aspect-square rounded-full bg-neutral-200 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-3 aspect-square rounded-full bg-neutral-200 animate-bounce "
                  style={{ animationDelay: "200ms" }}
                ></span>
                <span
                  className="h-3 aspect-square rounded-full bg-neutral-200 animate-bounce"
                  style={{ animationDelay: "400ms" }}
                ></span>
              </div>
              <p className="text-white">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="absolute w-full h-full flex flex-col items-center justify-around lg:justify-between lg:flex-row lg:px-8 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-white text-2xl lg:text-4xl font-medium">
                {weather?.current_weather.city},{" "}
                {weather?.current_weather.country}
              </p>
              <p className="text-neutral-100 text-center lg:text-start">
                {weather &&
                  new Date(weather.current_weather.time).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <img src={weatherIcon} alt="weather icon" className="h-24" />
              <p className="text-white text-6xl lg:text-8xl font-dm-sans font-semibold italic">
                {weather?.current_weather.temperature.toFixed()}{" "}
                {weather?.current_weather_units.temperature}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4 w-full h-full">
        <div
          className={`bg-neutral-800 flex flex-col p-4 gap-4 rounded-lg outline-2 outline-neutral-600 ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-neutral-100 font-dm-sans">Feels Like</p>
          <p className="text-white text-2xl font-dm-sans">
            {isLoading
              ? "_"
              : weather?.current_weather.apparent_temperature.toFixed()}
            {isLoading ? "" : weather?.current_weather_units.temperature}
          </p>
        </div>
        <div
          className={`bg-neutral-800 flex flex-col p-4 gap-4 rounded-lg outline-2 outline-neutral-600 ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-neutral-100 font-dm-sans">Humidity</p>
          <p className="text-white text-2xl font-dm-sans">
            {isLoading ? "_" : weather?.current_weather.humidity.toFixed()}
            {isLoading ? "" : weather?.current_weather_units.humidity}
          </p>
        </div>
        <div
          className={`bg-neutral-800 flex flex-col p-4 gap-4 rounded-lg outline-2 outline-neutral-600 ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-neutral-100 font-dm-sans">Wind</p>
          <p className="text-white text-2xl font-dm-sans">
            {isLoading
              ? "_"
              : weather?.current_weather.windspeed.toFixed() + " "}
            {isLoading ? "" : weather?.current_weather_units.windspeed}
          </p>
        </div>
        <div
          className={`bg-neutral-800 flex flex-col p-4 gap-4 rounded-lg outline-2 outline-neutral-600 ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <p className="text-neutral-100 font-dm-sans">Precipitaion</p>
          <p className="text-white text-2xl font-dm-sans">
            {isLoading
              ? "_"
              : weather?.current_weather.precipitation.toFixed() + " "}
            {isLoading ? "" : weather?.current_weather_units.precipitation}
          </p>
        </div>
      </div>
    </div>
  );
}
