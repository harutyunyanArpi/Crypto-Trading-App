import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { QueryClient } from "@tanstack/react-query";

function getErrorMessage(error: Error): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        (error.response.data as { message?: string })?.message ||
        `Server Error: ${error.response.status}`
      );
    }

    return error.request
      ? "Network Error: Please check your internet connection."
      : `Request Error: ${error.message}`;
  }

  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }

  return "An unexpected error occurred while fetching data.";
}

export function useQueryErrorHandling(client: QueryClient) {
  useEffect(() => {
    const unsubscribe = client.getQueryCache().subscribe((event) => {
      if (event.type === "updated" && event.query.state.error) {
        const message = getErrorMessage(event.query.state.error);
        toast.error(message);
      }
    });

    return unsubscribe;
  }, [client]);
}
