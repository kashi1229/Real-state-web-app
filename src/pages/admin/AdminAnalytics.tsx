import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { AnalyticsCharts } from '../../components/admin/AnalyticsCharts';

export function AdminAnalytics() {
  return (
    <ScrollReveal>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">
            Track your listing performance and client engagement metrics over time.
          </p>
        </div>
        <AnalyticsCharts />
      </div>
    </ScrollReveal>
  );
}
