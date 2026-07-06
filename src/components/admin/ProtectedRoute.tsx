import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function ProtectedRoute() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
