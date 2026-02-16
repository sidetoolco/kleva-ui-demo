"use client";

import { useState } from "react";
import { Key, Webhook, Users, CreditCard, Bell, Shield } from "lucide-react";

type Tab = "account" | "api" | "webhooks" | "team" | "billing" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("account")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "account"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "api"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          API Keys
        </button>
        <button
          onClick={() => setActiveTab("webhooks")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "webhooks"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Webhooks
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "team"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "billing"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Billing
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`text-sm font-medium pb-3 transition-colors ${
            activeTab === "notifications"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === "account" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Vana"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="ed@kleva.co"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                    <option>Mexico</option>
                    <option>Peru</option>
                    <option>Colombia</option>
                    <option>Guatemala</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900">
                    <option>America/Mexico_City</option>
                    <option>America/Lima</option>
                    <option>America/Bogota</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                Create New Key
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Production Key</p>
                    <p className="text-xs text-gray-500 font-mono">kleva_prod_•••••••••••••••8x2k</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Development Key</p>
                    <p className="text-xs text-gray-500 font-mono">kleva_dev_•••••••••••••••3j7m</p>
                  </div>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === "webhooks" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Webhook Endpoints</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                Add Endpoint
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 font-mono">https://api.yourapp.com/webhooks</p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-50 text-green-700">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-500">Events: call.completed, promise.created, payment.received</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">
                Invite Member
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    ED
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ed Escobar</p>
                    <p className="text-xs text-gray-500">ed@kleva.co • Owner</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">You</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-lg font-semibold text-gray-900">Pro Plan</p>
                <p className="text-sm text-gray-500">40,000 minutes/month</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                Manage Plan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Minutes Used</span>
                <span className="font-medium text-gray-900">25,383 / 40,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '63.5%' }} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estimated Cost</span>
                <span className="font-medium text-gray-900">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h2>
            <div className="space-y-4">
              {[
                { label: "Campaign completed", description: "Get notified when a campaign finishes" },
                { label: "Promise secured", description: "Alert when a payment commitment is made" },
                { label: "Payment received", description: "Notification when payment is received" },
                { label: "Weekly summary", description: "Weekly performance summary email" }
              ].map((item, index) => (
                <label key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={index < 2}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
