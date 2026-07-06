import { Home, MessageSquare, TrendingUp, Eye } from 'lucide-react';
import { StatsCard } from '../../components/admin/StatsCard';
import { QuickActions } from '../../components/admin/QuickActions';
import { RecentActivity } from '../../components/admin/RecentActivity';
import { useListings } from '../../context/ListingsContext';
import { useMessages } from '../../context/MessagesContext';

export function AdminDashboard() {
  const { listings } = useListings();
  const { messages, unreadCount } = useMessages();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Listings"
          value={listings.length}
          icon={Home}
          trend="+3 this month"
          trendUp
        />
        <StatsCard
          title="Total Inquiries"
          value={messages.length}
          icon={MessageSquare}
          trend="+12 this month"
          trendUp
        />
        <StatsCard
          title="Unread Messages"
          value={unreadCount}
          icon={Eye}
          trend={unreadCount > 0 ? `${unreadCount} need attention` : 'All clear'}
          trendUp={unreadCount === 0}
        />
        <StatsCard
          title="Website Visits"
          value="12,847"
          icon={TrendingUp}
          trend="+8.2% vs last month"
          trendUp
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
