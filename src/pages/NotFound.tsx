import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center">
        <p className="text-9xl font-bold text-forest-800 font-serif">404</p>
        <h1 className="mt-4 text-3xl font-bold text-charcoal">Page Not Found</h1>
        <p className="mt-3 text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button href="/" variant="primary" size="lg" className="mt-8">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
