import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-charcoal">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-sm', trendUp ? 'text-green-600' : 'text-red-500')}>
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-forest-50 p-3">
          <Icon className="h-5 w-5 text-forest-700" />
        </div>
      </div>
    </div>
  );
}
