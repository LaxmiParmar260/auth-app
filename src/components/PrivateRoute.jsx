import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { isLoggedIn, checkStatus } = useAuthStatus();

  if (checkStatus) {
    return <h1 className="display-1">Loading...</h1>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
