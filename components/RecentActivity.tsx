interface Campaign {
  name: string;
  country: string;
  flag: string;
  callsToday: number;
  promises: number;
  promiseRate: number;
  status: "active" | "paused";
  lastUpdated: string;
}

const campaigns: Campaign[] = [
  {
    name: "Vana - Peru B0-30",
    country: "Peru",
    flag: "🇵🇪",
    callsToday: 247,
    promises: 18,
    promiseRate: 7.3,
    status: "active",
    lastUpdated: "2 min ago"
  },
  {
    name: "Nexo - Mexico Early",
    country: "Mexico",
    flag: "🇲🇽",
    callsToday: 892,
    promises: 34,
    promiseRate: 3.8,
    status: "active",
    lastUpdated: "5 min ago"
  },
  {
    name: "MercadoPago Pilot",
    country: "Mexico",
    flag: "🇲🇽",
    callsToday: 156,
    promises: 12,
    promiseRate: 7.7,
    status: "paused",
    lastUpdated: "2 hrs ago"
  },
  {
    name: "Koinsya - Colombia B1",
    country: "Colombia",
    flag: "🇨🇴",
    callsToday: 428,
    promises: 8,
    promiseRate: 1.9,
    status: "active",
    lastUpdated: "12 min ago"
  },
  {
    name: "Vana - Guatemala",
    country: "Guatemala",
    flag: "🇬🇹",
    callsToday: 334,
    promises: 43,
    promiseRate: 12.9,
    status: "active",
    lastUpdated: "1 min ago"
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <p className="text-sm text-gray-500 mt-1">Live campaigns across all countries</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calls Today
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promises
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{campaign.flag}</span>
                    {campaign.country}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.callsToday.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">
                    {campaign.promises}{" "}
                    <span className={`font-medium ${
                      campaign.promiseRate >= 7 ? "text-green-600" : 
                      campaign.promiseRate >= 3 ? "text-yellow-600" : 
                      "text-red-600"
                    }`}>
                      ({campaign.promiseRate}%)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {campaign.status === "active" ? "🟢 Active" : "🟡 Paused"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  {campaign.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-gray-400 hover:text-gray-600">
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
