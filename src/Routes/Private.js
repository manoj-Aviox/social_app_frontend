import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const isAuthorized = localStorage.getItem("social_app");
  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
