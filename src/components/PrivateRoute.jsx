import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import useLoginStatus from "../Hooks/useLoginStatus";

export const PrivateRoute = () => {
  const { loggedIn, checkingLoggedIn } = useLoginStatus();
  if (checkingLoggedIn) {
    return <div>loading</div>;
  } else {
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  }
};
