"use client";

import { useState } from "react";
import { Search, Download, Code2, MoreHorizontal, Headphones } from "lucide-react";

type Tab = "all" | "answered" | "promises" | "no-answer";

interface Call {
  to: string;
  status: "promise" | "answered" | "no-answer" | "voicemail";
  statusLabel: string;
  subject: string;
  sent: string;
  hasRecording: boolean;
}

const calls: Call[] = [
  {
    to: "Juan Martinez",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-1234 • Payment commitment $1,250",
    sent: "about 2 hours ago",
    hasRecording: true
  },
  {
    to: "Maria Gonzalez",
    status: "answered",
    statusLabel: "Answered",
    subject: "LOAN-5678 • Follow-up scheduled",
    sent: "about 2 hours ago",
    hasRecording: true
  },
  {
    to: "Pedro Silva",
    status: "promise",
    statusLabel: "Promise",
    subject: "AUTO-9012 • Payment plan $890",
    sent: "about 3 hours ago",
    hasRecording: true
  },
  {
    to: "Carmen Lopez",
    status: "answered",
    statusLabel: "Answered",
    subject: "VISA-3456 • Callback requested",
    sent: "about 3 hours ago",
    hasRecording: true
  },
  {
    to: "Roberto Diaz",
    status: "no-answer",
    statusLabel: "No Answer",
    subject: "LOAN-7890 • Voicemail left",
    sent: "about 4 hours ago",
    hasRecording: false
  },
  {
    to: "Ana Torres",
    status: "answered",
    statusLabel: "Answered",
    subject: "AUTO-2345 • Will pay tomorrow",
    sent: "about 5 hours ago",
    hasRecording: true
  },
  {
    to: "Carlos Ramirez",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-6789 • Payment commitment $2,100",
    sent: "1 day ago",
    hasRecording: true
  },
  {
    to: "Sofia Mendez",
    status: "voicemail",
    statusLabel: "Voicemail",
    subject: "LOAN-3456 • No contact",
    sent: "1 day ago",
    hasRecording: false
  },
  {
    to: "Miguel Angel",
    status: "answered",
    statusLabel: "Answered",
    subject: "AUTO-7890 • Hardship request",
    sent: "2 days ago",
    hasRecording: true
  },
  {
    to: "Patricia Ruiz",
    status: "promise",
    statusLabel: "Promise",
    subject: "VISA-4567 • Payment commitment $750",
    sent: "2 days ago",
    hasRecording: true
  }
];

export default function CallsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Calls</h1>
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
          All
        </button>
        <button
          onClick={() => setActiveTab("answered")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "answered"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Answered
        </button>
        <button
          onClick={() => setActiveTab("promises")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "promises"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Promises
        </button>
        <button
          onClick={() => setActiveTab("no-answer")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "no-answer"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          No Answer
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          Last 15 days
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          All Statuses
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          All Campaigns
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Code2 className="w-4 h-4" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                To
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Subject
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Sent
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {call.to}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      call.status === "promise"
                        ? "bg-green-50 text-green-700"
                        : call.status === "answered"
                        ? "bg-blue-50 text-blue-700"
                        : call.status === "voicemail"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {call.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{call.subject}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{call.sent}</span>
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
    </div>
  );
}
