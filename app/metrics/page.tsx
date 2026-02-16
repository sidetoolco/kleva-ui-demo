"use client";

import { TrendingUp, TrendingDown, Phone, MessageSquare, Mail, DollarSign } from "lucide-react";

export default function MetricsPage() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Metrics</h1>
        <p className="text-gray-600">Performance analytics and insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3 h-3" />
              12%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">2,847</p>
          <p className="text-sm text-gray-500">Total Calls</p>
          <p className="text-xs text-gray-400 mt-2">Last 30 days</p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3 h-3" />
              18%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">$187K</p>
          <p className="text-sm text-gray-500">Promises Secured</p>
          <p className="text-xs text-gray-400 mt-2">156 commitments</p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3 h-3" />
              8%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">1,234</p>
          <p className="text-sm text-gray-500">Messages Sent</p>
          <p className="text-xs text-gray-400 mt-2">WhatsApp + SMS</p>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-red-600">
              <TrendingDown className="w-3 h-3" />
              3%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">892</p>
          <p className="text-sm text-gray-500">Emails Sent</p>
          <p className="text-xs text-gray-400 mt-2">68% open rate</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Promise Rate Trend */}
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Promise Rate Trend</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[6.2, 7.1, 6.8, 8.2, 7.9, 8.5, 9.1, 8.7, 8.2].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all hover:bg-green-600"
                  style={{ height: `${value * 10}%` }}
                />
                <span className="text-xs text-gray-400 mt-2">W{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Current: 8.2%</span>
            <span className="text-sm font-medium text-green-600">↑ 0.6% vs last week</span>
          </div>
        </div>

        {/* Call Volume by Day */}
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Volume by Day</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[320, 380, 350, 420, 450, 390, 280].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${(value / 500) * 100}%` }}
                />
                <span className="text-xs text-gray-400 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Avg: 370 calls/day</span>
            <span className="text-sm font-medium text-blue-600">Peak: Friday</span>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Top Performing Agent</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-indigo-600">JG</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Juan - Guatemala</p>
              <p className="text-sm text-gray-500">9.1% promise rate</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Calls</span>
              <span className="font-medium text-gray-900">1,234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Promises</span>
              <span className="font-medium text-green-600">112</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Top Campaign</h3>
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-900 mb-1">Vana Guatemala</p>
            <p className="text-sm text-gray-500">Active • 4,123 contacts</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Promise Rate</span>
              <span className="font-medium text-green-600">12.9%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Collected</span>
              <span className="font-medium text-gray-900">$892K</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Cost Efficiency</h3>
          <div className="mb-4">
            <p className="text-3xl font-bold text-gray-900">$79.81</p>
            <p className="text-sm text-gray-500">Cost per promise</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Spent</span>
              <span className="font-medium text-gray-900">$12,450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">vs. Target</span>
              <span className="font-medium text-green-600">-12% 🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
