import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', inquiries: 12, listingViews: 340, listingViews2: 280 },
  { month: 'Feb', inquiries: 15, listingViews: 380, listingViews2: 310 },
  { month: 'Mar', inquiries: 18, listingViews: 420, listingViews2: 360 },
  { month: 'Apr', inquiries: 22, listingViews: 510, listingViews2: 400 },
  { month: 'May', inquiries: 25, listingViews: 580, listingViews2: 440 },
  { month: 'Jun', inquiries: 28, listingViews: 620, listingViews2: 490 },
  { month: 'Jul', inquiries: 32, listingViews: 680, listingViews2: 520 },
];

const propertyTypeData = [
  { type: 'House', count: 45 },
  { type: 'Condo', count: 28 },
  { type: 'Townhouse', count: 18 },
  { type: 'Apartment', count: 12 },
  { type: 'Land', count: 7 },
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-charcoal">Listing Views & Inquiries</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="listingViews"
                stroke="#1a3c34"
                strokeWidth={2}
                name="Listing Views"
                dot={{ fill: '#1a3c34' }}
              />
              <Line
                type="monotone"
                dataKey="listingViews2"
                stroke="#c9a96e"
                strokeWidth={2}
                name="Previous Period"
                strokeDasharray="5 5"
                dot={{ fill: '#c9a96e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-charcoal">Properties by Type</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={propertyTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="count" fill="#1a3c34" radius={[4, 4, 0, 0]} name="Properties" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
        <h3 className="mb-2 text-lg font-semibold text-charcoal">Monthly Inquiries</h3>
        <p className="mb-6 text-sm text-gray-500">
          Client inquiries received through contact forms and valuation requests
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar
                dataKey="inquiries"
                fill="#c9a96e"
                radius={[4, 4, 0, 0]}
                name="Inquiries"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
