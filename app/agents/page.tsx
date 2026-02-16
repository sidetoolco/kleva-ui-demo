"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Mic, Play } from "lucide-react";

type Tab = "all" | "active" | "test";

interface Agent {
  id: string;
  name: string;
  voice: string;
  language: string;
  status: "active" | "paused" | "testing";
  statusLabel: string;
  campaigns: number;
  totalCalls: number;
  promiseRate: number;
  avgDuration: string;
  lastUsed: string;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Maria - Mexico",
    voice: "Nova (Female, Mexican Spanish)",
    language: "es-MX",
    status: "active",
    statusLabel: "Active",
    campaigns: 3,
    totalCalls: 2847,
    promiseRate: 8.2,
    avgDuration: "01:32",
    lastUsed: "2 hours ago"
  },
  {
    id: "2",
    name: "Carlos - Peru",
    voice: "Echo (Male, Peruvian Spanish)",
    language: "es-PE",
    status: "active",
    statusLabel: "Active",
    campaigns: 2,
    totalCalls: 1523,
    promiseRate: 7.6,
    avgDuration: "01:28",
    lastUsed: "5 hours ago"
  },
  {
    id: "3",
    name: "Sofia - Colombia",
    voice: "Alloy (Female, Colombian Spanish)",
    language: "es-CO",
    status: "active",
    statusLabel: "Active",
    campaigns: 1,
    totalCalls: 892,
    promiseRate: 6.8,
    avgDuration: "01:45",
    lastUsed: "1 day ago"
  },
  {
    id: "4",
    name: "Juan - Guatemala",
    voice: "Onyx (Male, Central American Spanish)",
    language: "es-GT",
    status: "active",
    statusLabel: "Active",
    campaigns: 2,
    totalCalls: 1234,
    promiseRate: 9.1,
    avgDuration: "01:22",
    lastUsed: "3 hours ago"
  },
  {
    id: "5",
    name: "Ana - Test Agent",
    voice: "Nova (Female, Neutral Spanish)",
    language: "es",
    status: "testing",
    statusLabel: "Testing",
    campaigns: 0,
    totalCalls: 23,
    promiseRate: 0,
    avgDuration: "00:45",
    lastUsed: "1 week ago"
  }
];

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [showTestModal, setShowTestModal] = useState(false);

  const filteredAgents = agents.filter((agent) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return agent.status === "active";
    if (activeTab === "test") return agent.status === "testing";
    return true;
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agents</h1>
          <p className="text-gray-600">Manage and test your AI voice agents</p>
        </div>
        <button 
          onClick={() => setShowTestModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Test Agent
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "all"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Agents
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "active"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("test")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "test"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Testing
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          All Languages
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Agent
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Voice
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Campaigns
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Total Calls
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Promise Rate
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Avg Duration
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Last Used
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr
                key={agent.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.language}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{agent.voice}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      agent.status === "active"
                        ? "bg-green-50 text-green-700"
                        : agent.status === "paused"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {agent.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-900">{agent.campaigns}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-900">{agent.totalCalls.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${
                    agent.promiseRate >= 8 ? "text-green-600" :
                    agent.promiseRate >= 5 ? "text-yellow-600" :
                    agent.promiseRate > 0 ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {agent.promiseRate > 0 ? `${agent.promiseRate}%` : "—"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-600">{agent.avgDuration}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{agent.lastUsed}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Agent Modal */}
      {showTestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-2xl animate-slide-in">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Test AI Agent</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Make a test call to preview agent behavior</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Agent
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Scenario
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                  <option>Credit Card Payment Reminder</option>
                  <option>Personal Loan Follow-up</option>
                  <option>Auto Loan Collection</option>
                  <option>Payment Plan Negotiation</option>
                  <option>Custom Scenario</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  💡 Tip: Test calls are free and won&apos;t affect your production metrics
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowTestModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center gap-2 transition-all hover:scale-105">
                <Play className="w-4 h-4" />
                Start Test Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
