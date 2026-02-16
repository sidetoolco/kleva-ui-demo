"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Plus, Megaphone, ArrowUpDown } from "lucide-react";
import { useToast } from "@/components/Toast";
import { Tooltip } from "@/components/Tooltip";
import Link from "next/link";

type Tab = "all" | "active" | "paused" | "completed";
type SortField = "name" | "debtors" | "promises" | "created";
type SortDirection = "asc" | "desc";

interface Campaign {
  id: string;
  name: string;
  country: string;
  flag: string;
  status: "active" | "paused" | "completed";
  statusLabel: string;
  debtors: number;
  promises: number;
  promiseRate: number;
  created: string;
  createdTimestamp: number;
}

const campaigns: Campaign[] = [
  { id: "1", name: "Vana Peru B0-30", country: "Peru", flag: "🇵🇪", status: "active", statusLabel: "Active", debtors: 3247, promises: 247, promiseRate: 7.6, created: "2 days ago", createdTimestamp: Date.now() - 2 * 86400000 },
  { id: "2", name: "Nexo Mexico Early", country: "Mexico", flag: "🇲🇽", status: "active", statusLabel: "Active", debtors: 8456, promises: 892, promiseRate: 10.5, created: "5 days ago", createdTimestamp: Date.now() - 5 * 86400000 },
  { id: "3", name: "MercadoPago Pilot", country: "Mexico", flag: "🇲🇽", status: "paused", statusLabel: "Paused", debtors: 892, promises: 68, promiseRate: 7.6, created: "1 week ago", createdTimestamp: Date.now() - 7 * 86400000 },
  { id: "4", name: "Koinsya Colombia B1", country: "Colombia", flag: "🇨🇴", status: "active", statusLabel: "Active", debtors: 1567, promises: 29, promiseRate: 1.9, created: "3 days ago", createdTimestamp: Date.now() - 3 * 86400000 },
  { id: "5", name: "Vana Guatemala Campaign", country: "Guatemala", flag: "🇬🇹", status: "active", statusLabel: "Active", debtors: 4123, promises: 532, promiseRate: 12.9, created: "1 day ago", createdTimestamp: Date.now() - 86400000 },
  { id: "6", name: "Banco Nacional Early Stage", country: "Peru", flag: "🇵🇪", status: "completed", statusLabel: "Completed", debtors: 2100, promises: 312, promiseRate: 14.9, created: "3 weeks ago", createdTimestamp: Date.now() - 21 * 86400000 },
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const { showToast } = useToast();

  const filteredAndSorted = useMemo(() => {
    let filtered = campaigns;
    if (activeTab !== "all") filtered = filtered.filter(c => c.status === activeTab);
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "debtors") cmp = a.debtors - b.debtors;
      else if (sortField === "promises") cmp = a.promises - b.promises;
      else if (sortField === "created") cmp = a.createdTimestamp - b.createdTimestamp;
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [activeTab, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("asc"); }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "paused", label: "Paused" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Campaigns</h1>
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
          <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all" />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">All Countries</button>
        <button onClick={() => showToast("info", "New campaign form would open here")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <th onClick={() => handleSort("name")} className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-2">Campaign {sortField === "name" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Country</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th onClick={() => handleSort("debtors")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Debtors {sortField === "debtors" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("promises")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Promises {sortField === "promises" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th onClick={() => handleSort("created")} className="text-right px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-end gap-2">Created {sortField === "created" && <ArrowUpDown className="w-3 h-3" />}</div>
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Megaphone className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No campaigns found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{searchQuery ? "Try adjusting your search" : "Create a campaign to get started"}</p>
                  </div>
                </td>
              </tr>
            ) : filteredAndSorted.map(campaign => (
              <Link key={campaign.id} href={`/campaigns/${campaign.id}`} className="contents">
                <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4"><span className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{campaign.flag}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{campaign.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded transition-colors ${
                      campaign.status === "active" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                      campaign.status === "paused" ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                      "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}>{campaign.statusLabel}</span>
                  </td>
                  <td className="px-6 py-4 text-right"><span className="text-sm text-gray-900 dark:text-white">{campaign.debtors.toLocaleString()}</span></td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {campaign.promises.toLocaleString()}{" "}
                      <span className={`text-xs ${campaign.promiseRate >= 7 ? "text-green-600 dark:text-green-400" : campaign.promiseRate >= 3 ? "text-yellow-600 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}>
                        ({campaign.promiseRate}%)
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right"><span className="text-sm text-gray-500 dark:text-gray-400">{campaign.created}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
