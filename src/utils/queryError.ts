import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export function mutationErrorHandler(error: unknown) {
  let message = "An unexpected error occurred during the operation.";

  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    message =
      err.response?.data?.message ||
      (err.response
        ? `Server Error: ${err.response.status}`
        : "Network Error: Check your connection.");
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
  console.error("Mutation Error:", error);
}
