import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace state={{ message: "Please log in to access this page." }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
