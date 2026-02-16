import StatsCard from "@/components/StatsCard";
import RecentActivity from "@/components/RecentActivity";
import { Filter, Download, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Last 7 days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Minutes Balance */}
      <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
            Minutes balance
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-purple-600 font-medium">25,383.29</span> / 40,000
          </div>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: '63.5%' }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          14,616.71 minutes remaining
          <span className="ml-2 text-purple-600 font-medium">36.5% remaining</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Promised Payment"
          value="156"
          description="$187,450 committed"
          change="+12% vs last week"
          trend="up"
          highlight
        />
        <StatsCard
          title="Total Calls"
          value="2,847"
          description="All calls made"
          change="+8% vs All time"
          trend="up"
        />
        <StatsCard
          title="Answered Calls"
          value="1,923"
          description="Calls answered"
          change="+5% vs All time"
          trend="up"
        />
        <StatsCard
          title="Total Minutes"
          value="4,168.45"
          description="Consumed minutes"
          change="+10% vs All time"
          trend="up"
        />
        <StatsCard
          title="Total Cost"
          value="$12,450"
          description="Total spending"
          change="+6% vs All time"
          trend="up"
        />
        <StatsCard
          title="Avg Call Cost"
          value="$4.37"
          description="Average per call"
          change="+2% vs All time"
          trend="up"
        />
        <StatsCard
          title="Avg Promise Cost"
          value="$79.81"
          description="Average per promise"
          change="-3% vs All time"
          trend="down"
        />
        <StatsCard
          title="Avg Campaign Cost"
          value="$1,556.25"
          description="Average per campaign"
          change="+4% vs All time"
          trend="up"
        />
        <StatsCard
          title="Avg Call Mins"
          value="01:28"
          description="Average call duration"
          change="0% vs All time"
          trend="neutral"
        />
      </div>

      {/* Recent Activity Table */}
      <RecentActivity />
    </div>
  );
}
