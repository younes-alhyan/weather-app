import LoadingIcon from "../assets/icon-loading.svg";

interface SearchDropDownProps {
  isLoading: boolean;
  suggestions: string[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchDropDown({
  isLoading,
  suggestions,
  setInput,
}: SearchDropDownProps) {
  if (!isLoading && suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-neutral-800 rounded-lg px-4 py-2 mt-2 z-10">
      {isLoading && (
        <div className="w-full flex items-center gap-2">
          <img src={LoadingIcon} alt="Loading" className="animate-spin" />
          <p className="text-white text-sm">Search in progress</p>
        </div>
      )}
      {suggestions.map((suggestion, index) => (
        <p
          key={index}
          className="text-white font-dm-sans rounded-lg hover:bg-neutral-700 cursor-pointer p-2"
          onMouseDown={() => setInput(suggestion)}
        >
          {suggestion}
        </p>
      ))}
    </div>
  );
}
