// src/components/admin/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

export default function ProtectedRoute() {
  const location = useLocation();
  const auth = isAuthenticated();

  if (!auth) {
    // Redirect unauthenticated visitors to /admin/login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
