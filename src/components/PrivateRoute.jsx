import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import useLoginStatus from "../Hooks/useLoginStatus";
import Spinner from "../components/Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingLoggedIn } = useLoginStatus();
  if (checkingLoggedIn) {
    return <Spinner />;
  } else {
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  }
};
