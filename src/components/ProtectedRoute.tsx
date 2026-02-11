// ProtectedRoute.tsx
import React, { useContext } from "react";
import type {ReactNode} from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not found");

  const { user } = auth;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
