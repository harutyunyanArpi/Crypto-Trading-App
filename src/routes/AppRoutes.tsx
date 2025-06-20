import AppLayout from "@/components/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const Trade = lazy(() => import("@/pages/Trade"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/trade"
            element={
              <ProtectedRoute>
                <Trade />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
