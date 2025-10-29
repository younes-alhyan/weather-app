import { useState } from "react";
import UnitsDropDown from "../components/UnitsDropDown";
import Logo from "../assets/logo.svg";
import UnitsIcon from "../assets/icon-units.svg";
import DropDownIcon from "../assets/icon-dropdown.svg";

interface TopBarProps {
  units: [boolean, boolean, boolean];
  setUnitsHandler: (index: number, value: boolean) => void;
  isMetric: boolean;
}

export default function TopBar({
  units,
  setUnitsHandler,
  isMetric,
}: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative w-full flex items-center justify-between">
      <img src={Logo} alt="Logo" className="w-32 sm:w-auto" />
      <div
        className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 py-1 px-2 rounded-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        <img src={UnitsIcon} alt="Units" />
        <p className="text-white">Units</p>
        <img src={DropDownIcon} alt="Dropdown" />
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <UnitsDropDown
          units={units}
          setUnitsHandler={setUnitsHandler}
          isMetric={isMetric}
        />
      )}
    </div>
  );
}
