import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { authToken } = useContext(AuthContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    console.log("Checking authToken in PrivateRoute:", authToken);
    setIsAuthChecked(true);
  }, [authToken]);

  if (!isAuthChecked) return <div>Loading authentication...</div>;

  return authToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
