import { useState, useEffect } from "react";
import TopBar from "./layouts/TopBar";
import SearchBar from "./layouts/SearchBar";
import Body from "./layouts/Body";
import ApiError from "./layouts/ApiError";

export default function App() {
  const [location, setLocation] = useState<string | undefined>(
    "Berlin-Germany"
  );
  const [units, setUnits] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [isAPIError, setIsApiError] = useState(false);
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    const falseCount = units.filter((unit) => unit === false).length;
    setIsMetric(falseCount >= 2);
  }, [units]);

  const setUnitsHandler = (index: number, value: boolean) => {
    setUnits((prevUnits) => {
      const newUnits = [...prevUnits] as [boolean, boolean, boolean];
      newUnits[index] = value;
      return newUnits;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-12 px-4 sm:px-8 md:px-16">
      <TopBar
        units={units}
        setUnitsHandler={setUnitsHandler}
        isMetric={isMetric}
      />

      {isAPIError ? (
        <ApiError setApiError={setIsApiError} />
      ) : (
        <>
          <h1 className="text-white text-4xl text-center font-bricolage font-bold my-12">
            How's the sky looking today?
          </h1>
          <SearchBar setLocation={setLocation} />
          <Body
            location={location}
            units={units}
            setIsApiError={setIsApiError}
          />
        </>
      )}
    </div>
  );
}
