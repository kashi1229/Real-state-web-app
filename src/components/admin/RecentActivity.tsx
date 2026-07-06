import { Clock } from 'lucide-react';
import type { ActivityItem } from '../../types';
import { getTimeAgo } from '../../lib/utils';

const activities: ActivityItem[] = [
  { id: '1', type: 'listing_created', description: 'New listing: Modern Colonial Estate', timestamp: '2026-07-01T14:30:00Z' },
  { id: '2', type: 'listing_updated', description: 'Updated: Lakeside Contemporary price', timestamp: '2026-07-01T11:00:00Z' },
  { id: '3', type: 'message_received', description: 'New inquiry from Eleanor Morrison', timestamp: '2026-06-30T16:45:00Z' },
  { id: '4', type: 'listing_deleted', description: 'Removed: Downtown Studio listing', timestamp: '2026-06-29T10:20:00Z' },
  { id: '5', type: 'listing_created', description: 'New listing: Waterfront Condo', timestamp: '2026-06-28T09:15:00Z' },
];

const activityIcons = {
  listing_created: 'text-green-600 bg-green-50',
  listing_updated: 'text-blue-600 bg-blue-50',
  listing_deleted: 'text-red-600 bg-red-50',
  message_received: 'text-brass bg-brass/10',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-charcoal">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-1.5 ${activityIcons[item.type]}`}>
              <Clock className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-charcoal">{item.description}</p>
              <p className="text-xs text-gray-500">{getTimeAgo(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
