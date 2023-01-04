import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const isAuthorized = localStorage.getItem("social_app");
  return !isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default Public;
