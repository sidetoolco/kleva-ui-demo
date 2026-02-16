"use client";

import { useState } from "react";
import { Search, Download, Code2, MoreHorizontal, MessageSquare } from "lucide-react";

type Tab = "all" | "whatsapp" | "sms" | "delivered";

interface Message {
  to: string;
  platform: "whatsapp" | "sms";
  status: "delivered" | "read" | "failed" | "sent";
  statusLabel: string;
  content: string;
  sent: string;
}

const messages: Message[] = [
  {
    to: "Juan Martinez",
    platform: "whatsapp",
    status: "read",
    statusLabel: "Read",
    content: "Hola Juan, recordatorio de su pago pendiente de $1,250 en VISA-1234...",
    sent: "about 1 hour ago"
  },
  {
    to: "Maria Gonzalez",
    platform: "sms",
    status: "delivered",
    statusLabel: "Delivered",
    content: "Hola Maria, su préstamo LOAN-5678 tiene un pago vencido. Responda para opciones...",
    sent: "about 2 hours ago"
  },
  {
    to: "Pedro Silva",
    platform: "whatsapp",
    status: "read",
    statusLabel: "Read",
    content: "Buenos días Pedro, confirmamos su plan de pago de $890 para AUTO-9012...",
    sent: "about 2 hours ago"
  },
  {
    to: "Carmen Lopez",
    platform: "whatsapp",
    status: "delivered",
    statusLabel: "Delivered",
    content: "Hola Carmen, gracias por su compromiso de pago. Link de pago: https://...",
    sent: "about 3 hours ago"
  },
  {
    to: "Roberto Diaz",
    platform: "sms",
    status: "sent",
    statusLabel: "Sent",
    content: "Estimado Roberto, intentamos contactarlo sobre LOAN-7890. Por favor llame...",
    sent: "about 4 hours ago"
  },
  {
    to: "Ana Torres",
    platform: "whatsapp",
    status: "read",
    statusLabel: "Read",
    content: "Hola Ana, confirmamos pago para mañana de AUTO-2345. Muchas gracias...",
    sent: "about 5 hours ago"
  },
  {
    to: "Carlos Ramirez",
    platform: "sms",
    status: "delivered",
    statusLabel: "Delivered",
    content: "Hola Carlos, recordatorio de pago comprometido de $2,100 en VISA-6789...",
    sent: "1 day ago"
  },
  {
    to: "Sofia Mendez",
    platform: "whatsapp",
    status: "failed",
    statusLabel: "Failed",
    content: "Hola Sofia, necesitamos actualizar información de LOAN-3456...",
    sent: "1 day ago"
  },
  {
    to: "Miguel Angel",
    platform: "sms",
    status: "delivered",
    statusLabel: "Delivered",
    content: "Estimado Miguel, recibimos su solicitud de apoyo. Nuestro equipo contactará...",
    sent: "2 days ago"
  },
  {
    to: "Patricia Ruiz",
    platform: "whatsapp",
    status: "read",
    statusLabel: "Read",
    content: "Hola Patricia, confirmamos su compromiso de pago de $750 en VISA-4567...",
    sent: "2 days ago"
  }
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "all") return true;
    if (activeTab === "whatsapp") return msg.platform === "whatsapp";
    if (activeTab === "sms") return msg.platform === "sms";
    if (activeTab === "delivered") return msg.status === "delivered" || msg.status === "read";
    return true;
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
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
          onClick={() => setActiveTab("whatsapp")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "whatsapp"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          WhatsApp
        </button>
        <button
          onClick={() => setActiveTab("sms")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "sms"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          SMS
        </button>
        <button
          onClick={() => setActiveTab("delivered")}
          className={`text-sm font-medium pb-2 transition-colors ${
            activeTab === "delivered"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Delivered
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
                Platform
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                Message
              </th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                Sent
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.platform === "whatsapp" 
                        ? "bg-green-100" 
                        : "bg-blue-100"
                    }`}>
                      <MessageSquare className={`w-4 h-4 ${
                        message.platform === "whatsapp"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {message.to}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {message.platform === "whatsapp" ? "WhatsApp" : "SMS"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                      message.status === "read"
                        ? "bg-green-50 text-green-700"
                        : message.status === "delivered"
                        ? "bg-blue-50 text-blue-700"
                        : message.status === "sent"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {message.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 line-clamp-1">
                    {message.content}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-500">{message.sent}</span>
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
