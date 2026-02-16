"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Plus } from "lucide-react";

type Tab = "active" | "paused" | "completed";

interface Campaign {
  name: string;
  country: string;
  flag: string;
  status: "active" | "paused" | "completed";
  statusLabel: string;
  debtors: number;
  promises: number;
  promiseRate: number;
  created: string;
}

const campaigns: Campaign[] = [
  {
    name: "Vana Peru B0-30",
    country: "Peru",
    flag: "🇵🇪",
    status: "active",
    statusLabel: "Active",
    debtors: 3247,
    promises: 247,
    promiseRate: 7.6,
    created: "2 days ago"
  },
  {
    name: "Nexo Mexico Early",
    country: "Mexico",
    flag: "🇲🇽",
    status: "active",
    statusLabel: "Active",
    debtors: 8456,
    promises: 892,
    promiseRate: 10.5,
    created: "5 days ago"
  },
  {
    name: "MercadoPago Pilot",
    country: "Mexico",
    flag: "🇲🇽",
    status: "paused",
    statusLabel: "Paused",
    debtors: 892,
    promises: 68,
    promiseRate: 7.6,
    created: "1 week ago"
  },
  {
    name: "Koinsya Colombia B1",
    country: "Colombia",
    flag: "🇨🇴",
    status: "active",
    statusLabel: "Active",
    debtors: 1567,
    promises: 29,
    promiseRate: 1.9,
    created: "3 days ago"
  },
  {
    name: "Vana Guatemala Campaign",
    country: "Guatemala",
    flag: "🇬🇹",
    status: "active",
    statusLabel: "Active",
    debtors: 4123,
    promises: 532,
    promiseRate: 12.9,
    created: "1 day ago"
  }
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("active");
  
  const filteredCampaigns = campaigns.filter(c => c.status === activeTab);

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Campaigns</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6">
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
          onClick={() => setActiveTab("paused")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "paused"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Paused
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "completed"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Completed
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
          All Countries
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Campaign
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Country
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Debtors
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Promises
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Created
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/campaigns/${index + 1}`}
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900 hover:text-gray-700">
                    {campaign.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{campaign.flag}</span>
                    <span className="text-sm text-gray-600">{campaign.country}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      campaign.status === "active"
                        ? "bg-green-50 text-green-700"
                        : campaign.status === "paused"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {campaign.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-900">
                    {campaign.debtors.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-900">
                    {campaign.promises.toLocaleString()}{" "}
                    <span className={`text-xs ${
                      campaign.promiseRate >= 7 ? "text-green-600" : 
                      campaign.promiseRate >= 3 ? "text-yellow-600" : 
                      "text-gray-500"
                    }`}>
                      ({campaign.promiseRate}%)
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{campaign.created}</span>
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
