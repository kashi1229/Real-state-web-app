import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/listings': 'Listings',
  '/admin/messages': 'Messages',
  '/admin/analytics': 'Analytics',
};

export function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const title = pageTitles[location.pathname] || 'Admin';

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-xl font-semibold text-charcoal">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
