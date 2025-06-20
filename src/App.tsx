import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mutationErrorHandler } from "@/utils/queryError";
import { HashRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { useQueryErrorHandling } from "@/hooks/queries/useQueryErrorHandling";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: mutationErrorHandler,
      },
    },
  });

  useQueryErrorHandling(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </HashRouter>
    </QueryClientProvider>
  );
}
