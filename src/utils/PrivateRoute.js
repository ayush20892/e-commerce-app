import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/authContext";

export function PrivateRoute({ children }) {
  const { authState } = useAuth();
  let location = useLocation();
  return authState.userId ? (
    children
  ) : (
    <Navigate state={{ from: location }} replace to="/user/login" />
  );
}
