"use client";

import { useState } from "react";
import { Search, Download, Code2, MoreHorizontal, Mail } from "lucide-react";

type Tab = "all" | "sent" | "opened" | "clicked";

interface Email {
  to: string;
  status: "sent" | "delivered" | "opened" | "clicked" | "bounced";
  statusLabel: string;
  subject: string;
  sent: string;
}

const emails: Email[] = [
  {
    to: "juan.martinez@email.com",
    status: "opened",
    statusLabel: "Opened",
    subject: "Payment Reminder - VISA-1234",
    sent: "about 1 hour ago"
  },
  {
    to: "maria.gonzalez@email.com",
    status: "clicked",
    statusLabel: "Clicked",
    subject: "Payment Link for LOAN-5678",
    sent: "about 2 hours ago"
  },
  {
    to: "pedro.silva@email.com",
    status: "opened",
    statusLabel: "Opened",
    subject: "Payment Plan Confirmation - AUTO-9012",
    sent: "about 2 hours ago"
  },
  {
    to: "carmen.lopez@email.com",
    status: "delivered",
    statusLabel: "Delivered",
    subject: "Account Update - VISA-3456",
    sent: "about 3 hours ago"
  },
  {
    to: "roberto.diaz@email.com",
    status: "sent",
    statusLabel: "Sent",
    subject: "Important Account Notice - LOAN-7890",
    sent: "about 4 hours ago"
  },
  {
    to: "ana.torres@email.com",
    status: "clicked",
    statusLabel: "Clicked",
    subject: "Payment Confirmation - AUTO-2345",
    sent: "about 5 hours ago"
  },
  {
    to: "carlos.ramirez@email.com",
    status: "opened",
    statusLabel: "Opened",
    subject: "Thank You - VISA-6789",
    sent: "1 day ago"
  },
  {
    to: "sofia.mendez@email.com",
    status: "bounced",
    statusLabel: "Bounced",
    subject: "Account Status - LOAN-3456",
    sent: "1 day ago"
  },
  {
    to: "miguel.angel@email.com",
    status: "delivered",
    statusLabel: "Delivered",
    subject: "Support Request Received - AUTO-7890",
    sent: "2 days ago"
  },
  {
    to: "patricia.ruiz@email.com",
    status: "clicked",
    statusLabel: "Clicked",
    subject: "Payment Options - VISA-4567",
    sent: "2 days ago"
  }
];

export default function EmailsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredEmails = emails.filter((email) => {
    if (activeTab === "all") return true;
    if (activeTab === "sent") return email.status === "sent" || email.status === "delivered";
    if (activeTab === "opened") return email.status === "opened";
    if (activeTab === "clicked") return email.status === "clicked";
    return true;
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Emails</h1>
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
          onClick={() => setActiveTab("sent")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "sent"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sent
        </button>
        <button
          onClick={() => setActiveTab("opened")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "opened"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Opened
        </button>
        <button
          onClick={() => setActiveTab("clicked")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "clicked"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Clicked
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
            {filteredEmails.map((email, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {email.to}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      email.status === "clicked"
                        ? "bg-green-50 text-green-700"
                        : email.status === "opened"
                        ? "bg-blue-50 text-blue-700"
                        : email.status === "delivered"
                        ? "bg-purple-50 text-purple-700"
                        : email.status === "sent"
                        ? "bg-gray-50 text-gray-600"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {email.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{email.subject}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{email.sent}</span>
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
