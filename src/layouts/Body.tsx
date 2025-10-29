import { useState, useEffect } from "react";
import Today from "../components/Today";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";

interface BodyProps {
  location: string | undefined;
  units: [boolean, boolean, boolean];
  setIsApiError: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HourlyForcast {
  time: string;
  temperature: number;
  apparent_temperature: number;
  weathercode: number;
}

interface DailyForcast {
  time: string;
  temperature: number;
  apparent_temperature: number;
  weathercode: number;
}

export interface Weather {
  current_weather_units: {
    temperature: string;
    windspeed: string;
    precipitation: string;
    humidity: string;
  };
  current_weather: {
    city: string;
    country: string;
    time: string;
    temperature: number;
    apparent_temperature: number;
    humidity: number;
    windspeed: number;
    precipitation: number;
    weathercode: number;
    hourly_forcast: HourlyForcast[];
    daily_forcast: DailyForcast[];
  };
}

export default function Body({ location, units, setIsApiError }: BodyProps) {
  const [weather, setWeather] = useState<Weather>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    const city = location?.split("-")[0] as string;
    if (!city) return;

    async function fetchData() {
      setIsLoading(true);
      setIsFound(true);

      try {
        // 1️⃣ Fetch geocoding
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=1&language=en`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          setIsFound(false);
          setIsLoading(false);
          return;
        }

        const { country, latitude, longitude } = geoData.results[0];

        // 2️⃣ Fetch weather
        const today = new Date();
        const startDate = today.toISOString().split("T")[0];
        const endDate = new Date();
        endDate.setDate(today.getDate() + 6);
        const endDateStr = endDate.toISOString().split("T")[0];

        const unitsTypes: [string, string, string] = [
          units[0] ? "fahrenheit" : "celsius",
          units[1] ? "mph" : "kmh",
          units[2] ? "inch" : "mm",
        ];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,weathercode` +
            `&daily=temperature_2m_max,apparent_temperature_max,windspeed_10m_max,precipitation_sum,weathercode` +
            `&current_weather=true` +
            `&timezone=auto` +
            `&start_date=${startDate}&end_date=${endDateStr}` +
            `&temperature_unit=${unitsTypes[0]}` +
            `&windspeed_unit=${unitsTypes[1]}` +
            `&precipitation_unit=${unitsTypes[2]}`
        );
        const weatherData = await weatherRes.json();

        // 3️⃣ Map hourly forecast
        const hourly_forcast: HourlyForcast[] = weatherData.hourly.time.map(
          (time: string, i: number) => ({
            time,
            temperature: weatherData.hourly.temperature_2m[i],
            apparent_temperature: weatherData.hourly.apparent_temperature[i],
            weathercode: weatherData.hourly.weathercode[i],
          })
        );

        // 4️⃣ Map daily forecast (7 days)
        const daily_forcast: DailyForcast[] = weatherData.daily.time.map(
          (time: string, i: number) => ({
            time,
            temperature: weatherData.daily.temperature_2m_max[i],
            apparent_temperature: weatherData.daily.apparent_temperature_max[i],
            weathercode: weatherData.daily.weathercode[i],
          })
        );

        // 5️⃣ Map to Weather interface
        const mappedWeather: Weather = {
          current_weather_units: {
            temperature: "°",
            windspeed:
              weatherData.current_weather_units.windspeed ?? unitsTypes[1],
            precipitation:
              weatherData.current_weather_units.precipitation ?? unitsTypes[2],
            humidity: weatherData.current_weather_units.humidity ?? "%",
          },
          current_weather: {
            city,
            country,
            time: weatherData.current_weather.time,
            temperature: weatherData.current_weather.temperature,
            apparent_temperature: weatherData.current_weather.temperature, // approximation
            humidity: weatherData.hourly.relativehumidity_2m?.[0] ?? 0,
            windspeed: weatherData.current_weather.windspeed,
            precipitation: weatherData.hourly.precipitation?.[0] ?? 0,
            weathercode: weatherData.current_weather.weathercode,
            hourly_forcast,
            daily_forcast,
          },
        };

        setWeather(mappedWeather);
        console.log(mappedWeather);
      } catch (err) {
        setIsApiError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [location, units, setIsApiError]);

  return (
    <div className="w-full flex items-center justify-center pt-8">
      {!isFound ? (
        <h1 className="text-white text-lg  text-center font-medium">
          No search result found!
        </h1>
      ) : (
        <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-4">
          <div className="flex flex-col gap-8">
            <Today isLoading={isLoading} weather={weather} />
            <DailyForecast isLoading={isLoading} weather={weather} />
          </div>
          <HourlyForecast isLoading={isLoading} weather={weather} />
        </div>
      )}
    </div>
  );
}
