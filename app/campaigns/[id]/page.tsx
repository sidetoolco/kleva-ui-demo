"use client";

import { use } from "react";
import { ArrowLeft, Users, Phone, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

interface CampaignDetails {
  id: string; name: string; country: string; flag: string; status: string;
  debtors: number; promises: number; promiseRate: number; totalCalls: number;
  answeredCalls: number; collected: number; avgCallDuration: string; created: string; agent: string;
}

const campaignsData: Record<string, CampaignDetails> = {
  "1": { id: "1", name: "Vana Peru B0-30", country: "Peru", flag: "🇵🇪", status: "Active", debtors: 3247, promises: 247, promiseRate: 7.6, totalCalls: 892, answeredCalls: 634, collected: 187450, avgCallDuration: "01:32", created: "2 days ago", agent: "Carlos - Peru" },
};

interface Activity { type: "call" | "promise" | "payment"; contact: string; description: string; amount?: number; timestamp: string; }

const activityData: Record<string, Activity[]> = {
  "1": [
    { type: "promise", contact: "Juan Martinez", description: "Payment commitment secured", amount: 1250, timestamp: "2 hours ago" },
    { type: "call", contact: "Maria Gonzalez", description: "Outbound call - No answer", timestamp: "3 hours ago" },
    { type: "promise", contact: "Pedro Silva", description: "Payment plan agreed", amount: 890, timestamp: "4 hours ago" },
    { type: "payment", contact: "Carmen Lopez", description: "Payment received", amount: 2100, timestamp: "5 hours ago" },
    { type: "call", contact: "Roberto Diaz", description: "Outbound call - Answered", timestamp: "6 hours ago" },
  ],
};

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const campaign = campaignsData[id] || campaignsData["1"];
  const activity = activityData[id] || activityData["1"];

  return (
    <div className="p-8 max-w-7xl">
      <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Campaigns
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{campaign.flag}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{campaign.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.country} • Created {campaign.created}</p>
            </div>
          </div>
          <span className="inline-flex px-3 py-1 text-sm font-medium rounded bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">{campaign.status}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Debtors</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{campaign.debtors.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Promises</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{campaign.promises}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{campaign.promiseRate}% rate</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Calls</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{campaign.totalCalls}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{campaign.answeredCalls} answered</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Collected</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">${(campaign.collected / 1000).toFixed(0)}K</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Agent</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{campaign.agent}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg {campaign.avgCallDuration}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { icon: Phone, iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400", label: "Answer Rate", value: "71%", trend: "+5% vs avg", trendColor: "text-green-600 dark:text-green-400" },
          { icon: DollarSign, iconBg: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400", label: "Avg Promise", value: "$759", trend: "Per commitment", trendColor: "text-gray-500 dark:text-gray-400" },
          { icon: Users, iconBg: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-600 dark:text-purple-400", label: "Conversion", value: "7.6%", trend: "Above target (5%)", trendColor: "text-green-600 dark:text-green-400" },
        ].map((card, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm ${card.trendColor}`}>
              {card.trendColor.includes("green") && <TrendingUp className="w-4 h-4" />}
              <span>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activity.map((item, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.type === "promise" ? "bg-green-100 dark:bg-green-900/30" :
                item.type === "payment" ? "bg-blue-100 dark:bg-blue-900/30" :
                "bg-gray-100 dark:bg-gray-700"
              }`}>
                {item.type === "promise" && <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {item.type === "payment" && <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {item.type === "call" && <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.contact}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    {item.amount && <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">${item.amount.toLocaleString()}</p>}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
