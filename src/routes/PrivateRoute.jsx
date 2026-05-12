import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "INSTITUTION") return <Navigate to="/institution" />;
    if (user.role === "ADOPTER") return <Navigate to="/adopter" />;
    if (user.role === "CHILD") return <Navigate to="/children" />;
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
