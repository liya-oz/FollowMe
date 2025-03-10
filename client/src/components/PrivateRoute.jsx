// This component checks whether the user is authenticated by using your AuthContext.
//  If the user has a valid token, it renders the nested routes; otherwise,
//  it redirects to /login.

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = () => {
  const { authToken } = useContext(AuthContext);

  // If authToken exists, the user is authenticated and we render the nested routes.
  // Otherwise, redirect to the login page (or we can change to landing page).
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
