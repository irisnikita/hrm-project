"use client"; // Error boundaries must be Client Components

// Libraries
import { useEffect } from "react";

// Lib
import { handleError } from "@/lib/errorHandler";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    handleError(error, "Dashboard Error Boundary", {
      component: "Dashboard",
    });
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
