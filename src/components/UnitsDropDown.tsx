import CheckMarkIcon from "../assets/icon-checkmark.svg";

interface UnitsDropDownProps {
  units: [boolean, boolean, boolean];
  setUnitsHandler: (index: number, value: boolean) => void;
  isMetric: boolean;
}

export default function UnitsDropDown({
  units,
  setUnitsHandler,
  isMetric,
}: UnitsDropDownProps) {
  const switchAllUnits = () => {
    for (let i = 0; i < units.length; i++) {
      setUnitsHandler(i, isMetric);
    }
  };

  const options = [
    {
      label: "Temperature",
      values: ["Celsius (°C)", "Fahrenheit (°F)"],
    },
    {
      label: "Wind Speed",
      values: ["km/h", "mph"],
    },
    {
      label: "Precipitation",
      values: ["Millimeters (mm)", "Inches (in)"],
    },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 p-2 w-52 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10">
      <p
        className="text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-neutral-700"
        onClick={switchAllUnits}
      >
        Switch to {isMetric ? "Imperial" : "Metric"}
      </p>
      {options.map((option, index) => (
        <div
          key={option.label}
          className={`flex flex-col ${
            index < options.length - 1 ? "border-b" : ""
          } border-neutral-600`}
        >
          <p className="text-sm text-neutral-400 p-1">{option.label}</p>
          <div
            className={`flex w-full items-center justify-between ${
              !units[index] ? "bg-neutral-700" : ""
            } hover:bg-neutral-700 px-2 py-1 rounded-md cursor-pointer`}
            onClick={() => setUnitsHandler(index, false)}
          >
            <p className="text-white">{option.values[0]}</p>
            {!units[index] && <img src={CheckMarkIcon} alt="Selected" />}
          </div>
          <div
            className={`flex w-full items-center justify-between ${
              units[index] ? "bg-neutral-700" : ""
            } hover:bg-neutral-700 px-2 py-1 my-1 rounded-md cursor-pointer`}
            onClick={() => setUnitsHandler(index, true)}
          >
            <p className="text-white">{option.values[1]}</p>
            {units[index] && <img src={CheckMarkIcon} alt="Selected" />}
          </div>
        </div>
      ))}
    </div>
  );
}
