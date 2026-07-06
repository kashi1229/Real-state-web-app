import { createContext, useContext, useCallback, type ReactNode } from 'react';
import type { AdminUser } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AdminAuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'admin@harperreed.com',
  password: 'Admin@123',
  name: 'Sarah Harper',
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser, removeUser] = useLocalStorage<AdminUser | null>('hr-auth', null);

  const login = useCallback(
    (email: string, password: string): boolean => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setUser({ email: ADMIN_CREDENTIALS.email, name: ADMIN_CREDENTIALS.name });
        return true;
      }
      return false;
    },
    [setUser],
  );

  const logout = useCallback(() => {
    removeUser();
  }, [removeUser]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
