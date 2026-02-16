"use client";

import { useState } from "react";
import { Search, Filter, Download, Headphones } from "lucide-react";

type Tab = "all" | "answered" | "voicemail" | "no-answer" | "disputes";

interface Call {
  datetime: string;
  debtor: string;
  account: string;
  duration: string;
  outcome: {
    type: "promise" | "callback" | "no-answer" | "dispute";
    label: string;
    amount?: string;
  };
  agent: string;
  hasRecording: boolean;
}

const calls: Call[] = [
  {
    datetime: "Feb 16, 10:23 AM",
    debtor: "Juan Martinez",
    account: "VISA-1234",
    duration: "2:17",
    outcome: { type: "promise", label: "Promise $1,250", amount: "$1,250" },
    agent: "Agent-MX-07",
    hasRecording: true
  },
  {
    datetime: "Feb 16, 10:18 AM",
    debtor: "Maria Gonzalez",
    account: "LOAN-5678",
    duration: "0:43",
    outcome: { type: "no-answer", label: "No answer" },
    agent: "Agent-MX-03",
    hasRecording: false
  },
  {
    datetime: "Feb 16, 10:15 AM",
    debtor: "Pedro Silva",
    account: "AUTO-9012",
    duration: "1:54",
    outcome: { type: "callback", label: "Callback requested" },
    agent: "Agent-PE-12",
    hasRecording: true
  },
  {
    datetime: "Feb 16, 10:12 AM",
    debtor: "Carmen Lopez",
    account: "VISA-3456",
    duration: "3:28",
    outcome: { type: "promise", label: "Payment plan $890", amount: "$890" },
    agent: "Agent-MX-07",
    hasRecording: true
  },
  {
    datetime: "Feb 16, 10:08 AM",
    debtor: "Roberto Diaz",
    account: "LOAN-7890",
    duration: "2:45",
    outcome: { type: "dispute", label: "Dispute filed" },
    agent: "Agent-CO-05",
    hasRecording: true
  },
  {
    datetime: "Feb 16, 10:05 AM",
    debtor: "Ana Torres",
    account: "AUTO-2345",
    duration: "1:32",
    outcome: { type: "callback", label: "Callback tomorrow" },
    agent: "Agent-GT-18",
    hasRecording: true
  }
];

export default function CallsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Calls</p>
        <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">TOTAL CALLS</p>
          <p className="text-2xl font-bold text-gray-900">2,847</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">ANSWERED</p>
          <p className="text-2xl font-bold text-gray-900">1,923</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">PROMISES</p>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">AVG DURATION</p>
          <p className="text-2xl font-bold text-gray-900">01:28</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            {[
              { id: "all", label: "All Calls" },
              { id: "answered", label: "Answered" },
              { id: "voicemail", label: "Voicemail" },
              { id: "no-answer", label: "No Answer" },
              { id: "disputes", label: "Disputes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Actions */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, account number, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debtor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Outcome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recording
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calls.map((call, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {call.datetime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                        {call.debtor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {call.debtor}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {call.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {call.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                      call.outcome.type === "promise"
                        ? "bg-green-100 text-green-800"
                        : call.outcome.type === "callback"
                        ? "bg-yellow-100 text-yellow-800"
                        : call.outcome.type === "dispute"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {call.outcome.type === "promise" ? "🟢" : 
                       call.outcome.type === "callback" ? "🟡" :
                       call.outcome.type === "dispute" ? "🔴" : "⚪"}{" "}
                      {call.outcome.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {call.agent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {call.hasRecording ? (
                      <button className="text-purple-600 hover:text-purple-700">
                        <Headphones className="w-5 h-5" />
                      </button>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
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
    </div>
  );
}
