import ErrorIcon from "../assets/icon-error.svg";
import RetryIcon from "../assets/icon-retry.svg";

interface ApiErrorProps {
  setApiError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ApiError({ setApiError }: ApiErrorProps) {
  return (
    <div className="flex flex-col items-center mt-24 gap-4">
      <img src={ErrorIcon} alt="Error" className="h-8 my-2" />
      <h1 className="text-white text-5xl font-bricolage font-semibold self-center">
        Something went wrong
      </h1>
      <p className="text-white text-center max-w-md">
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>

      <button
        className="flex items-center bg-neutral-800 hover:bg-neutral-700 rounded-lg px-4 py-2 gap-2 cursor-pointer"
        onClick={() => setApiError(false)}
      >
        <img src={RetryIcon} alt="Retry" />
        <p className="text-white">Retry</p>
      </button>
    </div>
  );
}
