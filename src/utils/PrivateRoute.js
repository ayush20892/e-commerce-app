import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }) {
  const session = JSON.parse(localStorage.getItem("session"));
  let location = useLocation();
  return session?.userId && session.userId !== null ? (
    children
  ) : (
    <Navigate state={{ from: location }} replace to="/user/login" />
  );
}
