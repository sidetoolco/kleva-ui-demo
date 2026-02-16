"use client";

import { useState } from "react";
import { Search, Filter, Download, Plus } from "lucide-react";

type Tab = "active" | "scheduled" | "paused" | "completed";

interface Campaign {
  name: string;
  country: string;
  flag: string;
  debtors: number;
  promises: number;
  promiseRate: number;
  status: "active" | "scheduled" | "paused" | "completed";
  created: string;
}

const campaigns: Campaign[] = [
  {
    name: "Vana Peru B0-30",
    country: "Peru",
    flag: "🇵🇪",
    debtors: 3247,
    promises: 247,
    promiseRate: 7.6,
    status: "active",
    created: "2d ago"
  },
  {
    name: "Nexo Mexico Early",
    country: "Mexico",
    flag: "🇲🇽",
    debtors: 8456,
    promises: 892,
    promiseRate: 10.5,
    status: "active",
    created: "5d ago"
  },
  {
    name: "MercadoPago Pilot",
    country: "Mexico",
    flag: "🇲🇽",
    debtors: 892,
    promises: 68,
    promiseRate: 7.6,
    status: "paused",
    created: "1w ago"
  },
  {
    name: "Koinsya Colombia B1",
    country: "Colombia",
    flag: "🇨🇴",
    debtors: 1567,
    promises: 29,
    promiseRate: 1.9,
    status: "active",
    created: "3d ago"
  },
  {
    name: "Vana Guatemala Campaign",
    country: "Guatemala",
    flag: "🇬🇹",
    debtors: 4123,
    promises: 532,
    promiseRate: 12.9,
    status: "active",
    created: "1d ago"
  }
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("active");
  
  const filteredCampaigns = campaigns.filter(c => c.status === activeTab);
  const totalDebtors = filteredCampaigns.reduce((sum, c) => sum + c.debtors, 0);
  const totalPromises = filteredCampaigns.reduce((sum, c) => sum + c.promises, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Campaigns</p>
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">ACTIVE</p>
          <p className="text-2xl font-bold text-gray-900">
            {campaigns.filter(c => c.status === "active").length}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">TOTAL DEBTORS</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalDebtors.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">PROMISES</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalPromises.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">COLLECTED</p>
          <p className="text-2xl font-bold text-gray-900">$2.1M</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            {(["active", "scheduled", "paused", "completed"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              placeholder="Search campaigns..."
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
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              New Campaign
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-6 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debtors
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promises
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {campaign.debtors.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">
                      {campaign.promises.toLocaleString()}{" "}
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
                    {campaign.created}
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
