import { useAuthStore } from "@/store/authStore";
import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuthStore();
  const location = useLocation();

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
