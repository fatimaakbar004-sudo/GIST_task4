import { AlertTriangle } from "lucide-react";

function ErrorState({
  message,
  onRetry
}) {
  return (
    <div className="error-state">
      <AlertTriangle size={34} />

      <h3>
        Couldn't load posts
      </h3>

      <p>{message}</p>

      <button
        className="primary-btn"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorState;