"use client";

import { TrendingUp, TrendingDown, Phone, MessageSquare, Mail, DollarSign } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProgressBar } from "@/components/ProgressBar";

export default function MetricsPage() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Metrics</h1>
        <p className="text-gray-600">Performance analytics and insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="w-3 h-3" />
              12%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            <AnimatedCounter value={2847} />
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Last 30 days</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="w-3 h-3" />
              18%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            $<AnimatedCounter value={187} />K
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Promises Secured</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            <AnimatedCounter value={156} /> commitments
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="w-3 h-3" />
              8%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            <AnimatedCounter value={1234} />
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Messages Sent</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">WhatsApp + SMS</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400">
              <TrendingDown className="w-3 h-3" />
              3%
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            <AnimatedCounter value={892} />
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Emails Sent</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">68% open rate</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Promise Rate Trend */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Promise Rate Trend</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[6.2, 7.1, 6.8, 8.2, 7.9, 8.5, 9.1, 8.7, 8.2].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-green-500 dark:bg-green-600 rounded-t transition-all duration-500 hover:bg-green-600 dark:hover:bg-green-500 cursor-pointer relative"
                  style={{ height: `${value * 10}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {value}%
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">W{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Current: <span className="font-semibold text-gray-900 dark:text-white">8.2%</span>
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">↑ 0.6% vs last week</span>
          </div>
        </div>

        {/* Call Volume by Day */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call Volume by Day</h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {[320, 380, 350, 420, 450, 390, 280].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className="w-full bg-blue-500 dark:bg-blue-600 rounded-t transition-all duration-500 hover:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer relative"
                  style={{ height: `${(value / 500) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {value} calls
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Avg: <span className="font-semibold text-gray-900 dark:text-white">370 calls/day</span>
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Peak: Friday</span>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Performing Agent</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">JG</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Juan - Guatemala</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <AnimatedCounter value={9.1} decimals={1} />% promise rate
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Total Calls</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  <AnimatedCounter value={1234} />
                </span>
              </div>
              <ProgressBar value={1234} max={1500} color="blue" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Promises</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  <AnimatedCounter value={112} />
                </span>
              </div>
              <ProgressBar value={112} max={150} color="green" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Campaign</h3>
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Vana Guatemala</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active • <AnimatedCounter value={4123} /> contacts
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Promise Rate</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  <AnimatedCounter value={12.9} decimals={1} />%
                </span>
              </div>
              <ProgressBar value={12.9} max={15} color="green" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Collected</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  $<AnimatedCounter value={892} />K
                </span>
              </div>
              <ProgressBar value={892} max={1000} color="purple" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Cost Efficiency</h3>
          <div className="mb-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              $<AnimatedCounter value={79.81} decimals={2} />
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Cost per promise</p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Total Spent</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  $<AnimatedCounter value={12450} />
                </span>
              </div>
              <ProgressBar value={12450} max={15000} color="yellow" />
            </div>
            <div className="flex justify-between items-center text-sm p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-gray-600 dark:text-gray-400">vs. Target</span>
              <span className="font-medium text-green-600 dark:text-green-400">-12% 🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
