import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminLogin() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Try: admin@harperreed.com / Admin@123');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-forest-950 via-forest-900 to-charcoal p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brass">
            <span className="text-2xl font-bold text-forest-950">HR</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-400">Harper & Reed Realty CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/10 p-8 backdrop-blur-md">
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="admin@harperreed.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-white placeholder:text-gray-500"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 text-white placeholder:text-gray-500"
              required
            />
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>

          <div className="mt-6 rounded-lg bg-white/5 p-4">
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-300">Demo Credentials:</span><br />
              Email: admin@harperreed.com<br />
              Password: Admin@123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
