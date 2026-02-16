"use client";

import { useState, useMemo } from "react";
import { Search, Plus, MoreHorizontal, Mic, Play, ArrowUpDown } from "lucide-react";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";

type Tab = "all" | "active" | "test";
type SortField = "name" | "totalCalls" | "promiseRate" | "lastUsed";
type SortDirection = "asc" | "desc";

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
  lastUsedTimestamp: number;
}

const agents: Agent[] = [
  { id: "1", name: "Maria - Mexico", voice: "Nova (Female, Mexican Spanish)", language: "es-MX", status: "active", statusLabel: "Active", campaigns: 3, totalCalls: 2847, promiseRate: 8.2, avgDuration: "01:32", lastUsed: "2 hours ago", lastUsedTimestamp: Date.now() - 2 * 3600000 },
  { id: "2", name: "Carlos - Peru", voice: "Echo (Male, Peruvian Spanish)", language: "es-PE", status: "active", statusLabel: "Active", campaigns: 2, totalCalls: 1523, promiseRate: 7.6, avgDuration: "01:28", lastUsed: "5 hours ago", lastUsedTimestamp: Date.now() - 5 * 3600000 },
  { id: "3", name: "Sofia - Colombia", voice: "Alloy (Female, Colombian Spanish)", language: "es-CO", status: "active", statusLabel: "Active", campaigns: 1, totalCalls: 892, promiseRate: 6.8, avgDuration: "01:45", lastUsed: "1 day ago", lastUsedTimestamp: Date.now() - 24 * 3600000 },
  { id: "4", name: "Juan - Guatemala", voice: "Onyx (Male, Central American Spanish)", language: "es-GT", status: "active", statusLabel: "Active", campaigns: 2, totalCalls: 1234, promiseRate: 9.1, avgDuration: "01:22", lastUsed: "3 hours ago", lastUsedTimestamp: Date.now() - 3 * 3600000 },
  { id: "5", name: "Ana - Test Agent", voice: "Nova (Female, Neutral Spanish)", language: "es", status: "testing", statusLabel: "Testing", campaigns: 0, totalCalls: 23, promiseRate: 0, avgDuration: "00:45", lastUsed: "1 week ago", lastUsedTimestamp: Date.now() - 168 * 3600000 },
];

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [showTestModal, setShowTestModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("lastUsed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const { showToast } = useToast();

  const filteredAndSorted = useMemo(() => {
    let filtered = agents;
    if (activeTab === "active") filtered = filtered.filter(a => a.status === "active");
    if (activeTab === "test") filtered = filtered.filter(a => a.status === "testing");
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.voice.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.language.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "totalCalls") cmp = a.totalCalls - b.totalCalls;
      else if (sortField === "promiseRate") cmp = a.promiseRate - b.promiseRate;
      else if (sortField === "lastUsed") cmp = a.lastUsedTimestamp - b.lastUsedTimestamp;
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [activeTab, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("asc"); }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All Agents" },
    { key: "active", label: "Active" },
    { key: "test", label: "Testing" },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Agents</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and test your AI voice agents</p>
        </div>
        <button onClick={() => setShowTestModal(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 transition-colors">
          <Play className="w-4 h-4" /> Test Agent
        </button>
      </div>

      <div className="flex items-center gap-6 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`text-sm font-medium pb-2 transition-colors ${activeTab === t.key ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >{t.label}</button>
        ))}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search agents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all" />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">All Languages</button>
        <button onClick={() => showToast("info", "New agent form would open here")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> New Agent
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th onClick={() => handleSort("name")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Agent {sortField === "name" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Voice</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Campaigns</th>
              <th onClick={() => handleSort("totalCalls")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Total Calls {sortField === "totalCalls" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("promiseRate")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Promise Rate {sortField === "promiseRate" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Avg Duration</th>
              <th onClick={() => handleSort("lastUsed")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Last Used {sortField === "lastUsed" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Mic className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No agents found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{searchQuery ? "Try adjusting your search" : "Create an agent to get started"}</p>
                  </div>
                </td>
              </tr>
            ) : filteredAndSorted.map(agent => (
              <tr key={agent.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{agent.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{agent.language}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{agent.voice}</span></td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                    agent.status === "active" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    agent.status === "paused" ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                    "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  }`}>{agent.statusLabel}</span>
                </td>
                <td className="px-6 py-4 text-right"><span className="text-sm text-gray-900 dark:text-white">{agent.campaigns}</span></td>
                <td className="px-6 py-4 text-right"><span className="text-sm text-gray-900 dark:text-white">{agent.totalCalls.toLocaleString()}</span></td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${agent.promiseRate >= 8 ? "text-green-600 dark:text-green-400" : agent.promiseRate >= 5 ? "text-yellow-600 dark:text-yellow-400" : agent.promiseRate > 0 ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>
                    {agent.promiseRate > 0 ? `${agent.promiseRate}%` : "—"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right"><span className="text-sm text-gray-600 dark:text-gray-400">{agent.avgDuration}</span></td>
                <td className="px-6 py-4 text-right"><span className="text-sm text-gray-500 dark:text-gray-400">{agent.lastUsed}</span></td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Agent</label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                  {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test Phone Number</label>
                <input type="tel" placeholder="+52 55 1234 5678"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test Scenario</label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                  <option>Credit Card Payment Reminder</option>
                  <option>Personal Loan Follow-up</option>
                  <option>Auto Loan Collection</option>
                  <option>Payment Plan Negotiation</option>
                  <option>Custom Scenario</option>
                </select>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-400">💡 Tip: Test calls are free and won&apos;t affect your production metrics</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowTestModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all">Cancel</button>
              <button onClick={() => { setShowTestModal(false); showToast("success", "Test call initiated! You will receive a call shortly."); }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center gap-2 transition-all hover:scale-105">
                <Play className="w-4 h-4" /> Start Test Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
