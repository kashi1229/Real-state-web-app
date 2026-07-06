import { useNavigate } from 'react-router-dom';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-charcoal">Quick Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate('/admin/listings')} variant="primary" size="md">
          <Plus className="h-4 w-4" />
          Add Listing
        </Button>
        <Button onClick={() => navigate('/admin/messages')} variant="outline" size="md">
          <MessageSquare className="h-4 w-4" />
          View Messages
        </Button>
      </div>
    </div>
  );
}
