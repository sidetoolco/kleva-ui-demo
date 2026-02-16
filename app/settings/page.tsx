"use client";

import { useState } from "react";
import { Key, Webhook, Users, CreditCard, Bell, Shield, Copy, Check } from "lucide-react";
import { useToast } from "@/components/Toast";
import { ProgressBar } from "@/components/ProgressBar";

type Tab = "account" | "api" | "webhooks" | "team" | "billing" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { showToast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast("success", `${label} copied to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "account", label: "Account", icon: Shield },
    { key: "api", label: "API Keys", icon: Key },
    { key: "webhooks", label: "Webhooks", icon: Webhook },
    { key: "team", label: "Team", icon: Users },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`text-sm font-medium pb-3 transition-colors ${activeTab === t.key ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >{t.label}</button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                <input type="text" defaultValue="Vana" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" defaultValue="ed@kleva.co" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                    <option>Mexico</option><option>Peru</option><option>Colombia</option><option>Guatemala</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all">
                    <option>America/Mexico_City</option><option>America/Lima</option><option>America/Bogota</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button onClick={() => showToast("success", "Settings saved successfully")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h2>
              <button onClick={() => showToast("success", "New API key created")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Create New Key</button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Production Key", key: "kleva_prod_•••••••••••••••8x2k" },
                { label: "Development Key", key: "kleva_dev_•••••••••••••••3j7m" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{item.key}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copyToClipboard(item.key, item.label)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      {copiedKey === item.label ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button onClick={() => showToast("error", `${item.label} revoked`)} className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">Revoke</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === "webhooks" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Webhook Endpoints</h2>
              <button onClick={() => showToast("info", "Add webhook endpoint form would open here")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Add Endpoint</button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">https://api.yourapp.com/webhooks</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400">Active</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Events: call.completed, promise.created, payment.received</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
              <button onClick={() => showToast("info", "Invite member form would open here")} className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">Invite Member</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center text-white dark:text-gray-900 text-sm font-medium">ED</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Ed Escobar</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ed@kleva.co • Owner</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">You</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h2>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Pro Plan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">40,000 minutes/month</p>
              </div>
              <button onClick={() => showToast("info", "Plan management would open here")} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Manage Plan</button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usage This Month</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Minutes Used</span>
                <span className="font-medium text-gray-900 dark:text-white">25,383 / 40,000</span>
              </div>
              <ProgressBar value={25383} max={40000} color="purple" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Estimated Cost</span>
                <span className="font-medium text-gray-900 dark:text-white">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h2>
            <div className="space-y-4">
              {[
                { label: "Campaign completed", description: "Get notified when a campaign finishes" },
                { label: "Promise secured", description: "Alert when a payment commitment is made" },
                { label: "Payment received", description: "Notification when payment is received" },
                { label: "Weekly summary", description: "Weekly performance summary email" },
              ].map((item, index) => (
                <label key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked={index < 2} className="rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-gray-900 dark:focus:ring-white" />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
