import { useState, useRef, useEffect } from "react";
import SearchDropDown from "../components/SearchDropDown";
import SearchIcon from "../assets/icon-search.svg";

interface SearchBarProps {
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SearchBar({ setLocation }: SearchBarProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        setSuggestions([]);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            input
          )}&count=5&language=en`
        );
        const data = await res.json();

        const suggestionsList: string[] = [];
        if (data.results) {
          for (const item of data.results) {
            suggestionsList.push(`${item.name}-${item.country}`);
          }
        }

        setSuggestions(suggestionsList);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [input]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
      <div className="relative w-full sm:w-1/2 flex items-center gap-2 py-2 px-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg">
        <img src={SearchIcon} alt="Search" onClick={focusInput} />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setLocation(input)}
          placeholder="Search for a place..."
          className="flex-1 text-white placeholder:text-neutral-300 cursor-pointer outline-none "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <SearchDropDown
            isLoading={isLoading}
            suggestions={suggestions}
            setInput={setInput}
          />
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-2 cursor-pointer hover:bg-blue-700 w-full sm:w-auto"
        onClick={() => setLocation(input)}
        onKeyDown={(e) => e.key === "Enter" && focusInput()}
      >
        Search
      </button>
    </div>
  );
}
