import DrizzleIcon from "./assets/icon-drizzle.webp";
import FogIcon from "./assets/icon-fog.webp";
import OverCastIcon from "./assets/icon-overcast.webp";
import PartlyCloudyIcon from "./assets/icon-partly-cloudy.webp";
import RainIcon from "./assets/icon-rain.webp";
import SnowIcon from "./assets/icon-snow.webp";
import StormIcon from "./assets/icon-storm.webp";
import SunnyIcon from "./assets/icon-sunny.webp";

export function getWeatherIcon(code: number): string {
  if (code === 0) return SunnyIcon;
  if (code === 1 || code === 2) return PartlyCloudyIcon;
  if (code === 3) return OverCastIcon;
  if (code === 45 || code === 48) return FogIcon;
  if ([51, 53, 55, 56, 57].includes(code)) return DrizzleIcon;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return RainIcon;
  if ([71, 73, 75, 77].includes(code)) return SnowIcon;
  if ([95, 96, 99].includes(code)) return StormIcon;

  return SunnyIcon; // fallback
}
