export default function MetricsPage() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Metrics</h1>
        <p className="text-gray-600">Performance analytics and insights</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Calls</p>
          <p className="text-3xl font-bold text-gray-900">2,847</p>
          <p className="text-xs text-gray-500 mt-2">Last 30 days</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Promises Secured</p>
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-xs text-green-600 mt-2">5.5% conversion</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Amount Committed</p>
          <p className="text-3xl font-bold text-gray-900">$187K</p>
          <p className="text-xs text-gray-500 mt-2">Payment promises</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Avg Call Duration</p>
          <p className="text-3xl font-bold text-gray-900">01:28</p>
          <p className="text-xs text-gray-500 mt-2">Minutes per call</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">Detailed analytics coming soon...</p>
      </div>
    </div>
  );
}
