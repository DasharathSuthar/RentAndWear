import { Navigate, Outlet } from 'react-router-dom';

function RequireAdminAuth() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/AdminLogin" />;
}

export default RequireAdminAuth;
