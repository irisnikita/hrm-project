"use client"; // Error boundaries must be Client Components

import { handleError } from "@/lib/errorHandler";
// Libraries
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    handleError(error, "Global Error Boundary");
  }, [error]);

  return (
    <div>
      <h2>Something went wrong 123 456789!</h2>
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
