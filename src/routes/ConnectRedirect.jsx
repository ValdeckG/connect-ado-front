import { Navigate } from "react-router-dom";

export const ConnectRedirect = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (user && token) {
    if (user.role === "INSTITUTION") return <Navigate to="/institution" />;
    if (user.role === "ADOPTER") return <Navigate to="/adopter" />;
    if (user.role === "CHILD") return <Navigate to="/children" />;
    return <Navigate to="/" />;
  }

  return children;
};
