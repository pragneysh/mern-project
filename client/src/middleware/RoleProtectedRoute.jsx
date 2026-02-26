import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function RoleProtectedRoute({ requireAdmin }) {
  const token = Cookies.get("access_token");
  const isAdmin = Cookies.get("isAdmin");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin check
  if (requireAdmin && isAdmin !== "true") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;